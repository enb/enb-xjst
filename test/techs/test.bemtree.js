var assert = require('assert');
var vm = require('vm');
var fs = require('fs');
var vow = require('vow');
var path = require('path');
var FileSystem = require('enb/lib/test/mocks/test-file-system');
var TestNode = require('enb/lib/test/mocks/test-node');
var FileList = require('enb/lib/file-list');
var BEMTREETech = require('../../techs/bemtree');
var fixturesDirname = path.join(__dirname, '..', 'fixtures', 'bemtree');
var files = ['i-bem.bemtree.xjst', 'i-start.bemtree.xjst', 'b-data.bemtree.xjst'].map(function (filename) {
    return {
        file: filename,
        content: fs.readFileSync(path.join(fixturesDirname, filename), { encoding: 'utf-8' })
    };
});
var data = {
    bundleName: 'page',
    title: 'Page Title',
    text: 'Page content'
};
var referenceBemjson = {
    block: 'b-page',
    content: [
        {
            block: 'b-data',
            content: 'some async result'
        }
    ]
};

describe('bemtree', function () {
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
            BEMTREETech, { devMode: true }
        ).spread(function (bemtreeSource) {
            var sandbox = {
                Vow: vow
            };

            vm.runInNewContext(bemtreeSource, sandbox);

            return sandbox.BEMTREE.apply(data)
                .then(function (bemjson) {
                    assert.deepEqual(bemjson, referenceBemjson);
                });
        }).then(done, done);
    });

    it('must build simple page in production mode', function (done) {
        node.runTechAndGetContent(
            BEMTREETech, { devMode: false }
        ).spread(function (bemtreeSource) {
                var sandbox = {
                    Vow: vow
                };

                vm.runInNewContext(bemtreeSource, sandbox);

                return sandbox.BEMTREE.apply(data)
                    .then(function (bemjson) {
                        assert.deepEqual(bemjson, referenceBemjson);
                    });
            }).then(done, done);
    });

    it('must build different code by mode', function (done) {
        vow.all([
            node.runTechAndGetContent(
                BEMTREETech, { devMode: true }
            ),
            node.runTechAndGetContent(
                BEMTREETech, { devMode: false }
            )
        ]).spread(function (dev, prod) {
            var devSource = dev[0];
            var prodSource = prod[0];

            devSource.must.not.be.equal(prodSource);
        }).then(done, done);
    });
});
