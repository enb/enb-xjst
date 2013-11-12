var fs = require('fs');

require('chai').should();

describe('functional', function() {
    describe('bemhtml', function() {
        describe('page', function() {
            it('build simple page in dev mode', function() {
                var BEMHTML = require('../fixtures/bemhtml/page/page.dev.bemhtml').BEMHTML,
                    bemjson = require('../fixtures/bemhtml/data/page.json'),
                    html = fs.readFileSync('./test/fixtures/bemhtml/result/page.html', 'utf8');

                BEMHTML.apply(bemjson).should.equal(html);
            });

            it('build simple page in production mode', function() {
                var BEMHTML = require('../fixtures/bemhtml/page/page.prod.bemhtml').BEMHTML,
                    bemjson = require('../fixtures/bemhtml/data/page.json'),
                    html = fs.readFileSync('./test/fixtures/bemhtml/result/page.html', 'utf8');

                BEMHTML.apply(bemjson).should.equal(html);
            });
        });
    });
});
