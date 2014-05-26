/**
 * html-from-bemjson
 * =================
 *
 * Собирает *html*-файл с помощью *bemjson* и *bemhtml*.
 *
 * **Опции**
 *
 * * *String* **bemhtmlTarget** — Исходный BEMHTML-файл. По умолчанию — `?.bemhtml.js`.
 * * *String* **bemjsonTarget** — Исходный BEMJSON-файл. По умолчанию — `?.bemjson.js`.
 * * *String* **destTarget** — Результирующий HTML-файл. По умолчанию — `?.html`.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech(require('enb-xjst/techs/html-from-bemjson'));
 * ```
 */
var requireOrEval = require('enb/lib/fs/require-or-eval');
var asyncRequire = require('enb/lib/fs/async-require');
var dropRequireCache = require('enb/lib/fs/drop-require-cache');

module.exports = require('enb/lib/build-flow').create()
    .name('html-from-bemjson')
    .target('destTarget', '?.html')
    .useSourceFilename('bemhtmlTarget', '?.bemhtml.js')
    .useSourceFilename('bemjsonTarget', '?.bemjson.js')
    .builder(function (bemhtmlFilename, bemjsonFilename) {
        dropRequireCache(require, bemjsonFilename);
        return requireOrEval(bemjsonFilename).then(function (json) {
            dropRequireCache(require, bemhtmlFilename);
            return asyncRequire(bemhtmlFilename).then(function (bemhtml) {
                return bemhtml.BEMHTML.apply(json);
            });
        });
    })
    .createTech();
