SHELL=/bin/bash
CONDA_ENV=galaxyproject-hub
CONDA=$(shell which conda)
ifeq ($(CONDA),)
	CONDA=${HOME}/miniconda3/bin/conda
endif
ACTIVATE_ENV = source $(shell dirname $(dir $(CONDA)))/bin/activate $(CONDA_ENV)
OPENSSL_HACK = NODE_OPTIONS=--openssl-legacy-provider

default: help

activate:
	echo "$(ACTIVATE_ENV)"

run: ## Launch website
	$(ACTIVATE_ENV) && $(OPENSSL_HACK) yarn develop
.PHONY: run

create-env: ## create galaxyproject-hub conda environment
	if ${CONDA} env list | grep '^${CONDA_ENV}'; then \
	    ${CONDA} env update -f environment.yml; \
	else \
	    ${CONDA} env create -f environment.yml; \
	fi
.PHONY: create-env

install: create-env ## create galaxyproject-hub conda environment
.PHONY: install

build: ## Build the site once and exit
	$(ACTIVATE_ENV) && $(OPENSSL_HACK) yarn build
.PHONY: build

freeze-env:
	@conda env export --no-builds -n $(CONDA_ENV) | grep -v "^prefix: "
.PHONY: freeze-env

#check-http-urls: ## check http urls
#	$(ACTIVATE_ENV) && htmlproofer ./_site/ --check-html --allow-hash-href --assume-extension --disable-external --url-swap "http\://localhost:https\://usegalaxy-eu.github.io" --enforce-https 2>&1 | grep 'is not' | sed 's/link .*//g' | sort | uniq -c | sort -nk1
#.PHONY: check-http-urls

# Astro site targets (in astro/ directory)
astro-install: ## Install Astro dependencies
	cd astro && npm install
.PHONY: astro-install

astro-dev: astro-install ## Run Astro development server
	cd astro && npm run dev
.PHONY: astro-dev

astro-build: astro-install ## Build Astro site
	cd astro && npm run build
.PHONY: astro-build

astro-preview: astro-install ## Preview built Astro site
	cd astro && npm run preview
.PHONY: astro-preview

astro-build-news: astro-install ## Build Astro site (news content only)
	cd astro && npm run build:news
.PHONY: astro-build-news

astro-build-events: astro-install ## Build Astro site (events content only)
	cd astro && npm run build:events
.PHONY: astro-build-events

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
.PHONY: help
