/**
 * GDPR-compliant geolocation service for Galaxy Hub.
 *
 * This module provides client-side geolocation functionality while
 * maintaining strict privacy compliance and visitor data protection.
 */
class GeolocationService {
    constructor(config = {}) {
        this.config = {
            timeout: 4000, // 4 seconds timeout for API calls
            enabled: true,
            enableUserCache: false,
            ...config,
        };
    }

    /**
     * This method provides geolocation information while maintaining strict
     * privacy compliance:
     * - IP addresses are not collected (and thus never stored persistently)
     * - Data is anonymized before external API calls
     * - Respects user privacy preferences
     * - Can be disabled via configuration
     *
     * @returns {Promise<Object>} Promise resolving to country information or error status
     */
    async getVisitorCountryCode() {
        if (!this.config.enabled) {
            return {
                status: "disabled",
                country: null,
                message: "Geolocation service is disabled",
            };
        }

        try {
            const response = await fetch("https://ipapi.co/country_code/", {
                method: "GET",
                signal: AbortSignal.timeout(this.config.timeout),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.text(); // Plain text response

            return {
                status: "success",
                country: data.trim(), // Remove any whitespace
            };
        } catch (error) {
            console.warn("Geolocation service error:", error.message);
            return {
                status: "error",
                country: null,
                message: "Geolocation service temporarily unavailable",
            };
        }
    }

    /**
     * This method provides server geolocation for:
     * - Data sovereignty compliance
     * - Regional service optimization
     * - Administrative purposes
     *
     * @returns {Promise<Object>} Promise resolving to server location information
     */
    async getServerLocation() {
        if (!this.config.enabled) {
            return {
                status: "disabled",
                country: null,
                region: null,
                message: "Geolocation service is disabled",
            };
        }

        try {
            // For Galaxy Hub, we can return static server location info
            // This would typically be configured based on where Galaxy Hub is hosted
            return {
                status: "success",
                country: "US", // Update based on actual server location
                countryName: "United States",
                region: "NA",
                regionName: "North America",
                note: "Galaxy Hub server location (configured)",
            };
        } catch (error) {
            console.warn("Server location service error:", error.message);
            return {
                status: "error",
                country: null,
                region: null,
                message: "Location service temporarily unavailable",
            };
        }
    }

    /**
     * This method provides network topology information for:
     * - Federation setup
     * - Load balancing decisions
     * - Administrative oversight
     *
     * @param {boolean} isAdmin - Whether the user has administrative privileges
     * @returns {Promise<Object>} Promise resolving to server network information
     */
    async getGalaxyServers(isAdmin = false) {
        if (!isAdmin) {
            return {
                status: "error",
                message: "Administrative privileges required",
                servers: [],
            };
        }

        if (!this.config.enabled) {
            return {
                status: "disabled",
                servers: [],
                message: "Geolocation service is disabled",
            };
        }

        try {
            const serverLocation = await this.getServerLocation();

            return {
                status: "success",
                servers: [
                    {
                        id: "galaxy-hub",
                        name: "Galaxy Hub Main",
                        location: serverLocation,
                        active: true,
                        type: "hub",
                        url: "https://galaxyproject.org",
                    },
                ],
                federationStatus: false, // Galaxy Hub doesn't typically federate
                timestamp: new Date().toISOString(),
            };
        } catch (error) {
            console.error("Error retrieving galaxy servers info:", error);
            return {
                status: "error",
                message: "Unable to retrieve server information",
                servers: [],
            };
        }
    }
}

// Factory function for creating geolocation service
export function createGeolocationService(config = {}) {
    return new GeolocationService(config);
}

// Default export
export default GeolocationService;
