var ometajs = require('ometajs');
var xjst = require('xjst');
var vm = require('vm');
var bemhtml = require('../ometa/bemhtml');
var BEMHTMLParser = bemhtml.BEMHTMLParser;
var BEMHTMLToXJST = bemhtml.BEMHTMLToXJST;
var BEMHTMLLogLocal = bemhtml.BEMHTMLLogLocal;

var api = exports;

//
// ### function translate (source)
// #### @source {String} BEMHTML Source code
// #### @options {Object} Compilation options **optional**
// Returns source translated to javascript
//
api.translate = function translate(source, options) {
  var tree = BEMHTMLParser.matchAll(source, 'topLevel');
  var xjstPre = BEMHTMLToXJST.match(tree, 'topLevel');
  var vars = [];

  options || (options = {});
  options.exportName || (options.exportName = 'BEMHTML');

  if (options.cache === true) {
    var xjstCached = BEMHTMLLogLocal.match(xjstPre, 'topLevel');
    vars = xjstCached[0];
    xjstPre = xjstCached[1];
  }

  var xjstTree = xjst.translate(xjstPre);

  try {
    var xjstJS = options.devMode ?
                   xjst.compile(xjstTree, '', { 'no-opt': true })
                   :
                   xjst.compile(xjstTree, { engine: 'sort-group' });
  } catch (e) {
    throw new Error('xjst to js compilation failed:\n' + e.stack);
  }

  var exportName = options.exportName;
  var xjst_apply = options.async ?
          'return xjst.applyAsync.call(' + (options.raw ? 'context' : '[context]') + ', options.callback);\n' :
          'return xjst.apply.call(' + (options.raw ? 'context' : '[context]') + ');\n';

  return 'var ' + exportName + ' = function() {\n' +
         '  var cache,\n' +
         '      exports = {},\n' +
         '      xjst = '  + xjstJS + ';\n' +
         '  return function(options) {\n' +
         '    var context = this;\n' +
         '    if (!options) options = {};\n' +
         '    cache = options.cache;\n' +
         '    return function() {\n' +
         '      if (context === this) context = undefined;\n' +
         (vars.length > 0 ? '    var ' + vars.join(', ') + ';\n' : '') +
         '      ' + xjst_apply +
         '    }.call(null);\n' +
         '  };\n' +
         '}();\n' +
         'typeof exports === "undefined" || (exports.' + exportName + ' = ' + exportName + ');';
};

//
// ### function compile (source)
// #### @source {String} BEMHTML Source code
// #### @options {Object} Compilation options **optional**
// Returns generator function
//
api.compile = function compile(source, options) {
  var body = exports.translate(source, options);
  var context = { exports: {} };

  if (options && options.devMode) {
      context.console = console;
  }
  vm.runInNewContext(body, context);

  return context.BEMHTML;
};
