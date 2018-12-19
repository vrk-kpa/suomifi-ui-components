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

## Source

Source contains 3 stages of components:

1. `reset` is for resetting html tags (don't do too opinionated stuff here).
2. `components` are accessible/a11y version of components and HTML-semantics without Suomi.fi related.
3. `core` contains Suomi.fi-styleguide as theme, components and CSS exports.

_Export core-components at src/index._

**Don't do realtive imports from indexes, use original export locations.**

**Do not create duplication of source or styles for component, use syntax that can be used in exports.**

Export interfaces for exported functions/components. Typescript will generate declaration files from exported interfaces (.d.ts). Write comments/documentatiion to all properties that need to be shown at styleguide.

## Styling

- Use BEM naming convention with `fi-`-prefix:
  ```css
  .fi-block
  .fi-block--modifier
  .fi-block__element
  .fi-block__element--modifier
  ```
  and/or atom-classes:
  ```css
  .fi-block.fi-rounded
  .fi-block__element.fi-highlight
  ```
- All colors to theme
- Don't use relative units without a important reason
- All opinionated resets to **theme**

- Components' styles can be customized with [Styled Components](https://github.com/styled-components/styled-components) / [Emotion](https://github.com/emotion-js/emotion):

  ```javascript
  styled(Button)...
  ```

  and with CSS-ClassName:

  ```javascript
  <Button className="button--custom">Example</Button>
  ```

  ```css
  .fi-button.button--custom {
    ...;
  }
  ```

  Don't use ~~!important~~, if really needed - for specificity hack you can use `.fi-button.button--custom.button--custom {...}`

- TBD: CSS-exports
