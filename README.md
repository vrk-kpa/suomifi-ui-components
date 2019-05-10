# [<img src="https://avatars0.githubusercontent.com/u/11345641?s=88&v=4" alt="VRK" width="18"/> suomifi-ui-components](https://vrk-kpa.github.io/suomifi-ui-components/)

Suomi.fi-styleguide in React components. [Living styleguide](https://vrk-kpa.github.io/suomifi-ui-components/) (latest release/master-branch): [https://vrk-kpa.github.io/suomifi-ui-components/](https://vrk-kpa.github.io/suomifi-ui-components/)

## ✨ Features

- React-components (>=16.3) with Typescript support
- (TBD: styled-theme, reset-tags, css-export)

Uses [React 16.6.3](https://github.com/facebook/react) with [Emotion](https://github.com/emotion-js/emotion) and written in [TypeScript](https://github.com/Microsoft/TypeScript). [Styleguidist](https://github.com/styleguidist/react-styleguidist) for presenting components.

[Webpack 4](https://github.com/webpack/webpack) with [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader) and [TSLint](https://github.com/palantir/tslint).

For testing: [React-testing-library](https://github.com/kentcdodds/react-testing-library) run by [Jest](https://github.com/facebook/jest) with [ts-jest](https://github.com/kulshekhar/ts-jest) (code coverage with built-in [Istanbul](https://github.com/istanbuljs)). Code style with [Prettier](https://github.com/prettier/prettier).

## 📦 Install

```bash
yarn add suomifi-ui-components
```

## 🔨 Usage

```jsx
import { Button } from 'suomifi-ui-components';
ReactDOM.render(<Button />, mountNode);
```

### 🌊 `Component.variant`

Components have variant-property for different versions of the current component. Easiest way to use variant-prop is with (static method) `Component.variant`.

```jsx
import { Button } from 'suomifi-ui-components';
<Button.secondary>This is seconday button</Button.secondary>;
```

### ⛱ Extending styles

Components' styles can be customized with [Styled Components](https://github.com/styled-components/styled-components) / [Emotion](https://github.com/emotion-js/emotion):

```javascript
styled(Button)...
```

**or** using CSS-ClassName:

```jsx
<Button className="button--custom">Example</Button>
```

```css
.fi-button.button--custom {
  ...;
}
```

Don't use ~~!important~~, if really really needed - for specificity hack you can define styles using classNames multiple times `.fi-button.button--custom.button--custom {...}`

### 🕶 Using bare accessible components

Import accessible components without suomi.fi-styles from library `'suomifi-ui-components/components'`

```jsx
import { Button } from 'suomifi-ui-components/components';
ReactDOM.render(<Button />, mountNode);
```

## 🔮 FAQ

See [FAQ.md](/FAQ.md).

## ⌨️ Development

See [DEVELOPMENT.md](/DEVELOPMENT.md).

## 🤝 Contributing [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

We welcome all contributions. Please read our [CONTRIBUTING.md](/CONTRIBUTING.md) first.

## Licensing

MIT [LICENSE](/LICENSE)
