var fs = require('fs');

require('chai').should();

describe('functional', function() {
    describe('bemhtml', function() {
        describe('page', function() {
            it('build simple page', function() {
                var BEMHTML = {
                        dev: require('../fixtures/bemhtml/page/page.dev.bemhtml').BEMHTML,
                        prod: require('../fixtures/bemhtml/page/page.prod.bemhtml').BEMHTML
                    },
                    bemjson = require('../fixtures/bemhtml/data/page.json'),
                    html = fs.readFileSync('./test/fixtures/bemhtml/result/page.html', 'utf8');

                BEMHTML.dev.apply(bemjson).should.equal(html);
                BEMHTML.prod.apply(bemjson).should.equal(html);
            });

        });
    });
});
