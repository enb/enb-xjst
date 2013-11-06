require('chai').should();

describe('functional', function() {
    describe('bemtree', function() {
        it('should builds simple view of page', function() {
            var BEMTREE = {
                    dev: require('../fixtures/bemtree/page/page.dev.bemtree.xjst').BEMTREE,
                    prod: require('../fixtures/bemtree/page/page.prod.bemtree.xjst').BEMTREE
                },
                data = require('../fixtures/bemtree/data/data.json'),
                view = JSON.stringify(require('../fixtures/bemtree/result/view.json'));

            BEMTREE.dev.apply(data).then(function(res) {
                JSON.stringify(res).should.equal(view);
            }).done();

            BEMTREE.prod.apply(data).then(function(res) {
                JSON.stringify(res).should.equal(view);
            }).done();
        });
    });
});
