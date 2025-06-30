<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" :style="navbarStyle">
    <div class="container">
      <a class="navbar-brand" :href="computedBrand.href || '/'">
        <img v-if="computedBrand.logo" :src="computedBrand.logo" :alt="computedBrand.text" height="30" class="d-inline-block align-top">
        <span v-else>{{ computedBrand.text }}</span>
      </a>
      
      <button 
        class="navbar-toggler" 
        type="button" 
        @click="isOpen = !isOpen"
        :aria-expanded="isOpen"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="navbar-collapse" :class="{ show: isOpen }">
        <!-- Left side navigation -->
        <ul class="navbar-nav me-auto">
          <li v-for="item in navItems" :key="item.text" class="nav-item" :class="{ dropdown: item.children }">
            <template v-if="!item.children">
              <a class="nav-link" :href="item.href" :class="{ active: isActive(item.href) }">
                {{ item.text }}
              </a>
            </template>
            <template v-else>
              <a 
                class="nav-link dropdown-toggle" 
                href="#" 
                role="button"
                @click.prevent="toggleDropdown(item.text)"
                :aria-expanded="openDropdowns.includes(item.text)"
              >
                {{ item.text }}
              </a>
              <ul class="dropdown-menu" :class="{ show: openDropdowns.includes(item.text) }">
                <li v-for="child in item.children" :key="child.text">
                  <a class="dropdown-item" :href="child.href">{{ child.text }}</a>
                </li>
              </ul>
            </template>
          </li>
        </ul>
        
        <!-- Right side navigation -->
        <ul class="navbar-nav ms-auto">
          <li v-for="item in rightItems" :key="item.text" class="nav-item" :class="{ dropdown: item.children }">
            <template v-if="!item.children">
              <a class="nav-link" :href="item.href" :class="{ active: isActive(item.href) }">
                {{ item.text }}
              </a>
            </template>
            <template v-else>
              <a 
                class="nav-link dropdown-toggle" 
                href="#" 
                role="button"
                @click.prevent="toggleDropdown(item.text)"
                :aria-expanded="openDropdowns.includes(item.text)"
              >
                {{ item.text }}
              </a>
              <ul class="dropdown-menu" :class="{ show: openDropdowns.includes(item.text) }">
                <li v-for="child in item.children" :key="child.text">
                  <a class="dropdown-item" :href="child.href">{{ child.text }}</a>
                </li>
              </ul>
            </template>
          </li>
          
          <!-- Subsite Switcher -->
          <li class="nav-item dropdown">
            <a 
              class="nav-link dropdown-toggle" 
              href="#" 
              role="button"
              @click.prevent="toggleDropdown('subsites')"
              :aria-expanded="openDropdowns.includes('subsites')"
            >
              <i class="bi bi-globe"></i> {{ subsiteConfig.name || 'Global' }}
            </a>
            <ul class="dropdown-menu" :class="{ show: openDropdowns.includes('subsites') }">
              <li v-for="site in subsitesList" :key="site.key">
                <a 
                  class="dropdown-item" 
                  :href="site.href"
                  :class="{ active: site.key === subsite }"
                >
                  {{ site.name }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { subsites } from '../config/subsites.js';

const props = defineProps({
  brand: {
    type: Object,
    default: () => ({ text: 'Galaxy Hub', href: '/' })
  },
  items: {
    type: Array,
    default: () => []
  },
  subsite: {
    type: String,
    default: subsites.default
  },
  subsiteConfig: {
    type: Object,
    default: () => ({})
  },
  customConfig: {
    type: Object,
    default: null
  }
});

const isOpen = ref(false);
const openDropdowns = ref([]);

// Process navbar items from custom config or use defaults
const navItems = computed(() => {
  if (props.customConfig && props.customConfig.left) {
    return processNavItems(props.customConfig.left);
  }
  
  // Default items if no custom config
  return props.items.length > 0 ? props.items : [
    { text: 'News', href: `${getSubsitePath()}/news` },
    { text: 'Events', href: `${getSubsitePath()}/events` },
    { text: 'Use Galaxy', href: '/use' },
    { text: 'Community', href: '/community' },
    { text: 'Search', href: '/search' }
  ];
});

// Process right-side items if custom config exists
const rightItems = computed(() => {
  if (props.customConfig && props.customConfig.right) {
    return processNavItems(props.customConfig.right);
  }
  return [];
});

// Get subsite path prefix
function getSubsitePath() {
  if (!props.subsite || props.subsite === subsites.default) {
    return '';
  }
  return `/${props.subsite}`;
}

// Process navigation items from YAML format
function processNavItems(items) {
  return items.map(item => {
    const processed = {
      text: item.label,
      href: item.target
    };
    
    // Handle relative paths for subsite
    if (item.relativeTo === 'subsite' && props.subsite !== subsites.default) {
      processed.href = `/${props.subsite}/${item.target}`;
    }
    
    // Handle dropdown items
    if (item.contents) {
      processed.children = processNavItems(item.contents);
    }
    
    return processed;
  });
}

// Computed brand with subsite info
const computedBrand = computed(() => {
  const brand = { ...props.brand };
  
  if (props.subsite !== subsites.default) {
    brand.text = `Galaxy ${props.subsiteConfig.name || props.subsite}`;
    brand.href = getSubsitePath() || '/';
  }
  
  return brand;
});

// Navbar style from custom config
const navbarStyle = computed(() => {
  if (props.customConfig && props.customConfig.style && props.customConfig.style.color) {
    return {
      backgroundColor: props.customConfig.style.color + ' !important'
    };
  }
  return {};
});

// List of subsites for switcher
const subsitesList = computed(() => {
  return subsites.navbar.map(key => {
    const config = subsites.all[key];
    return {
      key,
      name: config.name,
      href: config.path || '/',
      external: config.external
    };
  });
});

function isActive(href) {
  if (typeof window !== 'undefined') {
    return window.location.pathname === href;
  }
  return false;
}

function toggleDropdown(name) {
  const index = openDropdowns.value.indexOf(name);
  if (index > -1) {
    openDropdowns.value.splice(index, 1);
  } else {
    openDropdowns.value = [name]; // Only one dropdown open at a time
  }
}

// Close dropdowns when clicking outside
function handleClickOutside(event) {
  if (!event.target.closest('.dropdown')) {
    openDropdowns.value = [];
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.navbar {
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
}

.navbar-brand img {
  margin-right: 0.5rem;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  min-width: 10rem;
  padding: .5rem 0;
  margin: .125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0,0,0,.15);
  border-radius: .25rem;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: .25rem 1.5rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
}

.dropdown-item:hover {
  color: #1e2125;
  background-color: #f8f9fa;
}

@media (max-width: 991.98px) {
  .navbar-collapse {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
  }
  
  .navbar-collapse.show {
    max-height: 500px;
  }
  
  .dropdown-menu {
    position: static;
    float: none;
    width: auto;
    margin-top: 0;
    background-color: transparent;
    border: 0;
    box-shadow: none;
  }
  
  .dropdown-item {
    padding-left: 2rem;
  }
}
</style>