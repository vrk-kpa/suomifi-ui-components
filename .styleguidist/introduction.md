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

### 🌊 `Component variants`

Components have variant-property for different versions of the current component.

```jsx static
import { Button } from 'suomifi-ui-components';
<Button variant="secondary">This is seconday button</Button>;
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

Don't use ~~!important~~, if really really needed - for specificity hack you can define styles using classNames multiple times `.fi-button.button--custom.button--custom {...}`
