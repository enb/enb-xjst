BIN = ./node_modules/.bin
JSHINT = $(BIN)/jshint
JSCS = $(BIN)/jscs
MOCHA = $(BIN)/mocha
BOWER = $(BIN)/bower

.PHONY: validate
validate: lint test

.PHONY: lint
lint: npm_deps
	$(JSHINT) .
	$(JSCS) -c .jscs.js .

.PHONY: test
test: npm_deps clean examples
	$(MOCHA) test/func

.PHONY: examples
examples: npm_deps bower_deps
	cd examples/bemhtml && ../../node_modules/.bin/enb make --no-cache
	cd examples/bemtree && ../../node_modules/.bin/enb make --no-cache

.PHONY: clean
clean: npm_deps
	cd examples/bemhtml && ../../node_modules/.bin/enb make clean
	cd examples/bemtree && ../../node_modules/.bin/enb make clean

.PHONY: bower_deps
bower_deps: npm_deps
	cd examples && ../$(BOWER) install

.PHONY: npm_deps
npm_deps:
	npm install
