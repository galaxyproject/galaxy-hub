<script setup lang="ts">
import { brandIcons } from '../mdx/brand-icons';

interface Contact {
  name: string;
  email?: string;
  github?: string;
  twitter?: string;
  role?: string;
  avatar?: string;
}

const sizedIcon = (name: string, size = 16) =>
  (brandIcons[name] ?? '').replace(/width="\d+"/, `width="${size}"`).replace(/height="\d+"/, `height="${size}"`);

const githubIcon = sizedIcon('Github');
const twitterIcon = sizedIcon('Twitter');

defineProps<{
  contacts?: Contact[];
  title?: string;
}>();
</script>

<template>
  <div class="contacts my-8">
    <h3 v-if="title" class="text-xl font-semibold mb-4">{{ title }}</h3>
    <div v-if="contacts && contacts.length > 0" class="grid gap-4 md:grid-cols-2">
      <div
        v-for="contact in contacts"
        :key="contact.name"
        class="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-ebony-clay-100"
      >
        <div v-if="contact.avatar" class="flex-shrink-0">
          <img :src="contact.avatar" :alt="contact.name" class="w-12 h-12 rounded-full object-cover" />
        </div>
        <div v-else class="flex-shrink-0 w-12 h-12 rounded-full bg-galaxy-primary/20 flex items-center justify-center">
          <span class="text-galaxy-primary font-semibold">{{ contact.name.charAt(0) }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-medium text-chicago-900">{{ contact.name }}</p>
          <p v-if="contact.role" class="text-sm text-chicago-600">{{ contact.role }}</p>
          <div class="flex flex-wrap gap-3 mt-2">
            <a
              v-if="contact.email"
              :href="`mailto:${contact.email}`"
              class="text-sm text-galaxy-primary hover:underline flex items-center gap-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email
            </a>
            <a
              v-if="contact.github"
              :href="`https://github.com/${contact.github}`"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-chicago-600 hover:text-chicago-900 flex items-center gap-1"
            >
              <span class="inline-flex w-4 h-4" v-html="githubIcon"></span>
              GitHub
            </a>
            <a
              v-if="contact.twitter"
              :href="`https://twitter.com/${contact.twitter}`"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-galaxy-primary hover:text-galaxy-gold flex items-center gap-1"
            >
              <span class="inline-flex w-4 h-4" v-html="twitterIcon"></span>
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-chicago-500 py-4">
      <slot>No contacts listed</slot>
    </div>
  </div>
</template>
