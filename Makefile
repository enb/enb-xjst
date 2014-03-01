BIN = ./node_modules/.bin
JSHINT = $(BIN)/jshint
JSCS = $(BIN)/jscs
NPM = npm

.PHONY: validate
validate: lint test

.PHONY: lint
lint: node_modules
	$(JSHINT) .
	$(JSCS) -c .jscs.js .

.PHONY: test
test: node_modules clean build
	./node_modules/.bin/mocha -u bdd -R spec --recursive test/func

.PHONY: build
build: node_modules
	cd examples/bemhtml && ../../node_modules/.bin/enb make --no-cache
	cd examples/bemtree && ../../node_modules/.bin/enb make --no-cache

.PHONY: clean
clean: node_modules
	cd examples/bemhtml && ../../node_modules/.bin/enb make clean
	cd examples/bemtree && ../../node_modules/.bin/enb make clean

.PHONY: node_modules
node_modules:
	@$(NPM) install
