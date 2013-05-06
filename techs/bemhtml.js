var inherit = require('inherit'),
    Vow = require('vow'),
    vowFs = require('vow-fs'),
    bemc = require('bemc');

module.exports = require('enb/lib/build-flow').create()
    .name('bemhtml')
    .target('target', '?.bemhtml.js')
    .defineOption('exportName', 'BEMHTML')
    .defineOption('devMode', true)
    .useFileList('bemhtml')
    .builder(function(sourceFiles) {
        var _this = this;
        return Vow.all(sourceFiles.map(function(file) {
                return vowFs.read(file.fullname, 'utf8');
            }))
            .then(function(sources) {
                _this.node.getLogger().log('Calm down, OmetaJS is running...');
                var bemhtmlProcessor = BemhtmlProcessor.fork();
                return bemhtmlProcessor.process(sources.join('\n'), _this._exportName, _this._devMode).then(function(res) {
                    bemhtmlProcessor.dispose();
                    return res;
                });
            });
    })
    .createTech();

var BemhtmlProcessor = require('sibling').declare({
    process: function(source, exportName, devMode) {
        return bemc.translate(source, {
            exportName: exportName,
            devMode: devMode
        });
    }
});
