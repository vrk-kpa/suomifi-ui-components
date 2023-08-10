`<InlineAlert>` is used inside the main content of a web page to convey information regarding a specific part of the site. Typically used in forms to, for example, provide information about a specific field or show centralized form errors.

If you need to show site-wide information at the top of the page, use the <a href="#/Components/Alert">Alert</a> component instead.

Examples:

<ul>
  <li><a href="/#/Components/InlineAlert?id=basic-use">Basic use</a></li>
  <li><a href="/#/Components/InlineAlert?id=warning-status">Warning status</a></li>
  <li><a href="/#/Components/InlineAlert?id=error-status">Error status</a></li>
  <li><a href="/#/Components/InlineAlert?id=small-screen">Small screen</a></li>
</ul>

<div style="margin-bottom: 40px">
  <a href="/#/Components/InlineAlert?id=props--methods">Props & methods</a>
</div>

### Basic use

```js
import { InlineAlert } from 'suomifi-ui-components';

<InlineAlert labelText="Info">
  Make sure your name is typed exactly as it appears in your
  identification
</InlineAlert>;
```

### Warning status

The warning status of an InlineAlert is used for conveying information which affects users but is not absolutely fatal.

```js
import { InlineAlert } from 'suomifi-ui-components';

<InlineAlert status="warning">
  There are grammar issues in the text
</InlineAlert>;
```

### Error status

The error status of an InlineAlert is used for conveying error states and issues.

```js
import { InlineAlert } from 'suomifi-ui-components';

<InlineAlert status="error" labelText="Invalid data">
  Please fill all required fields
</InlineAlert>;
```

### Small screen

Set `smallScreen` to true on narrower screens (mobile devices). This applies less padding to styling.

```js
import { InlineAlert } from 'suomifi-ui-components';

<InlineAlert labelText="Info" smallScreen>
  Make sure your name is typed exactly as it appears in your
  identification
</InlineAlert>;
```

### Props & methods
