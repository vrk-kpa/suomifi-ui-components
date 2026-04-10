**Suomi.fi UI Components is a part of [Suomi.fi Design System](https://designsystem.suomi.fi) and is maintained and built by the Digital and population data services agency of Finland.**

## ✨ Features

- Accessibility WCAG 2.2 level AA. <a href="./#/Accessibility">Read more on accessibility support</a>.
- React-components with TypeScript support
- Suomi.fi brand styles
- Highly customizable (CSS, CSS-in-JS)

Works with [React >= 16.8.0](https://github.com/facebook/react) (React 19 supported) and [Styled Components >= 6.0.0](https://github.com/styled-components/styled-components). Supports [TypeScript](https://github.com/Microsoft/TypeScript). CJS and ESM builds provided via the npm package.

### Supported browser and screenreader combinations

| Operating system | Browsers              | Screen reader |
| ---------------- | --------------------- | ------------- |
| macOS            | Safari, Chrome, Edge  | VoiceOver     |
| Windows          | Chrome, Firefox, Edge | NVDA          |
| iOS              | Safari                | VoiceOver     |
| Android          | Chrome                | TalkBack      |

## 📦 Install

To install the component library

```bash
npm install suomifi-ui-components
```

Include **required** fonts (Source Sans 3, weights 300, 400, 600) as best suited for your project. The intended way is to use the font hosted by the Suomi.fi Design System:

```css
@import url('https://designsystem.suomi.fi/fonts/source-sans-3.css');
```

This provides Latin, Latin Extended, Cyrillic, Cyrillic Extended, Greek, Greek Extended and Vietnamese subsets. Browsers automatically load only the font files needed for the characters on the page.

**Self-hosting:** If you need to host the fonts yourself, download the font files from https://designsystem.suomi.fi/fonts/SourceSans3.zip and import the CSS locally. The CSS file refers to the font files within the same folder, so make sure all the font files reside in the same folder.

### Peer dependencies

You should also install the following peer dependencies.

- [React](https://www.npmjs.com/package/react) version >=16.8.0 and related dependencies and typings.
- [styled-components](https://www.npmjs.com/package/styled-components) version >=6.0.0.

- The aim is to keep dependencies up to date and use the latest available versions. We encourage you to use the latest available versions of peer dependencies.

```bash
npm install styled-components
```

- If using TypeScript, version 3.8 or above is required.

- In case TypeScript is used and skipLibCheck compiler option is set to false, also add typings for [styled-components](https://www.npmjs.com/package/@types/styled-components/) as well as [react](https://www.npmjs.com/package/@types/react) and [react-dom](https://www.npmjs.com/package/@types/react-dom) as required by the React version used.

```bash
npm install @types/styled-components @types/react @types/react-dom
```

## 🔨 Usage

```jsx static
import { Button } from 'suomifi-ui-components';
<Button>Suomi.fi button</Button>;
```

### 🌊 `Component variants`

Components have a `variant` property for different versions of the component.

```jsx static
import { Button } from 'suomifi-ui-components';
<Button variant="secondary">This is a seconday button</Button>;
```

### ⛱ Extending styles

Components' styles can be customized with [Styled Components](https://github.com/styled-components/styled-components):

```javascript static
styled(Button)...
```

**or** using CSS-ClassName:

```jsx static
<Button className="button--custom">Example</Button>
```

```css
.fi-button.button--custom {
  ...;
}
```

Don't use `!important`. If really, really needed you can define styles using classNames multiple times `.fi-button.button--custom.button--custom {...}` for a specificity hack.
