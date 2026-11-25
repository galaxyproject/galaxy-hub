/**
 * Build-time check that a site image URL is a file in the public folder and small enough for a
 * listing tile. Server-only (node:fs); pages pass it to `listImage()` as its predicate.
 */
import fs from 'node:fs';
import path from 'node:path';

/** Tile images above this size are skipped until listings get thumbnails. */
export const TILE_IMAGE_MAX_BYTES = 1024 * 1024;

export function servedImageCheck(
  publicDir = path.resolve(process.cwd(), 'public'),
  maxBytes = TILE_IMAGE_MAX_BYTES
): (src: string) => boolean {
  const root = path.resolve(publicDir);
  return (src) => {
    let urlPath: string;
    try {
      urlPath = decodeURIComponent(src.split(/[?#]/)[0]);
    } catch {
      return false;
    }
    // Resolve dot segments the way the browser does, inside the site root
    const file = path.join(root, path.posix.normalize(urlPath));
    if (!file.startsWith(root + path.sep)) return false;
    try {
      const stat = fs.statSync(file);
      return stat.isFile() && stat.size <= maxBytes;
    } catch {
      return false;
    }
  };
}
