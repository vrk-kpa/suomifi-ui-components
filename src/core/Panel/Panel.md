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

### Example with controlled open-prop:

```jsx
import { Panel } from 'suomifi-ui-components';
initialState = { open: true };

<Panel.expansion
  title="Test expansion bgr"
  noPadding
  open={state.open}
  onClick={() => setState({ open: !state.open })}
>
  <div style={{ backgroundColor: 'green', padding: '20px' }}>
    Test expansion content
  </div>
</Panel.expansion>;
```
