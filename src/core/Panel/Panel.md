```jsx
import { Panel } from 'suomifi-ui-components';

<Panel className="panel-test">Test</Panel>;
```

```jsx
import { Panel } from 'suomifi-ui-components';

<Panel.expansion
  title="Test expansion"
  className="panel-expansion-test"
>
  Test expansion content
</Panel.expansion>;
```

```jsx
import { Panel } from 'suomifi-ui-components';

<Panel.expansionGroup OpenAll="Open all" CloseAll="Close all">
  <Panel.expansion title="Test expansion 1">
    Test expansion content 1
  </Panel.expansion>
  <Panel.expansion title="Test expansion 2">
    Test expansion content 2
  </Panel.expansion>
  <Panel.expansion title="Test expansion 3">
    Test expansion content 3
  </Panel.expansion>
</Panel.expansionGroup>;
```

### Example of panel open by default

```jsx
import { Panel } from 'suomifi-ui-components';
initialState = { open: true };

<Panel.expansion
  title="Test expansion"
  className="panel-expansion-test"
  onClick={() => setState({ open: !state.open })}
  defaultOpen={true}
>
  Test expansion content
</Panel.expansion>;
```
