**For latest documentation refer to [https://github.com/vrk-kpa/suomifi-ui-components](https://github.com/vrk-kpa/suomifi-ui-components#readme)**

## 📦 Install

```bash
yarn add suomifi-ui-components
```

## 🔨 Usage

```jsx static
import { Button } from 'suomifi-ui-components';
ReactDOM.render(<Button />, mountNode);
```

### 🌊 `Component.variant`

Components have variant-property for different versions of the current component. Easiest way to use variant-prop is with (static method) `Component.variant`.

```jsx static
import { Button } from 'suomifi-ui-components';
<Button.secondary>This is seconday button</Button.secondary>;
```

### ⛱ Extending styles

Components' styles can be customized with [Styled Components](https://github.com/styled-components/styled-components) / [Emotion](https://github.com/emotion-js/emotion):

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

Don't use ~~!important~~, if really really needed - for specificity hack you can define styles using classNames multiple times `.fi-button.button--custom.button--custom {...}`

### 🕶 Using bare accessible components

Import accessible components without suomi.fi-styles from library `'suomifi-ui-components/components'`

```jsx static
import { Button } from 'suomifi-ui-components/components';
ReactDOM.render(<Button />, mountNode);
```
