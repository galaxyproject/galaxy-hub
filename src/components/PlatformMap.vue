<template>
    <div class="platform-map-container">
        <div v-if="platformsWithLocations.length > 0" class="map-wrapper">
            <div ref="mapContainer" class="ol-map galaxy-pale-mode"></div>
            <div class="map-legend">
                <h6>Galaxy Platforms</h6>
                <p class="text-muted mb-0">
                    <small
                        >{{ platformsWithLocations.length }} platform{{
                            platformsWithLocations.length !== 1 ? "s" : ""
                        }}
                        with location data</small
                    >
                </p>
            </div>
        </div>
        <div v-else class="no-map-message">
            <p class="text-muted">Map data is being collected for platforms...</p>
        </div>
    </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat } from "ol/proj";
import Overlay from "ol/Overlay";
import { getImage } from "~/lib/pages.mjs";

export default {
    name: "PlatformMap",
    props: {
        platforms: {
            type: Array,
            required: true,
            default: () => [],
        },
    },
    data() {
        return {
            map: null,
            vectorSource: null,
            popup: null,
            markerCache: {}, // Cache composite markers to avoid regenerating
        };
    },
    computed: {
        platformsWithLocations() {
            const filtered = [];
            for (let i = 0; i < this.platforms.length; i++) {
                const platform = this.platforms[i];
                if (!platform.domains || platform.domains.length === 0) {
                    continue;
                }
                // Get the first domain with location data
                let domainWithLocation = null;
                for (let j = 0; j < platform.domains.length; j++) {
                    const domain = platform.domains[j];
                    if (domain.location && domain.location.latitude && domain.location.longitude) {
                        domainWithLocation = domain;
                        break;
                    }
                }
                if (domainWithLocation) {
                    // Attach location to platform for easy access
                    platform.location = domainWithLocation.location;
                    filtered.push(platform);
                }
            }
            return filtered;
        },
    },
    mounted() {
        if (this.platformsWithLocations.length > 0) {
            this.$nextTick(() => {
                this.initializeMap();
            });
        }
    },
    beforeDestroy() {
        if (this.map) {
            this.map.setTarget(null);
        }
    },
    methods: {
        getImage,
        initializeMap() {
            // Create vector source for markers
            this.vectorSource = new VectorSource();

            // Create vector layer for markers
            const vectorLayer = new VectorLayer({
                source: this.vectorSource,
                // declutter: true,
            });

            // Initialize the map
            this.map = new Map({
                target: this.$refs.mapContainer,
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                    vectorLayer,
                ],
                view: new View({
                    center: fromLonLat([0, 20]), // Center on world with slight north bias
                    zoom: 2,
                }),
            });

            // Add markers for each platform
            this.addPlatformMarkers();

            // Add click interaction for popups
            this.addClickInteraction();
        },

        addPlatformMarkers() {
            // Create markers asynchronously since we need to load images
            const markerPromises = [];

            for (let i = 0; i < this.platformsWithLocations.length; i++) {
                const platform = this.platformsWithLocations[i];
                const coordinates = fromLonLat([platform.location.longitude, platform.location.latitude]);

                // Create feature for this platform
                const marker = new Feature({
                    geometry: new Point(coordinates),
                    platform: platform, // Store platform data
                });

                // Create marker style asynchronously
                const stylePromise = this.createMarkerStyle(platform).then((markerStyle) => {
                    marker.setStyle(markerStyle);
                    // Add to vector source
                    this.vectorSource.addFeature(marker);
                });

                markerPromises.push(stylePromise);
            }

            // Log when all markers are loaded
            // Promise.all(markerPromises).then(() => {
            //     console.log(`All ${this.platformsWithLocations.length} markers loaded`);
            // });
        },

        createMarkerStyle(platform) {
            // Use canvas-based composition for reliable image embedding
            return new Promise((resolve) => {
                if (platform.image) {
                    const iconUrl = this.getImageIcon(platform);

                    if (iconUrl && iconUrl.trim() !== "") {
                        // Check cache first
                        if (this.markerCache[iconUrl]) {
                            // console.log('Using cached marker for:', iconUrl);
                            resolve(
                                new Style({
                                    image: new Icon({
                                        src: this.markerCache[iconUrl],
                                        scale: 0.5,
                                        anchor: [0.5, 1],
                                        anchorXUnits: "fraction",
                                        anchorYUnits: "fraction",
                                    }),
                                }),
                            );
                            return;
                        }

                        // Create composite marker with canvas
                        // console.log('Creating canvas marker for:', iconUrl);
                        this.createCompositeMarker(iconUrl)
                            .then((compositeUrl) => {
                                this.markerCache[iconUrl] = compositeUrl;
                                resolve(
                                    new Style({
                                        image: new Icon({
                                            src: compositeUrl,
                                            scale: 0.5,
                                            anchor: [0.5, 1],
                                            anchorXUnits: "fraction",
                                            anchorYUnits: "fraction",
                                        }),
                                    }),
                                );
                            })
                            .catch((err) => {
                                console.debug("Failed to create composite marker:", err);
                                resolve(this.getDefaultMarkerStyle());
                            });
                        return;
                    }
                }

                // Default marker if no image or invalid image
                resolve(this.getDefaultMarkerStyle());
            });
        },

        getDefaultMarkerStyle() {
            return new Style({
                image: new Icon({
                    src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 32 48"><path fill="%232C3143" stroke="%23fff" stroke-width="2" d="M16 1c-8.284 0-15 6.656-15 14.865C1 25.812 16 47 16 47s15-21.188 15-31.135C31 7.656 24.284 1 16 1z"/><circle cx="16" cy="16" r="6" fill="%23fff"/></svg>',
                    scale: 1,
                    anchor: [0.5, 1],
                    anchorXUnits: "fraction",
                    anchorYUnits: "fraction",
                }),
            });
        },

        createCompositeMarker(logoUrl) {
            return new Promise((resolve, reject) => {
                const canvas = document.createElement("canvas");
                canvas.width = 150;
                canvas.height = 100;
                const ctx = canvas.getContext("2d");

                const markerSvg = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="100" viewBox="0 0 150 100">
                        <path d="M30 0 H120 a10 10 0 0 1 10 10 V60 a10 10 0 0 1 -10 10 H85 L75 100 L65 70 H30 a10 10 0 0 1 -10 -10 V10 a10 10 0 0 1 10 -10 Z" 
                              fill="#2b2b2c" stroke="#fff" stroke-width="2"/>
                        <rect x="35" y="10" width="80" height="50" rx="8" ry="8" fill="#ffffff"/>
                    </svg>
                `;

                const markerDataUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(markerSvg);

                // Load marker background
                const bgImg = new Image();
                bgImg.crossOrigin = "anonymous";
                bgImg.src = markerDataUrl;

                bgImg.onload = () => {
                    // Draw marker background
                    ctx.drawImage(bgImg, 0, 0);

                    // Load and draw logo
                    const logoImg = new Image();
                    logoImg.crossOrigin = "anonymous";
                    logoImg.src = logoUrl;

                    logoImg.onload = () => {
                        // Calculate scaling to fit logo in content area (80x50) while preserving aspect ratio
                        const contentWidth = 80;
                        const contentHeight = 50;
                        const contentX = 35;
                        const contentY = 10;

                        const scaleX = contentWidth / logoImg.width;
                        const scaleY = contentHeight / logoImg.height;
                        const scale = Math.min(scaleX, scaleY);

                        const scaledWidth = logoImg.width * scale;
                        const scaledHeight = logoImg.height * scale;

                        // Center the logo in the content area
                        const logoX = contentX + (contentWidth - scaledWidth) / 2;
                        const logoY = contentY + (contentHeight - scaledHeight) / 2;

                        // Draw logo
                        ctx.drawImage(logoImg, logoX, logoY, scaledWidth, scaledHeight);

                        // Convert canvas to data URL
                        resolve(canvas.toDataURL("image/png"));
                    };

                    logoImg.onerror = (err) => {
                        console.warn("Logo failed to load:", logoUrl, err);
                        // Return marker without logo
                        resolve(canvas.toDataURL("image/png"));
                    };
                };

                bgImg.onerror = (err) => {
                    console.debug("Marker background failed to load:", err);
                    reject(err);
                };
            });
        },

        addClickInteraction() {
            const self = this;
            this.map.on("click", function (event) {
                const feature = self.map.forEachFeatureAtPixel(event.pixel, function (feature) {
                    return feature;
                });

                if (feature) {
                    const platform = feature.get("platform");
                    self.showPopup(event.coordinate, platform);
                }
            });

            // Change cursor on hover
            this.map.on("pointermove", function (event) {
                const hit = self.map.hasFeatureAtPixel(event.pixel);
                self.map.getTargetElement().style.cursor = hit ? "pointer" : "";
            });
        },

        showPopup(coordinate, platform) {
            // Remove existing popup if any
            if (this.popup) {
                this.map.removeOverlay(this.popup);
            }

            const popupElement = document.createElement("div");
            popupElement.className = "ol-popup";
            popupElement.innerHTML = `
                <div class="popup-header">
                    ${platform.image ? `<img src="${this.getImageIcon(platform)}" alt="${platform.title}" class="popup-logo" />` : ""}
                    <h6>${platform.title}</h6>
                </div>
                ${platform.summary ? `<p class="popup-summary">${this.stripMarkdown(platform.summary)}</p>` : ""}
                <div class="popup-location">
                    <strong>Location:</strong> ${platform.location.city}, ${platform.location.region}, ${platform.location.country_name}
                </div>
                <a href="${platform.path}" class="btn btn-sm btn-primary mt-2">View Details</a>
                <button class="popup-close" aria-label="Close popup">&times;</button>
            `;

            this.popup = new Overlay({
                element: popupElement,
                positioning: "bottom-center",
                stopEvent: false,
                offset: [0, -50],
            });

            const self = this;
            const closeBtn = popupElement.querySelector(".popup-close");
            closeBtn.addEventListener("click", function () {
                self.map.removeOverlay(self.popup);
                self.popup = null;
            });

            this.map.addOverlay(this.popup);
            this.popup.setPosition(coordinate);
        },

        getImageIcon(platform) {
            if (platform.image) {
                let iconUrl = this.getImage(platform.image, platform.images);
                iconUrl = typeof iconUrl === "string" ? iconUrl : iconUrl.src;
                return iconUrl;
            }
        },

        getImageUrl(imagePath) {
            if (!imagePath) return "";
            // Handle absolute URLs
            if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
                return imagePath;
            }
            // Handle relative paths
            if (imagePath.startsWith("/")) {
                return imagePath;
            }
            return `/${imagePath}`;
        },

        getFilenameFromPathExcludeQuerystring(path) {
            if (!path) return "";
            const cleanPath = path.split("?")[0];
            return cleanPath.substring(cleanPath.lastIndexOf("/") + 1);
        },

        stripMarkdown(text) {
            if (!text) return "";
            // Simple markdown stripping - remove common markdown syntax
            return text
                .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links
                .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, "$1") // Remove bold/italic
                .replace(/`([^`]+)`/g, "$1") // Remove code
                .replace(/#{1,6}\s/g, "") // Remove headers
                .substring(0, 150); // Limit length
        },
    },
};
</script>

<style scoped>
.platform-map-container {
    margin-bottom: 2rem;
}

.map-wrapper {
    position: relative;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    overflow: hidden;
}

.ol-map {
    width: 100%;
    height: 500px;
}

/* Galaxy Dark Mode Theme - Color filter overlay */
.galaxy-dark-mode {
    filter: invert(90%) /* Invert colors */ hue-rotate(180deg) /* Adjust hue to match Galaxy theme */ brightness(0.9)
        /* Slightly dim */ contrast(1.1); /* Increase contrast */
}

/* Prevent inversion on UI controls */
.galaxy-dark-mode ::v-deep .ol-control,
.galaxy-dark-mode ::v-deep .ol-popup {
    filter: invert(100%) hue-rotate(180deg);
}

/* Galaxy Pale Mode Theme - Pale blue-gray similar to #d7e2e9 */
.galaxy-pale-mode {
    filter: sepia(0%) /* Add slight warm tone */ saturate(0.6) /* Desaturate for pale look */ hue-rotate(20deg)
        /* Shift to blue-gray */ brightness(1.15) /* Lighten overall */ contrast(1); /* Reduce contrast for softer appearance */
}

/* Maintain readability of controls in pale mode */
.galaxy-pale-mode ::v-deep .ol-control {
    opacity: 0.9;
}

.map-legend {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255, 255, 255, 0.95);
    padding: 10px 15px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
}

.map-legend h6 {
    margin: 0 0 5px 0;
    font-size: 0.9rem;
    color: #2c3143;
}

.no-map-message {
    padding: 2rem;
    text-align: center;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
}

/* OpenLayers Popup Styling */
::v-deep .ol-popup {
    position: absolute;
    background-color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #ddd;
    min-width: 250px;
    max-width: 350px;
}

::v-deep .ol-popup::after,
::v-deep .ol-popup::before {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -10px;
    border: 10px solid transparent;
    border-top-color: white;
}

::v-deep .ol-popup::before {
    margin-left: -11px;
    border-width: 11px;
    border-top-color: #ddd;
}

::v-deep .popup-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

::v-deep .popup-logo {
    width: 40px;
    height: 40px;
    object-fit: contain;
}

::v-deep .popup-header h6 {
    margin: 0;
    font-size: 1rem;
    color: #2c3143;
}

::v-deep .popup-summary {
    font-size: 0.875rem;
    margin-bottom: 0.75rem;
    color: #666;
    line-height: 1.4;
}

::v-deep .popup-location {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
    color: #444;
}

::v-deep .popup-close {
    position: absolute;
    top: 5px;
    right: 8px;
    border: none;
    background: transparent;
    font-size: 1.5rem;
    color: #999;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    line-height: 1;
}

::v-deep .popup-close:hover {
    color: #333;
}

/* Galaxy-themed button */
::v-deep .btn-primary {
    background-color: #2c3143;
    border-color: #2c3143;
}

::v-deep .btn-primary:hover {
    background-color: #3d4256;
    border-color: #3d4256;
}
</style>
