import { detectSubsiteFromPath, subsiteLabels, subsites } from '../stores/subsiteStore';

/** Where a page sits: one hub region, the global project, or a project with its own pages. */
export type ContextKind = 'region' | 'global' | 'project';

export interface SiteContext {
  id: string;
  kind: ContextKind;
  /** Full name for the context header, e.g. "Galaxy Freiburg". */
  name: string;
  /** Short name for the mobile chip, e.g. "Freiburg". */
  shortName: string;
  /** Landing page of the context. */
  href: string;
}

export interface ContextMenuItem {
  id: string;
  name: string;
  meta: string;
  href: string;
  current: boolean;
  external?: boolean;
}

export interface ContextMenuGroup {
  label: string;
  items: ContextMenuItem[];
}

export const CONTEXT_KIND_LABELS: Record<ContextKind, string> = {
  region: 'Region',
  global: 'Global',
  project: 'Project',
};

// Global routes to the onboarding landing page instead of `/`.
const GLOBAL_CONTEXT: SiteContext = {
  id: 'global',
  kind: 'global',
  name: 'Galaxy Project',
  shortName: 'Global',
  href: '/get-started/',
};

// Projects that keep their own section under /projects/<id>/ and show as their own context.
const PROJECT_CONTEXTS: (SiteContext & { links: { label: string; href: string }[] })[] = [
  {
    id: 'esg',
    kind: 'project',
    name: 'EuroScienceGateway',
    shortName: 'ESG',
    href: '/projects/esg/',
    links: [
      { label: 'Overview', href: '/projects/esg/' },
      { label: 'News', href: '/projects/esg/news/' },
      { label: 'Past events', href: '/projects/esg/events/' },
    ],
  },
];

/** The URL decides the context; nothing is remembered between pages. */
export function contextFromPath(path: string): SiteContext {
  const project = PROJECT_CONTEXTS.find((entry) => path.startsWith(entry.href));
  if (project) {
    return { id: project.id, kind: project.kind, name: project.name, shortName: project.shortName, href: project.href };
  }

  const subsiteId = detectSubsiteFromPath(path);
  const subsite = subsites.find((entry) => entry.id === subsiteId);
  if (!subsite || subsite.id === 'global') return GLOBAL_CONTEXT;

  return {
    id: subsite.id,
    kind: 'region',
    name: subsiteLabels[subsite.id]?.title ?? `Galaxy ${subsite.name}`,
    shortName: subsite.name,
    href: subsite.path,
  };
}

/** Section links of a project context (empty for regions and global). */
export function projectLinks(contextId: string): { label: string; href: string }[] {
  return PROJECT_CONTEXTS.find((entry) => entry.id === contextId)?.links ?? [];
}

/** The sidebar persists across navigation only while the context stays the same. */
export function contextPersistKey(path: string): string {
  return `sidebar-${contextFromPath(path).id}`;
}

/** Entries of the region menu: global, the regions on this hub, then external Galaxy sites. */
export function contextMenuGroups(currentId: string): ContextMenuGroup[] {
  const hubRegions: ContextMenuItem[] = [];
  const externalSites: ContextMenuItem[] = [];

  for (const subsite of subsites) {
    if (subsite.id === 'global') continue;
    if ('external' in subsite && subsite.external) {
      externalSites.push({
        id: subsite.id,
        name: subsite.name,
        meta: new URL(subsite.external).host,
        href: subsite.external,
        current: false,
        external: true,
      });
    } else {
      hubRegions.push({
        id: subsite.id,
        name: subsite.name,
        meta: subsite.path,
        href: subsite.path,
        current: subsite.id === currentId,
      });
    }
  }

  return [
    {
      label: 'Global',
      items: [
        {
          id: GLOBAL_CONTEXT.id,
          name: GLOBAL_CONTEXT.name,
          meta: 'All regions',
          href: GLOBAL_CONTEXT.href,
          current: currentId === GLOBAL_CONTEXT.id,
        },
      ],
    },
    { label: 'Regions on this Hub', items: hubRegions },
    { label: 'Other Galaxy sites', items: externalSites },
  ];
}
