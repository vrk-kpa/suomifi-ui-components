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

On release `develop` is merged to `master` and tagged with version. Release notes can be added to version via GitHub. We are mostly following [git flow](https://nvie.com/posts/a-successful-git-branching-model/).

Use semantic versioning to communicate the changes.

Minor versions and patches are only applied to the latest major version.

## Feature requests and bug reports

We are using GitHub Issues for bug tracking and feature request.

Before reporting a bug, please make sure you've searched exists issues to see if it has already been reported.
