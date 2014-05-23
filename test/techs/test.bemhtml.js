var vm = require('vm');
var fs = require('fs');
var path = require('path');
var vow = require('vow');
var FileSystem = require('enb/lib/test/mocks/test-file-system');
var TestNode = require('enb/lib/test/mocks/test-node');
var FileList = require('enb/lib/file-list');
var BEMHTMLTech = require('../../techs/bemhtml');
var fixturesDirname = path.join(__dirname, '..', 'fixtures', 'bemhtml');
var files = ['i-bem__html.bemhtml', 'b-page.bemhtml'].map(function (filename) {
    return {
        file: filename,
        content: fs.readFileSync(path.join(fixturesDirname, filename), { encoding: 'utf-8' })
    };
});
var data = {
    block: 'b-page',
    title: 'Page title',
    content: 'Page content'
};
var referenceHtml = '<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Page title</title></head><body class="b-page b-page__body">Page content</body></html>';

describe('bemhtml', function () {
    var fileSystem;
    var node;
    var fileList;

    beforeEach(function () {
        fileSystem = new FileSystem([{
            directory: 'blocks',
            items: files
        }, {
            directory: 'build',
            items: []
        }]);
        fileSystem.setup();
        node = new TestNode('build');
        fileList = new FileList();
        fileList.loadFromDirSync('blocks');
        node.provideTechData('?.files', fileList);
    });

    afterEach(function () {
        fileSystem.teardown();
    });

    it('must build simple page in development mode', function (done) {
        node.runTechAndGetContent(
            BEMHTMLTech, {devMode: true}
        ).spread(function (bemhtmlSource) {
            var sandbox = {}; vm.runInNewContext(bemhtmlSource, sandbox);
            var bemhtml = sandbox.BEMHTML;
            var html = bemhtml.apply(data);

            html.must.equal(referenceHtml);
        }).then(done, done);
    });

    it('must build simple page in production mode', function (done) {
        node.runTechAndGetContent(
            BEMHTMLTech, {devMode: false}
        ).spread(function (bemhtmlSource) {
            var sandbox = {}; vm.runInNewContext(bemhtmlSource, sandbox);
            var bemhtml = sandbox.BEMHTML;
            var html = bemhtml.apply(data);

            html.must.equal(referenceHtml);
        }).then(done, done);
    });

    it('must build different code by mode', function (done) {
        vow.all([
            node.runTechAndGetContent(
                BEMHTMLTech, { devMode: true }
            ),
            node.runTechAndGetContent(
                BEMHTMLTech, { devMode: false }
            )
        ]).spread(function (dev, prod) {
            var devSource = dev[0];
            var prodSource = prod[0];

            devSource.must.not.be.equal(prodSource);
        }).then(done, done);
    });
});
