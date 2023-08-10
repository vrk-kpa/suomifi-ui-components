Tooltip is a secondary tool for providing context for elements where [HintText](#) does not suffice due to the need for a longer content or for other reasons.

- Prefer HintText for providing instructions and context for elements where needed
- Avoid using interactive elements inside the tooltip
- Provide a descriptive heading for the tooltip content
- Clearly refer to the element the tooltip is attached to in the aria-label of the tooltip button

Examples:

<ul>
<li>[Basic use](/#/Components/Tooltip?id=basic-use)</li>
<li>[Integrated tooltip](/#/Components/Tooltip?id=integrated-tooltip)</li>
</ul>

<div style="margin-bottom: 40px">
  <a href="/#/Components/Tooltip?id=props--methods">Props & methods</a>
</div>

### Basic use

Tooltip content anchors itself to the tooltip button and should respond to changing content or viewport size.

```js
import {
  Tooltip,
  Heading,
  Text,
  Button
} from 'suomifi-ui-components';

// Tooltip should always render when tooltip button position changes
const [longText, setLongText] = React.useState(false);
const [anchorElement, setAnchorElement] = React.useState(null);
const [open, setOpen] = React.useState(false);

const getLabelText = (long) =>
  long
    ? 'Different size element requiring a tooltip'
    : 'Element requiring a tooltip';

<>
  <Button onClick={() => setLongText(!longText)}>Toggle text</Button>
  <div ref={(ref) => setAnchorElement(ref)}>
    <Text style={{ verticalAlign: 'middle' }}>
      {getLabelText(longText)}
    </Text>
    <Tooltip
      anchorElement={anchorElement}
      ariaToggleButtonLabelText={`${getLabelText(
        longText
      )}, additional information`}
      ariaCloseButtonLabelText={`${getLabelText(
        longText
      )}, close additional information`}
      open={open}
      onToggleButtonClick={() => setOpen(!open)}
      onCloseButtonClick={() => setOpen(false)}
      key={longText}
    >
      <Heading variant="h5" as="h2">
        Tooltip
      </Heading>
      <Text>Additional context or explanation for the element</Text>
    </Tooltip>
  </div>
</>;
```

### Integrated tooltip

Many components support giving tooltip as a prop. The providen tooltip is then rendered attached to the label of the component.

```js
import {
  TextInput,
  Tooltip,
  Heading,
  Text
} from 'suomifi-ui-components';

const textInputLabel = 'Purpose of visit';

<TextInput
  labelText={textInputLabel}
  fullWidth
  tooltipComponent={
    <Tooltip
      ariaToggleButtonLabelText={`${textInputLabel}, additional information`}
      ariaCloseButtonLabelText={`${textInputLabel}, close additional information`}
    >
      <Heading variant="h5" as="h2">
        Why do we ask for the purpose of your visit
      </Heading>
      <Text>
        This information is collected because lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Donec et porttitor orci.
        Fusce luctus orci eget tortor varius ornare. Fusce consequat
        leo vitae lorem malesuada mollis.
        <br />
        <br /> Sed et sem a libero feugiat venenatis. Mauris at
        commodo ligula. Aliquam erat volutpat. Nullam fermentum ornare
        tristique.
      </Text>
    </Tooltip>
  }
/>;
```

### Props & methods
