All components use the SuomifiTheme for styling. SuomifiThemeProvider enables theme customization for some or all components.

The theme provider accepts a partial custom theme prop and creates a new theme based on provided custom and default styles. All components wrapped inside this provider will follow the new styles. Provided theme take precedence over the default theme, but tokens not present in the custom theme will be merged from the default theme.

Gradients, Shadows and Focus can be provided with the custom theme, but when present, provided custom colors will not be used for generating these styles. E.g. if one Gradient design token is provided, rest of the Gradient design tokens will be merged from the default theme. If no Gradient design tokens are provided, provided custom color design tokens (with the merged default color design tokens) will be used to generate all Gradients.

```js
import {
  SuomifiThemeProvider,
  Chip,
  Button
} from 'suomifi-ui-components';

const customTheme = {
  colors: {
    highlightBase: 'red',
    highlightLight1: 'orange',
    highlightDark1: 'green',
    accentSecondary: 'violet'
  }
};

<SuomifiThemeProvider theme={customTheme}>
  <Chip removable actionLabel="Custom styled Chip">
    Test Chip
  </Chip>
  <Button>Button</Button>
</SuomifiThemeProvider>;
```

Custom theme with gradients

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
    highlightDark1: 'green',
    highlightBase: 'red',
    highlightLight1: 'orange'
  }
};

<SuomifiThemeProvider theme={customTheme}>
  <Chip removable actionLabel="Custom styled Chip">
    Test Chip
  </Chip>
  <Button>Button</Button>
</SuomifiThemeProvider>;
```
