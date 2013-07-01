var inherit = require('inherit'),
    Vow = require('vow'),
    vowFs = require('vow-fs'),
    BEMHTML = require('bem-core/.bem/lib/bemhtml');

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
                return bemhtmlProcessor.process(sources.join('\n'), _this._devMode, _this._cache, _this._exportName).then(function(res) {
                    bemhtmlProcessor.dispose();
                    return res;
                });
            });
    })
    .createTech();

var BemhtmlProcessor = require('sibling').declare({
    process: function(source, devMode, cache, exportName) {
        return BEMHTML.translate(source, {
            devMode: devMode,
            cache: cache,
            exportName: exportName
        });
    }
});
