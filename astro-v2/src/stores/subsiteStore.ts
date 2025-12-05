import { atom, computed } from 'nanostores';

// All available subsites
export const subsites = [
  { id: 'global', name: 'Global', path: '/' },
  { id: 'us', name: 'US', path: '/us/' },
  { id: 'eu', name: 'Europe', path: '/eu/' },
  { id: 'au', name: 'Australia', path: '', external: 'https://site.usegalaxy.org.au' },
  { id: 'freiburg', name: 'Freiburg', path: '/freiburg/' },
  { id: 'erasmusmc', name: 'Erasmus MC', path: '/erasmusmc/' },
  { id: 'belgium', name: 'VIB (Belgium)', path: '/belgium/' },
  { id: 'pasteur', name: 'Pasteur', path: '/pasteur/' },
  { id: 'elixir-it', name: 'ELIXIR-IT', path: '/elixir-it/' },
  { id: 'ifb', name: 'ELIXIR-FR/IFB', path: '/ifb/' },
] as const;

export type SubsiteId = typeof subsites[number]['id'];

// Current subsite state
export const currentSubsite = atom<SubsiteId>('global');

// Computed: get current subsite info
export const currentSubsiteInfo = computed(currentSubsite, (id) => {
  return subsites.find(s => s.id === id) ?? subsites[0];
});

// Computed: is current subsite external?
export const isExternalSubsite = computed(currentSubsiteInfo, (info) => {
  return 'external' in info && !!info.external;
});

// Helper: set subsite
export function setSubsite(id: SubsiteId) {
  const subsite = subsites.find(s => s.id === id);
  if (subsite) {
    if ('external' in subsite && subsite.external) {
      // External subsites redirect
      window.location.href = subsite.external;
    } else {
      currentSubsite.set(id);
    }
  }
}

// Helper: detect subsite from URL path
export function detectSubsiteFromPath(path: string): SubsiteId {
  for (const subsite of subsites) {
    if (subsite.path && subsite.path !== '/' && path.startsWith(subsite.path)) {
      return subsite.id;
    }
  }
  return 'global';
}
