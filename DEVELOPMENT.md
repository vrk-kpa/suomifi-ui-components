# ⌨️ Development

[Styleguidist](https://github.com/styleguidist/react-styleguidist) for presenting components.

[tsdx](https://github.com/jaredpalmer/tsdx) and [eslint](https://eslint.org/).

For testing: [React-testing-library](https://github.com/kentcdodds/react-testing-library) run by [Jest](https://github.com/facebook/jest) with [ts-jest](https://github.com/kulshekhar/ts-jest) (code coverage with built-in [Istanbul](https://github.com/istanbuljs)). Code style with [Prettier](https://github.com/prettier/prettier).

After cloning suomifi-ui-components, run `yarn` to fetch its dependencies. Then, you can run several commands:

1. `yarn start` runs Styleguidist for displaying components stories.

2. `yarn test` runs written tests.

3. `yarn lint` checks TypeScript code for readability, maintainability, and functionality errors.

4. `yarn prettier:check` checks the code style.

5. `yarn prettier` write the code style fixes to all src-files.

6. `yarn validate` runs the complete test suite.

7. `yarn build` compiles TypeScript code to the dist directory.

8. `yarn styleguide:build` compiles static version of Styleguide to the styleguide directory.

9. `yarn bundle-analyzer` shows analyzation of bundle size.

❗️After you pull changes from the repo, remember to run `yarn` to make sure that you have all the needed dependencies installed on your setup.

## Source

Source contains 2 stages of components:

1. `reset` is for resetting html tag styles to avoid external styles affecting the components (don't do too opinionated stuff here).
2. `core` contains the actual components, theme and CSS exports.

- _Export `src/core`-components at `src/core/index` and `src/index`._

**Don't do relative imports from `src/index`, use those 2-levels export locations.**

**Do not create duplication of source or styles for component.**

Export interfaces for exported functions/components. Typescript will generate declaration files from exported interfaces (.d.ts). Write comments/documentation to all properties that need to be shown at styleguide.

### Props that are passed on to another component

```jsx
// destructure takeAway and takeAnother props and put rest of the props to passProps.
const { takeAwayProp, takeAnother: renamedAsProp, ...passprops } = withSuomifiDefaultProps(this.props);
const customProps = {
  takeAwayProp: !!takeAwayProp ? takeAwayProp : renamedAsProp,
  basedOnCondition: passProps.notTakenAwayProp ? 'one' : 'two',¨
};
return <Component {...passProps, customProps} />;

// Or something like
return <Component {...passProps}>
  <AnotherComponent wantProp={takeAwayProp} />
</Component>;
```

### `Styled components`-usage at `src/core`

```jsx
const StyledButton = styled(
  ({ ...passProps }: ButtonProps & InnerRef) => (
    <BaseButton {...passProps} />
  )
)`
  ${baseStyles}
`;
```

Syntax is based on:

```jsx
styled(Component)`
  color: black;
`;
```

## Styling

components will have `fi-` -prefixed class names and styling is based on those class names.

Use BEM naming convention with `fi-`-prefix:

```css
.fi-block
  .fi-block--modifier
  .fi-block_element
  .fi-block_element--modifier;
```

and/or atom-classes:

```css
.fi-block.fi-rounded .fi-block_element.fi-highlight;
```

- All colors, typography and spacing must come from tokens (suomifi-design-tokens) and all reusable tokens not defined in suomifi-design-tokens must be defined internally
- Don't use relative units without an important reason
- Comment CSS when doing project specific solutions

Components' styles can be customized with [Styled Components](https://github.com/styled-components/styled-components):

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

## Git

Pull requests can be submitted from fork. [Read more from here.](https://guides.github.com/activities/forking/)

### Developing a feature:

```bash
git checkout -b <branchname>
git add <file1> <file2> ...
git commit -m "My commit message"
```

### Pushing your feature to GitHub:

```bash
git checkout develop
git pull
git checkout <branchname>
git rebase -i develop
```

- Resolve conflicts and continue:

```bash
git add <file1> <file2> ...
git rebase --continue
```

- After no conflicts:

```bash
git push --force-with-lease
```

(If your remote does not accept your local new branch: `git push -u origin HEAD`)

- Make a Pull Request at GitHub website.
