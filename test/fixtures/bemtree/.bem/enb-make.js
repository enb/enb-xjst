var ENB_BEMHTML = '../../../../';

module.exports = function(config) {
    config.node('page', function(nodeConfig) {
        nodeConfig.addTechs([
            new (require('enb/techs/levels'))({ levels: getLevels(config) }),
            new (require('enb/techs/files'))(),
            new (require('enb/techs/file-provider'))({ target: '?.bemdecl.js' }),
            new (require('enb/techs/deps-old'))(),
            new (require(ENB_BEMHTML + 'techs/bemhtml'))({
                exportName: 'BEMTREE',
                sourceSuffixes: 'bemtree.xjst',
                target: '?.bemtree.xjst.js',
                devMode: true
            })
        ]);
        nodeConfig.addTargets([
            '?.bemtree.xjst.js'
        ]);
    });

};

function getLevels(config) {
    return [
        'blocks'
    ].map(function(level) {
            return config.resolvePath(level);
        });
}