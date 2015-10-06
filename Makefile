npm-deps: ## Install NodeJS dependencies.
	npm install

all: npm-deps ##
	./node_modules/coffee-script/bin/coffee build.coffee


serve: npm-deps ## Serve locally for testing.
	./node_modules/coffee-script/bin/coffee build.coffee --serve
