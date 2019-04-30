DOCKER=docker run -u `id -u`:`id -g` -v `pwd`:/tmp/hub -w /tmp/hub
DOCKER_NOUSER=docker run -v `pwd`:/tmp/hub -w /tmp/hub
BUILD_IMAGE=node:lts-jessie

node_modules: package.json
	npm install

npm-deps: node_modules

.DEFAULT_GOAL := all

all: help

help:
	@echo "There are no default actions for this Makefile, you must choose an option from the following:"
	@egrep '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: npm-deps ## Builds into /build, suitable for copying to webserver.
	npm run build

serve: npm-deps ## Serve locally for viewing
	npm run serve

watch: npm-deps ## Watches/serves locally.  Useful for local development.
	npm run watch

check: npm-deps ## Check for broken links
	npm run check

docker-npm-deps:  ## [Docker] Install NodeJS dependencies.
	$(DOCKER_NOUSER) $(BUILD_IMAGE) /bin/bash -c "yarn install && chown -R `id -u`:`id -g` /tmp/hub/node_modules"

docker-build: docker-npm-deps ## [Docker] Single endpoint for docker install
	$(DOCKER) $(BUILD_IMAGE) yarn run build

gitlfs-pull:  ## We use this during the Jenkins build process to fetch LFS contents -- probably not useful locally.
	$(DOCKER) dannon/gitlfs git lfs pull

.PHONY: gitlfs-pull docker-build docker-npm-deps check watch serve build
