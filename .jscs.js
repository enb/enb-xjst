var config = require('enb-validate-code/jscs');

config.excludeFiles = [
    'node_modules',
    'test/fixtures/*/.bem/tmp',
    'test/fixtures/*/page',
    'test/fixtures/*/blocks/*/*.deps.js',
    'test/fixtures/*/blocks/*/*/*.deps.js',
    'test/fixtures/*/blocks/*/*/*/*.deps.js'
]

module.exports = config;
