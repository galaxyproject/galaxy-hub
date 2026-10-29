/**
 * Which news posts and events belong to a project: those on its subsite (`subsites`), those with its
 * tag (`tags`), or either one when the project's `feed` frontmatter names both.
 */

export interface ProjectSource {
  subsite?: string;
  tag?: string;
}

type Listable = string[] | string | null | undefined;

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function includes(values: Listable, wanted: string): boolean {
  return Array.isArray(values) ? values.includes(wanted) : values === wanted;
}

/** The `feed` frontmatter of a project, or undefined when it names neither a subsite nor a tag. */
export function parseProjectSource(value: unknown): ProjectSource | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const entry = value as Record<string, unknown>;
  const subsite = text(entry.subsite);
  const tag = text(entry.tag);
  if (!subsite && !tag) return undefined;
  return { ...(subsite && { subsite }), ...(tag && { tag }) };
}

export function matchesProjectSource(data: { subsites?: Listable; tags?: Listable }, source: ProjectSource): boolean {
  return (
    (source.subsite !== undefined && includes(data.subsites, source.subsite)) ||
    (source.tag !== undefined && includes(data.tags, source.tag))
  );
}
