import { getCollection } from 'astro:content';
import type { SubsiteId } from '@/stores/subsiteStore';
import type { NavbarData } from './navbar';

export async function getSubsiteNavbar(subsite: SubsiteId): Promise<NavbarData | null> {
  const navbars = await getCollection('navbars');
  const candidates = [`${subsite}/navbar`, `${subsite}`, `global/navbar`, 'global'];

  for (const candidate of candidates) {
    const entry = navbars.find((navbar) => navbar.id === candidate);
    if (entry) {
      return entry.data as NavbarData;
    }
  }

  return null;
}
