/**
 * html-from-bemjson-i18n
 * ======================
 *
 * Собирает *html*-файл с помощью *bemjson*, *bemhtml*, *lang.all* и *lang.{lang}*.
 *
 * **Опции**
 *
 * * *String* **bemhtmlTarget** — Исходный BEMHTML-файл. По умолчанию — `?.bemhtml.js`.
 * * *String* **bemjsonTarget** — Исходный BEMJSON-файл. По умолчанию — `?.bemjson.js`.
 * * *String* **langAllTarget** — Исходный langAll-файл. По умолчанию — `?.lang.all.js`.
 * * *String* **langTarget** — Исходный lang-файл. По умолчанию — `?.lang.{lang}.js`.
 *   Если параметр lang не указан, берется первый из объявленных в проекте языков
 * * *String* **destTarget** — Результирующий HTML-файл. По умолчанию — `?.{lang}.html`.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech(require('enb-xjst/techs/html-from-bemjson-i18n'));
 * ```
 */
var vow = require('vow');
var requireOrEval = require('enb/lib/fs/require-or-eval');
var asyncRequire = require('enb/lib/fs/async-require');
var dropRequireCache = require('enb/lib/fs/drop-require-cache');

module.exports = require('enb/lib/build-flow').create()
    .name('html-from-bemjson-i18n')
    .target('destTarget', '?.{lang}.html')
    .useSourceFilename('bemhtmlTarget', '?.bemhtml.js')
    .useSourceFilename('bemjsonTarget', '?.bemjson.js')
    .useSourceFilename('langAllTarget', '?.lang.all.js')
    .useSourceFilename('langTarget', '?.lang.{lang}.js')
    .needRebuild(function (target) {
        var cache = this.node.getNodeCache(target);
        return cache.needRebuildFile('bemhtml-file', this.node.resolvePath(this._bemhtmlTarget)) ||
            cache.needRebuildFile('bemjson-file', this.node.resolvePath(this._bemjsonTarget)) ||
            cache.needRebuildFile('allLang-file', this.node.resolvePath(this._langAllTarget)) ||
            cache.needRebuildFile('lang-file', this.node.resolvePath(this._langTarget)) ||
            cache.needRebuildFile('html-file', this.node.resolvePath(target));
    })
    .saveCache(function (target) {
        var cache = this.node.getNodeCache(target);
        cache.cacheFileInfo('bemhtml-file', this.node.resolvePath(this._bemhtmlTarget));
        cache.cacheFileInfo('bemjson-file', this.node.resolvePath(this._bemjsonTarget));
        cache.cacheFileInfo('allLang-file', this.node.resolvePath(this._langAllTarget));
        cache.cacheFileInfo('lang-file', this.node.resolvePath(this._langTarget));
        cache.cacheFileInfo('html-file', this.node.resolvePath(target));
    })
    .builder(function (bemhtmlFilename, bemjsonFilename, allLangFilename, langFilename) {
        dropRequireCache(require, bemhtmlFilename);
        dropRequireCache(require, allLangFilename);
        dropRequireCache(require, allLangFilename);
        dropRequireCache(require, langFilename);
        return vow.all([
            asyncRequire(bemhtmlFilename),
            requireOrEval(bemjsonFilename),
            asyncRequire(allLangFilename),
            asyncRequire(langFilename)
        ]).spread(function (bemhtml, bemjson) {
            return bemhtml.BEMHTML.apply(bemjson);
        });
    })
    .createTech();
