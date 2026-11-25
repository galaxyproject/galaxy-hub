/**
 * Image for a listing tile: the frontmatter `image`, else the first image in the body.
 * Preprocessing has already rewritten both to site paths (`/images/<slug>/...`). Only images the
 * site serves itself are used, so a listing never hotlinks third-party hosts. GIFs are skipped:
 * many are large animations. `accept` can reject more candidates (e.g. missing or large files).
 */

const IMAGE_EXT = /\.(avif|jpe?g|png|svg|webp)$/i;
// Markdown `![alt](src "title")` or `![alt](<src with spaces>)`, and HTML `<img ... src="...">`
const BODY_IMAGE = /!\[[^\]]*\]\(\s*(?:<([^>]+)>|([^)\s]+))|<img\b[^>]*?\ssrc=["']([^"']+)["']/gi;

function isSiteImage(src: string | null | undefined): src is string {
  if (!src || !src.startsWith('/') || src.startsWith('//')) return false;
  return IMAGE_EXT.test(src.split(/[?#]/)[0]);
}

export function listImage(
  image: string | null | undefined,
  body: string | null | undefined,
  accept: (src: string) => boolean = () => true
): string | undefined {
  if (isSiteImage(image) && accept(image)) return image;
  for (const match of (body ?? '').matchAll(BODY_IMAGE)) {
    const src = match[1] ?? match[2] ?? match[3];
    if (isSiteImage(src) && accept(src)) return src;
  }
  return undefined;
}
