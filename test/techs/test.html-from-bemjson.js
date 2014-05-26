var fs = require('fs');
var path = require('path');
var FileSystem = require('enb/lib/test/mocks/test-file-system');
var TestNode = require('enb/lib/test/mocks/test-node');
var HtmlFromBemjsonTech = require('../../techs/html-from-bemjson');
var fixturesDirname = path.join(__dirname, '..', 'fixtures', 'html-from-bemjson');
var referenceHtml = '<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Page title</title></head><body class="b-page b-page__body">Page content</body></html>';

describe('html-from-bemjson', function () {
    var fileSystem;
    var node;

    beforeEach(function () {
        fileSystem = new FileSystem([{
            directory: 'build',
            items: [
                {
                    file: 'build.bemjson.js',
                    content: fs.readFileSync(path.join(fixturesDirname, 'page.bemjson.js'), { encoding: 'utf-8' })
                },
                {
                    file: 'build.bemhtml.js',
                    content: fs.readFileSync(path.join(fixturesDirname, 'page.bemhtml.js'), { encoding: 'utf-8' })
                }
            ]
        }]);
        fileSystem.setup();
        node = new TestNode('build');
    });

    afterEach(function () {
        fileSystem.teardown();
    });

    it('must build html', function (done) {
        node.runTechAndGetContent(
            HtmlFromBemjsonTech
        ).spread(function (html) {
            html.must.equal(referenceHtml);
        }).then(done, done);
    });
});
