/**
 * bemtree
 * =======
 *
 * Склеивает *bemtree.xjst*-файлы по deps'ам, обрабатывает BEMHTML-транслятором,
 * сохраняет (по умолчанию) в виде `?.bemtree.xjst.js`.
 *
 * **Опции**
 *
 * * *String* **target** — Результирующий таргет. По умолчанию — `?.bemtree.xjst.js`.
 * * *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов
 *   (его предоставляет технология `files`). По умолчанию — `?.files`.
 * * *String* **exportName** — Имя переменной-обработчика BEMTREE. По умолчанию — `'BEMTREE'`.
 * * *Boolean* **devMode** — Development-режим. По умолчанию — `true`.
 * * *Boolean* **async** — Асинхронность. По умолчанию — `true`.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech(require('enb-bemhtml/techs/bemtree'));
 * ```
 */
module.exports = require('./bemhtml').buildFlow()
    .name('bemtree')
    .target('target', '?.bemtree.xjst.js')
    .defineOption('exportName', 'BEMTREE')
    .defineOption('applyFuncName', 'apply')
    .defineOption('devMode', true)
    .useFileList('bemtree.xjst')
    .methods({
        _getOptions: function () {
            return {
                devMode: this._devMode,
                exportName: this._exportName,
                applyFuncName: this._applyFuncName
            };
        }
    })
    .createTech();
