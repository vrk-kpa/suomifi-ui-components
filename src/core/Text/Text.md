```js
import { Paragraph, Text } from 'suomifi-ui-components';

<>
  <Paragraph>Paragraph text</Paragraph>
  <Paragraph marginBottomSpacing="insetXl">
    <Text.lead>Leading text</Text.lead>
  </Paragraph>
  <Paragraph>
    <Text>Body text</Text> <Text.bold>Bold text</Text.bold>
  </Paragraph>
  <Paragraph>
    <Text smallScreen={true}>Body text</Text>{' '}
    <Text.bold smallScreen={true}>Bold text</Text.bold>
  </Paragraph>
</>;
```
