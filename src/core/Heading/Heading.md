Use the `<Heading>` component to easily apply Suomi.fi styles to your headings.

Examples:

- [Basic use](/#/Components/Heading?id=basic-use)
- [Semantics](/#/Components/Heading?id=semantics)
- [Color](/#/Components/Heading?id=color)

<div style="margin-bottom: 40px">
  [Props & methods](/#/Components/Heading?id=props--methods)
</div>

### Basic use

```js
import { Heading } from 'suomifi-ui-components';

<>
  <Heading variant="h1hero">H1 hero - Suomi.fi</Heading>
  <Heading variant="h1">H1 - Suomi.fi</Heading>
  <Heading variant="h2">H2 - Suomi.fi</Heading>
  <Heading variant="h3">H3 - Suomi.fi</Heading>
  <Heading variant="h4">H4 - Suomi.fi</Heading>
  <Heading variant="h5">H5 - Suomi.fi</Heading>
</>;
```

### Semantics

You can change the semantics of the Heading with the `as` prop

```js
import { Heading } from 'suomifi-ui-components';

<Heading variant="h4" as="h2">
  H4 appearance - H2 semantics
</Heading>;
```

### Color

Apply colors from `suomifi-design-tokens` using the `color` prop

```js
import { Heading } from 'suomifi-ui-components';

<Heading variant="h2" color="highlightDark1">
  Suomi.fi
</Heading>;
```

### Props & methods
