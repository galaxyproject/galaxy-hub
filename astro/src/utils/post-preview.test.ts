import { describe, expect, it } from 'vitest';
import { renderPostBody } from './post-preview';
import { embedFor } from './post-creator';

describe('renderPostBody', () => {
  it('renders like the site: smart quotes, heading ids and anchors, wrapped tables', async () => {
    const html = await renderPostBody('## "Hi"...\n\n| A |\n| - |\n| 1 |');
    expect(html).toContain('<h2 id="hi">“Hi”…<a href="#hi" class="heading-anchor"');
    expect(html).toMatch(/<div[^>]*>\s*<table>/);
  });

  it('shifts headings when a body has several h1s, as the preprocessor does', async () => {
    expect(await renderPostBody('# One\n\n# Two')).toContain('<h2 id="one">');
  });

  it('keeps the HTML authors write and embeds, but not scripts or handlers', async () => {
    const html = await renderPostBody(
      '<div class="center" style="color: red">\n\nText\n\n</div>\n\n' +
        embedFor('https://youtu.be/dQw4w9WgXcQ')!.text +
        '\n\n<script>alert(1)</script><img src="https://x.org/a.png" onerror="alert(1)">'
    );
    expect(html).toContain('<div class="center" style="color: red">');
    expect(html).toContain('src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"');
    expect(html).not.toMatch(/<script|onerror|alert/);
  });

  it('shows local files and notes for components', async () => {
    const html = await renderPostBody('![Team](./team.png)\n\n![Other](./other.png)\n\n<Icon name="laptop" />', {
      slug: 'news/2026-11-06-team',
      files: { 'team.png': 'blob:http://x/1' },
    });
    // Files not added in the form get the path the published page uses
    expect(html).toContain('<img src="/images/news/2026-11-06-team/other.png" alt="Other" />');
    expect(html).toContain('<img src="blob:http://x/1" alt="Team" />');
    expect(html).toContain('<em>Icon: shown on the published page.</em>');
  });
});
