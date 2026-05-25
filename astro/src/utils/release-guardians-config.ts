/**
 * Per-cycle constants for the Release Guardians initiative. Bump these when
 * a new release cycle starts — the page URL and code stay stable.
 *
 * The hub page (`/community/release-guardians/`) reads `testingLabel` /
 * `completeLabel` to build its live PR list. The sync-event script reads
 * `releaseVersion` / `testingStart` / `testingEnd` / `organisers` / `matrixLink`
 * to generate a matching event file in `src/content/events/` if missing.
 *
 * GitHub labels are the source of truth for PR validation; this file is the
 * source of truth for cycle metadata.
 */
export const RELEASE_GUARDIANS_CONFIG = {
    repo: "galaxyproject/galaxy",
    releaseVersion: "26.1",
    testingLabel: "release-testing-26.1",
    inProgressLabel: "release-testing-in-progress",
    completeLabel: "release-testing-complete",
    /** Testing window opens (ISO date, YYYY-MM-DD). */
    testingStart: "2026-06-01",
    /** Testing window closes (ISO date, YYYY-MM-DD). */
    testingEnd: "2026-06-05",
    /** GitHub handles of the cycle organisers. */
    organisers: ["guerler", "mvdbeek"],
    /** Matrix room for coordination chatter. */
    matrixLink: "https://matrix.to/#/%23galaxyproject_release-testing:gitter.im",
} as const;
