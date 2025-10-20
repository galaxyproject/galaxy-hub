export function useTableSorting() {
    /**
     * Custom sort comparison function for Bootstrap Vue tables
     * @param {Object} aRow - First row object to compare
     * @param {Object} bRow - Second row object to compare
     * @param {string} key - Column key being sorted
     * @param {Object} context - Context object with platform_group info
     * @returns {number|false} - Sort result (-1, 0, 1) or false for default sorting
     */
    const customSortCompare = (aRow, bRow, key, context = {}) => {
        const sortHandler = getSortHandler(key);

        if (sortHandler) {
            return sortHandler(aRow, bRow, context);
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
            platform: platformSortHandler,
            title: titleSortHandler,
            summary: textSortHandler,
            // tier: tierSortHandler,
            region: regionSortHandler,
        };

        return sortHandlers[key] || null;
    };

    /**
     * Sort handler for platform columns (handles title/path fallback)
     * @param {Object} aRow - First row object
     * @param {Object} bRow - Second row object
     * @returns {number} - Sort result (-1, 0, 1)
     */
    const platformSortHandler = (aRow, bRow) => {
        const a = getPlatformDisplayValue(aRow);
        const b = getPlatformDisplayValue(bRow);
        return compareStrings(a, b);
    };

    /**
     * Sort handler for title columns
     * @param {Object} aRow - First row object
     * @param {Object} bRow - Second row object
     * @returns {number} - Sort result (-1, 0, 1)
     */
    const titleSortHandler = (aRow, bRow) => {
        const a = (aRow.title || "").toLowerCase().trim();
        const b = (bRow.title || "").toLowerCase().trim();
        return compareStrings(a, b);
    };

    /**
     * Generic text sort handler
     * @param {Object} aRow - First row object
     * @param {Object} bRow - Second row object
     * @returns {number} - Sort result (-1, 0, 1)
     */
    const textSortHandler = (aRow, bRow) => {
        const a = String(aRow.value || "")
            .toLowerCase()
            .trim();
        const b = String(bRow.value || "")
            .toLowerCase()
            .trim();
        return compareStrings(a, b);
    };

    /**
     * Sort handler for tier columns (handles numeric tier values)
     * @param {Object} aRow - First row object
     * @param {Object} bRow - Second row object
     * @returns {number} - Sort result (-1, 0, 1)
     */
    const tierSortHandler = (aRow, bRow) => {
        // TODO refactor into another method
        const a = getTierValue(aRow);
        const b = getTierValue(bRow);

        if (a === null && b === null) return 0;
        if (a === null) return 1;
        if (b === null) return -1;

        return a - b;
    };

    /**
     * Sort handler for region columns (handles string region values)
     * @param {Object} aRow - First row object
     * @param {Object} bRow - Second row object
     * @param {Object} context - Context object with platform_group
     * @returns {number} - Sort result (-1, 0, 1)
     */
    const regionSortHandler = (aRow, bRow, context = {}) => {
        const a = getRegionValue(aRow, context.platform_group);
        const b = getRegionValue(bRow, context.platform_group);

        if (a === null && b === null) return 0;
        if (a === null) return 1;
        if (b === null) return -1;

        const aStr = String(a || "");
        const bStr = String(b || "");

        return aStr.localeCompare(bStr);
    };

    /**
     * Get the display value for platform column (title or path fallback)
     * @param {Object} row - Row object
     * @returns {string} - Display value for sorting
     */
    const getPlatformDisplayValue = (row) => {
        return (row.title || row.path || "").toLowerCase().trim();
    };

    /**
     * Get the tier value for sorting (returns numeric value or null)
     * @param {Object} row - Row object
     * @returns {number|null} - Tier value for sorting
     */
    const getTierValue = (row) => {
        if (row.designation && Array.isArray(row.designation) && row.designation.length > 0) {
            const tier = parseInt(row.designation[0].tier, 10);
            return isNaN(tier) ? null : tier;
        }
        if (row.designation && row.designation.tier) {
            const tier = parseInt(row.designation.tier, 10);
            return isNaN(tier) ? null : tier;
        }
        return null;
    };

    /**
     * Get the region value for sorting (returns string value or null)
     * @param {Object} row - Row object
     * @param {string} platform_group - Optional platform group to filter by
     * @returns {string|null} - Region value for sorting
     */
    const getRegionValue = (row, platform_group) => {
        if (platform_group) {
            for (const platformData of row.platforms) {
                if (platformData.platform_group === platform_group && platformData.platform_location) {
                    return platformData.platform_location;
                }
            }
        } else {
            const locations = [];
            for (const platformData of row.platforms) {
                if (platformData.platform_location && !locations.includes(platformData.platform_location)) {
                    locations.push(platformData.platform_location);
                }
            }
            if (locations.length > 0) {
                return locations.join(", ");
            }
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
        if (a == null && b == null) return 0;
        if (a == null) return 1;
        if (b == null) return -1;

        const aStr = String(a);
        const bStr = String(b);

        return aStr.localeCompare(bStr, undefined, {
            numeric: true,
            sensitivity: "base",
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
            thStyle: { cursor: "pointer" },
            ...options,
        };
    };

    /**
     * Create multiple sortable fields at once
     * @param {Array} fieldConfigs - Array of field configurations
     * @returns {Array} - Array of Bootstrap Vue field configurations
     */
    const createSortableFields = (fieldConfigs) => {
        return fieldConfigs.map((config) => {
            if (typeof config === "string") {
                return createSortableField(config, capitalizeFirst(config));
            } else if (config.sortable !== false) {
                return createSortableField(config.key, config.label, config);
            }
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
     * @returns {Object|null} - Current sort state or null
     */
    const getSortState = (tableRef) => {
        if (!tableRef) return null;

        return {
            sortBy: tableRef.sortBy,
            sortDesc: tableRef.sortDesc,
            localSortBy: tableRef.localSortBy,
            localSortDesc: tableRef.localSortDesc,
        };
    };

    return {
        // Main sorting function
        customSortCompare,

        platformSortHandler,
        titleSortHandler,
        textSortHandler,
        // tierSortHandler,
        regionSortHandler,

        createSortableField,
        createSortableFields,

        getPlatformDisplayValue,
        // getTierValue,
        getRegionValue,
        compareStrings,
        getSortState,
        getSortHandler,
        capitalizeFirst,
    };
}
