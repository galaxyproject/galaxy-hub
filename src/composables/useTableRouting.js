export function useTableRouting() {
    /**
     * Convert tab id to URL-friendly slug
     * @param {Object} tab - Tab object with id property
     * @returns {string} URL-friendly slug
     */
    const getTabSlug = (tab) => {
        if (!tab || !tab.id) return "";

        const slugMap = {
            usegalaxy: "usegalaxy",
            all: "all",
            "public-server": "public-servers",
            "academic-cloud": "academic-clouds",
            "commercial-cloud": "commercial-clouds",
            containers: "containers",
            vms: "vms",
        };

        return slugMap[tab.id] || tab.id.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    };

    /**
     * Find tab object from URL slug
     * @param {Array} tabs - Array of tab objects
     * @param {string} slug - URL slug to match
     * @returns {Object|null} Matching tab object or null
     */
    const getTabFromSlug = (tabs, slug) => {
        if (!slug || !tabs) return null;
        return tabs.find((tab) => getTabSlug(tab) === slug);
    };

    /**
     * Get active tab index based on URL query parameter
     * @param {Array} tabs - Array of tab objects
     * @param {Object} route - Vue router route object
     * @returns {number} Active tab index (0-based)
     */
    const getActiveTabIndex = (tabs, route) => {
        if (!route || !route.query) {
            return 0;
        }

        const platformGroup = route.query.platform_group;

        if (!platformGroup || !tabs || !Array.isArray(tabs)) {
            return 0;
        }

        const tabIndex = tabs.findIndex((tab) => {
            const slug = getTabSlug(tab);
            return slug === platformGroup;
        });

        return tabIndex >= 0 ? tabIndex : 0;
    };

    /**
     * Update URL with new tab selection
     * @param {Object} router - Vue router instance
     * @param {Object} route - Current route object
     * @param {Object} tab - Selected tab object
     * @returns {void}
     */
    const updateUrlForTab = (router, route, tab) => {
        if (!router || !tab) return;

        const slug = getTabSlug(tab);
        const newQuery = { ...route.query };

        if (slug) {
            newQuery.platform_group = slug;
        } else {
            delete newQuery.platform_group;
        }

        // Update URL without page refresh, ignore navigation duplicated errors
        router.push({ query: newQuery }).catch((err) => {
            if (err.name !== "NavigationDuplicated") {
                console.warn("Navigation error:", err);
            }
        });
    };

    /**
     * Initialize tab from URL query parameters and return reactive state manager
     * @param {Array} tabs - Array of tab objects
     * @param {Object} route - Current route object
     * @param {Object} router - Vue router instance
     * @returns {Object} Tab state manager with reactive activeTabIndex
     */
    const createTabStateManager = (tabs, route, router) => {
        let activeTabIndex = getActiveTabIndex(tabs, route);

        return {
            get activeTabIndex() {
                return activeTabIndex;
            },

            set activeTabIndex(value) {
                activeTabIndex = value;
            },

            onTabChange(newTabIndex) {
                activeTabIndex = newTabIndex;
                const tab = tabs[newTabIndex];
                updateUrlForTab(router, route, tab);
            },

            initializeFromUrl() {
                const platformGroup = route.query.platform_group;

                if (platformGroup) {
                    const tabIndex = tabs.findIndex((tab) => getTabSlug(tab) === platformGroup);

                    if (tabIndex >= 0) {
                        activeTabIndex = tabIndex;
                        return true;
                    }
                }

                // Default to first tab if no match or no platform_group
                activeTabIndex = 0;
                return false;
            },

            handleRouteChange(newPlatformType, oldPlatformType) {
                if (newPlatformType !== oldPlatformType) {
                    this.initializeFromUrl();
                }
            },
        };
    };

    /**
     * Initialize tab state from URL query parameters (legacy method for backwards compatibility)
     * @param {Array} tabs - Array of tab objects
     * @param {Object} route - Current route object
     * @returns {Object|null} Initial tab object or null
     */
    const initializeFromUrl = (tabs, route) => {
        const platformGroup = route.query.platform_group;
        if (platformGroup && tabs) {
            const tab = getTabFromSlug(tabs, platformGroup);
            if (tab) {
                return tab;
            }
        }
        return null;
    };

    return {
        getTabSlug,
        getTabFromSlug,
        getActiveTabIndex,
        updateUrlForTab,
        initializeFromUrl,
        createTabStateManager,
    };
}
