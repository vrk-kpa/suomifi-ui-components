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

<ExpanderGroup
  OpenAllText="Open all"
  AriaOpenAllText="Open all expanders"
  CloseAllText="Close all"
  AriaCloseAllText="Close all expanders"
>
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

const [showExpander, setShowExpander] = React.useState(false);

<>
  <button
    onClick={() => {
      setShowExpander(!showExpander);
    }}
  >
    {showExpander ? 'Hide' : 'Show'}
  </button>
  <ExpanderGroup
    OpenAllText="Open all"
    AriaOpenAllText="Open all expanders"
    CloseAllText="Close all"
    AriaCloseAllText="Close all expanders"
  >
    <Expander>
      <ExpanderTitle>Test expander 1</ExpanderTitle>
      <ExpanderContent>Test expander content 1</ExpanderContent>
    </Expander>
    <Expander>
      <ExpanderTitle>Test expander 2</ExpanderTitle>
      <ExpanderContent>Test expander content 2</ExpanderContent>
    </Expander>
    {!!showExpander && (
      <Expander>
        <ExpanderTitle>Test expander X</ExpanderTitle>
        <ExpanderContent>Test expander content X</ExpanderContent>
      </Expander>
    )}
    <Expander
      open={expanderThreeOpen}
      onOpenChange={(open) => {
        if (window.confirm('Toggle Expander 3')) {
          setExpanderThreeOpen(!open);
        }
      }}
    >
      <ExpanderTitle>Test expander 3</ExpanderTitle>
      <ExpanderContent>Test expander content 3</ExpanderContent>
    </Expander>
  </ExpanderGroup>
</>;
```
