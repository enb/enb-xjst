var fs = require('fs'),
    path = require('path'),
    assert = require('assert'),
    vm = require('vm'),
    vow = require('vow'),
    mock = require('mock-fs'),
    MockNode = require('mock-enb/lib/mock-node'),
    Tech = require('../../techs/bemtree'),
    FileList = require('enb/lib/file-list'),
    loadDirSync = require('mock-enb/utils/dir-utils').loadDirSync,
    fixturesDirname = path.join(__dirname, '..', 'fixtures', 'bemtree'),
    files = {
        'i-bem.bemtree.xjst': {
            path: path.join(fixturesDirname, 'i-bem.bemtree.xjst')
        },
        'i-start.bemtree.xjst': {
            path: path.join(fixturesDirname, 'i-start.bemtree.xjst')
        },
        'data.bemtree.xjst': {
            path: path.join(fixturesDirname, 'b-data.bemtree.xjst')
        }
    };

Object.keys(files).forEach(function (name) {
    var file = files[name];

    file.contents = fs.readFileSync(file.path, 'utf-8');
});

describe('bemtree', function () {
    var templates = [
            files['i-start.bemtree.xjst'].contents,
            files['data.bemtree.xjst'].contents
        ],
        data = {
            bundleName: 'page',
            title: 'Some text'
        },
        expected = {
            block: 'b-page',
            content: [
                {
                    block: 'b-data',
                    content: 'some async result'
                }
            ]
        };

    afterEach(function () {
        mock.restore();
    });

    it('must compile BEMTREE file', function () {
        return build(templates)
            .spread(function (res) {
                return res.BEMTREE.apply(data)
                    .then(function (res) {
                        res.must.eql(expected);
                    });
            });
    });

    it('must compile BEMTREE file without `vow` if includeVow:false', function () {
        return build(templates, { includeVow: false })
            .spread(function (res, src) {
                var sandbox = {
                    Vow: vow
                };

                vm.runInNewContext(src, sandbox);

                return sandbox.BEMTREE.apply(data)
                    .then(function (res) {
                        assert.deepEqual(res, expected);
                    });
            });
    });

    it('must build block with custom exportName', function () {
        return build(templates, { exportName: 'BEMBUSH' })
            .spread(function (res) {
                return res.BEMBUSH.apply(data)
                    .then(function (res) {
                        res.must.eql(expected);
                    });
            });
    });

    it('must generate mock if there is no templates', function () {
        return build({})
            .spread(function (res) {
                return res.BEMTREE.apply(data)
                    .then(function (res) {
                        res.must.eql({});
                    });
            });
     });

    describe('no base templates', function () {
        it('should throw valid error if base template is missing (for development mode)', function () {
             var blocks = {
                 'i-start.bemtree.xjst': files['i-start.bemtree.xjst'].contents,
                 'data.bemtree.xjst': files['data.bemtree.xjst'].contents
             };

             return build(blocks, { devMode: true })
                 .spread(function (res) {
                     return res.BEMTREE.apply(data);
                 })
                 .fail(function (error) {
                     error.message.must.be.equal('Seems like you have no base templates from i-bem.bemtree.xjst');
                 });
         });

         it('should throw valid error if base template is missing (for production mode)', function () {
             var blocks = {
                 'i-start.bemtree.xjst': files['i-start.bemtree.xjst'].contents,
                 'data.bemtree.xjst': files['data.bemtree.xjst'].contents
             };

             return build(blocks, { devMode: false })
                 .spread(function (res) {
                     return res.BEMTREE.apply(data);
                 })
                 .fail(function (error) {
                     error.message.must.be.equal('Seems like you have no base templates from i-bem.bemtree.xjst');
                 });
         });
    });

    describe('mode', function () {
        it('must build block in development mode', function () {
            return build(templates, { devMode: true })
                .spread(function (res) {
                    return res.BEMTREE.apply(data)
                        .then(function (res) {
                            res.must.eql(expected);
                        });
                });
        });

        it('must build block in production mode', function () {
            return build(templates, { devMode: false })
                .spread(function (res) {
                    return res.BEMTREE.apply(data)
                        .then(function (res) {
                            res.must.eql(expected);
                        });
                });
        });

        it('must build different code by mode', function () {
            return vow.all([
                build(templates, { target: 'dev.bemhtml.js', devMode: true }),
                build(templates, { target: 'prod.bemhtml.js', devMode: false })
            ]).spread(function (dev, prod) {
                var devSource = dev[1].toString(),
                    prodSource = prod[1].toString();

                devSource.must.not.be.equal(prodSource);
            });
        });
    });
});

function build(templates, options) {
    templates || (templates = []);
    options || (options = {});

    var scheme = {
            blocks: {},
            bundle: {},
            // jscs:disable
            node_modules: {
                browserify: {
                    'index.js': ''
                }
            }
            // jscs:enable
        },
        bundle, fileList;

    if (Array.isArray(templates)) {
        if (templates.length) {
            scheme.blocks['base.bemtree.xjst'] = files['i-bem.bemtree.xjst'].contents;

            templates.forEach(function (item, i) {
                scheme.blocks['block-' + i + '.bemtree.xjst'] = item;
            });
        }
    } else {
        scheme.blocks = templates;
    }

    mock(scheme);

    bundle = new MockNode('bundle');
    fileList = new FileList();
    fileList.addFiles(loadDirSync('blocks'));
    bundle.provideTechData('?.files', fileList);

    return bundle.runTechAndRequire(Tech, options)
        .spread(function (res) {
            var filename = bundle.resolvePath(bundle.unmaskTargetName(options.target || '?.bemtree.xjst.js')),
                str = fs.readFileSync(filename, 'utf-8');

            return [res, str];
        });
}
