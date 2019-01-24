# <img src="https://avatars0.githubusercontent.com/u/11345641?s=88&v=4" alt="VRK" width="18"/> suomifi-ui-components

Suomi.fi-styleguide in React components (and style exports).

## ✨ Features

- React-components (>=16.3)
- (TBD: styled-theme, reset-tags, css-export)

Uses [React 16.6.3](https://github.com/facebook/react) with [Emotion](https://github.com/emotion-js/emotion) and written in [TypeScript](https://github.com/Microsoft/TypeScript). [Styleguidist](https://github.com/styleguidist/react-styleguidist) for presenting components.

[Webpack 4](https://github.com/webpack/webpack) with [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader) and [TSLint](https://github.com/palantir/tslint).

For testing: [React-testing-library](https://github.com/kentcdodds/react-testing-library) run by [Jest](https://github.com/facebook/jest) with [ts-jest](https://github.com/kulshekhar/ts-jest) (code coverage with built-in [Istanbul](https://github.com/istanbuljs)). Code style with [Prettier](https://github.com/prettier/prettier).

## 📦 Install

```bash
yarn add https://github.com/vrk-kpa/suomifi-ui-components.git`
cd node_modules/suomifi-ui-components
yarn
yarn build
```

## 🔨 Usage

```jsx
import { Button } from 'suomifi-ui-components';
ReactDOM.render(<Button />, mountNode);
```

### 🕶 Extending styles

Components' styles can be customized with [Styled Components](https://github.com/styled-components/styled-components) / [Emotion](https://github.com/emotion-js/emotion):

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

## ⌨️ Development

See [DEVELOPMENT.md](/DEVELOPMENT.md).

## 🤝 Contributing [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

We welcome all contributions. Please read our [CONTRIBUTING.md](/CONTRIBUTING.md) first.

## Licensing

MIT [LICENSE](/LICENSE)
