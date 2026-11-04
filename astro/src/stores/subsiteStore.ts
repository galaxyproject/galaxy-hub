import { atom, computed } from 'nanostores';

// All available subsites
export const subsites = [
  { id: 'global', name: 'Global', path: '/' },
  { id: 'us', name: 'US', path: '/us/' },
  { id: 'eu', name: 'Europe', path: '/eu/' },
  { id: 'au', name: 'Australia', path: '', external: 'https://site.usegalaxy.org.au' },
  { id: 'freiburg', name: 'Freiburg', path: '/freiburg/' },
  { id: 'belgium', name: 'VIB (Belgium)', path: '/belgium/' },
  { id: 'pasteur', name: 'Pasteur', path: '/pasteur/' },
  { id: 'elixir-it', name: 'ELIXIR-IT', path: '/elixir-it/' },
  { id: 'ifb', name: 'ELIXIR-FR/IFB', path: '/ifb/' },
  { id: 'genouest', name: 'GenOuest', path: '/genouest/' },
  { id: 'cz', name: 'Czechia', path: '/cz/' },
  { id: 'ca', name: 'Canada', path: '', external: 'https://starthere.usegalaxy.ca' },
] as const;

export type SubsiteId = (typeof subsites)[number]['id'];

// Helper: detect subsite from URL path
export function detectSubsiteFromPath(path: string): SubsiteId {
  for (const subsite of subsites) {
    if (subsite.path && subsite.path !== '/' && path.startsWith(subsite.path)) {
      return subsite.id;
    }
  }
  return 'global';
}

// Initialize with correct value from URL (client-side only)
function getInitialSubsite(): SubsiteId {
  if (typeof window !== 'undefined') {
    return detectSubsiteFromPath(window.location.pathname);
  }
  return 'global';
}

// Current subsite state - initialized from URL to avoid hydration flash
export const currentSubsite = atom<SubsiteId>(getInitialSubsite());

// Pathname of the page on screen; islands kept by transition:persist read it instead of their stale props
export const currentPathname = atom<string>(typeof window !== 'undefined' ? window.location.pathname : '/');

// The URL decides the subsite on every view transition: a non-prefixed URL is global
if (typeof window !== 'undefined') {
  document.addEventListener('astro:after-swap', () => {
    currentPathname.set(window.location.pathname);
    currentSubsite.set(detectSubsiteFromPath(window.location.pathname));
  });
}

// Computed: get current subsite info
export const currentSubsiteInfo = computed(currentSubsite, (id) => {
  return subsites.find((s) => s.id === id) ?? subsites[0];
});

// Computed: is current subsite external?
export const isExternalSubsite = computed(currentSubsiteInfo, (info) => {
  return 'external' in info && !!info.external;
});

// Labels for subsite landing pages
export const subsiteLabels: Record<string, { title: string; description: string }> = {
  us: {
    title: 'Galaxy US',
    description: 'Galaxy resources and news for the United States community',
  },
  eu: {
    title: 'Galaxy Europe',
    description: 'Galaxy resources and news for the European community',
  },
  freiburg: {
    title: 'Galaxy Freiburg',
    description: 'Galaxy resources and news from the University of Freiburg',
  },
  belgium: {
    title: 'Galaxy Belgium (VIB)',
    description: 'Galaxy resources and news from VIB Belgium',
  },
  pasteur: {
    title: 'Galaxy Pasteur',
    description: 'Galaxy resources and news from Institut Pasteur',
  },
  'elixir-it': {
    title: 'Galaxy ELIXIR-IT',
    description: 'Galaxy resources and news from ELIXIR Italy',
  },
  ifb: {
    title: 'Galaxy ELIXIR-FR/IFB',
    description: 'Galaxy resources and news from ELIXIR France / IFB',
  },
  genouest: {
    title: 'Galaxy GenOuest',
    description: 'Galaxy resources and news from the GenOuest bioinformatics platform',
  },
  cz: {
    title: 'Galaxy Czechia',
    description: 'Galaxy resources, services, and news from the Czech Galaxy Community',
  },
};

// Static paths for subsite pages (reused by normal and embed routes)
export function getSubsiteStaticPaths() {
  return subsites
    .filter((s) => s.id !== 'global' && !('external' in s && s.external))
    .map((s) => ({
      params: { subsite: s.id },
      props: { subsiteInfo: s },
    }));
}
