# <img src="https://avatars0.githubusercontent.com/u/11345641?s=88&v=4" alt="VRK" width="18"/> suomifi-ui-components

Suomi.fi-styleguide in React components (and style exports).

## ✨ Features

- React-components (>=16.3)
- (TBD: styled-theme, reset-tags, css-export)

Uses [React 16.6.3](https://github.com/facebook/react) with [Emotion](https://github.com/emotion-js/emotion) and written in [TypeScript](https://github.com/Microsoft/TypeScript). [Styleguidist](https://github.com/styleguidist/react-styleguidist) for presenting components.

[Webpack 4](https://github.com/webpack/webpack) with [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader) and [TSLint](https://github.com/palantir/tslint).

For testing: [React-testing-library](https://github.com/kentcdodds/react-testing-library) run by [Jest](https://github.com/facebook/jest) with [ts-jest](https://github.com/kulshekhar/ts-jest) (code coverage with built-in [Istanbul](https://github.com/istanbuljs)). Code style with [Prettier](https://github.com/prettier/prettier).

## 📦 Install

TBD

## 🔨 Usage

```jsx
import { Button } from 'suomifi-ui-components';
ReactDOM.render(<Button />, mountNode);
```

## ⌨️ Development

1. `yarn start` runs Styleguidist for displaying components stories.

2. `yarn test` runs written tests.

3. `yarn test:lint` checks TypeScript code for readability, maintainability, and functionality errors.

4. `yarn prettier:check` checks the code style.

5. `yarn prettier` write the code style fixes to all src-files.

6. `yarn validate` runs the complete test suite.

7. `yarn build` compiles TypeScript code to the dist directory.

8. `yarn styleguide:build` compiles static version of Styleguide to the styleguide directory.

9. `yarn bundle-analyzer` shows analyzation of bundle size.

## 🤝 Contributing [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

We welcome all contributions. Please read our [CONTRIBUTING.md](https://github.com/vrk-kpa/suomifi-ui-components/blob/master/CONTRIBUTING.md) first.
