// Import Bootstrap 5 CSS
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles.scss';

// Import UI compatibility components
import { BButton, BAlert, BCard, BFormInput } from './components/ui';

// Global component imports will be added here as we migrate them
// Example:
// import LinkBox from './components/LinkBox.vue';

export default (app) => {
  // This function is called by Astro's Vue integration
  // to configure the Vue 3 app instance
  
  // Global properties (replacing Vue 2 prototype)
  app.config.globalProperties.$static = {};
  app.config.globalProperties.$page = {};
  
  // Register Bootstrap Vue compatibility components globally
  app.component('BButton', BButton);
  app.component('BAlert', BAlert);
  app.component('BCard', BCard);
  app.component('BFormInput', BFormInput);
  
  // Additional global component registration
  // app.component('LinkBox', LinkBox);
  
  // Error handling
  app.config.errorHandler = (err, instance, info) => {
    console.error('Vue error:', err, info);
  };
};