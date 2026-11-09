import { describe, expect, it } from 'vitest';
import {
  countLabel,
  parseProjectFacts,
  projectDuration,
  projectHasEnded,
  projectStatus,
  statusBadgeLabel,
} from './projectFacts';

const esg = {
  title: 'EuroScienceGateway',
  status: 'ended',
  start_date: '2022-09-01',
  end_date: '2025-08-31',
  labels: ['EOSC', 'Horizon Europe'],
  programme: 'Horizon Europe',
  call: 'HORIZON-INFRA-2021-EOSC-01-04',
  grants: [
    { label: 'EU grant', id: '101057388', url: 'https://cordis.europa.eu/project/id/101057388' },
    { label: 'UKRI grant', id: '10038963', url: 'https://gtr.ukri.org/projects?ref=10038963' },
  ],
  logo_on_dark: '/images/projects/esg/eosc_euro_science_gateway_white.svg',
  funding_logo: '/images/projects/esg/images/EN-Funded by the EU-POS.png',
  funding_logo_alt: 'Funded by the European Union',
};

describe('parseProjectFacts', () => {
  it('reads the frontmatter fields', () => {
    const facts = parseProjectFacts(esg);
    expect(facts.status).toBe('ended');
    expect(facts.start?.toISOString()).toBe('2022-09-01T00:00:00.000Z');
    expect(facts.end?.toISOString()).toBe('2025-08-31T00:00:00.000Z');
    expect(facts.labels).toEqual(['EOSC', 'Horizon Europe']);
    expect(facts.programme).toBe('Horizon Europe');
    expect(facts.call).toBe('HORIZON-INFRA-2021-EOSC-01-04');
    expect(facts.grants).toHaveLength(2);
    expect(facts.grants[1]).toEqual({
      label: 'UKRI grant',
      id: '10038963',
      url: 'https://gtr.ukri.org/projects?ref=10038963',
    });
    expect(facts.fundingLogo).toEqual({
      src: '/images/projects/esg/images/EN-Funded by the EU-POS.png',
      alt: 'Funded by the European Union',
    });
  });

  it('accepts Date values, as YAML gives unquoted dates', () => {
    const facts = parseProjectFacts({ start_date: new Date('2022-09-01'), end_date: new Date('2025-08-31') });
    expect(facts.end?.toISOString()).toBe('2025-08-31T00:00:00.000Z');
  });

  it('reads dates only in the YYYY-MM-DD form', () => {
    const facts = parseProjectFacts({ start_date: '2022-09-01T00:00', end_date: '2025-08-31 extra' });
    expect(facts.start).toBeUndefined();
    expect(facts.end).toBeUndefined();
  });

  it('keeps a grant link only when it is a site path or an http(s) URL', () => {
    const facts = parseProjectFacts({
      grants: [
        { label: 'A', id: '1', url: '/projects/esg/' },
        { label: 'B', id: '2', url: 'http://example.org/grant' },
        { label: 'C', id: '3', url: 'javascript:alert(1)' },
        { label: 'D', id: '4', url: '//example.org/grant' },
        { label: 'E', id: '5', url: 'grant.html' },
        { label: 'F', id: '6', url: '/\\example.org/grant' },
      ],
    });
    expect(facts.grants.map((g) => g.url)).toEqual([
      '/projects/esg/',
      'http://example.org/grant',
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
    expect(facts.grants[2]).toEqual({ label: 'C', id: '3' });
  });

  it('drops missing or malformed fields instead of guessing', () => {
    const facts = parseProjectFacts({
      status: 'paused',
      start_date: 'soon',
      grants: [{ label: 'EU grant' }, 'x'],
      labels: 'EOSC',
    });
    expect(facts.status).toBeUndefined();
    expect(facts.start).toBeUndefined();
    expect(facts.end).toBeUndefined();
    expect(facts.grants).toEqual([]);
    expect(facts.labels).toEqual([]);
    expect(facts.fundingLogo).toBeUndefined();
    expect(facts.related).toEqual([]);
  });

  it('reads related projects with a label, name and link', () => {
    const facts = parseProjectFacts({
      related: [
        { label: 'Builds on', name: 'EuroScienceGateway', href: '/projects/esg/' },
        { label: 'Builds on', name: 'No link' },
        { label: 'Builds on', name: 'Script link', href: 'javascript:alert(1)' },
        { label: 'Builds on', name: 'Other host', href: '//example.org/' },
        'esg',
      ],
    });
    expect(facts.related).toEqual([{ label: 'Builds on', name: 'EuroScienceGateway', href: '/projects/esg/' }]);
  });
});

describe('projectHasEnded', () => {
  it('follows an explicit status', () => {
    expect(projectHasEnded(parseProjectFacts(esg), new Date('2024-01-01'))).toBe(true);
    expect(projectHasEnded(parseProjectFacts({ status: 'active', end_date: '2020-01-01' }), new Date())).toBe(false);
  });

  it('falls back to the end date when no status is set', () => {
    const facts = parseProjectFacts({ end_date: '2025-08-31' });
    expect(projectHasEnded(facts, new Date('2025-08-31T12:00:00Z'))).toBe(false);
    expect(projectHasEnded(facts, new Date('2025-09-01T00:00:00Z'))).toBe(true);
    expect(projectHasEnded(parseProjectFacts({}), new Date())).toBe(false);
  });
});

describe('projectStatus', () => {
  it('is unknown without a status or an end date', () => {
    expect(projectStatus(parseProjectFacts({}), new Date())).toBeUndefined();
    expect(projectStatus(parseProjectFacts({ start_date: '2022-09-01' }), new Date())).toBeUndefined();
  });

  it('follows the status, else the end date', () => {
    expect(projectStatus(parseProjectFacts({ status: 'active' }), new Date())).toBe('active');
    expect(projectStatus(parseProjectFacts({ end_date: '2025-08-31' }), new Date('2026-01-01'))).toBe('ended');
    expect(projectStatus(parseProjectFacts({ end_date: '2025-08-31' }), new Date('2025-01-01'))).toBe('active');
  });
});

describe('statusBadgeLabel', () => {
  it('is undefined when the status is unknown', () => {
    expect(statusBadgeLabel(parseProjectFacts({}), new Date())).toBeUndefined();
  });

  it('names the end month of an ended project', () => {
    expect(statusBadgeLabel(parseProjectFacts(esg), new Date('2026-10-29'))).toBe('Ended · Aug 2025');
  });

  it('says Ended without a date when the end date is unknown', () => {
    expect(statusBadgeLabel(parseProjectFacts({ status: 'ended' }), new Date())).toBe('Ended');
  });

  it('says Active for running projects', () => {
    expect(statusBadgeLabel(parseProjectFacts({ status: 'active' }), new Date())).toBe('Active');
  });
});

describe('projectDuration', () => {
  it('counts calendar months, both ends included', () => {
    expect(projectDuration(parseProjectFacts(esg))).toEqual({
      short: 'Sep 2022 – Aug 2025',
      long: 'September 2022 to August 2025',
      months: 36,
    });
  });

  it('is undefined without both dates', () => {
    expect(projectDuration(parseProjectFacts({ start_date: '2022-09-01' }))).toBeUndefined();
  });
});

describe('countLabel', () => {
  it('pluralises', () => {
    expect(countLabel(19, 'organisation')).toBe('19 organisations');
    expect(countLabel(1, 'organisation')).toBe('1 organisation');
  });
});
