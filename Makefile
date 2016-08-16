npm-deps: ## Install NodeJS dependencies.
	npm install

bower:
	./node_modules/bower/bin/bower install

all: npm-deps ##
	./node_modules/coffee-script/bin/coffee build.coffee


serve: npm-deps bower ## Serve locally for testing.
	./node_modules/coffee-script/bin/coffee build.coffee --serve
