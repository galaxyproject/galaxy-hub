// Export all embeddable components for MDX
// These components can be used in MDX files with kebab-case names

export { default as VegaEmbed } from './VegaEmbed.vue';
export { default as Twitter } from './Twitter.vue';
export { default as Mastodon } from './Mastodon.vue';
export { default as VideoPlayer } from './VideoPlayer.vue';
export { default as Carousel } from './Carousel.vue';
export { default as CalendarEmbed } from './CalendarEmbed.vue';
export { default as MarkdownEmbed } from './MarkdownEmbed.vue';
export { default as Flickr } from './Flickr.vue';
export { default as Supporters } from './Supporters.vue';
export { default as Contacts } from './Contacts.vue';

// Component map for MDX with kebab-case keys
export const mdxComponents = {
  'vega-embed': () => import('./VegaEmbed.vue'),
  twitter: () => import('./Twitter.vue'),
  mastodon: () => import('./Mastodon.vue'),
  'video-player': () => import('./VideoPlayer.vue'),
  carousel: () => import('./Carousel.vue'),
  'calendar-embed': () => import('./CalendarEmbed.vue'),
  'markdown-embed': () => import('./MarkdownEmbed.vue'),
  flickr: () => import('./Flickr.vue'),
  supporters: () => import('./Supporters.vue'),
  contacts: () => import('./Contacts.vue'),
};
