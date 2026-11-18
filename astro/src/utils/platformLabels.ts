const SCOPE_LABELS: Record<string, string> = {
  usegalaxy: 'UseGalaxy',
  domain: 'Domain specific',
  general: 'General purpose',
  'tool-publishing': 'Tool publishing',
  'academic-cloud': 'Academic cloud',
};

/** Sentence-case label for a platform `scope` slug; an unknown slug is spelled out, never shown raw. */
export function scopeLabel(scope: string): string {
  const known = SCOPE_LABELS[scope];
  if (known) return known;
  const text = scope.replace(/[-_]+/g, ' ').trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Two capital letters for a platform without a logo: first letters of two words, else the first two characters. */
export function platformInitials(title: string): string {
  const words = title
    .split(/\s+/)
    .map((word) => word.replace(/[^\p{L}\p{N}]/gu, ''))
    .filter(Boolean);
  const letters = words.length > 1 ? words[0][0] + words[1][0] : (words[0] ?? '').slice(0, 2);
  return letters ? letters.toUpperCase() : 'GX';
}

/** True for a site path (not a remote URL) whose name says "logo"; other images are figures or screenshots. */
export function isLogoPath(image: string | null | undefined): image is string {
  if (!image || !image.startsWith('/') || image.startsWith('//')) return false;
  return /logo/i.test(image);
}
