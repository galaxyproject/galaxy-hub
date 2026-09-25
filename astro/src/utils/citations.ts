import fs from 'fs';
import path from 'path';
import { Cite } from '@citation-js/core';
import '@citation-js/plugin-bibtex';

export interface Citation {
  title?: string;
  authors?: string;
  year?: number;
  url?: string;
  raw: any;
}

function toYear(item: any) {
  const parts = item?.issued?.['date-parts']?.[0];
  if (Array.isArray(parts) && parts[0]) return parts[0];
  return undefined;
}

function toAuthors(item: any) {
  const authors = item?.author;
  if (!Array.isArray(authors)) return undefined;
  return authors
    .map((a) => {
      const family = a.family || a.literal || '';
      const given = a.given || '';
      return [family, given].filter(Boolean).join(', ');
    })
    .filter(Boolean)
    .join('; ');
}

function toUrl(item: any) {
  const doi = item?.DOI || item?.doi;
  if (doi) return `https://doi.org/${doi}`;
  if (item?.URL) return item.URL;
  if (item?.url) return item.url;
  return undefined;
}

export async function loadCitations(citationDir: string): Promise<{ exists: boolean; citations: Citation[] }> {
  try {
    await fs.promises.access(citationDir);
  } catch {
    return { exists: false, citations: [] };
  }

  const files = (await fs.promises.readdir(citationDir)).filter((f) => f.toLowerCase().endsWith('.bib'));
  if (files.length === 0) {
    return { exists: true, citations: [] };
  }

  const citations: Citation[] = [];
  for (const file of files) {
    const text = await fs.promises.readFile(path.join(citationDir, file), 'utf8');
    const cite = new Cite(text);
    for (const item of cite.data) {
      citations.push({
        title: item.title,
        authors: toAuthors(item),
        year: toYear(item),
        url: toUrl(item),
        raw: item,
      });
    }
  }

  citations.sort((a, b) => (b.year || 0) - (a.year || 0));
  return { exists: true, citations };
}

export function groupCitationsByYear(citations: Citation[]): { yearCounts: Record<string, number>; years: string[] } {
  const yearCounts = citations.reduce(
    (acc, citation) => {
      const key = citation.year ? String(citation.year) : 'unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  const years = Object.keys(yearCounts).sort((a, b) => {
    if (a === 'unknown') return 1;
    if (b === 'unknown') return -1;
    return Number(b) - Number(a);
  });
  return { yearCounts, years };
}
