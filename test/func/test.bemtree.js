var TestTargets = require('../lib/test-targets').TestTargets;
var targets = new TestTargets('bemtree', [
    'page/page.dev.bemtree.xjst',
    'page/page.prod.bemtree.xjst'
]);
var data = require('../../examples/bemtree/data/data.json');
var view = JSON.stringify(require('../../examples/bemtree/result/view.json'));

describe('bemtree', function () {
    beforeEach(function (done) {
        return targets.build()
            .then(function () {
                done();
            });
    });

    it('should builds simple view of page in dev mode', function () {
        var BEMTREE = require('../../examples/bemtree/page/page.dev.bemtree.xjst').BEMTREE;

        BEMTREE.apply(data).then(function (res) {
            JSON.stringify(res).must.equal(view);
        }).done();
    });

    it('should builds simple view of page in production mode', function () {
        var BEMTREE = require('../../examples/bemtree/page/page.prod.bemtree.xjst').BEMTREE;

        BEMTREE.apply(data).then(function (res) {
            JSON.stringify(res).must.equal(view);
        }).done();
    });
});
