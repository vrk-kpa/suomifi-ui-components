# [<img src="https://avatars0.githubusercontent.com/u/11345641?s=88&v=4" alt="VRK" width="18"/> suomifi-ui-components](https://vrk-kpa.github.io/suomifi-ui-components/)

Suomi.fi-styleguide in React components. [Living styleguide](https://vrk-kpa.github.io/suomifi-ui-components/) (latest release/master-branch).

## ✨ Features

- React-components with TypeScript support
- Highly modular - all browser/app CSS-resets without global styles
- Should work on all different existing React apps (>=16.3, >=16.8 recommended)
- Highly customizable (CSS, CSS-in-JS)

Uses [React 16.13.0](https://github.com/facebook/react) with [Styled Components](https://github.com/styled-components/styled-components) and written in [TypeScript](https://github.com/Microsoft/TypeScript). [Styleguidist](https://github.com/styleguidist/react-styleguidist) for presenting components.

[tsdx](https://github.com/jaredpalmer/tsdx) and [eslint](https://eslint.org/).

For testing: [React-testing-library](https://github.com/kentcdodds/react-testing-library) run by [Jest](https://github.com/facebook/jest) with [ts-jest](https://github.com/kulshekhar/ts-jest) (code coverage with built-in [Istanbul](https://github.com/istanbuljs)). Code style with [Prettier](https://github.com/prettier/prettier).

## 📦 Install

To install the component library itself

```bash
yarn add suomifi-ui-components
```

And include **required** styles and fonts from `dist/main.css` as best suited for your project. You can, for example, import the stylesheet to your app and let your bundler handle it:

```typescript
import 'suomifi-ui-components/dist/main.css';
```

This stylesheet contains the default fonts for the library as well as Reach UI peer dependency styles.

If you already use Reach UI in your project or cannot import the CSS file for some reason (e.g. CSP for fonts), you can also import the styles directly from Reach UI by following [their instructions](https://reach.tech/styling/). In this case you need to import the font separately e.g. by adding the following entry to your application's CSS.

```javascript
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300:400,600&display=swap');
```

### Peer dependencies

You should also install the following dependencies, if your project does not already have them.

- suomifi-ui-components is a component library for React, it requires [react](https://www.npmjs.com/package/react) version >=16.3.0 and related dependencies and typings.

- suomifi-ui-components requires [styled-components](https://www.npmjs.com/package/styled-components) version >=4.3.2.

```bash
yarn add styled-components
```

- If using TypeScript, version 3.5 or above is required.

- In case TypeScript is used and skipLibCheck compiler option is set to false, also typings for [react](https://www.npmjs.com/package/@types/react), [react-dom](https://www.npmjs.com/package/@types/react-dom), [styled-components](https://www.npmjs.com/package/@types/styled-components/v/4.1.8) and [warning](https://www.npmjs.com/package/@types/warning) are required. Typings for styled-components has to be exact version 4.1.8 (later versions have an open issue for including conflicting typings for react-native).

```bash
yarn add @types/styled-components@4.1.8 @types/warning
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

_HOX!!! If you use Styled Components you cannot use Component.variant (static methods) and you need to use variant-property to get variants from the styled(Component)._

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

## 🔮 FAQ

See [FAQ.md](/FAQ.md).

## ⌨️ Development

See [DEVELOPMENT.md](/DEVELOPMENT.md).

## 🤝 Contributing [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

We welcome all contributions. Please read our [CONTRIBUTING.md](/CONTRIBUTING.md) first.

## Licensing

MIT [LICENSE](/LICENSE)
