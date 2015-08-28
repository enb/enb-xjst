var EOL = require('os').EOL,
    path = require('path'),
    vow = require('vow'),
    vfs = require('enb/lib/fs/async-fs'),
    pinpoint = require('pinpoint'),
    buildMap = require('../lib/source-map'),
    bundle = require('../lib/bundle');

/**
 * @class XjstTech
 * @augments {BaseTech}
 * @classdesc
 *
 * Compiles XJST template files with XJST translator and merges them into a single template bundle.<br/><br/>
 *
 * Important: Normally you don't need to use this tech directly.
 *
 * @param {Object}      [options]                       Options
 * @param {String}      [options.target='?.xjst.js']    Path to a target with compiled file.
 */
module.exports = require('enb/lib/build-flow').create()
    .name('xjst')
    .target('target', '?.xjst.js')
    .methods({
        /**
         * Reads source files from local file system.
         * @param {Object[]} sourceFiles — objects that contain file information.
         * @returns {Promise}
         * @protected
         */
        _readSourceFiles: function (sourceFiles) {
            return vow.all(sourceFiles.map(function (file) {
                return vfs.read(file.fullname, 'utf8')
                    .then(function (contents) {
                        return {
                            source: contents,
                            filename: file.fullname
                        };
                    });
            }));
        },
        /**
         * Compiles source code using BEMXJST processor.
         * Wraps compiled code for usage with different modular systems.
         *
         * @param {{ path: String, contents: String }[]} sources — objects that contain file information.
         * @returns {Promise}
         * @private
         */
        _compileXJST: function (sources) {
            var map = buildMap(sources),
                code = map.getCode(),
                jobQueue = this.node.getSharedResources().jobQueue,
                baseTemplateName = this.getName() === 'bemhtml' ? 'i-bem__html.bemhtml' : 'i-bem.bemtree.xjst',
                template = [
                    'this._mode === "", !this.hasOwnProperty("ctx"): {',
                        'throw Error("Seems like you have no base templates from ' + baseTemplateName + '");',
                    '}',
                    'this._mode === "", !this.require: applyNext(this.require = function (lib) {',
                    '    return __xjst_libs__[lib];',
                    '})'
                ].join(EOL);

            code += EOL + template;

            this._log('Calm down, OmetaJS is running...');
            return jobQueue.push(
                    path.resolve(__dirname, '../lib/xjst-processor'),
                    code,
                    this._getOptions()
                )
                .then(function (result) {
                    return bundle.compile(result, {
                        dirname: this.node.getDir(),
                        exportName: this._exportName,
                        includeVow: this._includeVow,
                        requires: this._requires
                    });
                }, this)
                .fail(function (error) {
                    throw this._generateError(error, map);
                }, this);
        },

        /**
         * Error handler function.
         * @param {Error} error which occurs while XJST processing.
         * @param {SourceMap} sourceMap model object.
         * @returns {SyntaxError|*}
         * @protected
         */
        _generateError: function (error, sourceMap) {
            var line = error.line,
                column = error.column;

            // Syntax Error
            if (line && column) {
                var original = sourceMap.getOriginal(line, column);

                if (original) {
                    var message = error.message.split('\n')[0].replace(/\sat\:\s(\d)+\:(\d)+/, ''),
                        relPath = path.relative(this.node._root, original.filename),
                        context = pinpoint(original.source, {
                            line: original.line,
                            column: original.column,
                            indent: '    '
                        });

                    if (relPath.charAt(0) !== '.') {
                        relPath = './' + relPath;
                    }

                    return new SyntaxError(message + ' at ' + relPath + '\n' + context);
                } else {
                    return error;
                }
            } else {
                return error;
            }
        },

        /**
         * Returns configuration object for XJST processor.
         * @returns {Object}
         * @protected
         */
        _getOptions: function () {
            return {
                devMode: this._devMode,
                cache: this._cache,
                exportName: this._exportName,
                applyFuncName: this._applyFuncName
            };
        },
        /**
         * Logs message.
         *
         * @param {String} msg — message
         * @private
         */
        _log: function (msg) {
            var node = this.node,
                logger = node.getLogger(),
                filename = path.join(node.getPath(), this._target);

            logger.logWarningAction('wait', filename, msg);
        }
    })
    .createTech();
