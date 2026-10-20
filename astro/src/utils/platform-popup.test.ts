import { describe, expect, it } from 'vitest';
import { platformPopupHtml } from './platform-popup';

const markup = '<img src=x onerror=alert(1)>';

describe('platformPopupHtml', () => {
  const html = platformPopupHtml({
    title: `Title ${markup}`,
    imageSrc: `/logo.png" onerror="alert(1)`,
    summaryText: `Summary ${markup}`,
    location: { city: `City ${markup}`, region: 'Region & co', country_name: `"Country"` },
    path: 'javascript:alert(1)',
  });

  it('escapes every interpolated field', () => {
    expect(html).not.toContain('<img src=x');
    expect(html).not.toContain('" onerror="');
    expect(html).toContain('<h6>Title &lt;img src=x onerror=alert(1)&gt;</h6>');
    expect(html).toContain('<p class="popup-summary">Summary &lt;img src=x onerror=alert(1)&gt;</p>');
    expect(html).toContain('City &lt;img src=x onerror=alert(1)&gt;, Region &amp; co, &quot;Country&quot;');
    expect(html).toContain('src="/logo.png&quot; onerror=&quot;alert(1)"');
    expect(html).toContain('alt="Title &lt;img src=x onerror=alert(1)&gt;"');
  });

  it('replaces a details link outside the allowlist with #', () => {
    expect(html).toContain('<a href="#" ');
    expect(html).not.toContain('javascript:');
  });

  it('keeps site paths and omits the logo and summary when absent', () => {
    const plain = platformPopupHtml({
      title: 'usegalaxy.eu',
      imageSrc: '',
      summaryText: '',
      location: { city: 'Freiburg', region: 'BW', country_name: 'Germany' },
      path: '/use/usegalaxy-eu/',
    });
    expect(plain).toContain('<a href="/use/usegalaxy-eu/" ');
    expect(plain).not.toContain('<img');
    expect(plain).not.toContain('popup-summary');
  });
});
