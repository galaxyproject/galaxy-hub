COFFEE=DEBUG=metalsmith-timer ./node_modules/coffee-script/bin/coffee
DOCKER=docker run -u `id -u`:`id -g` -v `pwd`:/tmp/hub -w /tmp/hub

node_modules: package.json
	npm install

npm-deps: node_modules

.DEFAULT_GOAL := all

bower:
	./node_modules/bower/bin/bower install
all: help

help:
	@echo "There are no default actions for this Makefile, you must choose an option from the following:"
	@egrep '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: npm-deps bower ## Builds into /build, suitable for copying to webserver.
	$(COFFEE) build.coffee

serve: npm-deps bower ## Serve locally for viewing
	$(COFFEE) build.coffee --serve

watch: npm-deps bower ## Serve and attempt to reload changed files
	$(COFFEE) build.coffee --watch

check: npm-deps bower ## Check for broken links
	$(COFFEE) build.coffee --check

docker-npm-deps:  ## [Docker] Install NodeJS dependencies.
	docker run -v `pwd`:/tmp/hub -w /tmp/hub node /bin/bash -c "npm install && chown -R `id -u`:`id -g` /tmp/hub/node_modules"

docker-bower: ## [Docker] Install Bower
	docker run -v `pwd`:/tmp/hub -w /tmp/hub node /bin/bash -c "node node_modules/bower/bin/bower --allow-root install && chown -R `id -u`:`id -g` /tmp/hub/bower_components"

docker-build: docker-npm-deps docker-bower  ## [Docker] Single endpoint for docker install
	$(DOCKER) node node node_modules/coffee-script/bin/coffee build.coffee

gitlfs-pull:  ## We use this during the Jenkins build process to fetch LFS contents -- probably not useful locally.
	$(DOCKER) dannon/gitlfs git lfs pull

.PHONY: gitlfs-pull docker-build docker-bower docker-npm-deps check watch serve build
