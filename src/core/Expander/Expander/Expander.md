```jsx
import {
  Expander,
  ExpanderTitleButton,
  ExpanderContent
} from 'suomifi-ui-components';

<Expander className="expander-test" defaultOpen={true}>
  <ExpanderTitleButton asHeading="h3">
    Test expander
  </ExpanderTitleButton>
  <ExpanderContent>Test expander</ExpanderContent>
</Expander>;
```

```jsx
import {
  Expander,
  ExpanderTitle,
  ExpanderContent,
  Checkbox
} from 'suomifi-ui-components';

<Expander className="expander-test" defaultOpen={true}>
  <ExpanderTitle
    ariaOpenText="open expander"
    ariaCloseText="close expander"
    toggleButtonAriaDescribedBy="checkbox-id"
  >
    <Checkbox hintText="Checkbox hint text" id="checkbox-id">
      Checkbox label
    </Checkbox>
  </ExpanderTitle>
  <ExpanderContent>Test expander</ExpanderContent>
</Expander>;
```

```jsx
import {
  Expander,
  ExpanderGroup,
  ExpanderTitleButton,
  ExpanderContent
} from 'suomifi-ui-components';

<ExpanderGroup
  openAllText="Open all"
  ariaOpenAllText="Open all expanders"
  closeAllText="Close all"
  ariaCloseAllText="Close all expanders"
>
  <Expander>
    <ExpanderTitleButton>Test expander 1</ExpanderTitleButton>
    <ExpanderContent>Test expander content 1</ExpanderContent>
  </Expander>
  <Expander>
    <ExpanderTitleButton>Test expander 2</ExpanderTitleButton>
    <ExpanderContent>Test expander content 2</ExpanderContent>
  </Expander>
  <Expander>
    <ExpanderTitleButton>Test expander 3</ExpanderTitleButton>
    <ExpanderContent>Test expander content 3</ExpanderContent>
  </Expander>
</ExpanderGroup>;
```

```jsx
import {
  Expander,
  ExpanderGroup,
  ExpanderTitleButton,
  ExpanderContent
} from 'suomifi-ui-components';

<ExpanderGroup
  openAllText="Open all"
  ariaOpenAllText="Open all expanders"
  closeAllText="Close all"
  ariaCloseAllText="Close all expanders"
  showToggleAllButton={false}
>
  <Expander>
    <ExpanderTitleButton>Test expander 1</ExpanderTitleButton>
    <ExpanderContent>Test expander content 1</ExpanderContent>
  </Expander>
  <Expander>
    <ExpanderTitleButton>Test expander 2</ExpanderTitleButton>
    <ExpanderContent>Test expander content 2</ExpanderContent>
  </Expander>
  <Expander>
    <ExpanderTitleButton>Test expander 3</ExpanderTitleButton>
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
  ExpanderTitleButton,
  ExpanderContent
} from 'suomifi-ui-components';

const [expanderThreeOpen, setExpanderThreeOpen] =
  React.useState(false);

<>
  <ExpanderGroup
    openAllText="Open all"
    ariaOpenAllText="Open all expanders"
    closeAllText="Close all"
    ariaCloseAllText="Close all expanders"
  >
    <Expander>
      <ExpanderTitleButton>Test expander 1</ExpanderTitleButton>
      <ExpanderContent>Test expander content 1</ExpanderContent>
    </Expander>
    <Expander>
      <ExpanderTitleButton>Test expander 2</ExpanderTitleButton>
      <ExpanderContent>Test expander content 2</ExpanderContent>
    </Expander>
    <Expander
      open={expanderThreeOpen}
      onOpenChange={(open) => {
        if (window.confirm('Toggle Expander 3')) {
          setExpanderThreeOpen(!open);
        }
      }}
    >
      <ExpanderTitleButton>Test expander 3</ExpanderTitleButton>
      <ExpanderContent>Test expander content 3</ExpanderContent>
    </Expander>
  </ExpanderGroup>
</>;
```
