require('chai').should();

describe('functional', function() {
    describe('bemtree', function() {
        it('should builds simple view of page in dev mode', function() {
            var BEMTREE = require('../fixtures/bemtree/page/page.dev.bemtree.xjst').BEMTREE,
                data = require('../fixtures/bemtree/data/data.json'),
                view = JSON.stringify(require('../fixtures/bemtree/result/view.json'));

            BEMTREE.apply(data).then(function(res) {
                JSON.stringify(res).should.equal(view);
            }).done();
        });

        it('should builds simple view of page in production mode', function() {
            var BEMTREE = require('../fixtures/bemtree/page/page.prod.bemtree.xjst').BEMTREE,
                data = require('../fixtures/bemtree/data/data.json'),
                view = JSON.stringify(require('../fixtures/bemtree/result/view.json'));

            BEMTREE.apply(data).then(function(res) {
                JSON.stringify(res).should.equal(view);
            }).done();
        });
    });
});
