// Normalize a single URI segment using the same rules as slug-utils.mjs:
// camelCase/PascalCase split, underscore→hyphen, lowercase, collapse hyphens,
// apply known overrides. Letter↔digit boundaries are intentionally NOT split.
function normalizeSegment(s) {
  s = s.replace(/([a-z])([A-Z])/g, '$1-$2');
  s = s.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2');
  s = s.replace(/_/g, '-');
  s = s.toLowerCase();
  s = s.replace(/-{2,}/g, '-');

  // Inline slug-overrides.json — keeps CloudFront function self-contained
  var overrides = { 'rn-aseq': 'rnaseq', 'bia-py': 'biapy', 'ne-ic': 'neic', 'bio-m-ltool': 'bio-ml-tool', 'mi-rna': 'mirna', 'ma-gs': 'mags' };
  for (var key in overrides) {
    s = s.split(key).join(overrides[key]);
  }

  s = s.replace(/^-|-$/g, '');
  return s;
}

// Normalize a full URI path, segment by segment. Empty segments (from leading
// slash) and date-prefixed segments (YYYY-MM-DD-...) pass through unchanged.
function normalizeUri(uri) {
  var parts = uri.split('/');
  var normalized = parts.map(function (seg) {
    if (!seg || /^\d{4}-\d{2}-\d{2}-/.test(seg)) return seg;
    return normalizeSegment(seg);
  });
  return normalized.join('/');
}

function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // If the URI contains un-normalized segments (e.g. camelCase or underscores),
  // redirect immediately at the edge so the browser never sees a meta-refresh page.
  var normalizedUri = normalizeUri(uri);
  if (normalizedUri !== uri) {
    return {
      statusCode: 302,
      statusDescription: 'Found',
      headers: { location: { value: normalizedUri } },
    };
  }

  var patterns = [
    { pattern: "^/bushman/?$", target: "https://usegalaxy.org/bushman/" },
    { pattern: "^/learn/api/?$", target: "/develop/api/" },
    { pattern: "^/admin/api/?$", target: "/develop/api/" },
  ];

  for (var i = 0; i < patterns.length; i++) {
    var re = new RegExp(patterns[i].pattern);
    var m = uri.match(re);
    if (m) {
      var dest = patterns[i].target.replace("$1", m[1]);
      return {
        statusCode: 302,
        statusDescription: "Found",
        headers: { location: { value: dest } },
      };
    }
  }

  return request;
}
