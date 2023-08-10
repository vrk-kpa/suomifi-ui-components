Use the `<Heading>` component to easily apply Suomi.fi styles to your headings.

Examples:

<ul>
  <li><a href="/#/Components/Heading?id=basic-use">Basic use</a></li>
  <li><a href="/#/Components/Heading?id=semantics">Semantics</a></li>
  <li><a href="/#/Components/Heading?id=color">Color</a></li>
</ul>

<div style="margin-bottom: 40px">
  <a href="/#/Components/Heading?id=props--methods">Props & methods</a>
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
