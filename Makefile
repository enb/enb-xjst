BIN = ./node_modules/.bin
JSHINT = $(BIN)/jshint
JSCS = $(BIN)/jscs
NPM = npm

.PHONY: validate
validate: lint test

.PHONY: lint
lint: node_modules
	$(JSHINT) .
	$(JSCS) .

.PHONY: test
test: node_modules clean build
	npm run-script func-test

.PHONY: build
build: node_modules
	cd test/fixtures/bemhtml && ../../../node_modules/.bin/enb make --no-cache
	cd test/fixtures/bemtree && ../../../node_modules/.bin/enb make --no-cache

.PHONY: clean
clean: node_modules
	cd test/fixtures/bemhtml && ../../../node_modules/.bin/enb make clean
	cd test/fixtures/bemtree && ../../../node_modules/.bin/enb make clean

.PHONY: node_modules
node_modules:
	@$(NPM) install
