BIN = ./node_modules/.bin
NPM = npm

.PHONY: test
test: clean node_modules
	npm run-script func-test

.PHONY: clean
clean:
	npm run-script clean-build

.PHONY: node_modules
node_modules:
	@$(NPM) install