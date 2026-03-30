// deploy/test-rewrites.js
const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Load and evaluate the CloudFront function
const functionCode = fs.readFileSync(path.join(__dirname, 'rewrites.js'), 'utf8');

// CloudFront functions don't use module.exports, so we need to eval it
// and extract the handler function
const handler = eval(`(function() { ${functionCode}; return handler; })()`);

// Helper to create test events
function createEvent(uri) {
  return {
    request: {
      uri: uri,
      method: 'GET',
      querystring: {},
      headers: {}
    }
  };
}

// Test suite
console.log('Running CloudFront Rewrite Function Tests...\n');

let passed = 0;
let failed = 0;

function test(description, testFn) {
  try {
    testFn();
    console.log(`✓ ${description}`);
    passed++;
  } catch (error) {
    console.log(`✗ ${description}`);
    console.log(`  Error: ${error.message}`);
    failed++;
  }
}

// Test 1: /bushman redirect
test('Redirects /bushman to https://usegalaxy.org/bushman/', () => {
  const event = createEvent('/bushman');
  const result = handler(event);
  assert.strictEqual(result.statusCode, 302);
  assert.strictEqual(result.headers.location.value, 'https://usegalaxy.org/bushman/');
});

// Test 2: /bushman/ redirect (with trailing slash)
test('Redirects /bushman/ to https://usegalaxy.org/bushman/', () => {
  const event = createEvent('/bushman/');
  const result = handler(event);
  assert.strictEqual(result.statusCode, 302);
  assert.strictEqual(result.headers.location.value, 'https://usegalaxy.org/bushman/');
});

// Test 3: /learn/api redirect
test('Redirects /learn/api to /develop/api/', () => {
  const event = createEvent('/learn/api');
  const result = handler(event);
  assert.strictEqual(result.statusCode, 302);
  assert.strictEqual(result.headers.location.value, '/develop/api/');
});

// Test 4: /learn/api/ redirect (with trailing slash)
test('Redirects /learn/api/ to /develop/api/', () => {
  const event = createEvent('/learn/api/');
  const result = handler(event);
  assert.strictEqual(result.statusCode, 302);
  assert.strictEqual(result.headers.location.value, '/develop/api/');
});

// Test 5: Non-matching URI passes through
test('Passes through non-matching URI /other/path', () => {
  const event = createEvent('/other/path');
  const result = handler(event);
  assert.strictEqual(result.uri, '/other/path');
  assert.strictEqual(result.statusCode, undefined);
});

// Test 6: Root path passes through
test('Passes through root path /', () => {
  const event = createEvent('/');
  const result = handler(event);
  assert.strictEqual(result.uri, '/');
  assert.strictEqual(result.statusCode, undefined);
});

// Test 7: /bushman with additional path should not match
test('Does not redirect /bushman/extra', () => {
  const event = createEvent('/bushman/extra');
  const result = handler(event);
  assert.strictEqual(result.uri, '/bushman/extra');
  assert.strictEqual(result.statusCode, undefined);
});

// Test 8: /learn/api with additional path should not match
test('Does not redirect /learn/api/extra', () => {
  const event = createEvent('/learn/api/extra');
  const result = handler(event);
  assert.strictEqual(result.uri, '/learn/api/extra');
  assert.strictEqual(result.statusCode, undefined);
});

// Slug normalization tests

// Test 9: camelCase segment normalizes
test('Redirects /use/GalaxyProject/ to /use/galaxy-project/', () => {
  const event = createEvent('/use/GalaxyProject/');
  const result = handler(event);
  assert.strictEqual(result.statusCode, 302);
  assert.strictEqual(result.headers.location.value, '/use/galaxy-project/');
});

// Test 10: underscore segment normalizes
test('Redirects /admin/galaxy_slots/ to /admin/galaxy-slots/', () => {
  const event = createEvent('/admin/galaxy_slots/');
  const result = handler(event);
  assert.strictEqual(result.statusCode, 302);
  assert.strictEqual(result.headers.location.value, '/admin/galaxy-slots/');
});

// Test 11: letter+digit identifiers pass through unchanged (no digit-split rule)
test('Passes through /events/gcc2026/ unchanged', () => {
  const event = createEvent('/events/gcc2026/');
  const result = handler(event);
  assert.strictEqual(result.uri, '/events/gcc2026/');
  assert.strictEqual(result.statusCode, undefined);
});

// Test 12: already-normalized slug passes through
test('Passes through /events/gcc-2026/ unchanged', () => {
  const event = createEvent('/events/gcc-2026/');
  const result = handler(event);
  assert.strictEqual(result.uri, '/events/gcc-2026/');
  assert.strictEqual(result.statusCode, undefined);
});

// Test 13: date-prefixed segment passes through unchanged
test('Passes through date-prefixed segment /events/2024-01-12-PAGconf/ unchanged', () => {
  const event = createEvent('/events/2024-01-12-PAGconf/');
  const result = handler(event);
  assert.strictEqual(result.uri, '/events/2024-01-12-PAGconf/');
  assert.strictEqual(result.statusCode, undefined);
});

// Summary
console.log(`\n${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}
