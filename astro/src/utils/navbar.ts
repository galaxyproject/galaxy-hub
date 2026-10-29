import { type SubsiteId } from '../stores/subsiteStore';

export interface NavbarItem {
  label: string;
  target?: string;
  relativeTo?: string;
  contents?: NavbarItem[];
  external?: boolean;
}

export interface NavbarData {
  style?: string | null;
  left?: NavbarItem[] | null;
  right?: NavbarItem[] | null;
}

/** Region links belong to the current subsite; everything else is global. */
export type NavScope = 'region' | 'global';

export interface SidebarLink {
  label: string;
  href: string;
  external?: boolean;
  scope: NavScope;
}

export interface SidebarSection {
  title: string;
  items: SidebarLink[];
}

export interface SidebarNavigation {
  topLinks: SidebarLink[];
  sections: SidebarSection[];
  bottomLinks: SidebarLink[];
}

export interface SidebarGroups {
  /** Links of the current region, overview first; empty outside a region. */
  region: SidebarLink[];
  /** Global links and collapsible sections, without the region links. */
  global: SidebarNavigation;
}

const DEFAULT_TOP_LINKS: SidebarLink[] = [
  { label: 'News', href: '/news/', scope: 'global' },
  { label: 'Events', href: '/events/', scope: 'global' },
];

const DEFAULT_SECTIONS: SidebarSection[] = [
  {
    title: 'Help',
    items: [
      { label: 'Get Started', href: '/get-started/', scope: 'global' },
      { label: 'Training', href: '/learn/', scope: 'global' },
      { label: 'FAQ', href: '/support/', scope: 'global' },
      { label: 'Galaxy Help Forum', href: 'https://help.galaxyproject.org/', external: true, scope: 'global' },
    ],
  },
  {
    title: 'Community',
    items: [
      { label: 'The Galaxy Community', href: '/community/', scope: 'global' },
      { label: 'Governance', href: '/community/governance/', scope: 'global' },
      { label: 'Special Interest Groups', href: '/community/sig/', scope: 'global' },
      { label: 'Working Groups', href: '/community/wg/', scope: 'global' },
      { label: 'How to Contribute', href: '/community/contributing/', scope: 'global' },
      { label: 'Hall of Fame', href: '/hall-of-fame/', scope: 'global' },
      {
        label: 'Galaxy Mentor Network',
        href: 'https://galaxy-mentor-network.netlify.app/',
        external: true,
        scope: 'global',
      },
      { label: 'Code of Conduct', href: '/community/coc/', scope: 'global' },
    ],
  },
  {
    title: 'About',
    items: [
      { label: 'Platforms', href: '/use/', scope: 'global' },
      { label: 'Careers', href: '/careers/', scope: 'global' },
      { label: 'Statistics', href: '/galaxy-project/statistics/', scope: 'global' },
      { label: 'Mailing Lists', href: '/mailing-lists/', scope: 'global' },
      { label: 'Publications', href: '/publication-library/', scope: 'global' },
      { label: 'Citing Galaxy', href: '/citing-galaxy/', scope: 'global' },
      { label: 'Branding', href: '/images/galaxy-logos/', scope: 'global' },
      { label: 'Roadmap', href: '/roadmap/', scope: 'global' },
    ],
  },
  {
    title: 'Applications',
    items: [
      { label: 'COVID-19', href: '/projects/covid19/', scope: 'global' },
      { label: 'Monkeypox', href: '/projects/mpxv/', scope: 'global' },
      { label: 'VGP', href: '/projects/vgp/', scope: 'global' },
      { label: 'BRC Analytics', href: 'https://brc-analytics.org/', external: true, scope: 'global' },
      { label: 'Agentic Galaxy', href: '/agents/', scope: 'global' },
    ],
  },
];

const DEFAULT_BOTTOM_LINKS: SidebarLink[] = [
  { label: '@jxtx Foundation', href: 'https://jxtxfoundation.org/', external: true, scope: 'global' },
];

function normalizeHref(href: string): string {
  if (!href) return href;
  return href.startsWith('/') || href.startsWith('http') ? href : `/${href}`;
}

function prefixSubsiteHref(href: string, subsite: SubsiteId): string {
  if (!href || href.startsWith('http') || href.startsWith('#') || subsite === 'global') {
    return href;
  }

  const cleanHref = href.startsWith('/') ? href : `/${href}`;
  const subsitePrefix = `/${subsite}/`;

  if (cleanHref.startsWith(subsitePrefix) || cleanHref === `/${subsite}`) {
    return cleanHref;
  }
  return `/${subsite}${cleanHref}`;
}

function resolveNavbarHref(item: NavbarItem, subsite: SubsiteId): string | null {
  const target = item.target?.trim();
  if (!target) return null;

  if (item.external || /^https?:/i.test(target)) {
    return target;
  }

  const normalized = normalizeHref(target);
  if (item.relativeTo === 'subsite') {
    return prefixSubsiteHref(normalized, subsite);
  }

  return normalized;
}

function isRegionHref(href: string, subsite: SubsiteId): boolean {
  if (subsite === 'global') return false;
  return href === `/${subsite}` || href.startsWith(`/${subsite}/`);
}

function flattenNavbarItem(item: NavbarItem, subsite: SubsiteId): SidebarLink | null {
  const href = resolveNavbarHref(item, subsite);
  if (!href) return null;
  const isExternal = item.external || /^https?:/i.test(href);
  return {
    label: item.label,
    href,
    external: isExternal,
    scope: !isExternal && isRegionHref(href, subsite) ? 'region' : 'global',
  };
}

export function navbarToSidebarNavigation(
  navbar: NavbarData | null | undefined,
  subsite: SubsiteId
): SidebarNavigation | null {
  if (!navbar) return null;

  const topLinks = (navbar.left || []).map((item) => flattenNavbarItem(item, subsite)).filter(Boolean) as SidebarLink[];
  const sections = (navbar.right || [])
    .filter((item) => Array.isArray(item.contents) && item.contents.length > 0)
    .map((item) => ({
      title: item.label,
      items: (item.contents || [])
        .map((content) => flattenNavbarItem(content, subsite))
        .filter(Boolean) as SidebarLink[],
    }))
    .filter((section) => section.items.length > 0);

  const bottomLinks = (navbar.right || [])
    .filter((item) => !item.contents || item.contents.length === 0)
    .map((item) => flattenNavbarItem(item, subsite))
    .filter(Boolean) as SidebarLink[];

  return {
    topLinks: topLinks.length > 0 ? topLinks : DEFAULT_TOP_LINKS,
    sections: sections.length > 0 ? sections : DEFAULT_SECTIONS,
    bottomLinks: bottomLinks.length > 0 ? bottomLinks : DEFAULT_BOTTOM_LINKS,
  };
}

/** Split the navigation into the region group (overview first) and the global group. */
export function groupSidebarNavigation(nav: SidebarNavigation, subsite: SubsiteId): SidebarGroups {
  if (subsite === 'global') return { region: [], global: nav };

  const isRegion = (link: SidebarLink) => link.scope === 'region';
  const region = [
    ...nav.topLinks.filter(isRegion),
    ...nav.sections.flatMap((section) => section.items.filter(isRegion)),
    ...nav.bottomLinks.filter(isRegion),
  ];
  const overviewHref = `/${subsite}/`;
  if (!region.some((link) => withTrailingSlash(link.href) === overviewHref)) {
    region.unshift({ label: 'Overview', href: overviewHref, scope: 'region' });
  }

  // Region pages always offer the global News and Events first, then the navbar's other global links
  const globalTop = [...DEFAULT_TOP_LINKS, ...nav.topLinks.filter((link) => !isRegion(link))].filter(
    (link, index, links) =>
      links.findIndex((other) => withTrailingSlash(other.href) === withTrailingSlash(link.href)) === index
  );
  return {
    region,
    global: {
      topLinks: globalTop,
      sections: nav.sections
        .map((section) => ({ ...section, items: section.items.filter((link) => !isRegion(link)) }))
        .filter((section) => section.items.length > 0),
      bottomLinks: nav.bottomLinks.filter((link) => !isRegion(link)),
    },
  };
}

export function getDefaultSidebarNavigation(): SidebarNavigation {
  return {
    topLinks: DEFAULT_TOP_LINKS,
    sections: DEFAULT_SECTIONS,
    bottomLinks: DEFAULT_BOTTOM_LINKS,
  };
}

function withTrailingSlash(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}

/** True when an internal nav link points at exactly the page being viewed (not a parent section). */
export function isCurrentPage(href: string, currentPath: string | undefined): boolean {
  if (!currentPath || !href.startsWith('/') || href.includes('#')) return false;
  return withTrailingSlash(href.split('?')[0]) === withTrailingSlash(currentPath);
}
