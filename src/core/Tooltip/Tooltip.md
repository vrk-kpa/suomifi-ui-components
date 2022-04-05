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

  const getLabelText = (long) =>
    long
      ? 'Some longer text that requires a tooltip'
      : 'Some text that requires a tooltip';

  return (
    <>
      <Button onClick={() => setLongText(!longText)}>
        Toggle text
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
