SHELL=/bin/bash
CONDA_ENV=galaxyproject-hub
CONDA=$(shell which conda)
ifeq ($(CONDA),)
	CONDA=${HOME}/miniconda3/bin/conda
endif
ACTIVATE_ENV = source $(shell dirname $(dir $(CONDA)))/bin/activate $(CONDA_ENV)
ASTRO_SITE_URL ?= https://galaxyproject.org
W3C_FEEDVALIDATOR_REF ?= main
W3C_FEEDVALIDATOR_TARBALL ?= https://github.com/w3c/feedvalidator/archive/refs/heads/$(W3C_FEEDVALIDATOR_REF).tar.gz
CACHE_DIR ?= .cache
W3C_FEEDVALIDATOR_CACHE_DIR ?= $(CACHE_DIR)/feedvalidator
W3C_FEEDVALIDATOR_ARCHIVE ?= $(W3C_FEEDVALIDATOR_CACHE_DIR)/feedvalidator-$(W3C_FEEDVALIDATOR_REF).tar.gz
W3C_FEEDVALIDATOR_SOURCE_DIR ?= $(W3C_FEEDVALIDATOR_CACHE_DIR)/source

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

content-lint: ## Lint content files for legacy syntax issues
	cd astro && npm install && npm run content:lint
.PHONY: content-lint

link-check: build ## Build site and check internal links with linkinator
	cd astro && npx astro preview --port 9999 & sleep 5 && cd astro && PORT=9999 npm run links:internal; kill %1 2>/dev/null || true
.PHONY: link-check

feed-conformance: ## Validate RSS/Atom feeds with W3C feedvalidator
	@set -euo pipefail; \
	if [ "$${ASTRO_FEED_SKIP_BUILD:-0}" != "1" ]; then (cd astro && npm run build); fi; \
	if ! command -v uvx >/dev/null 2>&1; then echo "uvx is required for astro-feed-conformance"; exit 2; fi; \
	if ! command -v wget >/dev/null 2>&1; then echo "wget is required for astro-feed-conformance"; exit 2; fi; \
	mkdir -p "$(W3C_FEEDVALIDATOR_CACHE_DIR)" "$(W3C_FEEDVALIDATOR_SOURCE_DIR)"; \
	wget -q -O "$(W3C_FEEDVALIDATOR_ARCHIVE)" "$(W3C_FEEDVALIDATOR_TARBALL)"; \
	tar -xzf "$(W3C_FEEDVALIDATOR_ARCHIVE)" -C "$(W3C_FEEDVALIDATOR_SOURCE_DIR)" --strip-components=1; \
	PYTHONPATH="$(W3C_FEEDVALIDATOR_SOURCE_DIR)/src" uvx -q --with-requirements "$(W3C_FEEDVALIDATOR_SOURCE_DIR)/requirements.txt" python scripts/validate_astro_feeds_w3c.py --dist-dir astro/dist --base-url "$(ASTRO_SITE_URL)"
.PHONY: feed-conformance

image-check: build ## Build site and check all images resolve
	cd astro && PORT=9999 LINK_CHECK=1 LINK_CHECK_PREVIEW=1 npx playwright test link-check
.PHONY: image-check

validate-metadata: ## Validate news and events frontmatter schemas
	python scripts/validate_news.py --be-strict-from 2026-02-24
	python scripts/validate_events.py --be-strict-from 2026-02-24
.PHONY: validate-metadata

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
.PHONY: help
