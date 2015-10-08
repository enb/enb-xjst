var enb = require('enb'),
    buildFlow = enb.buildFlow || require('enb/lib/build-flow'),
    requireOrEval = require('enb-require-or-eval'),
    asyncRequire = require('enb-async-require'),
    clearRequire = require('clear-require');

/**
 * @class BemjsonToHtmlTech
 * @augments {BaseTech}
 * @classdesc
 *
 * Builds HTML file.<br/><br/>
 *
 * This tech uses `BEMHTML.apply(bemjson)` to build HTML.
 *
 * @param {Object}  [options]                            Options.
 * @param {String}  [options.target='?.html']            Path to a target with HTML file.
 * @param {String}  [options.bemhtmlFile='?.bemhtml.js'] Path to a file with compiled BEMHTML module.
 * @param {String}  [options.bemjsonFile='?.bemjson.js'] Path to a BEMJSON file.
 *
 * @example
 * var BemjsonToHtmlTech = require('enb-xjst/techs/bemjson-to-html'),
 *     BemhtmlTech = require('enb-xjst/techs/bemhtml'),
 *     FileProvideTech = require('enb/techs/file-provider'),
 *     bem = require('enb-bem-techs');
 *
 * module.exports = function(config) {
 *     config.node('bundle', function(node) {
 *         // gets BEMJSON file
 *         node.addTech([FileProvideTech, { target: '?.bemjson.js' }]);
 *
 *         // gets FileList
 *         node.addTechs([
 *             [bem.levels, levels: ['blocks']],
 *             bem.bemjsonToBemdecl,
 *             bem.deps,
 *             bem.files
 *         ]);
 *
 *         // builds BEMHTML file
 *         node.addTech(BemhtmlTech);
 *         node.addTarget('?.bemhtml.js');
 *
 *         // builds HTML file
 *         node.addTech(BemjsonToHtmlTech);
 *         node.addTarget('?.html');
 *     });
 * };
 */
module.exports = buildFlow.create()
    .name('bemjson-to-html')
    .target('target', '?.html')
    .useSourceFilename('bemhtmlFile', '?.bemhtml.js')
    .useSourceFilename('bemjsonFile', '?.bemjson.js')
    .builder(function (bemhtmlFilename, bemjsonFilename) {
        clearRequire(bemjsonFilename);
        return requireOrEval(bemjsonFilename).then(function (json) {
            clearRequire(bemhtmlFilename);
            return asyncRequire(bemhtmlFilename).then(function (bemhtml) {
                return bemhtml.BEMHTML.apply(json);
            });
        });
    })
    .createTech();
