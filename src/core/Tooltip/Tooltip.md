```js
import {
  Tooltip,
  Heading,
  Text,
  Button
} from 'suomifi-ui-components';

function TooltipWithContainer(props) {
  // Tooltip should always render when tooltip button position changes
  const [longText, setLongText] = React.useState();
  const [anchorElement, setAnchorElement] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setLongText(!longText)}>
        Toggle text
      </Button>
      <div ref={(ref) => setAnchorElement(ref)}>
        <Text style={{ verticalAlign: 'middle' }}>
          {longText
            ? 'Some longer text that requires a tooltip'
            : 'Some text that requires a tooltip'}
        </Text>
        <Tooltip
          anchorElement={anchorElement}
          ariaToggleButtonLabelText="Toggle"
          ariaCloseButtonLabelText="close"
          open={open}
          onToggleButtonClick={() => setOpen(!open)}
          onCloseButtonClick={() => setOpen(false)}
          key={longText}
        >
          <Heading variant="h5" as="h2">
            Tooltip
          </Heading>
          <Text>Tooltip text for a text that requires a tooltip</Text>
        </Tooltip>
      </div>
    </>
  );
}

<TooltipWithContainer />;
```
