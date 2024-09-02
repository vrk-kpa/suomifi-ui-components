Details is a component that allows providing details that most users won't need, without them taking up too much screen space.

- Provide a clear label that conveys the context as well. E.g. "More information about subject X" instead of just "More information"
- Only use for non-essential information
- Do not stack multiple Details components
  - Use [Expander](./#/Components/Expander) for showing/hiding content sections and other such needs

Examples:

- [Basic use](./#/Components/Details?id=basic-use)
- [Varied content](./#/Components/Details?id=varied-content)
- [Controlled open state](./#/Components/Details?id=controlled-open-state)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/Details?id=props--methods)
</div>

### Basic use

Provide a text to act as the summary/heading of the component via the `summaryLabel` prop

```js
import { Details } from 'suomifi-ui-components';

<Details summaryLabel="Details about the subject">
  Here's some more info on the subject!
</Details>;
```

### Varied content

The details component accepts practically any content, and thus its contents can be structured in whatever way suits the purpose

```js
import {
  Details,
  ExternalLink,
  Paragraph
} from 'suomifi-ui-components';

<Details summaryLabel="Additional information on the topic">
  <Paragraph>
    This is some relevant information regarding a topic
  </Paragraph>
  <ExternalLink href="#">
    For more information refer to this page
  </ExternalLink>
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
