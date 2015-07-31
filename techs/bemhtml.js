/**
 * @class BemhtmlTech
 * @augments {XjstTech}
 * @classdesc
 *
 * Compiles BEMHTML template files with XJST translator and merges them into a single BEMHTML bundle.<br/><br/>
 *
 * @param {Object}    [options]                          Options.
 * @param {String}    [options.target='?.bemhtml.js']    Path to a target with compiled file.
 * @param {String}    [options.filesTarget='?.files']    Path to a target with FileList.
 * @param {String}    [options.exportName='BEMHTML']     Name of BEMHTML template variable.
 * @param {String}    [options.applyFuncName='apply']    Alias for `apply` function of base BEMHTML template.
 * @param {Boolean}   [options.devMode=true]             Sets `devMode` option for convenient debugging. If `devMode` is
 * set to true, code of templates will not be compiled but only wrapped for development purposes.
 * @param {Boolean}   [options.cache=false]              Sets `cache` option for cache usage.
 * @param {Object}    [options.requires]                 Names of dependencies which should be available from
 * code of templates.
 * @param {String[]}  [options.sourceSuffixes]           Files with specified suffixes involved in the assembly.
 *
 * @example
 * var BemhtmlTech = require('enb-xjst/techs/bemhtml'),
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
 *         // builds BEMHTML file
 *         node.addTech(BemhtmlTech);
 *         node.addTarget('?.bemhtml.js');
 *     });
 * };
 */
module.exports = require('./xjst').buildFlow()
    .name('bemhtml')
    .target('target', '?.bemhtml.js')
    .defineOption('exportName', 'BEMHTML')
    .defineOption('applyFuncName', 'apply')
    .defineOption('devMode', true)
    .defineOption('cache', false)
    .defineOption('requires', {})
    .useFileList('bemhtml')
    .createTech();
