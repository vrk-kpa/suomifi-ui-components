# [<img src="https://avatars0.githubusercontent.com/u/11345641?s=88&v=4" alt="DVV" width="18"/> suomifi-ui-components](https://vrk-kpa.github.io/suomifi-ui-components/)

![npm](https://img.shields.io/npm/v/suomifi-ui-components) ![NPM](https://img.shields.io/npm/l/suomifi-ui-components) ![WCAG](https://img.shields.io/badge/WCAG%202.1-AA-green) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](http://makeapullrequest.com)

Suomi.fi-styleguide in React components. [Living styleguide](https://vrk-kpa.github.io/suomifi-ui-components/) (latest release/master-branch).

## ✨ Features

- Accessibility WCAG 2.1 level AA
- React-components with TypeScript support
- Suomi.fi brand styles
- Highly customizable (CSS, CSS-in-JS)

Works with [React >= 16.8.0](https://github.com/facebook/react) (React 18 supported) and [Styled Components >= 5.2.1](https://github.com/styled-components/styled-components). Supports [TypeScript](https://github.com/Microsoft/TypeScript). CJS and ESM builds provided via the npm package.

### Supported browser and screenreader combinations

| Operating system | Browsers              | Screen reader |
| ---------------- | --------------------- | ------------- |
| macOS            | Safari, Chrome, Edge  | VoiceOver     |
| Windows          | Chrome, Firefox, Edge | NVDA          |
| iOS              | Safari                | VoiceOver     |
| Android          | Chrome                | TalkBack      |

## 📦 Install

To install the component library itself:

```bash
yarn add suomifi-ui-components
```

Include **required** fonts as best suited for your project. You can, for example, use the following import with your global css.

```css
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600&display=swap');
```

The following fonts and variants are required: Font-family: 'Source Sans Pro', Font-weight: 300, 400, 600

### Peer dependencies

You should also install the following peer dependencies.

- [React](https://www.npmjs.com/package/react) version >=16.8.0 and related dependencies and typings.
- [styled-components](https://www.npmjs.com/package/styled-components) version >=5.2.1 and related dependencies and typings.

- The aim is to keep dependencies up to date and use the latest available versions. We encourage you to use the latest available versions of peer dependencies.

```bash
yarn add styled-components
```

- If using TypeScript, version 3.8 or above is required.

- In case TypeScript is used and skipLibCheck compiler option is set to false, also add typings for [styled-components](https://www.npmjs.com/package/@types/styled-components/) as well as [react](https://www.npmjs.com/package/@types/react) and [react-dom](https://www.npmjs.com/package/@types/react-dom) as required by the React version used.

```bash
yarn add @types/styled-components @types/react @types/react-dom
```

## 🔨 Usage

```jsx
import { Button } from 'suomifi-ui-components';
<Button>Suomi.fi button</Button>;
```

### 🌊 `Component variants`

Components have a `variant` property for different versions of the component.

```jsx
import { Button } from 'suomifi-ui-components';
<Button variant="secondary">This is a seconday button</Button>;
```

### ⛱ Extending styles

Components' styles can be customized with [Styled Components](https://github.com/styled-components/styled-components):

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

Don't use `!important`. If really, really needed you can define styles using classNames multiple times `.fi-button.button--custom.button--custom {...}` for a specificity hack.

## 🔮 FAQ

See [FAQ.md](/FAQ.md).

## ⌨️ Development

See [DEVELOPMENT.md](/DEVELOPMENT.md).

## 🤝 Contributing

We welcome all contributions. Please read our [CONTRIBUTING.md](/CONTRIBUTING.md) first.

## Licensing

MIT [LICENSE](/LICENSE)
