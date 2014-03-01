var fs = require('fs');

require('chai').should();

describe('functional', function () {
    describe('bemhtml', function () {
        describe('page', function () {
            it('build simple page in dev mode', function () {
                var BEMHTML = require('../../examples/bemhtml/page/page.dev.bemhtml').BEMHTML;
                var bemjson = require('../../examples/bemhtml/data/page.json');
                var html = fs.readFileSync('./examples/bemhtml/result/page.html', 'utf8');

                BEMHTML.apply(bemjson).should.equal(html);
            });

            it('build simple page in production mode', function () {
                var BEMHTML = require('../../examples/bemhtml/page/page.prod.bemhtml').BEMHTML;
                var bemjson = require('../../examples/bemhtml/data/page.json');
                var html = fs.readFileSync('./examples/bemhtml/result/page.html', 'utf8');

                BEMHTML.apply(bemjson).should.equal(html);
            });
        });
    });
});
