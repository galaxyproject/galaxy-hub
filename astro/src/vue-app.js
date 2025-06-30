// Import Bootstrap 5 CSS
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles.scss';

// Import UI compatibility components
import { BButton, BAlert, BCard, BFormInput } from './components/ui';

// Import migrated components
import LinkBox from './components/LinkBox.vue';
import VegaEmbed from './components/VegaEmbed.vue';
import VideoPlayer from './components/VideoPlayer.vue';
import MarkdownEmbed from './components/MarkdownEmbed.vue';

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
  app.component('VideoPlayer', VideoPlayer);
  app.component('MarkdownEmbed', MarkdownEmbed);
  
  // Error handling
  app.config.errorHandler = (err, instance, info) => {
    console.error('Vue error:', err, info);
  };
}

// Default export for Astro's Vue integration
export default (app) => {
  setupGlobalComponents(app);
};