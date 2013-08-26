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
 * * *String* **exportName** — Имя переменной-обработчика BEMHTML. По умолчанию — `'BEMHTML'`.
 * * *Boolean* **devMode** — Development-режим. По умолчанию — `true`.
 * * *Boolean* **cache** — Кеширование. По умолчанию — `true`.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech(require('enb-bemhtml/techs/bemhtml'));
 * ```
 */
var Vow = require('vow'),
    vowFs = require('enb/lib/fs/async-fs'),
    BEMHTML = require('../lib/bemhtml');

module.exports = require('enb/lib/build-flow').create()
    .name('bemhtml')
    .target('target', '?.bemhtml.js')
    .defineOption('exportName', 'BEMHTML')
    .defineOption('devMode', true)
    .defineOption('cache', true)
    .useFileList('bemhtml')
    .builder(function(sourceFiles) {
        var _this = this;
        return Vow.all(sourceFiles.map(function(file) {
                return vowFs.read(file.fullname, 'utf8');
            }))
            .then(function(sources) {
                _this.node.getLogger().log('Calm down, OmetaJS is running...');
                var bemhtmlProcessor = BemhtmlProcessor.fork();
                return bemhtmlProcessor.process(sources.join('\n'), _this._getOptions()).then(function(res) {
                    bemhtmlProcessor.dispose();
                    return res;
                });
            });
    })
    .methods({
        _getOptions: function() {
            return {
                devMode: this._devMode,
                cache: this._cache,
                exportName: this._exportName,
                async: false
            };
        }
    })
    .createTech();

var BemhtmlProcessor = require('sibling').declare({
    process: function(source, options) {
        return BEMHTML.translate(source, options);
    }
});
