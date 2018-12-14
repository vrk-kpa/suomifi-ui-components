# ⌨️ Development

After cloning suomifi-ui-components, run `yarn` to fetch its dependencies. Then, you can run several commands:

1. `yarn start` runs Styleguidist for displaying components stories.

2. `yarn test` runs written tests.

3. `yarn test:lint` checks TypeScript code for readability, maintainability, and functionality errors.

4. `yarn prettier:check` checks the code style.

5. `yarn prettier` write the code style fixes to all src-files.

6. `yarn validate` runs the complete test suite.

7. `yarn build` compiles TypeScript code to the dist directory.

8. `yarn styleguide:build` compiles static version of Styleguide to the styleguide directory.

9. `yarn bundle-analyzer` shows analyzation of bundle size.

## Styling

Source contains 3 stages of components:

1. `reset` is for resetting html tags (don't do too opinionated stuff here).
2. `components` are accessible/a11y version of components and HTML-semantics without Suomi.fi related.
3. `core` contains Suomi.fi-styleguide as theme, components and CSS exports.

_(Export core-components at src/index)_

- Use BEM naming convention with `fi-`-prefix:
  ```
  .fi-block
  .fi-block--modifier
  .fi-block__element
  .fi-block__element--modifier
  ```
  and/or atom-classes:
  ```
  .fi-block.fi-rounded
  .fi-block__element.fi-highlight
  ```
- All colors to theme
- Don't use relative units without a cause
- All opinionated resets to theme

- TBD: CSS-exports
- TBD: customizing or extending components' styles.
