require('chai').should();

describe('functional', function () {
    describe('bemtree', function () {
        it('should builds simple view of page in dev mode', function () {
            var BEMTREE = require('../../examples/bemtree/page/page.dev.bemtree.xjst').BEMTREE;
            var data = require('../../examples/bemtree/data/data.json');
            var view = JSON.stringify(require('../../examples/bemtree/result/view.json'));

            BEMTREE.apply(data).then(function (res) {
                JSON.stringify(res).should.equal(view);
            }).done();
        });

        it('should builds simple view of page in production mode', function () {
            var BEMTREE = require('../../examples/bemtree/page/page.prod.bemtree.xjst').BEMTREE;
            var data = require('../../examples/bemtree/data/data.json');
            var view = JSON.stringify(require('../../examples/bemtree/result/view.json'));

            BEMTREE.apply(data).then(function (res) {
                JSON.stringify(res).should.equal(view);
            }).done();
        });
    });
});
