## Suomi.fi theme

SuomifiTheme provides all shared styles for the suomifi-ui-components library. The default theme consists of design tokens and styles derived from the tokens. The theme is applied with SuomifiThemeProvider and all components use it by default.

The theme consists of Colors, Spacing, Typography, Gradients, Focus, Radius, Shadows, Transitions, Z-indexes and Raw design token values. Most of the default values for the theme are based on the [design tokens](https://github.com/vrk-kpa/suomifi-design-tokens).

The theme can be customized by wrapping the target components to a SuomifiThemeProvider and providing customized theme for the provider.

```js
import {
  SuomifiThemeProvider,
  Chip,
  Button
} from 'suomifi-ui-components';

const customTheme = {
  gradients: {
    highlightBaseToHighlightDark1:
      'linear-gradient(to right, orange, red);',
    highlightLight1ToHighlightBase:
      'linear-gradient(to left, orange, red);'
  },
  colors: {
    highlightBase: 'hotpink',
    highlightLight1: 'orange',
    highlightDark1: 'orange'
  }
};

<SuomifiThemeProvider theme={customTheme}>
  <Chip removable actionLabel="Custom styled Chip">
    Custom color chip
  </Chip>
  <Button>Custom themed button</Button>
</SuomifiThemeProvider>;
```
