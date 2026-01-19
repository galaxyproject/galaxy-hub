// MDX component exports with Astro wrappers for hydration
// Import these components to pass to MDX Content

export { default as VegaEmbed } from './VegaEmbed.astro';
export { default as Twitter } from './Twitter.astro';
export { default as Mastodon } from './Mastodon.astro';
export { default as VideoPlayer } from './VideoPlayer.astro';
export { default as Carousel } from './Carousel.astro';
export { default as CalendarEmbed } from './CalendarEmbed.astro';
export { default as MarkdownEmbed } from './MarkdownEmbed.astro';
export { default as Flickr } from './Flickr.astro';
export { default as Supporters } from './Supporters.astro';
export { default as Contacts } from './Contacts.astro';

// Component map using kebab-case keys for MDX
// Note: When passing to MDX Content, use the PascalCase exports above
// This map is for reference of kebab-case names used in content
export const componentMapping = {
  'vega-embed': 'VegaEmbed',
  twitter: 'Twitter',
  mastodon: 'Mastodon',
  'video-player': 'VideoPlayer',
  carousel: 'Carousel',
  'calendar-embed': 'CalendarEmbed',
  'markdown-embed': 'MarkdownEmbed',
  flickr: 'Flickr',
  supporters: 'Supporters',
  contacts: 'Contacts',
};
