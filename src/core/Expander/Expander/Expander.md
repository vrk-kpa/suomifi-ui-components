```jsx
import {
  Expander,
  ExpanderTitle,
  ExpanderContent
} from 'suomifi-ui-components';

<Expander className="expander-test" defaultOpen={true}>
  <ExpanderTitle>Test expander</ExpanderTitle>
  <ExpanderContent>Test expander</ExpanderContent>
</Expander>;
```

```jsx
import {
  Expander,
  ExpanderGroup,
  ExpanderTitle,
  ExpanderContent
} from 'suomifi-ui-components';

<ExpanderGroup OpenAllText="Open all" CloseAllText="Close all">
  <Expander>
    <ExpanderTitle>Test expander 1</ExpanderTitle>
    <ExpanderContent>Test expander content 1</ExpanderContent>
  </Expander>
  <Expander>
    <ExpanderTitle>Test expander 2</ExpanderTitle>
    <ExpanderContent>Test expander content 2</ExpanderContent>
  </Expander>
  <Expander>
    <ExpanderTitle>Test expander 3</ExpanderTitle>
    <ExpanderContent>Test expander content 3</ExpanderContent>
  </Expander>
</ExpanderGroup>;
```

## Controlled

- State for the individual Expanders are stored outside of the component and user has full control.
- Therefore when clicking the individual Expander they are not opened by default, user have to give the logic to change it.
- It's user's responsibility to keep the state stored outside to be updated as Open/Close All is used.
- `defaultOpen` prop will not work when Expander is in controlled state == `open` prop is given.

```jsx
import {
  Expander,
  ExpanderGroup,
  ExpanderTitle,
  ExpanderContent
} from 'suomifi-ui-components';

const [expanderThreeOpen, setExpanderThreeOpen] = React.useState(
  false
);

<>
  <ExpanderGroup OpenAllText="Open all" CloseAllText="Close all">
    <Expander>
      <ExpanderTitle>Test expander 1</ExpanderTitle>
      <ExpanderContent>Test expander content 1</ExpanderContent>
    </Expander>
    <Expander>
      <ExpanderTitle>Test expander 2</ExpanderTitle>
      <ExpanderContent>Test expander content 2</ExpanderContent>
    </Expander>
    <Expander
      open={expanderThreeOpen}
      onClick={({ openState }) => {
        if (window.confirm('Toggle Expander 3')) {
          setExpanderThreeOpen(!openState);
        }
      }}
    >
      <ExpanderTitle>Test expander 3</ExpanderTitle>
      <ExpanderContent>Test expander content 3</ExpanderContent>
    </Expander>
  </ExpanderGroup>
</>;
```
