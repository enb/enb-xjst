/**
 * bemhtml
 * =======
 *
 * Склеивает *bemhtml*-файлы по deps'ам, обрабатывает BEMHTML-транслятором,
 * сохраняет (по умолчанию) в виде `?.bemhtml.js`.
 *
 * **Опции**
 *
 * * *String* **target** — Результирующий таргет. По умолчанию — `?.bemhtml.js`.
 * * *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов
 *   (его предоставляет технология `files`). По умолчанию — `?.files`.
 * * *String* **sourceSuffixes** — суффиксы файлов, по которым строится `files`-таргет. По умолчанию — `bemtree.xjst`.
 * * *String* **exportName** — Имя переменной-обработчика BEMHTML. По умолчанию — `'BEMHTML'`.
 * * *String* **applyFuncName** — Имя apply-функции базового шаблона BEMHTML. По умолчанию — `'apply'`.
 * * *Boolean* **devMode** — Development-режим. По умолчанию `true`.
 * * *Boolean* **cache** — Кеширование. По умолчанию — `false`.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech(require('enb-xjst/techs/bemhtml'));
 * ```
 */
var vow = require('vow');
var vfs = require('enb/lib/fs/async-fs');
var BEMHTML = require('bem-bl/blocks-common/i-bem/__html/lib/bemhtml');

module.exports = require('enb/lib/build-flow').create()
    .name('bemhtml')
    .target('target', '?.bemhtml.js')
    .defineOption('exportName', 'BEMHTML')
    .defineOption('applyFuncName', 'apply')
    .defineOption('devMode', true)
    .defineOption('cache', false)
    .useFileList('bemhtml')
    .builder(function (sourceFiles) {
        var _this = this;
        return vow.all(sourceFiles.map(function (file) {
                return vfs.read(file.fullname, 'utf8');
            }))
            .then(function (sources) {
                var bemhtmlProcessor = BemhtmlProcessor.fork();

                _this.node.getLogger().log('Calm down, OmetaJS is running...');

                return bemhtmlProcessor.process(sources.join('\n'), _this._getOptions())
                    .then(function (res) {
                        bemhtmlProcessor.dispose();
                        return res;
                    });
            });
    })
    .methods({
        _getOptions: function () {
            return {
                devMode: this._devMode,
                cache: this._cache,
                exportName: this._exportName,
                applyFuncName: this._applyFuncName
            };
        }
    })
    .createTech();

var BemhtmlProcessor = require('sibling').declare({
    process: function (source, options) {
        return BEMHTML.translate(source, options);
    }
});
