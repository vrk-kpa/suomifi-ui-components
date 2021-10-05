```js
import { Paragraph, Text } from 'suomifi-ui-components';

<>
  <Paragraph>Paragraph text</Paragraph>
  <Paragraph marginBottomSpacing="s">
    <Text variant="lead">Leading text</Text>
  </Paragraph>
  <Paragraph>
    <Text>Body text</Text> <Text variant="bold">Bold text</Text>
  </Paragraph>
  <Paragraph>
    <Text smallScreen={true}>Body text</Text>{' '}
    <Text variant="bold" smallScreen={true}>
      Bold text
    </Text>
  </Paragraph>
</>;
```
