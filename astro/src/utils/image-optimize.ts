/**
 * Shrinks photos for the post creator before authors upload them. The Hub serves images as they
 * are committed (CI only compresses losslessly), so a 4000 px phone photo stays several MB.
 * Re-encoding through a canvas also drops metadata such as the GPS location. Browser only.
 */

// shortcut: one size for all; posters with small print may want the original (authors can keep it)
export const MAX_SIDE = 2400;
const QUALITY = 0.85;

export interface OptimizedImage {
  blob: Blob;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
}

/** A smaller copy of the image, or null when it cannot be made smaller (or is SVG/GIF). */
export async function optimizeImage(file: File): Promise<OptimizedImage | null> {
  const type = file.type === 'image/jpg' ? 'image/jpeg' : file.type;
  // SVG is already small and sharp; GIFs may be animated
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(type)) return null;
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    return null;
  }
  const { width: originalWidth, height: originalHeight } = bitmap;
  const scale = Math.min(1, MAX_SIDE / Math.max(originalWidth, originalHeight));
  // PNG re-encoding is lossless, so only a resize can make it smaller
  if (type === 'image/png' && scale === 1) {
    bitmap.close();
    return null;
  }
  const width = Math.round(originalWidth * scale);
  const height = Math.round(originalHeight * scale);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, QUALITY));
  // Keep the original unless the copy saves at least a tenth
  if (!blob || blob.size > file.size * 0.9) return null;
  return { blob, width, height, originalWidth, originalHeight };
}
