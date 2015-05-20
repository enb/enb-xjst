var fs = require('fs'),
    path = require('path'),
    vow = require('vow'),
    vm = require('vm'),
    assert = require('assert'),
    mock = require('mock-fs'),
    TestNode = require('enb/lib/test/mocks/test-node'),
    Tech = require('../../techs/bemtree'),
    FileList = require('enb/lib/file-list'),
    fixturesPath = path.join(__dirname, '..', 'fixtures', 'bemtree'),
    bemtreeCoreFilename = path.join(fixturesPath, 'i-bem.bemtree.xjst'),
    iStartFilename = path.join(fixturesPath, 'i-start.bemtree.xjst'),
    bDataFilename = path.join(fixturesPath, 'b-data.bemtree.xjst');

describe('bemtree', function () {
    afterEach(function () {
        mock.restore();
    });

    describe('exportName', function () {
        it('must build block with default exportName', function () {
            return runTest();
        });

        it('must build block with custom exportName', function () {
            return runTest({ exportName: 'BEMBUSH' });
        });
    });
});

function runTest(options) {
    var scheme = {
            // Файлы должны собираться в нужной последовательности
            blocks: {
                'base.bemtree.xjst': fs.readFileSync(bemtreeCoreFilename, 'utf-8'),
                'bb-start.bemtree.xjst': fs.readFileSync(iStartFilename, 'utf-8'),
                'bc-data.bemtree.xjst': fs.readFileSync(bDataFilename, 'utf-8')
            },
            bundle: {}
        },
        data = { bundleName: 'page' },
        expect = {
            block: 'b-page',
            content: [
                {
                    block: 'b-data',
                    content: 'some async result'
                }
            ]
        },
        exportName = (options && options.exportName) || 'BEMTREE',
        bundle, fileList;

    mock(scheme);

    bundle = new TestNode('bundle');
    fileList = new FileList();
    fileList.loadFromDirSync('blocks');
    bundle.provideTechData('?.files', fileList);

    return bundle.runTechAndGetContent(Tech, options)
        .spread(function (bemtreeSource) {
            var sandbox = {
                Vow: vow
            };

            vm.runInNewContext(bemtreeSource, sandbox);

            return sandbox[exportName].apply(data)
                .then(function (bemjson) {
                    assert.deepEqual(bemjson, expect);
                });
        });
}
