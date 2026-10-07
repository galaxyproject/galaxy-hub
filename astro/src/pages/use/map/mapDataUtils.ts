import type { CollectionEntry } from 'astro:content';
import { loadDesignations, normalizeUrl } from '../../../utils/designations';
import { loadDomains } from '../../../utils/domains';

export interface MapPlatform {
  slug: string;
  title: string;
  url: string | null | undefined;
  scope: string | null | undefined;
  summary: string | null | undefined;
  platforms: any;
  image: string | null | undefined;
  domains: any[];
  path: string;
  images: Record<string, unknown>;
}

/**
 * Filter platforms to only operative ones based on designations.csv
 */
export function filterOperativePlatforms(platforms: CollectionEntry<'platforms'>[]): CollectionEntry<'platforms'>[] {
  const designations = loadDesignations();

  return platforms.filter((platform) => {
    const platformUrl = platform.data.url;
    if (!platformUrl) return false;

    const normalizedUrl = normalizeUrl(platformUrl);
    const designation = designations.get(normalizedUrl);

    // Broadly match where Operative not listed or Operative=1
    return (
      !designation ||
      designation.operative === null ||
      designation.operative === undefined ||
      String(designation.operative) !== '0'
    );
  });
}

/**
 * Transform platforms to the format expected by map components
 */
export function prepareMapPlatformData(platforms: CollectionEntry<'platforms'>[]): MapPlatform[] {
  const operativePlatforms = filterOperativePlatforms(platforms);

  return operativePlatforms.map((p) => {
    const domains = filterOverridePlatforms(p, loadDomains(p.data.slug));
    return {
      slug: p.data.slug,
      title: p.data.title || 'Galaxy Server',
      url: p.data.url,
      scope: p.data.scope,
      summary: p.data.summary,
      platforms: p.data.platforms,
      image: p.data.image,
      domains: domains,
      path: `/use/${p.data.slug.replace(/^use\//, '')}`,
      images: {},
    };
  });
}

/**
 * Override platform owner changes where Domains location mapping is present
 */
export function filterOverridePlatforms(platform: CollectionEntry<'platforms'>, domains: any[]): any[] {
  const overridesByUrl = new Map(
    (platform.data.platforms ?? [])
      .filter((entry) => entry.platform_url)
      .map((entry) => [normalizeUrl(entry.platform_url!), entry])
  );

  return domains.map((domain) => {
    const override = domain.platform_url && overridesByUrl.get(normalizeUrl(domain.platform_url));

    return override
      ? {
          ...domain,
          ...(override.platform_location ? { platform_location: override.platform_location } : {}),
          ...(override.location ? { location: { ...domain.location, ...override.location } } : {}),
        }
      : domain;
  });
}
