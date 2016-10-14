npm-deps: ## Install NodeJS dependencies.
	npm install

.DEFAULT_GOAL := all

bower:
	./node_modules/bower/bin/bower install
all: help

help:
	@echo "There are no default actions for this Makefile, you must choose an option from the following:\n"
	@egrep '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: npm-deps bower ## Builds into /build, suitable for copying to webserver.
	./node_modules/coffee-script/bin/coffee build.coffee

serve: npm-deps bower ## Serve locally for viewing
	./node_modules/coffee-script/bin/coffee build.coffee --serve

watch: npm-deps bower ## will serve and attempt to reload files
	./node_modules/coffee-script/bin/coffee build.coffee --watch

check: npm-deps bower ## checks for broken links
	./node_modules/coffee-script/bin/coffee build.coffee --check
