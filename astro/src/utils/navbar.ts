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

export interface SidebarLink {
  label: string;
  href: string;
  external?: boolean;
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

const DEFAULT_TOP_LINKS: SidebarLink[] = [
  { label: 'News', href: '/news/' },
  { label: 'Events', href: '/events/' },
];

const DEFAULT_SECTIONS: SidebarSection[] = [
  {
    title: 'Help',
    items: [
      { label: 'Get Started', href: '/get-started/' },
      { label: 'Training', href: '/learn/' },
      { label: 'FAQ', href: '/support/' },
      { label: 'Galaxy Help Forum', href: 'https://help.galaxyproject.org/', external: true },
    ],
  },
  {
    title: 'Community',
    items: [
      { label: 'The Galaxy Community', href: '/community/' },
      { label: 'Governance', href: '/community/governance/' },
      { label: 'Special Interest Groups', href: '/community/sig/' },
      { label: 'Working Groups', href: '/community/wg/' },
      { label: 'How to Contribute', href: '/community/contributing/' },
      { label: 'Hall of Fame', href: '/hall-of-fame/' },
      { label: 'Galaxy Mentor Network', href: 'https://galaxy-mentor-network.netlify.app/', external: true },
      { label: 'Code of Conduct', href: '/community/coc/' },
    ],
  },
  {
    title: 'About',
    items: [
      { label: 'Platforms', href: '/use/' },
      { label: 'Careers', href: '/careers/' },
      { label: 'Statistics', href: '/galaxy-project/statistics/' },
      { label: 'Mailing Lists', href: '/mailing-lists/' },
      { label: 'Publications', href: '/publication-library/' },
      { label: 'Citing Galaxy', href: '/citing-galaxy/' },
      { label: 'Branding', href: '/images/galaxy-logos/' },
      { label: 'Roadmap', href: '/roadmap/' },
    ],
  },
  {
    title: 'Applications',
    items: [
      { label: 'COVID-19', href: '/projects/covid19/' },
      { label: 'Monkeypox', href: '/projects/mpxv/' },
      { label: 'VGP', href: '/projects/vgp/' },
      { label: 'BRC Analytics', href: 'https://brc-analytics.org/', external: true },
    ],
  },
];

const DEFAULT_BOTTOM_LINKS: SidebarLink[] = [
  { label: '@jxtx Foundation', href: 'https://jxtxfoundation.org/', external: true },
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

function flattenNavbarItem(item: NavbarItem, subsite: SubsiteId): SidebarLink | null {
  const href = resolveNavbarHref(item, subsite);
  if (!href) return null;
  const isExternal = item.external || /^https?:/i.test(href);
  return {
    label: item.label,
    href,
    external: isExternal,
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

export function getDefaultSidebarNavigation(): SidebarNavigation {
  return {
    topLinks: DEFAULT_TOP_LINKS,
    sections: DEFAULT_SECTIONS,
    bottomLinks: DEFAULT_BOTTOM_LINKS,
  };
}
