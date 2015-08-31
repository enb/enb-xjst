var mock = require('mock-require'),
    browserifyPath = require.resolve('browserify');

mock(browserifyPath, require(browserifyPath));

require('./job-queue-stub');
