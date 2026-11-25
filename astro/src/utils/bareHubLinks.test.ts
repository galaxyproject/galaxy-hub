import { describe, it, expect } from 'vitest';
import { absoluteHubHref, bareHubLinks } from './bareHubLinks';

describe('absoluteHubHref', () => {
  it('turns site paths into Hub URLs', () => {
    expect(absoluteHubHref('/projects/esg/')).toBe('https://galaxyproject.org/projects/esg/');
    expect(absoluteHubHref('/news/2026-10-esg4stars/?year=2026')).toBe(
      'https://galaxyproject.org/news/2026-10-esg4stars/?year=2026'
    );
  });

  it('leaves absolute URLs, anchors, protocol-relative and other schemes alone', () => {
    for (const href of ['https://cordis.europa.eu/', '#partners', '//cdn.example.org/x', 'mailto:a@b.c', '']) {
      expect(absoluteHubHref(href)).toBe(href);
    }
  });
});

describe('bareHubLinks', () => {
  it('makes Hub links absolute and opens them in a new tab', () => {
    expect(bareHubLinks('<a href="/projects/esg/">ESG</a>')).toBe(
      '<a href="https://galaxyproject.org/projects/esg/" target="_blank" rel="noopener">ESG</a>'
    );
  });

  it('opens untargeted external links in a new tab and keeps their rel', () => {
    expect(bareHubLinks('<a class="x" href="https://cordis.europa.eu/" rel="external">C</a>')).toBe(
      '<a class="x" href="https://cordis.europa.eu/" rel="external noopener" target="_blank">C</a>'
    );
  });

  it('keeps links that already set a target', () => {
    const html = '<a href="https://www.embl.org/" target="_blank" rel="noopener noreferrer">EMBL</a>';
    expect(bareHubLinks(html)).toBe(html);
  });

  it('leaves in-page anchors and mail links in place', () => {
    const html = '<a href="#partners">13</a> <a href="mailto:a@b.c">mail</a>';
    expect(bareHubLinks(html)).toBe(html);
  });

  it('only touches the href attribute of anchors', () => {
    const html = '<img src="/images/logo.svg" alt=""><a data-href="/x/" title="a > b" href="/y/">y</a>';
    expect(bareHubLinks(html)).toBe(
      '<img src="/images/logo.svg" alt=""><a data-href="/x/" title="a > b" href="https://galaxyproject.org/y/" target="_blank" rel="noopener">y</a>'
    );
  });

  it('edits attributes by name, not text inside another quoted value', () => {
    expect(bareHubLinks(`<a title="it's href='/x' ok" href="/y">y</a>`)).toBe(
      `<a title="it's href='/x' ok" href="https://galaxyproject.org/y" target="_blank" rel="noopener">y</a>`
    );
    // a rel or target spelled inside another value is not the attribute
    expect(bareHubLinks('<a title="target=x rel=y" href="https://a.example/">a</a>')).toBe(
      '<a title="target=x rel=y" href="https://a.example/" target="_blank" rel="noopener">a</a>'
    );
  });

  it('keeps single-quoted and unquoted hrefs and their quotes', () => {
    expect(bareHubLinks(`<a href='/y/'>y</a>`)).toBe(
      `<a href='https://galaxyproject.org/y/' target="_blank" rel="noopener">y</a>`
    );
    expect(bareHubLinks('<a href=/y/>y</a>')).toBe(
      '<a href="https://galaxyproject.org/y/" target="_blank" rel="noopener">y</a>'
    );
    // an unquoted value ends at whitespace or `>`, so a query keeps its `=`
    expect(bareHubLinks('<a href=/x?a=b>x</a>')).toBe(
      '<a href="https://galaxyproject.org/x?a=b" target="_blank" rel="noopener">x</a>'
    );
  });

  it('leaves anchors inside script and style bodies alone', () => {
    const script = `<script>const s = '<a href="/x/">x</a>';</script>`;
    const style = '<style>a::after { content: "<a href=\'/z/\'>" }</style>';
    expect(bareHubLinks(`${script}${style}<a href="/y/">y</a>`)).toBe(
      `${script}${style}<a href="https://galaxyproject.org/y/" target="_blank" rel="noopener">y</a>`
    );
  });
});
