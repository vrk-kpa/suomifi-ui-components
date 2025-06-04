`<InlineAlert>` is used inside the main content of a web page to convey information regarding a specific part of the site. Typically used in forms to, for example, provide information about a specific field or show centralized form errors. The content is read out to screen readers by default using `aria-live="assertive"`.

If you need to show site-wide information at the top of the page, use the <a href="#/Components/Alert">Alert</a> component instead.

Examples:

- [Basic use](./#/Components/InlineAlert?id=basic-use)
- [Warning status](./#/Components/InlineAlert?id=warning-status)
- [Error status](./#/Components/InlineAlert?id=error-status)
- [Small screen](./#/Components/InlineAlert?id=small-screen)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/InlineAlert?id=props--methods)
</div>

### Basic use

<div style="border: 1px solid #c8cdd0; padding: 20px 20px 4px 20px; background: #eaf2fa; margin-bottom: 30px;">
#### Important!

To ensure accessibility, always wrap a dynamically appearing InlineAlert component in an aria-live region as shown in the examples below. The element which has an aria-live region must be present in the HTML document on initial page load.

</div>

```js
import { InlineAlert, Block } from 'suomifi-ui-components';

<Block aria-live="polite" style={{ width: '100%' }}>
  <InlineAlert labelText="Info">
    Make sure your name is typed exactly as it appears in your
    identification
  </InlineAlert>
</Block>;
```

### Warning status

The warning status of an InlineAlert is used for conveying information which affects users but is not absolutely fatal.

```js
import { InlineAlert, Block } from 'suomifi-ui-components';

<Block aria-live="polite" style={{ width: '100%' }}>
  <InlineAlert status="warning">
    There are grammar issues in the text
  </InlineAlert>
</Block>;
```

### Error status

The error status of an InlineAlert is used for conveying error states and issues.

```js
import { InlineAlert, Block } from 'suomifi-ui-components';

<Block aria-live="polite" style={{ width: '100%' }}>
  <InlineAlert status="error" labelText="Invalid data">
    Please fill all required fields
  </InlineAlert>
</Block>;
```

### Small screen

Set `smallScreen` to true on narrower screens (mobile devices). This applies less padding to styling.

```js
import { InlineAlert, Block } from 'suomifi-ui-components';

<Block aria-live="polite" style={{ width: '100%' }}>
  <InlineAlert labelText="Info" smallScreen>
    Make sure your name is typed exactly as it appears in your
    identification
  </InlineAlert>
</Block>;
```

### Props & methods

InlineAlert component supports [margin props](./#/Spacing/Margin%20props) for spacing.
