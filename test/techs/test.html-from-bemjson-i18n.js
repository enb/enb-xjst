var fs = require('fs');
var path = require('path');
var FileSystem = require('enb/lib/test/mocks/test-file-system');
var TestNode = require('enb/lib/test/mocks/test-node');
var HtmlFromBemjsonI18NTech = require('../../techs/html-from-bemjson-i18n');
var fixturesDirname = path.join(__dirname, '..', 'fixtures', 'html-from-bemjson-i18n');
var referenceHtml = '<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Page title</title></head><body class="b-page b-page__body">Page content</body></html>';

describe('html-from-bemjson-i18n', function () {
    var fileSystem;
    var node;

    beforeEach(function () {
        fileSystem = new FileSystem([{
            directory: 'build',
            items: ['bemjson.js', 'bemhtml.js', 'lang.all.js', 'lang.en.js'].map(function (tech) {
                var filename = 'build.' + tech;

                return {
                    file: filename,
                    content: fs.readFileSync(path.join(fixturesDirname, filename), { encoding: 'utf-8' })
                };
            })
        }]);
        fileSystem.setup();
        node = new TestNode('build');
    });

    afterEach(function () {
        fileSystem.teardown();
    });

    it('must build lang html', function (done) {
        node.runTechAndGetContent(
            HtmlFromBemjsonI18NTech, { langFile: '?.lang.en.js' }
        ).spread(function (html) {
            html.must.equal(referenceHtml);
        }).then(done, done);
    });
});
