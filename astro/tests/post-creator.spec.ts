import { test, expect, type Page } from '@playwright/test';

async function openCreator(page: Page) {
  await page.goto('/hub/contributing/new/');
  // Wait for the Vue island to hydrate and the editor to load before typing
  await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
  await expect(page.locator('.cm-content')).toBeVisible();
}

/** Types into a picker and clicks the matching option. */
async function pick(page: Page, label: string, search: string, option: string | RegExp = search) {
  await page.getByRole('combobox', { name: label }).fill(search);
  await page.getByRole('option', { name: option, exact: typeof option === 'string' }).click();
}

async function fileText(page: Page) {
  await page.getByRole('tab', { name: 'File' }).click();
  return page.locator('[data-file-text]');
}

/** Fires a paste on the editor with the given clipboard contents. */
async function paste(page: Page, data: { html?: string; text?: string; png?: string }) {
  // Focus without clicking, so a selection made before the paste stays
  await page.locator('.cm-content').focus();
  await page.evaluate(({ html, text, png }) => {
    const transfer = new DataTransfer();
    if (html) transfer.setData('text/html', html);
    if (text) transfer.setData('text/plain', text);
    if (png) {
      const bytes = Uint8Array.from(atob(png), (c) => c.charCodeAt(0));
      transfer.items.add(new File([bytes], 'Screenshot 1.png', { type: 'image/png' }));
    }
    const event = new ClipboardEvent('paste', { clipboardData: transfer, bubbles: true, cancelable: true });
    document.querySelector('.cm-content')!.dispatchEvent(event);
  }, data);
}

// 1×1 transparent PNG
const PNG_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const PNG = Buffer.from(PNG_BASE64, 'base64');

test.beforeEach(async ({ page }) => {
  // Each test starts without a saved draft
  await page.addInitScript(() => {
    if (!sessionStorage.getItem('keep-draft')) localStorage.removeItem('galaxy-hub:post-creator-draft');
  });
});

test('post creator builds an event and a GitHub link for it', async ({ page }) => {
  await openCreator(page);
  await page.getByRole('button', { name: 'Event', exact: true }).click();
  await page.getByLabel('Title (required)').fill('Galaxy Day: "hands-on"');
  await page.getByLabel('Start date (required)').fill('2026-12-01');
  await page.getByLabel('Last day').fill('2026-12-02');
  await pick(page, 'Tags', 'training');
  await page.getByRole('checkbox', { name: /All European subsites/ }).check();
  await pick(page, 'Organisers', 'bgruening', /\(bgruening\)/);

  const file = await fileText(page);
  await expect(page.getByText('content/events/2026-12-01-galaxy-day-hands-on/index.md')).toBeVisible();
  await expect(file).toContainText(`title: 'Galaxy Day: "hands-on"'`);
  await expect(file).toContainText("end: '2026-12-02'");
  await expect(file).toContainText("tags: ['training']");
  await expect(file).toContainText("subsites: ['all-eu']");
  await expect(file).toContainText("organisers:\n    - 'bgruening'");

  const href = await page.getByRole('link', { name: 'Open on GitHub' }).getAttribute('href');
  const url = new URL(href!);
  expect(url.searchParams.get('filename')).toBe('content/events/2026-12-01-galaxy-day-hands-on/index.md');
  expect(url.searchParams.get('value')).toBe(await file.textContent());
});

test('post creator blocks the link until the form is valid', async ({ page }) => {
  await openCreator(page);
  await expect(page.getByText('Add a title.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open on GitHub' })).toBeDisabled();
});

test('post creator keeps new names and says where to add them', async ({ page }) => {
  await openCreator(page);
  await page.getByLabel('Title (required)').fill('First post');
  await pick(page, 'Tags', 'brand-new-tag', 'Add “brand-new-tag” as new');
  await pick(page, 'Authors', 'first-time-author', 'Add “first-time-author” as new');

  await expect(page.getByText('brand-new-tag (new)')).toBeVisible();
  await expect(await fileText(page)).toContainText("authorship:\n    - 'first-time-author'");
  const box = page.locator('[data-new-entries]');
  await expect(box).toContainText('- brand-new-tag');
  await expect(box).toContainText('first-time-author:\n  name: Your Name');
  await expect(box.getByRole('link', { name: /training-material/ })).toHaveAttribute(
    'href',
    'https://github.com/galaxyproject/training-material/edit/main/CONTRIBUTORS.yaml'
  );
  await expect(page.getByRole('link', { name: 'Open on GitHub' })).toBeVisible();
});

test('post creator turns a pasted document into Markdown', async ({ page }) => {
  await openCreator(page);
  // What Google Docs puts on the clipboard: a bold shell, styled spans, a link and an image
  await paste(page, {
    html:
      '<meta charset="utf-8"><b style="font-weight:normal" id="docs-internal-guid-1"><h2>Results</h2>' +
      '<p><span style="font-weight:700">Bold</span> and <span style="font-style:italic">italic</span> with ' +
      '<a href="https://galaxyproject.org">a link</a>.</p><ul><li>One</li><li>Two</li></ul>' +
      '<img src="https://lh3.googleusercontent.com/x"></b>',
    text: 'Results Bold and italic',
  });
  await expect(page.locator('[data-editor-notice]')).toContainText('1 image was left out');
  const file = await fileText(page);
  await expect(file).toContainText('## Results');
  await expect(file).toContainText('**Bold** and *italic* with [a link](https://galaxyproject.org).');
  await expect(file).toContainText('- One\n- Two');
  await expect(file).not.toContainText('googleusercontent');
});

test('post creator makes a link when a URL is pasted over selected text', async ({ page }) => {
  await openCreator(page);
  await page.locator('.cm-content').click();
  await page.keyboard.type('Read the docs');
  await page.keyboard.press('Shift+Home');
  await paste(page, { text: 'https://docs.galaxyproject.org' });
  await expect(await fileText(page)).toContainText('[Read the docs](https://docs.galaxyproject.org)');
});

test('post creator embeds a YouTube link and previews it', async ({ page }) => {
  await openCreator(page);
  await page.getByLabel('Title (required)').fill('Video');
  await page.getByRole('button', { name: 'Embed' }).click();
  await page.getByLabel('Link to embed').fill('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  await page.getByRole('button', { name: 'Insert', exact: true }).click();

  // The preview shows the same embed the published page shows
  await expect(
    page.locator('[data-preview] iframe[src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"]')
  ).toBeVisible();
  await expect(await fileText(page)).toContainText('src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"');
});

test('post creator checks text with components like the MDX build does', async ({ page }) => {
  await openCreator(page);
  await page.getByLabel('Title (required)').fill('Components');
  await page.locator('.cm-content').click();
  await page.keyboard.type('<Icon name="laptop" /> Laptop\n\nFewer than <500 samples');
  await expect(page.getByText('Line 3: A “<” here starts a tag.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open on GitHub' })).toBeDisabled();

  await page.keyboard.press('Control+a');
  await page.keyboard.type('<Icon name="laptop" /> Laptop\n\nFewer than 500 samples');
  await expect(page.getByText(/Line 3:/)).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Open on GitHub' })).toBeVisible();
  await expect(await fileText(page)).toContainText('components: true');
});

test('post creator adds images at the cursor and updates them in place', async ({ page }) => {
  await openCreator(page);
  await page.getByLabel('Title (required)').fill('Photos');
  await page
    .locator('input[type="file"]')
    .setInputFiles({ name: 'Team Photo.PNG', mimeType: 'image/png', buffer: PNG });

  const item = page.locator('[data-media-list] li');
  await expect(item).toContainText('team-photo.png');
  await expect(page.locator('[data-warnings]')).toContainText('Describe team-photo.png');
  await item.getByLabel('Alt text').fill('The team at work');
  await expect(page.locator('[data-preview] img[alt="The team at work"]')).toHaveAttribute('src', /^blob:/);

  await item.getByLabel('Caption (optional)').fill('Day one');
  await item.getByLabel(/Medium/).check();
  const file = await fileText(page);
  await expect(file).toContainText(
    '<figure>\n  <img src="./team-photo.png" alt="The team at work" width="600" />\n  <figcaption>Day one</figcaption>\n</figure>'
  );
  await expect(page.locator('[data-upload-flow]')).toContainText('index.md, team-photo.png');
  await expect(page.getByRole('link', { name: 'Open the upload page' })).toHaveAttribute(
    'href',
    /^https:\/\/github\.com\/galaxyproject\/galaxy-hub\/upload\/main\/content\/news\/\d{4}\/\d{4}-\d{2}-\d{2}-photos$/
  );
  // One upload: index.md and the image, under the names the text uses
  const downloads: { name: string; text: string }[] = [];
  page.on('download', async (d) =>
    downloads.push({
      name: d.suggestedFilename(),
      text: await (await d.createReadStream()).toArray().then((c) => Buffer.concat(c).toString()),
    })
  );
  await page.getByRole('button', { name: 'Save all files' }).click();
  await expect.poll(() => downloads.map((d) => d.name).sort()).toEqual(['index.md', 'team-photo.png']);
  expect(downloads.find((d) => d.name === 'index.md')!.text).toBe(await (await fileText(page)).textContent());
  await expect(item.getByRole('link', { name: 'Save as team-photo.png' })).toHaveAttribute(
    'download',
    'team-photo.png'
  );

  await item.getByRole('button', { name: 'Remove team-photo.png' }).click();
  await expect(file).not.toContainText('team-photo.png');
});

test('post creator takes pasted images', async ({ page }) => {
  await openCreator(page);
  await paste(page, { png: PNG_BASE64 });
  await expect(page.locator('[data-media-list] li')).toContainText('screenshot-1.png');
  await expect(await fileText(page)).toContainText('![](./screenshot-1.png)');
});

test('post creator offers outlines and restores a saved draft', async ({ page }) => {
  await openCreator(page);
  await page.getByLabel('Title (required)').fill('Recap of the training');
  await page.locator('[data-outlines]').getByRole('button', { name: 'Event recap' }).click();
  await expect(page.locator('.cm-content')).toContainText('## What we did');

  await page.evaluate(() => sessionStorage.setItem('keep-draft', '1'));
  await page.waitForTimeout(800); // autosave runs 500 ms after the last change
  await page.reload();
  await expect(page.locator('[data-draft]')).toContainText('Recap of the training');
  await page.getByRole('button', { name: 'Restore it' }).click();
  await expect(page.getByLabel('Title (required)')).toHaveValue('Recap of the training');
  await expect(page.locator('.cm-content')).toContainText('## What we did');

  await page.locator('[data-start-over]').click();
  await page.locator('[data-start-over]').click();
  await expect(page.getByLabel('Title (required)')).toHaveValue('');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('galaxy-hub:post-creator-draft'))).toBeNull();
});

test('post creator shows the social media post', async ({ page }) => {
  await openCreator(page);
  await page.getByLabel('Title (required)').fill('New release');
  await page.getByLabel('Short summary (tease)').fill('Galaxy 26.0 is out.');
  await page.getByRole('tab', { name: 'Social media' }).click();
  const social = page.locator('[data-social]');
  await expect(social).toContainText('Not posted to social media');
  await page.getByRole('checkbox', { name: /Global global/ }).check();
  await expect(social).not.toContainText('Not posted to social media');
  await expect(page.locator('[data-social-text]')).toHaveText(
    /^Galaxy 26\.0 is out\.\nhttps:\/\/galaxyproject\.org\/news\/\d{4}-\d{2}-\d{2}-new-release\/$/
  );
  await expect(social).toContainText('Fits Bluesky');
});

test('post creator editor behaves like a normal text box', async ({ page }) => {
  await openCreator(page);
  const scroller = page.locator('.cm-scroller');
  await scroller.scrollIntoViewIfNeeded();
  const box = (await scroller.boundingBox())!;
  // The typing cursor shows over the whole box, not just the first line
  const cursors = await page.evaluate(
    ({ x, ys }) => ys.map((y) => getComputedStyle(document.elementFromPoint(x, y)!).cursor),
    { x: box.x + box.width / 2, ys: [box.y + 10, box.y + box.height - 8] }
  );
  expect(cursors).toEqual(['text', 'text']);

  // Clicking the empty bottom of the box puts the cursor in the text
  await page.mouse.click(box.x + box.width / 2, box.y + box.height - 8);
  await page.keyboard.type('> A quote\n\nAfter the quote\n\n<figure>');
  await expect(await fileText(page)).toContainText('> A quote\n\nAfter the quote\n\n<figure>\n');
  await expect(page.locator('[data-file-text]')).not.toContainText('</figure>');
});

test('post creator makes large photos smaller', async ({ page }) => {
  await openCreator(page);
  // A 3000 × 2000 photo made in the browser
  const jpeg = await page.evaluate(async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 3000;
    canvas.height = 2000;
    const ctx = canvas.getContext('2d')!;
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = `hsl(${i * 37} 70% 50%)`;
      ctx.fillRect(Math.random() * 3000, Math.random() * 2000, 200, 200);
    }
    const blob = await new Promise<Blob>((r) => canvas.toBlob((b) => r(b!), 'image/jpeg', 0.95));
    const dataUrl = await new Promise<string>((r) => {
      const reader = new FileReader();
      reader.onload = () => r(reader.result as string);
      reader.readAsDataURL(blob);
    });
    return dataUrl.split(',')[1];
  });
  await page
    .locator('input[type="file"]')
    .setInputFiles({ name: 'big.jpg', mimeType: 'image/jpeg', buffer: Buffer.from(jpeg, 'base64') });
  const smaller = page.locator('[data-smaller]');
  await expect(smaller).toContainText('Resized from 3000 × 2000 px');
  await expect(smaller).toContainText('to 2400 × 1600 px');
  await expect(smaller).toContainText('Location and camera details are removed.');
  await smaller.getByLabel('Keep the original instead').check();
  await expect(page.locator('[data-media-list] li')).toContainText(/big\.jpg \d/);
});

test('post creator keeps the preview in place when a dropdown opens', async ({ page }) => {
  await openCreator(page);
  await page.getByRole('checkbox', { name: /Europe eu/ }).check();
  const trigger = page.getByRole('combobox', { name: 'Main subsite' });
  await trigger.scrollIntoViewIfNeeded();
  const side = page.locator('section[aria-labelledby="post-preview-heading"]');
  const before = (await side.boundingBox())!.y;
  await trigger.click();
  await expect(page.getByRole('option', { name: 'Europe' })).toBeVisible();
  expect(Math.abs((await side.boundingBox())!.y - before)).toBeLessThan(2);
});

test('post creator previews the text the way the site renders it', async ({ page }) => {
  await openCreator(page);
  await page.locator('.cm-content').click();
  await page.keyboard.type('## "Results"...\n\n| Sample | Reads |\n| - | - |\n| A | 10 |');
  const preview = page.locator('[data-preview]');
  // Typography, heading anchors and scrollable tables come from the site's own Markdown setup
  await expect(preview.locator('h2#results')).toHaveText('“Results”…');
  await expect(preview.locator('h2#results a.heading-anchor')).toHaveAttribute('href', '#results');
  await expect(preview.locator('table')).toBeVisible();
});
