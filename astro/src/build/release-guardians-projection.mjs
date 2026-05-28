/**
 * Pure projection helpers for the Release Guardians sync pipeline.
 *
 * Extracted from the side-effecting sync script so the normalization shape
 * — raw GraphQL response → rendered snapshot — can be unit-tested without
 * touching the filesystem or the GitHub API.
 */

import { extractPlainTease } from './release-guardians-tease.mjs';

/** The actor who most recently applied the given label on this PR. */
export function findGuardian(pr, label) {
  const events = pr.labelingEvents.filter((e) => e.label === label);
  if (events.length === 0) return null;
  events.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return events[0].actor;
}

/** Attach the stable `github.com/<login>.png` avatar URL — bypasses GitHub's
 *  hash-suffixed `avatarUrl` which changes on every re-upload and would
 *  otherwise trigger a noise refresh PR every cycle. */
export function withStableAvatar(actor) {
  if (!actor) {
    return actor;
  }
  return { login: actor.login, url: actor.url, avatarUrl: `https://github.com/${actor.login}.png` };
}

/** Project a raw PR (from the GraphQL response) into the render-ready shape
 *  the components consume. Drops `body` and `labelingEvents` — they're
 *  machinery, not display data. */
export function projectPr(pr, excludedLabels, guardianLabel) {
  return {
    number: pr.number,
    title: pr.title,
    url: pr.url,
    author: withStableAvatar(pr.author),
    labels: pr.labels.filter((l) => !excludedLabels.has(l)),
    tease: extractPlainTease(pr.body),
    guardian: guardianLabel ? withStableAvatar(findGuardian(pr, guardianLabel)) : null,
  };
}

/** Split a flat list of PRs into the three render sections based on which
 *  workflow labels each carries. `complete` wins over `inProgress` if a PR
 *  happens to carry both. */
export function partitionPrs(prs, config) {
  const complete = prs.filter((p) => p.labels.includes(config.completeLabel));
  const inProgress = prs.filter(
    (p) => p.labels.includes(config.inProgressLabel) && !p.labels.includes(config.completeLabel)
  );
  const needsValidation = prs.filter(
    (p) => !p.labels.includes(config.inProgressLabel) && !p.labels.includes(config.completeLabel)
  );
  return { needsValidation, inProgress, complete };
}

/** Assemble the render-ready snapshot. `fetchedAt` is parameterised so tests
 *  can pin a fixed value. */
export function buildSnapshot(prs, config, fetchedAt) {
  const excludedLabels = new Set([config.testingLabel, config.inProgressLabel, config.completeLabel]);
  const { needsValidation, inProgress, complete } = partitionPrs(prs, config);
  return {
    version: config.releaseVersion,
    fetchedAt,
    needsValidation: needsValidation.map((p) => projectPr(p, excludedLabels, null)),
    inProgress: inProgress.map((p) => projectPr(p, excludedLabels, config.inProgressLabel)),
    complete: complete.map((p) => projectPr(p, excludedLabels, config.completeLabel)),
  };
}

/** Snapshot fingerprint excluding `fetchedAt` — used by the sync script to
 *  skip noise writes when only the timestamp would otherwise change. */
export function snapshotFingerprint(snapshot) {
  if (!snapshot) return null;
  const { needsValidation, inProgress, complete, version } = snapshot;
  return JSON.stringify({ version, needsValidation, inProgress, complete });
}
