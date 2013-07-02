var bemcompat = require('bemhtml-compat');

module.exports = require('./bemhtml').buildFlow()
    .name('bemhtml-old')
    .methods({
        _sourcePreprocess: function(sources) {
            return bemcompat.transpile(sources);
        }
    })
    .createTech();