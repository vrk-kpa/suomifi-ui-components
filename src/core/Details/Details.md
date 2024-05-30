Examples:

- [Basic use](./#/Components/Details?id=basic-use)
- [Varied content](./#/Components/Details?id=varied-content)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/Toast?id=props--methods)
</div>

### Basic use

```js
import { Details } from 'suomifi-ui-components';

<Details summaryLabel="Details">
  Here's some more info on the subject!
</Details>;
```

### Varied content

The details component accepts practically any content, and thus its contents can be structured in whatever way suits the purpose

```js
import { Details, Heading, Paragraph } from 'suomifi-ui-components';

const DetailsContent = () => (
  <div style={{ display: 'flex' }}>
    <div style={{ flex: 1 }}>
      <Heading variant="h4">Some info</Heading>
      <Paragraph>
        This is some relevant information regarding a topic
      </Paragraph>
    </div>
    <div style={{ flex: 1 }}>
      <Heading variant="h4">Some other info</Heading>
      <Paragraph>
        This is relevant information concerning another topic
      </Paragraph>
    </div>
  </div>
);

<Details summaryLabel="Additional information">
  <DetailsContent />
</Details>;
```

### Controlled open state

The open state of the component can be controlled via the `open` prop

```js
import { Details } from 'suomifi-ui-components';
import { useState } from 'react';

const [openState, setOpenState] = useState(false);

<Details
  open={openState}
  onClick={() => setOpenState(!openState)}
  summaryLabel="Details"
>
  Here's some more info on the subject!
</Details>;
```

### Props & methods

Toast component supports [margin props](./#/Spacing/Margin%20props) for spacing.
