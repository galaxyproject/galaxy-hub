/**
 * Serializes structured data for a `<script type="application/ld+json">` element. JSON.stringify
 * leaves `<` as is, so a string containing `</script>` would end the element early; `<` and the
 * U+2028/U+2029 line separators are written as JSON unicode escapes, which parse back unchanged.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(
    /[<\u2028\u2029]/g,
    (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`
  );
}
