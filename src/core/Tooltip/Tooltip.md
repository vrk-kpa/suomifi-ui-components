`<Tooltip>` is a tool for providing secondary information or context for elements where [HintText](./#/Components/HintText) does not suffice due to the need for a longer content or for other reasons.

- Prefer HintText for providing instructions and context for elements where needed
- Avoid using interactive elements inside the tooltip
- Provide a descriptive heading for the tooltip content
- Clearly refer to the element the tooltip is attached to in the `aria-label` of the tooltip toggle button

Examples:

- [Basic use](./#/Components/Tooltip?id=basic-use)
- [In library components](./#/Components/Tooltip?id=in-library-components)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/Tooltip?id=props--methods)
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

const [longText, setLongText] = React.useState(false);
const [anchorElement, setAnchorElement] = React.useState(null);
const [open, setOpen] = React.useState(false);

const getLabelText = (long) =>
  long ? 'First and last name' : 'First name';

<>
  <Button onClick={() => setLongText(!longText)}>
    Toggle text length
  </Button>
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
        Name policies
      </Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        et porttitor orci. Fusce luctus orci eget tortor varius
        ornare. Fusce consequat leo vitae lorem malesuada mollis.
      </Text>
    </Tooltip>
  </div>
</>;
```

### In library components

Many components support giving tooltip as a prop. The tooltip is then rendered attached to the label of the component.

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
        <br />
        Sed et sem a libero feugiat venenatis. Mauris at commodo ligula.
        Aliquam erat volutpat. Nullam fermentum ornare tristique.
      </Text>
    </Tooltip>
  }
/>;
```

### Props & methods
