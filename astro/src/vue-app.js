// Import Bootstrap 5 CSS
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles.scss';

// Import UI compatibility components
import { BButton, BAlert, BCard, BFormInput } from './components/ui';

// Import migrated components
import LinkBox from './components/LinkBox.vue';
import VegaEmbed from './components/VegaEmbed.vue';
import Twitter from './components/Twitter.vue';
import VideoPlayer from './components/VideoPlayer.vue';
import MarkdownEmbed from './components/MarkdownEmbed.vue';
import Navbar from './components/Navbar.vue';
import Carousel from './components/Carousel.vue';
import Tabs from './components/Tabs.vue';
import Accordion from './components/Accordion.vue';
import Search from './components/Search.vue';

// Export setup function for manual Vue app creation
export function setupGlobalComponents(app) {
  // Global properties (replacing Vue 2 prototype)
  app.config.globalProperties.$static = {};
  app.config.globalProperties.$page = {};
  
  // Register Bootstrap Vue compatibility components globally
  app.component('BButton', BButton);
  app.component('BAlert', BAlert);
  app.component('BCard', BCard);
  app.component('BFormInput', BFormInput);
  
  // Register migrated components globally
  app.component('LinkBox', LinkBox);
  app.component('VegaEmbed', VegaEmbed);
  app.component('Twitter', Twitter);
  app.component('VideoPlayer', VideoPlayer);
  app.component('MarkdownEmbed', MarkdownEmbed);
  app.component('Navbar', Navbar);
  app.component('Carousel', Carousel);
  app.component('Tabs', Tabs);
  app.component('Accordion', Accordion);
  app.component('Search', Search);
  
  // Error handling
  app.config.errorHandler = (err, instance, info) => {
    console.error('Vue error:', err, info);
  };
}

// Default export for Astro's Vue integration
export default (app) => {
  setupGlobalComponents(app);
};