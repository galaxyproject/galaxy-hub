import { describe, expect, it } from 'vitest';

import {
  buildSnapshot,
  findGuardian,
  partitionPrs,
  projectPr,
  snapshotFingerprint,
  withStableAvatar,
} from './release-guardians-projection.mjs';

const CONFIG = {
  repo: 'galaxyproject/galaxy',
  releaseVersion: '26.1',
  testingLabel: 'release-testing-26.1',
  inProgressLabel: 'release-testing-in-progress',
  completeLabel: 'release-testing-complete',
};

describe('withStableAvatar', () => {
  it('returns null for null input', () => {
    expect(withStableAvatar(null)).toBeNull();
  });

  it('builds the github.com/<login>.png URL from login', () => {
    expect(withStableAvatar({ login: 'alice', url: 'https://github.com/alice' })).toEqual({
      login: 'alice',
      url: 'https://github.com/alice',
      avatarUrl: 'https://github.com/alice.png',
    });
  });

  it('drops any incoming avatarUrl in favor of the stable form', () => {
    const result = withStableAvatar({
      login: 'alice',
      url: 'https://github.com/alice',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
    });
    expect(result.avatarUrl).toBe('https://github.com/alice.png');
  });
});

describe('findGuardian', () => {
  const actorA = { login: 'alice', url: 'https://github.com/alice' };
  const actorB = { login: 'bob', url: 'https://github.com/bob' };

  it('returns null when no events at all', () => {
    expect(findGuardian({ labelingEvents: [] }, 'release-testing-in-progress')).toBeNull();
  });

  it('returns null when no event matches the label', () => {
    const pr = {
      labelingEvents: [{ createdAt: '2026-05-01T00:00:00Z', actor: actorA, label: 'other' }],
    };
    expect(findGuardian(pr, 'release-testing-in-progress')).toBeNull();
  });

  it('returns the actor of the single matching event', () => {
    const pr = {
      labelingEvents: [{ createdAt: '2026-05-01T00:00:00Z', actor: actorA, label: 'release-testing-in-progress' }],
    };
    expect(findGuardian(pr, 'release-testing-in-progress')).toEqual(actorA);
  });

  it('returns the most recent matching actor when multiple events exist', () => {
    const pr = {
      labelingEvents: [
        { createdAt: '2026-05-01T00:00:00Z', actor: actorA, label: 'release-testing-in-progress' },
        { createdAt: '2026-05-02T00:00:00Z', actor: actorB, label: 'release-testing-in-progress' },
      ],
    };
    expect(findGuardian(pr, 'release-testing-in-progress')).toEqual(actorB);
  });

  it('ignores events for other labels when picking the most recent', () => {
    const pr = {
      labelingEvents: [
        { createdAt: '2026-05-01T00:00:00Z', actor: actorA, label: 'release-testing-in-progress' },
        { createdAt: '2026-05-03T00:00:00Z', actor: actorB, label: 'other' },
      ],
    };
    expect(findGuardian(pr, 'release-testing-in-progress')).toEqual(actorA);
  });
});

describe('partitionPrs', () => {
  const pr = (number, ...labels) => ({ number, labels });

  it('places PRs with only the testing label in needsValidation', () => {
    const result = partitionPrs([pr(1, 'release-testing-26.1')], CONFIG);
    expect(result.needsValidation.map((p) => p.number)).toEqual([1]);
    expect(result.inProgress).toEqual([]);
    expect(result.complete).toEqual([]);
  });

  it('places PRs with the in-progress label in inProgress', () => {
    const result = partitionPrs([pr(1, 'release-testing-26.1', 'release-testing-in-progress')], CONFIG);
    expect(result.inProgress.map((p) => p.number)).toEqual([1]);
    expect(result.needsValidation).toEqual([]);
    expect(result.complete).toEqual([]);
  });

  it('places PRs with the complete label in complete', () => {
    const result = partitionPrs([pr(1, 'release-testing-26.1', 'release-testing-complete')], CONFIG);
    expect(result.complete.map((p) => p.number)).toEqual([1]);
    expect(result.needsValidation).toEqual([]);
    expect(result.inProgress).toEqual([]);
  });

  it('lets complete win when both in-progress and complete labels are present', () => {
    const result = partitionPrs(
      [pr(1, 'release-testing-26.1', 'release-testing-in-progress', 'release-testing-complete')],
      CONFIG
    );
    expect(result.complete.map((p) => p.number)).toEqual([1]);
    expect(result.inProgress).toEqual([]);
  });
});

describe('projectPr', () => {
  const excludedLabels = new Set(['release-testing-26.1', 'release-testing-in-progress', 'release-testing-complete']);
  const basePr = {
    number: 42,
    title: 'Fix the thing',
    url: 'https://github.com/galaxyproject/galaxy/pull/42',
    body: 'Replaces the old widget with a new one.',
    author: { login: 'alice', url: 'https://github.com/alice' },
    labels: ['release-testing-26.1', 'bug', 'area/jobs'],
    labelingEvents: [],
  };

  it('keeps user-facing labels and drops the workflow labels', () => {
    expect(projectPr(basePr, excludedLabels, null).labels).toEqual(['bug', 'area/jobs']);
  });

  it('extracts a tease from the body', () => {
    expect(projectPr(basePr, excludedLabels, null).tease).toBe('Replaces the old widget with a new one.');
  });

  it('attaches a stable avatar URL to the author', () => {
    expect(projectPr(basePr, excludedLabels, null).author).toEqual({
      login: 'alice',
      url: 'https://github.com/alice',
      avatarUrl: 'https://github.com/alice.png',
    });
  });

  it('returns null guardian when no guardianLabel is requested', () => {
    expect(projectPr(basePr, excludedLabels, null).guardian).toBeNull();
  });

  it('returns the guardian (with stable avatar) when a matching event exists', () => {
    const pr = {
      ...basePr,
      labelingEvents: [
        {
          createdAt: '2026-05-01T00:00:00Z',
          actor: { login: 'bob', url: 'https://github.com/bob' },
          label: 'release-testing-in-progress',
        },
      ],
    };
    expect(projectPr(pr, excludedLabels, 'release-testing-in-progress').guardian).toEqual({
      login: 'bob',
      url: 'https://github.com/bob',
      avatarUrl: 'https://github.com/bob.png',
    });
  });
});

describe('snapshotFingerprint', () => {
  it('returns null for null input', () => {
    expect(snapshotFingerprint(null)).toBeNull();
  });

  it('ignores fetchedAt — identical content with different timestamps fingerprint the same', () => {
    const snapshot = (fetchedAt) => ({
      version: '26.1',
      fetchedAt,
      needsValidation: [{ number: 1 }],
      inProgress: [],
      complete: [],
    });
    expect(snapshotFingerprint(snapshot('2026-05-01'))).toBe(snapshotFingerprint(snapshot('2026-05-02')));
  });

  it('changes when the partition contents change', () => {
    const a = {
      version: '26.1',
      fetchedAt: 'x',
      needsValidation: [{ number: 1 }],
      inProgress: [],
      complete: [],
    };
    const b = {
      version: '26.1',
      fetchedAt: 'x',
      needsValidation: [{ number: 2 }],
      inProgress: [],
      complete: [],
    };
    expect(snapshotFingerprint(a)).not.toBe(snapshotFingerprint(b));
  });

  it('changes when the version changes', () => {
    const a = { version: '26.1', fetchedAt: 'x', needsValidation: [], inProgress: [], complete: [] };
    const b = { version: '26.2', fetchedAt: 'x', needsValidation: [], inProgress: [], complete: [] };
    expect(snapshotFingerprint(a)).not.toBe(snapshotFingerprint(b));
  });
});

describe('buildSnapshot (end-to-end normalization)', () => {
  // Three PRs in the shape that `fetchPrs` produces — one for each section
  // of the snapshot. Locks the whole projection pipeline.
  const fixturePrs = [
    {
      number: 100,
      title: 'Replace widget',
      url: 'https://github.com/galaxyproject/galaxy/pull/100',
      updatedAt: '2026-05-15T12:00:00Z',
      body: 'Replaces the widget with the new one.',
      author: { login: 'alice', url: 'https://github.com/alice' },
      labels: ['release-testing-26.1', 'enhancement'],
      labelingEvents: [],
    },
    {
      number: 101,
      title: 'Validate this',
      url: 'https://github.com/galaxyproject/galaxy/pull/101',
      updatedAt: '2026-05-16T12:00:00Z',
      body: 'Adds a much-needed feature.',
      author: { login: 'bob', url: 'https://github.com/bob' },
      labels: ['release-testing-26.1', 'release-testing-in-progress'],
      labelingEvents: [
        {
          createdAt: '2026-05-16T13:00:00Z',
          actor: { login: 'carol', url: 'https://github.com/carol' },
          label: 'release-testing-in-progress',
        },
      ],
    },
    {
      number: 102,
      title: 'Already validated',
      url: 'https://github.com/galaxyproject/galaxy/pull/102',
      updatedAt: '2026-05-17T12:00:00Z',
      body: 'Fixes a bug in the importer.',
      author: { login: 'dave', url: 'https://github.com/dave' },
      labels: ['release-testing-26.1', 'release-testing-complete', 'bug'],
      labelingEvents: [
        {
          createdAt: '2026-05-17T15:00:00Z',
          actor: { login: 'eve', url: 'https://github.com/eve' },
          label: 'release-testing-complete',
        },
      ],
    },
  ];

  it('normalizes a fixture GraphQL response into the expected snapshot shape', () => {
    const snapshot = buildSnapshot(fixturePrs, CONFIG, '2026-05-27T00:00:00Z');
    expect(snapshot).toEqual({
      version: '26.1',
      fetchedAt: '2026-05-27T00:00:00Z',
      needsValidation: [
        {
          number: 100,
          title: 'Replace widget',
          url: 'https://github.com/galaxyproject/galaxy/pull/100',
          author: {
            login: 'alice',
            url: 'https://github.com/alice',
            avatarUrl: 'https://github.com/alice.png',
          },
          labels: ['enhancement'],
          tease: 'Replaces the widget with the new one.',
          guardian: null,
        },
      ],
      inProgress: [
        {
          number: 101,
          title: 'Validate this',
          url: 'https://github.com/galaxyproject/galaxy/pull/101',
          author: {
            login: 'bob',
            url: 'https://github.com/bob',
            avatarUrl: 'https://github.com/bob.png',
          },
          labels: [],
          tease: 'Adds a much-needed feature.',
          guardian: {
            login: 'carol',
            url: 'https://github.com/carol',
            avatarUrl: 'https://github.com/carol.png',
          },
        },
      ],
      complete: [
        {
          number: 102,
          title: 'Already validated',
          url: 'https://github.com/galaxyproject/galaxy/pull/102',
          author: {
            login: 'dave',
            url: 'https://github.com/dave',
            avatarUrl: 'https://github.com/dave.png',
          },
          labels: ['bug'],
          tease: 'Fixes a bug in the importer.',
          guardian: {
            login: 'eve',
            url: 'https://github.com/eve',
            avatarUrl: 'https://github.com/eve.png',
          },
        },
      ],
    });
  });

  it('produces a stable fingerprint regardless of fetchedAt', () => {
    const a = buildSnapshot(fixturePrs, CONFIG, '2026-05-27T00:00:00Z');
    const b = buildSnapshot(fixturePrs, CONFIG, '2026-05-28T00:00:00Z');
    expect(snapshotFingerprint(a)).toBe(snapshotFingerprint(b));
  });
});
