```jsx
import { Expander } from 'suomifi-ui-components';

<Expander title="Test expander" className="expander-test">
  Test expander
</Expander>;
```

```jsx
import { Expander } from 'suomifi-ui-components';

<Expander.group OpenAll="Open all" CloseAll="Close all">
  <Expander title="Test expander 1">Test expander content 1</Expander>
  <Expander title="Test expander 2">Test expander content 2</Expander>
  <Expander title="Test expander 3">Test expander content 3</Expander>
</Expander.group>;
```

## Controlled

- State for the individual Expanders are stored outside of the component and user has full control.
- Therefore when clicking the individual Expander they are not opened by default, user have to give the logic to change it.
- It's user's responsibility to keep the state stored outside to be updated as Open/Close All is used.
- `defaultOpen` prop will not work when Expander is in controlled state == `open` prop is given.

```jsx
import { Expander } from 'suomifi-ui-components';

const [expanderThreeOpen, setExpanderThreeOpen] = React.useState(
  false
);

<>
  <Expander.group OpenAll="Open all" CloseAll="Close all">
    <Expander title="Test expander 1">
      Test expander content 1
    </Expander>
    <Expander title="Test expander 2">
      Test expander content 2
    </Expander>
    <Expander
      title="Test expander 3"
      open={expanderThreeOpen}
      onClick={({ openState }) => {
        if (window.confirm('Toggle Expander 3')) {
          setExpanderThreeOpen(!openState);
        }
      }}
    >
      Test expander content 3
    </Expander>
  </Expander.group>
</>;
```
