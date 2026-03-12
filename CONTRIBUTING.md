## Sending a pull request

We maintain two branches, `master` and `develop`. Send your pull requests to develop.

Create branches with prefixes such as `fix/` and `feature/`.

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment stating that you intend to work on it so other people don’t accidentally duplicate your effort.

If somebody claims an issue but doesn’t follow up for more than two weeks, it’s fine to take over it but you should still leave a comment.

We will review your pull request and either merge it, request changes to it, or close it with an explanation.

### Before submitting a pull request, please make sure the following is done:

1. Fork the repository and create your branch from proper branch.

2. Run `npm install` in the repository root.

3. If you’ve fixed a bug or added code that should be tested, add tests!

4. Ensure the test suite passes (`npm run test`)

5. Run `npm run test -u` to update jest snapshots. Commit any changes.

6. Make sure your code lints (`npm run test:lint`). Tip: Lint runs automatically when you build.

### Development workflow

See [DEVELOPMENT.md](/DEVELOPMENT.md).

## Releasing

We are mostly following [git flow](https://nvie.com/posts/a-successful-git-branching-model/). Use semantic versioning to communicate the changes. Minor versions and patches are only applied to the latest major version.

Publishing to npm is handled by a GitHub Actions workflow (`.github/workflows/release.yml`) that triggers automatically when the version in `package.json` changes on the `master` or `develop` branch. The workflow runs in a clean environment, validates and builds the package, and publishes it. **Never run `npm publish` manually from a developer machine.**

The workflow can also be triggered manually from **Actions → Publish to npm → Run workflow** in GitHub if needed (e.g. to retry a failed publish).

### Release notes

Include a `## Release notes` section in the version update PR description. The workflow extracts this section and uses it as the body of the GitHub Release. If no release notes section is found, GitHub's auto-generated release notes are used as a fallback.

### Stable release

1. Merge `develop` into `master`.
2. Bump the version in `package.json` (e.g. `18.1.0`).
3. Commit and push to `master` via a PR with a `## Release notes` section in the description.
4. The workflow will automatically validate, build, and publish the package as `latest` on npm. A GitHub Release will be created using the release notes from the PR.

### Beta release

1. Bump the version in `package.json` to a beta version (e.g. `18.1.0-beta.1`).
2. Commit and push to `develop` via a PR with a `## Release notes` section in the description.
3. The workflow will automatically publish the package under the `beta` dist-tag on npm (`npm install suomifi-ui-components@beta`). The GitHub Release will be marked as a pre-release.

### Setup

The workflow requires an `NPM_TOKEN` secret in the repository's GitHub Actions settings (`Settings → Secrets and variables → Actions`). Use a granular npm access token scoped to the `suomifi-ui-components` package with publish-only permissions.

## Feature requests and bug reports

We are using GitHub Issues for bug tracking and feature request.

Before reporting a bug, please make sure you've searched exists issues to see if it has already been reported.
