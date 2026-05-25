/**
 * Per-cycle snapshot loader. Pulls all release-guardians JSON files at build
 * time via Vite's `import.meta.glob` (eager) so each component just looks up
 * its version key — no async I/O at render time, no path-construction hazards.
 *
 * Snapshots are written by `src/build/release-guardians-sync-event.mjs`.
 */

export interface Actor {
    login: string;
    url: string;
    avatarUrl: string;
}

export interface GuardianPr {
    number: number;
    title: string;
    url: string;
    author: Actor | null;
    labels: string[];
    tease: string;
    guardian?: Actor | null;
}

export interface Snapshot {
    version: string;
    fetchedAt: string;
    dataUnavailable: boolean;
    config: {
        repo: string;
        testServer: string;
        matrixLink: string;
        meetingLink: string;
        meetingSchedule: string;
        testingLabel: string;
        inProgressLabel: string;
        completeLabel: string;
    };
    needsValidation: GuardianPr[];
    inProgress: GuardianPr[];
    complete: GuardianPr[];
}

export type SnapshotKind = "needsValidation" | "inProgress" | "complete";

// `eager: true` bundles all snapshots into the build graph so lookup is sync.
const snapshots = import.meta.glob<{ default: Snapshot }>("@/data/release-guardians/*.json", {
    eager: true,
});

/** Return the snapshot for the given release version, or null if missing. */
export function loadSnapshot(version: string): Snapshot | null {
    const key = `/src/data/release-guardians/${version}.json`;
    return snapshots[key]?.default ?? null;
}
