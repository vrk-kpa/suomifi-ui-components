## Sending a pull request

We maintain two branches, `master` and `develop`. Send your pull requests to develop.

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment stating that you intend to work on it so other people don’t accidentally duplicate your effort.

If somebody claims an issue but doesn’t follow up for more than two weeks, it’s fine to take over it but you should still leave a comment.

We will review your pull request and either merge it, request changes to it, or close it with an explanation.

### Before submitting a pull request, please make sure the following is done:

1. Fork the repository and create your branch from proper branch.

2. Run `yarn` in the repository root.

3. If you’ve fixed a bug or added code that should be tested, add tests!

4. Ensure the test suite passes (`yarn test`)

- [ ] TODO: 5. Run `yarn test -- -u` to update jest snapshot and commit these changes as well (if has).

TODO: Make sure your code lints (yarn lint). Tip: Lint runs automatically when you build.

### Development workflow

After cloning suomifi-ui-components, run `yarn` to fetch its dependencies. Then, you can run several commands:

1. `yarn start` runs Storybook for displaying components stories.

2. `yarn test` runs written tests.

3. `yarn test:lint` checks TypeScript code for readability, maintainability, and functionality errors.

4. `yarn prettier:check` checks the code style.

5. `yarn prettier` write the code style fixes to all src-files.

6. `yarn validate` runs the complete test suite.

7. `yarn build` compiles TypeScript code to the dist directory.

8. `yarn build-storybook` compiles static version of storybook to the storybook-static directory.

## Releasing

On release `develop` is merged to `master` and tagged with version. Releasenotes can be added to version via Github.

If API changes are approved to `develop`, release deprecation warning to `master` and rebase `master` to `develop`.

## Bugs

We are using GitHub Issues for bug tracing.

Before you reporting a bug, please make sure you've searched exists issues.

## Proposing a change

If you intend to change the public API or introduce new feature, contact [VRK organization](https://github.com/vrk-kpa) design processes or create a feature request issue.
