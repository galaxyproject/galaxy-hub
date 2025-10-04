export function useTableRouting() {
    /**
     * Convert tab id to URL-friendly slug
     * @param {Object} tab - Tab object with id property
     * @returns {string} URL-friendly slug
     */
    const getTabSlug = (tab) => {
        if (!tab || !tab.id) return '';
        
        // Handle special cases first
        const slugMap = {
            'usegalaxy': 'usegalaxy',
            'all': 'all',
            'public-server': 'public-servers',
            'academic-cloud': 'academic-clouds',
            'commercial-cloud': 'commercial-clouds',
            'containers': 'containers',
            'vms': 'vms'
        };
        
        return slugMap[tab.id] || tab.id.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    };
    
    /**
     * Find tab object from URL slug
     * @param {Array} tabs - Array of tab objects
     * @param {string} slug - URL slug to match
     * @returns {Object|null} Matching tab object or null
     */
    const getTabFromSlug = (tabs, slug) => {
        if (!slug || !tabs) return null;
        return tabs.find(tab => getTabSlug(tab) === slug);
    };
    
    /**
     * Get active tab index based on URL query parameter
     * @param {Array} tabs - Array of tab objects
     * @param {Object} route - Vue router route object
     * @returns {number} Active tab index (0-based)
     */
    const getActiveTabIndex = (tabs, route) => {
        if (!route || !route.query) {
            // console.log('No route or query available');
            return 0;
        }

        const resourceType = route.query.resource_type;
        // console.log('Looking for resource_type:', resourceType);
        
        if (!resourceType || !tabs || !Array.isArray(tabs)) {
            // console.log('No resource_type or tabs not ready');
            return 0;
        }

        const tabIndex = tabs.findIndex(tab => {
            const slug = getTabSlug(tab);
            // console.log(`Comparing tab ${tab.id} (slug: ${slug}) with ${resourceType}`);
            return slug === resourceType;
        });

        // console.log('Found tab index:', tabIndex);
        return tabIndex >= 0 ? tabIndex : 0;
    };
    
    /**
     * Update URL with new tab selection
     * @param {Object} router - Vue router instance
     * @param {Object} route - Current route object
     * @param {Object} tab - Selected tab object
     */
    const updateUrlForTab = (router, route, tab) => {
        if (!router || !tab) return;
        
        const slug = getTabSlug(tab);
        const newQuery = { ...route.query };
        
        if (slug) {
            newQuery.resource_type = slug;
        } else {
            delete newQuery.resource_type;
        }
        
        // Update URL without page refresh, ignore navigation duplicated errors
        router.push({ query: newQuery }).catch(err => {
            if (err.name !== 'NavigationDuplicated') {
                console.warn('Navigation error:', err);
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
        // Initialize active tab index from URL
        let activeTabIndex = getActiveTabIndex(tabs, route);
        
        return {
            // Reactive property for active tab index
            get activeTabIndex() {
                return activeTabIndex;
            },
            
            set activeTabIndex(value) {
                activeTabIndex = value;
            },
            
            // Method to handle tab changes
            onTabChange(newTabIndex) {
                // console.log('Tab changed to index:', newTabIndex);
                activeTabIndex = newTabIndex;
                const tab = tabs[newTabIndex];
                updateUrlForTab(router, route, tab);
            },
            
            // Method to initialize from URL
            initializeFromUrl() {
                const resourceType = route.query.resource_type;
                // console.log('Initializing from URL, resource_type:', resourceType);
                
                if (resourceType) {
                    const tabIndex = tabs.findIndex(tab => getTabSlug(tab) === resourceType);
                    // console.log('Found tab index:', tabIndex, 'for resource_type:', resourceType);
                    
                    if (tabIndex >= 0) {
                        activeTabIndex = tabIndex;
                        // console.log('Set activeTabIndex to:', tabIndex);
                        return true;
                    }
                }
                
                // Default to first tab if no match or no resource_type
                activeTabIndex = 0;
                return false;
            },
            
            // Method to handle route changes
            handleRouteChange(newResourceType, oldResourceType) {
                // console.log('Route query changed from', oldResourceType, 'to', newResourceType);
                if (newResourceType !== oldResourceType) {
                    this.initializeFromUrl();
                }
            }
        };
    };
    
    /**
     * Initialize tab state from URL query parameters (legacy method for backwards compatibility)
     * @param {Array} tabs - Array of tab objects
     * @param {Object} route - Current route object
     * @returns {Object|null} Initial tab object or null
     */
    const initializeFromUrl = (tabs, route) => {
        const resourceType = route.query.resource_type;
        if (resourceType && tabs) {
            const tab = getTabFromSlug(tabs, resourceType);
            if (tab) {
                // console.log(`Initialized with tab: ${tab.label} (${resourceType})`);
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
        createTabStateManager
    };
}