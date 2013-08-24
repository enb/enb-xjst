module.exports = require('./bemhtml').buildFlow()
    .name('bemtree')
    .target('target', '?.bemtree.xjst.js')
    .defineOption('exportName', 'BEMTREE')
    .defineOption('devMode', true)
    .useFileList('bemtree.xjst')
    .methods({
        _getOptions: function() {
            return {
                devMode: this._devMode,
                exportName: this._exportName,
                async: true
            };
        }
    })
    .createTech();