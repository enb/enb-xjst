var path = require('path'),
    vow = require('vow'),
    vfs = require('enb/lib/fs/async-fs'),
    pinpoint = require('pinpoint'),
    sibling = require('sibling'),
    XJST = require('bem-bl-xjst'),
    SourceMap = require('../lib/source-map');

module.exports = require('enb/lib/build-flow').create()
    .name('xjst')
    .target('target', '?.xjst.js')
    .builder(function (sourceFiles) {
        return this._readSourceFiles(sourceFiles)
            .then(function (fileSources) {
                var sourceMap = SourceMap(fileSources),
                    code = sourceMap.getCode();

                return this._xjstProcess(code, sourceMap);
            }, this);
    })
    .methods({
        /**
         * Reads source files from local filesystem
         *
         * @param {FileList} sourceFiles - array of source file names
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
         * Merges content of source files and runs xjst processing for merged code
         * @param {String} code for processing
         * @param {SourceMap} sourceMap
         * @returns {*}
         * @private
         */
        _xjstProcess: function (code, sourceMap) {
            var xjstProcessor = this._getXJSTProcessor().fork();

            this.node.getLogger().log('Calm down, OmetaJS is running...');

            return xjstProcessor.process(code, this._getOptions())
                .then(function (res) {
                    var result = res.result,
                        error = res.error;

                    xjstProcessor.dispose();

                    if (result) {
                        return result;
                    }

                    if (error) {
                        throw this._generateError(error, sourceMap);
                    }
                }, this);
        },

        /**
         * Error handler function.
         *
         * @param {Error} error which occurs while xjstProcessing
         * @param {SourceMap} sourceMap model object
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
         * Returns configuration object for xjstProcessor
         *
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
         * Returns xjst processor declaration
         *
         * @returns {*}
         * @protected
         */
        _getXJSTProcessor: function () {
            return sibling.declare({
                process: function (source, options) {
                    try {
                        return { result: XJST.translate(source, options) };
                    } catch (e) {
                        return { error: e };
                    }
                }
            });
        }
    })
    .createTech();

