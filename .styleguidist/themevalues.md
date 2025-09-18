## Default Theme Values

### Colors

Theme category colors is of type _`ColorDesignTokens`_ and defines all the colors and gradients used in the components.

```js noeditor
import { SuomifiThemeConsumer } from '../src/core/theme';
import { ThemeProps } from '../src/docs/Theme/ThemeProps';

<SuomifiThemeConsumer>
  {({ suomifiTheme }) => (
    <ThemeProps title="colors:" values={suomifiTheme.colors} />
  )}
</SuomifiThemeConsumer>;
```

### Spacing

Theme category spacing is of type _`SpacingDesignTokens`_ and defines external spacing used between more complex elements as well as some parts of internal spacing.

```js noeditor
import { SuomifiThemeConsumer } from '../src/core/theme';
import { ThemeProps } from '../src/docs/Theme/ThemeProps';

<SuomifiThemeConsumer>
  {({ suomifiTheme }) => (
    <ThemeProps title="spacing:" values={suomifiTheme.spacing} />
  )}
</SuomifiThemeConsumer>;
```

### Typography

Theme category typography is of type _`TypographyDesignTokens`_ and defines most typography styles used in the components.

```js noeditor
import { SuomifiThemeConsumer } from '../src/core/theme';
import { ThemeProps } from '../src/docs/Theme/ThemeProps';

<SuomifiThemeConsumer>
  {({ suomifiTheme }) => (
    <ThemeProps
      title="typography:"
      values={suomifiTheme.typography}
    />
  )}
</SuomifiThemeConsumer>;
```

### Gradients

Theme category gradients is of type _`GradientDesignTokens`_ and defines all gradient colors used in the components. By default, gradients are based on color design tokens.

```js noeditor
import { SuomifiThemeConsumer } from '../src/core/theme';
import { ThemeProps } from '../src/docs/Theme/ThemeProps';

<SuomifiThemeConsumer>
  {({ suomifiTheme }) => (
    <ThemeProps title="gradients:" values={suomifiTheme.gradients} />
  )}
</SuomifiThemeConsumer>;
```

### Focus

Theme category focuses is of type _`FocusDesignTokens`_ and defines all focus styles used in the library. By default, focus styles are based on color, spacing and radius design tokens.

```js noeditor
import { SuomifiThemeConsumer } from '../src/core/theme';
import { ThemeProps } from '../src/docs/Theme/ThemeProps';

<SuomifiThemeConsumer>
  {({ suomifiTheme }) => (
    <ThemeProps title="focus:" values={suomifiTheme.focuses} />
  )}
</SuomifiThemeConsumer>;
```

### Radius

Theme category radiuses is of type _`RadiusDesignTokens`_ and defines all radius styles used in the library.

```js noeditor
import { SuomifiThemeConsumer } from '../src/core/theme';
import { ThemeProps } from '../src/docs/Theme/ThemeProps';

<SuomifiThemeConsumer>
  {({ suomifiTheme }) => (
    <ThemeProps title="radius:" values={suomifiTheme.radiuses} />
  )}
</SuomifiThemeConsumer>;
```

### Shadows

Theme category shadows is of type _`ShadowDesignTokens`_ and defines all shadow styles used in the library. By default, shadow styles are based on color design tokens.

```js noeditor
import { SuomifiThemeConsumer } from '../src/core/theme';
import { ThemeProps } from '../src/docs/Theme/ThemeProps';

<SuomifiThemeConsumer>
  {({ suomifiTheme }) => (
    <ThemeProps title="shadows:" values={suomifiTheme.shadows} />
  )}
</SuomifiThemeConsumer>;
```

### Transitions

Theme category transitions is of type _`TransitionDesignTokens`_ and defines the most commonly used transition styles used in the library.

```js noeditor
import { SuomifiThemeConsumer } from '../src/core/theme';
import { ThemeProps } from '../src/docs/Theme/ThemeProps';

<SuomifiThemeConsumer>
  {({ suomifiTheme }) => (
    <ThemeProps
      title="transitions:"
      values={suomifiTheme.transitions}
    />
  )}
</SuomifiThemeConsumer>;
```

### Z-indexes

Theme zindexes is of type _`ZIndexDesignTokens`_ and defines all z-indexes used in the library. Most implementations use portals by default and do not rely on z-index.

```js noeditor
import { SuomifiThemeConsumer } from '../src/core/theme';
import { ThemeProps } from '../src/docs/Theme/ThemeProps';

<SuomifiThemeConsumer>
  {({ suomifiTheme }) => (
    <ThemeProps title="zindexes:" values={suomifiTheme.zindexes} />
  )}
</SuomifiThemeConsumer>;
```

### Breakpoints

Breakpoint tokens use pixel values and range from `s` (576px) to `xxl` (1400px) and follow the values of bootstrap for easy implementation. Breakpoint tokens are of type _`BreakpointDesignTokens`_.

```js noeditor
import { SuomifiThemeConsumer } from '../src/core/theme';
import { ThemeProps } from '../src/docs/Theme/ThemeProps';

<SuomifiThemeConsumer>
  {({ suomifiTheme }) => (
    <ThemeProps
      title="breakpoints:"
      values={suomifiTheme.breakpoints}
    />
  )}
</SuomifiThemeConsumer>;
```

### Raw token values

Theme values is of type _`RawDesignTokens`_ and provides colors, typograhpy and spacing design tokens in more granular format for use with custom styles. Values have no effect on the theme and are only provided for further use.

```js noeditor
import { SuomifiThemeConsumer } from '../src/core/theme';
import { ThemeProps } from '../src/docs/Theme/ThemeProps';

<SuomifiThemeConsumer>
  {({ suomifiTheme }) => (
    <ThemeProps title="values:" values={suomifiTheme.values} />
  )}
</SuomifiThemeConsumer>;
```
