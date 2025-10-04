export function useTableSorting() {
    
    /**
     * Custom sort comparison function for Bootstrap Vue tables
     * @param {Object} aRow - First row object to compare
     * @param {Object} bRow - Second row object to compare
     * @param {string} key - Column key being sorted
     * @returns {number|false} - Sort result (-1, 0, 1) or false for default sorting
     */
    const customSortCompare = (aRow, bRow, key) => {
        // Get the appropriate sort handler for this key
        const sortHandler = getSortHandler(key);
        
        if (sortHandler) {
            return sortHandler(aRow, bRow);
        }
        
        // Return false to use Bootstrap Vue's default sorting for other columns
        return false;
    };
    
    /**
     * Get the appropriate sort handler function for a given column key
     * @param {string} key - Column key
     * @returns {Function|null} - Sort handler function or null
     */
    const getSortHandler = (key) => {
        const sortHandlers = {
            'resource': resourceSortHandler,
            'title': titleSortHandler,
            'summary': textSortHandler,
            'tier': tierSortHandler,
        };
        
        return sortHandlers[key] || null;
    };
    
    /**
     * Sort handler for resource columns (handles title/path fallback)
     * @param {Object} aRow - First row object
     * @param {Object} bRow - Second row object
     * @returns {number} - Sort result (-1, 0, 1)
     */
    const resourceSortHandler = (aRow, bRow) => {
        const a = getResourceDisplayValue(aRow);
        const b = getResourceDisplayValue(bRow);
        return compareStrings(a, b);
    };
    
    /**
     * Sort handler for title columns
     * @param {Object} aRow - First row object
     * @param {Object} bRow - Second row object
     * @returns {number} - Sort result (-1, 0, 1)
     */
    const titleSortHandler = (aRow, bRow) => {
        const a = (aRow.title || '').toLowerCase().trim();
        const b = (bRow.title || '').toLowerCase().trim();
        return compareStrings(a, b);
    };
    
    /**
     * Generic text sort handler
     * @param {Object} aRow - First row object
     * @param {Object} bRow - Second row object
     * @returns {number} - Sort result (-1, 0, 1)
     */
    const textSortHandler = (aRow, bRow) => {
        const a = String(aRow.value || '').toLowerCase().trim();
        const b = String(bRow.value || '').toLowerCase().trim();
        return compareStrings(a, b);
    };
    
    /**
     * Sort handler for tier columns (handles numeric tier values)
     * @param {Object} aRow - First row object
     * @param {Object} bRow - Second row object
     * @returns {number} - Sort result (-1, 0, 1)
     */
    const tierSortHandler = (aRow, bRow) => {
        const a = getTierValue(aRow);
        const b = getTierValue(bRow);
        
        // Handle null/undefined cases
        if (a === null && b === null) return 0;
        if (a === null) return 1;
        if (b === null) return -1;
        
        return a - b;
    };
    
    /**
     * Get the display value for resource column (title or path fallback)
     * @param {Object} row - Row object
     * @returns {string} - Display value for sorting
     */
    const getResourceDisplayValue = (row) => {
        return (row.title || row.path || '').toLowerCase().trim();
    };
    
    /**
     * Get the tier value for sorting (returns numeric value or null)
     * @param {Object} row - Row object
     * @returns {number|null} - Tier value for sorting
     */
    const getTierValue = (row) => {
        // Handle array format: designation = [{ tier: 1 }]
        if (row.designation && Array.isArray(row.designation) && row.designation.length > 0) {
            const tier = parseInt(row.designation[0].tier, 10);
            return isNaN(tier) ? null : tier;
        }
        // Handle object format: designation = { tier: 1 }
        if (row.designation && row.designation.tier) {
            const tier = parseInt(row.designation.tier, 10);
            return isNaN(tier) ? null : tier;
        }
        return null;
    };
    
    /**
     * Compare two strings using locale-aware comparison
     * @param {string} a - First string
     * @param {string} b - Second string
     * @returns {number} - Sort result (-1, 0, 1)
     */
    const compareStrings = (a, b) => {
        return a.localeCompare(b, undefined, {
            numeric: true,
            sensitivity: 'base'
        });
    };
    
    /**
     * Create a sort configuration for Bootstrap Vue table fields
     * @param {string} key - Column key
     * @param {string} label - Column label
     * @param {Object} options - Additional options
     * @returns {Object} - Bootstrap Vue field configuration
     */
    const createSortableField = (key, label, options = {}) => {
        return {
            key,
            label,
            sortable: true,
            thClass: `sortable-${key}-column`,
            thStyle: { cursor: 'pointer' },
            ...options
        };
    };
    
    /**
     * Create multiple sortable fields at once
     * @param {Array} fieldConfigs - Array of field configurations
     * @returns {Array} - Array of Bootstrap Vue field configurations
     */
    const createSortableFields = (fieldConfigs) => {
        return fieldConfigs.map(config => {
            if (typeof config === 'string') {
                // Simple string format: convert "resource" to full config
                return createSortableField(config, capitalizeFirst(config));
            } else if (config.sortable !== false) {
                // Object format: enhance with sortable properties
                return createSortableField(config.key, config.label, config);
            }
            // Return as-is if sortable is explicitly false
            return config;
        });
    };
    
    /**
     * Utility function to capitalize first letter
     * @param {string} str - String to capitalize
     * @returns {string} - Capitalized string
     */
    const capitalizeFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    /**
     * Get sort state for debugging
     * @param {Object} tableRef - Reference to Bootstrap Vue table
     * @returns {Object} - Current sort state
     */
    const getSortState = (tableRef) => {
        if (!tableRef) return null;
        
        return {
            sortBy: tableRef.sortBy,
            sortDesc: tableRef.sortDesc,
            localSortBy: tableRef.localSortBy,
            localSortDesc: tableRef.localSortDesc
        };
    };
    
    return {
        // Main sorting function
        customSortCompare,
        
        resourceSortHandler,
        titleSortHandler,
        textSortHandler,
        tierSortHandler,
        
        createSortableField,
        createSortableFields,
        
        getResourceDisplayValue,
        getTierValue,
        compareStrings,
        getSortState,
        getSortHandler
    };
}