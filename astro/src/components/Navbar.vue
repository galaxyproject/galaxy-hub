<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" :href="brand.href || '/'">
        <img v-if="brand.logo" :src="brand.logo" :alt="brand.text" height="30" class="d-inline-block align-top">
        <span v-else>{{ brand.text }}</span>
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
        <ul class="navbar-nav ms-auto">
          <li v-for="item in items" :key="item.text" class="nav-item" :class="{ dropdown: item.children }">
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
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  brand: {
    type: Object,
    default: () => ({ text: 'Galaxy Hub', href: '/' })
  },
  items: {
    type: Array,
    default: () => []
  }
});

const isOpen = ref(false);
const openDropdowns = ref([]);

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