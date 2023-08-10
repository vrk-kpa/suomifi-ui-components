The `<Block>` component is used as a wrapper and spacing component in place of regular HTML elements to enforce correct Suomi.fi styles.

Examples:

<ul>
  <li><a href="/#/Components/Block?id=basic-use">Basic use</a></li>
  <li><a href="/#/Components/Block?id=spacing">Spacing</a></li>
  <li><a href="/#/Components/Block?id=semantics">Semantics</a></li>
</ul>

<div style="margin-bottom: 40px">
  <a href="/#/Components/Block?id=props--methods">Props & methods</a>
</div>

### Basic use

```js
import { Block } from 'suomifi-ui-components';

<Block>I'm a div with Suomi.fi styles</Block>;
```

### Spacing

You can create spacing around the `<Block>` component using the margin and padding props. Refer to <a href="/#/Components/Block?id=props--methods">props & methods</a> for the full list.

```js
import { Block } from 'suomifi-ui-components';

<>
  <Block padding="xxxl" style={{ border: '1px solid red' }}>
    Block with xl-padding
  </Block>
  <Block
    pt="s"
    pr="l"
    pb="xxl"
    pl="xxxl"
    style={{ border: '1px solid red' }}
  >
    Block with indepedent paddings on each side
  </Block>
</>;
```

### Semantics

The `<Block>` component can be rendered as a variety of different HTML elements. Refer to props & methods for the full list.

```js
import { Block } from 'suomifi-ui-components';

<>
  <Block variant="section" style={{ border: '1px solid red' }}>
    I'm semantically a section
  </Block>
  <Block variant="span" style={{ border: '1px solid red' }}>
    Block component rendered as an inline-block span
  </Block>
</>;
```

### Props & methods
