// Subsite configuration for Galaxy Hub
// Ported from config.json

export const subsites = {
  default: 'global',
  
  // Subsites shown in navigation dropdown
  navbar: [
    'global',
    'us',
    'eu',
    'au',
    'freiburg',
    'erasmusmc',
    'belgium',
    'pasteur',
    'elixir-it',
    'ifb'
  ],
  
  // All subsites with their metadata
  all: {
    global: {
      name: 'Global',
      path: ''
    },
    us: {
      name: 'US',
      path: '/us'
    },
    eu: {
      name: 'Europe',
      path: '/eu'
    },
    freiburg: {
      name: 'Freiburg',
      path: '/freiburg'
    },
    erasmusmc: {
      name: 'Erasmus MC',
      path: '/erasmusmc'
    },
    belgium: {
      name: 'VIB',
      path: '/belgium'
    },
    pasteur: {
      name: 'Pasteur',
      path: '/pasteur'
    },
    genouest: {
      name: 'GenOuest',
      path: '/genouest'
    },
    'elixir-it': {
      name: 'ELIXIR-IT',
      path: '/elixir-it'
    },
    ifb: {
      name: 'ELIXIR-FR/IFB',
      path: '/ifb'
    },
    esg: {
      name: 'EuroScienceGateway',
      path: '/esg',
      custom: true
    },
    au: {
      name: 'Australia',
      path: '/au',
      external: 'https://site.usegalaxy.org.au'
    }
  },
  
  // Shorthand groups
  shorthands: {
    all: [
      'freiburg',
      'pasteur',
      'belgium',
      'ifb',
      'genouest',
      'erasmusmc',
      'elixir-it',
      'au',
      'eu',
      'us',
      'global'
    ],
    'all-eu': [
      'freiburg',
      'pasteur',
      'belgium',
      'ifb',
      'genouest',
      'erasmusmc',
      'elixir-it',
      'eu'
    ]
  }
};

// Helper functions
export function getSubsitePath(subsite) {
  if (!subsite || subsite === subsites.default) {
    return '';
  }
  return subsites.all[subsite]?.path || `/${subsite}`;
}

export function getSubsiteFromPath(pathname) {
  // Remove trailing slash
  const path = pathname.replace(/\/$/, '');
  
  // Check if path starts with a subsite
  for (const [key, config] of Object.entries(subsites.all)) {
    if (config.path && path.startsWith(config.path)) {
      return key;
    }
  }
  
  return subsites.default;
}

export function isValidSubsite(subsite) {
  return subsite && subsites.all.hasOwnProperty(subsite);
}

export function getSubsiteConfig(subsite) {
  return subsites.all[subsite] || subsites.all[subsites.default];
}

export function filterContentBySubsite(items, subsite) {
  if (!subsite || subsite === subsites.default) {
    // For global site, show items that include 'global' or 'all'
    return items.filter(item => 
      !item.data.subsites || 
      item.data.subsites.includes('global') ||
      item.data.subsites.includes('all')
    );
  }
  
  // For specific subsites, show items that include the subsite
  return items.filter(item => 
    item.data.subsites && 
    (item.data.subsites.includes(subsite) || item.data.subsites.includes('all'))
  );
}