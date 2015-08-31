var bundle = require('../lib/bundle'),
    EOL = require('os').EOL;

/**
 * @class BemtreeTech
 * @augments {XjstTech}
 * @classdesc
 *
 * Compiles BEMTREE template files with XJST translator and merges them into a single BEMTREE bundle.<br/><br/>
 *
 * @param {Object}      [options]                               Options.
 * @param {String}      [options.target='?.bemtree.xjst.js']    Path to a target with compiled file.
 * @param {String}      [options.filesTarget='?.files']         Path to a target with FileList.
 * @param {String}      [options.exportName='BEMTREE']          Name of BEMTREE template variable.
 * @param {String}      [options.applyFuncName='apply']         Alias for `apply` function of base BEMTREE template.
 * @param {Boolean}     [options.devMode=true]                  Set `devMode` option for convenient debugging.
 * If `devMode` is set to true, code of templates will not be compiled but only wrapped for development purposes.
 * @param {Boolean}     [options.includeVow=true]               Sets `includeVow` option to include code of `vow` module
 * into a template file.
 * @param {String[]}    [options.sourceSuffixes]                Files with specified suffixes involved in the assembly.
 *
 * @example
 * var BemtreeTech = require('enb-xjst/techs/bemtree'),
 *     FileProvideTech = require('enb/techs/file-provider'),
 *     bem = require('enb-bem-techs');
 *
 * module.exports = function(config) {
 *     config.node('bundle', function(node) {
 *         // gets FileList
 *         node.addTechs([
 *             [FileProvideTech, { target: '?.bemdecl.js' }],
 *             [bem.levels, levels: ['blocks']],
 *             bem.deps,
 *             bem.files
 *         ]);
 *
 *         // builds BEMTREE file
 *         node.addTech(BemtreeTech);
 *         node.addTarget('?.bemtree.xjst.js');
 *     });
 * };
 */
module.exports = require('./xjst').buildFlow()
    .name('bemtree')
    .target('target', '?.bemtree.xjst.js')
    .defineOption('exportName', 'BEMTREE')
    .defineOption('applyFuncName', 'apply')
    .defineOption('devMode', true)
    .defineOption('cache', false)
    .defineOption('includeVow', true)
    .useFileList('bemtree.xjst')
    .builder(function (sourceFiles) {
        // don't add fat wrapper code of bem-xjst
        if (sourceFiles.length === 0) {
            return this._mockBEMTREE();
        }

        return this._readSourceFiles(sourceFiles)
            .then(this._compileXJST, this);
    })
    .methods({
        /**
         * Returns BEMTREE mock.
         *
         * @returns {String}
         * @private
         */
        _mockBEMTREE: function () {
            var exportName = this._exportName,
                code = [
                    'exports["' + exportName + '"] = {',
                    '    apply: function () { return Vow.resolve({}); }',
                    '};'
                ].join(EOL);

            return bundle.compile(code, {
                exportName: exportName,
                includeVow: this._includeVow
            });
        }
    })
    .createTech();
