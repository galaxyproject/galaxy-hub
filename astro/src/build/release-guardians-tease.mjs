/**
 * Extract a plain-text "tease" sentence from a PR body for display on the
 * Release Guardians cards. Returns '' when no clean prose can be found.
 *
 * Exported as its own module so the sync script and the unit tests can both
 * use it without pulling in the sync script's side-effecting main().
 */

export const TEASE_MAX_WORDS = 50;

// Per-sentence markers — anything that signals markdown/HTML/link/image/ref
// inline. A sentence containing any of these is "dirty" and unprintable as
// plain text. Backticks (inline code like `data_collection`) are deliberately
// allowed through — they render as literal characters and remain readable.
export const SENTENCE_DIRTY = /<[^>]+>|\[[^\]]*\]\(|!\[|\*\*|__|~~|#\d|(^|\s)@\w|https?:\/\//;

// A line that looks like a markdown block element (header / blockquote /
// list / table / setext underline). When stripped, surrounding prose
// paragraphs become their own clean blocks.
export const STRUCTURAL_LINE = /^(#{1,6}\s|>\s|[-*+]\s|\d+\.\s|\|.*\||={3,}$|-{3,}$)/;

/**
 * Walk the PR description for the first clean sentence (no markdown, HTML,
 * links, refs, or images) and use it as the starting point. Keep accumulating
 * subsequent clean sentences until either a dirty sentence is hit or word
 * count reaches TEASE_MAX_WORDS. Returns '' if no clean starting sentence.
 */
export function extractPlainTease(body) {
    if (!body) return '';

    const stripped = body
        // Normalise CRLF / lone CR — GitHub returns mixed line endings.
        .replace(/\r\n?/g, '\n')
        // PR-template scaffolding is never user content.
        .replace(/<!--[\s\S]*?-->/g, '')
        // Multi-line code is too large + the wrong shape for a tease.
        .replace(/```[\s\S]*?```/g, '')
        // Replace structural lines with blanks so the prose around them
        // becomes its own paragraph after the `\n{2,}` paragraph split.
        .split('\n')
        .map((line) => (STRUCTURAL_LINE.test(line.trim()) ? '' : line))
        .join('\n')
        .trim();
    if (!stripped) return '';

    const paragraphs = stripped.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    for (const paragraph of paragraphs) {
        const flat = paragraph.replace(/\s+/g, ' ').trim();
        // Sentence split on terminator + space. Conservative — won't over-split
        // on "v1.0" or "Mr." but may under-split on missing terminators (fine).
        const sentences = flat.split(/(?<=[.!?])\s+/);
        const startIdx = sentences.findIndex((s) => !SENTENCE_DIRTY.test(s));
        if (startIdx === -1) continue;

        const out = [];
        let wordCount = 0;
        for (let i = startIdx; i < sentences.length; i++) {
            if (SENTENCE_DIRTY.test(sentences[i])) break;
            const words = sentences[i].split(/\s+/).filter(Boolean);
            const remaining = TEASE_MAX_WORDS - wordCount;
            if (words.length > remaining) {
                out.push(...words.slice(0, remaining));
                wordCount = TEASE_MAX_WORDS;
                break;
            }
            out.push(...words);
            wordCount += words.length;
            if (wordCount >= TEASE_MAX_WORDS) break;
        }
        if (out.length === 0) continue;
        return out.join(' ');
    }
    return '';
}
