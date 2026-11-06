/**
 * Pure text transforms behind `normalize-content.mjs` (content:lint runs them with --check).
 * No Node APIs here: the post creator page runs the same transforms in the browser, so the
 * files it builds already pass the check.
 */

/**
 * Apply a transform function only to text outside fenced code blocks.
 * Splits on ``` and ~~~ fences, transforms odd-indexed segments (outside),
 * and reassembles. This prevents modifying code examples.
 */
export function outsideCodeFences(content, fn) {
  // Split on fenced code block boundaries (``` or ~~~, with optional language)
  const parts = content.split(/^(```[^\n]*\n[\s\S]*?^```\s*$|^~~~[^\n]*\n[\s\S]*?^~~~\s*$)/m);
  // parts alternates: [outside, fence, outside, fence, ...]
  return parts.map((part, i) => (i % 2 === 0 ? fn(part) : part)).join('');
}

// ── Body transforms ─────────────────────────────────────────────────
// These are copied/adapted from preprocess.mjs to operate standalone.

export function stripVueArtifacts(content) {
  let processed = content;
  processed = processed.replace(/^import\s+\w+\s+from\s+['"][^'"]+['"];?\s*$/gm, '');
  processed = processed.replace(/\s:(\w+)="([^"]*)"/g, ' $1="$2"');
  return processed;
}

export function convertGridsomeSyntax(content) {
  let processed = content;
  processed = processed.replace(/<g-link/g, '<a');
  processed = processed.replace(/<\/g-link>/g, '</a>');
  processed = processed.replace(/<g-image/g, '<img');
  processed = processed.replace(/<\/g-image>/g, '');
  return processed;
}

export function convertKramdownAttributes(content) {
  let processed = content;

  // [content](url){: attributes }
  const linkWithAttrsRegex = /\[([^\]]*(?:\[[^\]]*\][^\]]*)*)\]\(([^)]+)\)\{:\s*([^}]+)\}/g;

  processed = processed.replace(linkWithAttrsRegex, (match, text, url, attrs) => {
    const classes = [];
    const otherAttrs = [];
    const attrParts = attrs.match(/(?:[^\s"]+|"[^"]*")+/g) || [];

    for (const part of attrParts) {
      if (part.startsWith('.')) {
        classes.push(part.slice(1));
      } else if (part.includes('=')) {
        otherAttrs.push(part);
      }
    }

    let anchor = `<a href="${url}"`;
    if (classes.length > 0) {
      anchor += ` class="${classes.join(' ')}"`;
    }
    for (const attr of otherAttrs) {
      anchor += ` ${attr}`;
    }
    anchor += `>${text}</a>`;
    return anchor;
  });

  // Block-level kramdown attributes like {:.table.table-striped}
  processed = processed.replace(/^\{:\.[\w.-]+\}\s*$/gm, '');

  return processed;
}

// ── MDX-compatibility transforms ────────────────────────────────────

/**
 * Self-close void HTML elements: <br> → <br />, <img src="x"> → <img src="x" />
 * MDX requires XHTML-style self-closing for void elements.
 * Note: `source` is omitted — it's technically a void HTML element (for media),
 * but our content uses `<source>` extensively in XML documentation (Galaxy tool
 * XML docs) where it's a container element. The two actual HTML media `<source>`
 * elements in content already have self-closing syntax.
 */
export function fixVoidElements(content) {
  const voidElements = ['br', 'hr', 'img', 'input', 'embed', 'track', 'wbr', 'area', 'base', 'col', 'meta', 'link'];
  return outsideCodeFences(content, (text) => {
    let result = text;
    for (const tag of voidElements) {
      result = result.replace(
        new RegExp(`<${tag}(\\s[^>]*[^/])?>`, 'gi'),
        (match, attrs) => `<${tag}${attrs || ''} />`
      );
    }
    return result;
  });
}

/**
 * Quote bare numeric attribute values: rowspan=3 → rowspan="3"
 * MDX/JSX requires all attribute values to be quoted.
 */
export function fixUnquotedAttributes(content) {
  return outsideCodeFences(content, (text) => {
    let result = text;
    let prev;
    do {
      prev = result;
      result = result.replace(/(\s)(\w+)=(\d+)(?=\s|>|\/)/g, '$1$2="$3"');
    } while (prev !== result);
    return result;
  });
}

/**
 * Convert markdown autolinks to standard link syntax:
 * <https://example.com> → [https://example.com](https://example.com)
 * MDX misinterprets angle-bracket URLs as JSX tags.
 */
export function fixAutolinks(content) {
  return outsideCodeFences(content, (text) => {
    return text.replace(/<(https?:\/\/[^\s>]+)>/g, '[$1]($1)');
  });
}

/**
 * Convert kebab-case/lowercase MDX component names to PascalCase.
 * MDX treats lowercase as HTML elements; PascalCase signals a component.
 */
export function fixComponentCase(content) {
  const componentMap = {
    'vega-embed': 'VegaEmbed',
    mastodon: 'Mastodon',
    'video-player': 'VideoPlayer',
    carousel: 'Carousel',
    'calendar-embed': 'CalendarEmbed',
    'markdown-embed': 'MarkdownEmbed',
    flickr: 'Flickr',
    supporters: 'Supporters',
    contacts: 'Contacts',
  };
  return outsideCodeFences(content, (text) => {
    let result = text;
    for (const [kebab, pascal] of Object.entries(componentMap)) {
      result = result.replace(new RegExp(`<${kebab}(\\s|>|\\/)`, 'gi'), `<${pascal}$1`);
      result = result.replace(new RegExp(`</${kebab}>`, 'gi'), `</${pascal}>`);
    }
    return result;
  });
}

// ── Font Awesome → Lucide Icon conversion ────────────────────────────

const FA_TO_LUCIDE = {
  'fa-laptop': 'laptop',
  'fa-laptop-code': 'code',
  'fa-external-link-alt': 'external-link',
  'fa-external-link': 'external-link',
  'fa-share-alt': 'share-2',
  'fa-exclamation-circle': 'alert-circle',
  'fa-exclamation-triangle': 'triangle-alert',
  'fa-info-circle': 'info',
  'fa-files-o': 'files',
  'fa-file': 'file',
  'fa-file-o': 'file',
  'fa-magic': 'wand-2',
  'fa-envelope': 'mail',
  'fa-video': 'video',
  'fa-video-camera': 'video',
  'fa-folder': 'folder',
  'fa-folder-o': 'folder',
  'fa-cog': 'settings',
  'fa-cogs': 'settings',
  'fa-pencil-alt': 'pencil',
  'fa-pencil': 'pencil',
  'fa-book': 'book',
  'fa-book-open': 'book-open',
  'fa-slideshare': 'presentation',
  'fa-chalkboard-teacher': 'presentation',
  'fa-question-circle': 'help-circle',
  'fa-question-circle-o': 'help-circle',
  'fa-list-ul': 'list',
  'fa-list-alt': 'list',
  'fa-mouse': 'mouse',
  'fa-copy': 'copy',
  'fa-check-square': 'square-check',
  'fa-check-square-o': 'square-check',
  'fa-tv': 'tv',
  'fa-comments-o': 'message-square',
  'fa-comment': 'message-circle',
  'fa-sync': 'refresh-cw',
  'fa-refresh': 'refresh-cw',
  'fa-keyboard': 'keyboard',
  'fa-eye': 'eye',
  'fa-caret-square-down': 'chevron-down',
  'fa-caret-left': 'chevron-left',
  'fa-graduation-cap': 'graduation-cap',
  'fa-bullseye': 'target',
  'fa-calendar': 'calendar',
  'fa-calendar-alt': 'calendar',
  'fa-cloud': 'cloud',
  'fa-coffee': 'coffee',
  'fa-wrench': 'wrench',
  'fa-fighter-jet': 'rocket',
  'fa-road': 'monitor',
  'fa-github': 'github',
  'fa-gitlab': 'code',
  'fa-twitter': 'twitter',
  'fa-linkedin': 'linkedin',
  'fa-whatsapp': 'message-circle',
  'fa-mastodon': 'message-circle',
  'fa-orcid': 'user',
  'fa-optin-monster': 'user',
  'fa-matrix': 'grid-3x3',
  'fa-topic': 'hash',
  'fa-rss': 'rss',
  'fa-bug': 'alert-circle',
  'fa-bullhorn': 'megaphone',
  'fa-search': 'search',
  'fa-upload': 'upload',
  'fa-download': 'download',
  'fa-database': 'database',
  'fa-server': 'server',
  'fa-cube': 'box',
  'fa-table': 'table',
  'fa-tags': 'tags',
  'fa-th': 'grid-3x3',
  'fa-columns': 'columns-3',
  'fa-sitemap': 'network',
  'fa-play-circle': 'play',
  'fa-times': 'x',
  'fa-times-circle': 'x-circle',
  'fa-minus-circle': 'minus-circle',
  'fa-plus': 'plus',
  'fa-plus-circle': 'plus-circle',
  'fa-bar-chart-o': 'bar-chart-3',
  'fa-trash-o': 'trash-2',
  'fa-floppy-o': 'save',
  'fa-user-friends': 'users',
  'fa-user-astronaut': 'user',
  'fa-hands-helping': 'hand-helping',
  'fa-rotate-270': 'rotate-ccw',
};

/**
 * Convert Font Awesome <i> tags and kramdown FA patterns to <Icon> components.
 * Handles: <i class="fa fa-xxx" aria-hidden="true"></i>
 *          [](){: .fa .fa-xxx style="..."}
 *          [](){:.fa .fa-xxx}
 */
export function convertFaToIcon(content) {
  return outsideCodeFences(content, (text) => {
    // Convert <i class="fa(s|r|b|l|d)? fa-xxx" ...></i> → <Icon name="xxx" />
    let result = text.replace(/<i\s+[^>]*class="([^"]*\bfa[sbrld]?\b[^"]*)"[^>]*><\/i>/gi, (match, classes) => {
      const styleClasses = ['fa-solid', 'fa-regular', 'fa-brands', 'fa-light', 'fa-duotone', 'fa-thin'];
      const allFaClasses = classes.match(/fa-[a-z0-9-]+/g) || [];
      const iconClass = allFaClasses.find((cls) => !styleClasses.includes(cls));
      if (!iconClass) return match;
      const lucideName = FA_TO_LUCIDE[iconClass];
      if (!lucideName) return match;
      return `<Icon name="${lucideName}" />`;
    });

    // Convert <a> tags with FA icon classes:
    // <a href="url" class="fa fa-xxx" target="_blank">text</a> →
    // <a href="url" target="_blank"><Icon name="xxx" /> text</a>
    // <a href="url" class="fa fa-xxx" target="_blank"></a> →
    // <a href="url" target="_blank"><Icon name="xxx" /></a>
    result = result.replace(
      /<a\s+([^>]*)class="([^"]*\bfa[sbrld]?\b[^"]*)"([^>]*)>([\s\S]*?)<\/a>/gi,
      (match, before, classes, after, text) => {
        const styleClasses = ['fa-solid', 'fa-regular', 'fa-brands', 'fa-light', 'fa-duotone', 'fa-thin'];
        const allFaClasses = classes.match(/fa-[a-z0-9-]+/g) || [];
        const iconClass = allFaClasses.find((cls) => !styleClasses.includes(cls));
        if (!iconClass) return match;
        const lucideName = FA_TO_LUCIDE[iconClass];
        if (!lucideName) return match;
        // Remove FA classes from the class attribute; if no classes remain, drop the attr
        const remainingClasses = classes
          .split(/\s+/)
          .filter((c) => !c.match(/^fa[sbrld]?$/) && !c.match(/^fa-/))
          .join(' ');
        const classAttr = remainingClasses ? ` class="${remainingClasses}"` : '';
        const icon = `<Icon name="${lucideName}" />`;
        const content = text.trim() ? `${icon} ${text.trim()}` : icon;
        return `<a ${before.trim()}${classAttr}${after}>${content}</a>`;
      }
    );

    // Convert kramdown: [](){: .fa .fa-xxx style="..."} → <Icon name="xxx" />
    // Also handles [](){:.fa .fa-xxx} (no space after colon)
    result = result.replace(
      /\[\]\(\)\{:?\s*\.fa[sbrld]?\s+\.(fa-[a-z0-9-]+)(?:\s+style="[^"]*")?\s*\}/g,
      (match, iconClass) => {
        const lucideName = FA_TO_LUCIDE[iconClass];
        if (!lucideName) return match;
        return `<Icon name="${lucideName}" />`;
      }
    );

    return result;
  });
}

/**
 * Convert Font Awesome icon references in frontmatter `icon:` fields to Lucide names.
 * Converts: icon: fas fa-graduation-cap → icon: graduation-cap
 */
export function convertFaToIconFrontmatter(fm) {
  return fm.replace(/^(icon:\s*)(?:fa[sbrld]?\s+)(fa-[a-z0-9-]+)\s*$/gm, (_match, prefix, iconClass) => {
    const lucideName = FA_TO_LUCIDE[iconClass];
    if (!lucideName) return _match;
    return `${prefix}${lucideName}`;
  });
}

// ── components: true sync ────────────────────────────────────────────

export const KNOWN_COMPONENTS = [
  'Icon',
  'VegaEmbed',
  'Mastodon',
  'VideoPlayer',
  'Carousel',
  'Flickr',
  'Supporters',
  'Contacts',
  'MarkdownEmbed',
  'CalendarEmbed',
  'Insert',
  'LatestFeeds',
  'CopyButton',
  'EuIntro',
  'ReleaseGuardiansSummary',
  'ReleaseGuardiansSection',
  'ReleaseGuardiansLabelPill',
  'ReleaseGuardiansCoordination',
  'ReleaseGuardiansPhase',
  'ReleaseGuardiansRecap',
  'CofestBoard',
  'CofestProject',
  'AgentShells',
  'HarnessGuides',
  'HarnessGuide',
  'AgenticStack',
  'AgentsLanding',
  'OrbitHero',
];

export function bodyHasComponents(body) {
  return outsideCodeFences(body, (text) => {
    for (const component of KNOWN_COMPONENTS) {
      const regex = new RegExp(`<${component}(\\s|>|\\/)`);
      if (regex.test(text)) return '__HAS_COMPONENT__';
    }
    return text;
  }).includes('__HAS_COMPONENT__');
}

/** Every body transform, in the order `normalize-content.mjs --all` applies them. */
export function normalizeBody(body) {
  return [
    stripVueArtifacts,
    convertGridsomeSyntax,
    convertKramdownAttributes,
    fixVoidElements,
    fixUnquotedAttributes,
    fixAutolinks,
    fixComponentCase,
    convertFaToIcon,
  ].reduce((text, transform) => transform(text), body);
}
