import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';

// Datasets are keyed by file name across all of content/ (preprocess copies them flat), so a project's
// YAML files carry its id as a prefix and cannot collide with the next project's partners.yml.
const projectsDir = path.resolve(process.cwd(), '..', 'content', 'projects');

function projectYaml(): { project: string; file: string }[] {
  return fs
    .readdirSync(projectsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((dir) =>
      fs
        .readdirSync(path.join(projectsDir, dir.name))
        .filter((file) => /\.ya?ml$/.test(file))
        .map((file) => ({ project: dir.name, file }))
    );
}

describe('project datasets', () => {
  it('finds the project YAML files', () => {
    expect(projectYaml().map((entry) => entry.file)).toEqual(
      expect.arrayContaining(['esg-partners.yml', 'esg4stars-partners.yml'])
    );
  });

  it('prefixes every project YAML file with its project id', () => {
    const unprefixed = projectYaml().filter(({ project, file }) => !file.startsWith(`${project}-`));
    expect(unprefixed).toEqual([]);
  });
});
