var path = require('path');
var root = path.resolve('./examples/bemtree');
var devTarget = path.join('page', 'page.dev.bemtree.xjst.js');
var prodTarget = path.join('page', 'page.prod.bemtree.xjst.js');
var pathToDev = path.join(root, devTarget);
var pathToProd = path.join(root, prodTarget);
var data = require(path.join(root, 'data', 'data.json'));
var view = require(path.join(root, 'result', 'view.json'));
var TestTargets = require('../lib/test-targets').TestTargets;
var targets = new TestTargets('bemtree', [
    devTarget,
    prodTarget
]);

describe('bemtree', function () {
    beforeEach(function (done) {
        return targets.build()
            .then(function () {
                done();
            });
    });

    it('must build simple view of page in dev mode', function (done) {
        var BEMTREE = require(pathToDev).BEMTREE;

        BEMTREE.apply(data)
            .then(function (res) {
                res.must.eql(view);
                done();
            })
            .fail(function (err) {
                done(err);
            });
    });

    it('must build simple view of page in production mode', function (done) {
        var BEMTREE = require(pathToProd).BEMTREE;

        BEMTREE.apply(data)
            .then(function (res) {
                res.must.eql(view);
                done();
            })
            .fail(function (err) {
                done(err);
            });
    });
});
