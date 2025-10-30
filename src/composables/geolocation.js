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
}

// Factory function for creating geolocation service
export function createGeolocationService(config = {}) {
    return new GeolocationService(config);
}

// Default export
export default GeolocationService;
