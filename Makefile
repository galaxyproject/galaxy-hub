npm-deps: ## Install NodeJS dependencies.
	npm install

bower:
	./node_modules/bower/bin/bower install

all: build
	./node_modules/coffee-script/bin/coffee build.coffee

build: npm-deps bower ## Builds into /build, suitable for copying to webserver.
	./node_modules/coffee-script/bin/coffee build.coffee

serve: npm-deps bower ## Serve locally for viewing
	./node_modules/coffee-script/bin/coffee build.coffee --serve

watch: npm-deps bower ## will serve and attempt to reload files
	./node_modules/coffee-script/bin/coffee build.coffee --watch

check: npm-deps bower ## checks for broken links
	./node_modules/coffee-script/bin/coffee build.coffee --check
