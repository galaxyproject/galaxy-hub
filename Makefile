DOCKER=docker run -u `id -u`:`id -g` -v `pwd`:/tmp/hub -w /tmp/hub
DOCKER_NOUSER=docker run -v `pwd`:/tmp/hub -w /tmp/hub
BUILD_IMAGE=node:16

node_modules: package.json
	yarn install

yarn-deps: node_modules

.DEFAULT_GOAL := all

all: help

help:
	@echo "There are no default actions for this Makefile, you must choose an option from the following:"
	@egrep '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: yarn-deps ## Builds into /build, suitable for copying to webserver.
	yarn run build

serve: yarn-deps ## Serve locally for viewing
	yarn run develop

watch: yarn-deps ## Watches/serves locally.  Useful for local development.
	yarn run develop

check: yarn-deps ## Check for broken links
	yarn run check

docker-yarn-deps:  ## [Docker] Install NodeJS dependencies.
	$(DOCKER_NOUSER) $(BUILD_IMAGE) /bin/bash -c "yarn install && chown -R `id -u`:`id -g` /tmp/hub/node_modules"

docker-build: docker-yarn-deps ## [Docker] Single endpoint for docker install
	$(DOCKER) $(BUILD_IMAGE) yarn run build

.PHONY: docker-build docker-yarn-deps check watch serve build
