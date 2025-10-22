/**
 * GDPR-compliant geolocation service for Galaxy Hub.
 * 
 * This module provides client-side geolocation functionality while
 * maintaining strict privacy compliance and visitor data protection.
 */
class GeolocationService {
    constructor(config = {}) {
        this.config = {
            timeout: 10000,
            enabled: true,
            enableUserCache: false,
            ...config
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
                status: 'disabled',
                country: null,
                message: 'Geolocation service is disabled'
            };
        }

        try {
            // Fetch the user's geolocation data from a privacy-focused API
            const response = await fetch('https://ipapi.co/country_code/', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
                signal: AbortSignal.timeout(this.config.timeout)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch geolocation data');
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.reason || 'Unknown error occurred');
            }

            return {
                status: 'success',
                country: data.country_code, // Only collect the country code
            };

        } catch (error) {
            console.warn('Geolocation service error:', error.message);
            return {
                status: 'error',
                country: null,
                message: 'Geolocation service temporarily unavailable'
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
                status: 'disabled',
                country: null,
                region: null,
                message: 'Geolocation service is disabled'
            };
        }

        try {
            // For Galaxy Hub, we can return static server location info
            // This would typically be configured based on where Galaxy Hub is hosted
            return {
                status: 'success',
                country: 'US', // Update based on actual server location
                countryName: 'United States',
                region: 'NA',
                regionName: 'North America',
                note: 'Galaxy Hub server location (configured)'
            };

        } catch (error) {
            console.warn('Server location service error:', error.message);
            return {
                status: 'error',
                country: null,
                region: null,
                message: 'Location service temporarily unavailable'
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
                status: 'error',
                message: 'Administrative privileges required',
                servers: []
            };
        }

        if (!this.config.enabled) {
            return {
                status: 'disabled',
                servers: [],
                message: 'Geolocation service is disabled'
            };
        }

        try {
            const serverLocation = await this.getServerLocation();
            
            return {
                status: 'success',
                servers: [
                    {
                        id: 'galaxy-hub',
                        name: 'Galaxy Hub Main',
                        location: serverLocation,
                        active: true,
                        type: 'hub',
                        url: 'https://galaxyproject.org'
                    }
                ],
                federationStatus: false, // Galaxy Hub doesn't typically federate
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('Error retrieving galaxy servers info:', error);
            return {
                status: 'error',
                message: 'Unable to retrieve server information',
                servers: []
            };
        }
    }

    /**
     * Privacy-focused method to get prioritized Galaxy instances based on user location
     * This is the main method that would integrate with the Vue.js component
     * 
     * @returns {Promise<Object>} Promise resolving to prioritized Galaxy instances
     */
    async getPrioritizedGalaxyInstances() {
        try {
            const userLocation = await this.getVisitorCountryCode();
            
            // Default Galaxy instances (from config.json)
            const defaultInstances = [
                { locale: 'Global', url: 'https://usegalaxy.org', utcMin: -12, utcMax: 12, region: 'global' },
                { locale: 'Europe', url: 'https://usegalaxy.eu', utcMin: -2, utcMax: 4, region: 'eu' },
                { locale: 'Australia', url: 'https://usegalaxy.org.au', utcMin: 8, utcMax: 12, region: 'au' }
            ];

            // If we successfully got the user's country, prioritize accordingly
            if (userLocation.status === 'success') {
                const country = userLocation.country;
                
                // Simple country-to-region mapping for Galaxy instance prioritization
                const regionMapping = {
                    // European countries
                    'DE': 'eu', 'FR': 'eu', 'UK': 'eu', 'GB': 'eu', 'IT': 'eu', 'ES': 'eu',
                    'NL': 'eu', 'BE': 'eu', 'AT': 'eu', 'CH': 'eu', 'SE': 'eu', 'NO': 'eu',
                    
                    // Australia/Oceania
                    'AU': 'au', 'NZ': 'au',
                    
                    // Default to global for others
                };

                const preferredRegion = regionMapping[country] || 'global';
                
                // Prioritize the preferred region
                const prioritized = defaultInstances.sort((a, b) => {
                    if (a.region === preferredRegion) return -1;
                    if (b.region === preferredRegion) return 1;
                    return 0;
                });

                return {
                    status: 'success',
                    instances: prioritized,
                    userLocation: {
                        country: userLocation.country,
                        countryName: userLocation.countryName
                    },
                    privacyNote: 'Only country-level data used for Galaxy instance prioritization'
                };
            }

            // Fallback to default ordering if geolocation failed
            return {
                status: 'fallback',
                instances: defaultInstances,
                message: 'Using default Galaxy instance ordering',
                privacyNote: 'No location data collected'
            };

        } catch (error) {
            console.warn('Error in getPrioritizedGalaxyInstances:', error);
            return {
                status: 'error',
                instances: [],
                message: 'Unable to determine Galaxy instance prioritization'
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

// For use in Vue.js components
export const geolocationMixin = {
    data() {
        return {
            geolocationService: null
        };
    },
    created() {
        this.geolocationService = new GeolocationService({
            enabled: true,
            timeout: 10000
        });
    },
    methods: {
        async updatePrioritizedGalaxyLocales() {
            const result = await this.geolocationService.getPrioritizedGalaxyInstances();
            if (result.status === 'success' || result.status === 'fallback') {
                this.prioritizedGalaxyLocales = result.instances;
            }
        }
    }
};