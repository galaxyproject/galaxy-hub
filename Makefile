SHELL=/bin/bash
CONDA_ENV=galaxyproject-hub
CONDA=$(shell which conda)
ifeq ($(CONDA),)
	CONDA=${HOME}/miniconda3/bin/conda
endif
ACTIVATE_ENV = source $(shell dirname $(dir $(CONDA)))/bin/activate $(CONDA_ENV)

default: help

activate:
	echo "$(ACTIVATE_ENV)"

create-env: ## create galaxyproject-hub conda environment
	if ${CONDA} env list | grep '^${CONDA_ENV}'; then \
	    ${CONDA} env update -f environment.yml; \
	else \
	    ${CONDA} env create -f environment.yml; \
	fi
.PHONY: create-env

install: create-env ## create galaxyproject-hub conda environment
.PHONY: install

dev: ## Run Astro development server
	cd astro && npm install && npm run dev
.PHONY: dev

build: ## Build Astro site
	cd astro && npm install && npm run build
.PHONY: build

preview: ## Preview built Astro site
	cd astro && npm install && npm run preview
.PHONY: preview

check: ## Format, lint, and test Astro site
	cd astro && npm install && npm run format && npm run lint && npm test
.PHONY: check

link-check: build ## Build site and check internal links with linkinator
	cd astro && npx astro preview --port 9999 & sleep 5 && cd astro && PORT=9999 npm run links:internal; kill %1 2>/dev/null || true
.PHONY: link-check

image-check: build ## Build site and check all images resolve
	cd astro && PORT=9999 LINK_CHECK=1 LINK_CHECK_PREVIEW=1 npx playwright test link-check
.PHONY: image-check

validate-metadata: ## Validate news and events frontmatter schemas
	python scripts/validate_news.py --be-strict-from 2026-02-01
	python scripts/validate_events.py --be-strict-from 2026-02-01
.PHONY: validate-metadata

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
.PHONY: help
