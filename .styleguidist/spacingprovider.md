Spacing provider is a wrapper component that allows giving its children margin rules to follow. You can specify the rules per component, and all components of the given type will follow the margin rules.

The margin values can be given using the desired spacing token.

### Basic example

```js
import {
  SpacingProvider,
  TextInput,
  Button
} from 'suomifi-ui-components';

const Comp = (props) => {
  const { children, ...passProps } = props;
  return <div {...passProps}>{props.children}</div>;
};

<SpacingProvider
  margins={{
    textInput: { margin: 's' },
    button: { mb: 'm', ml: 's' }
  }}
>
  <div style={{ border: '1px dotted blue' }}>
    <TextInput labelText="First name" />
    <TextInput labelText="Last name" />
    <Button>Submit</Button>
  </div>
</SpacingProvider>;
```

### Overriding global margins

The global margins given via the provider are set as low specificity css styles, and can thus be easily overridden where needed. Override can be made using one of these options:

- CSS styles using class selectors
- Styled-component with margin specified
- An inner `SpacingProvider` wrapper
- Component-specific margin props

In the example below all the buttons are inside a spacing provider with margins rules for buttons, but some of them have their styles overridden using the above methods.

```js
import { SpacingProvider, Button } from 'suomifi-ui-components';
import { default as styled } from 'styled-components';

const StyledButton = styled(Button)`
  margin: 0;
`;

<div
  style={{
    border: '1px dotted blue',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%'
  }}
>
  <SpacingProvider
    margins={{
      button: { margin: 'm' }
    }}
  >
    <Button>Button with global margins</Button>
    <SpacingProvider margins={{ button: { margin: 0 } }}>
      <Button>Margins overridden with nested provider</Button>
    </SpacingProvider>
    <Button>Button with global margins</Button>
    <StyledButton>
      Margins overridden using styled-components
    </StyledButton>
    <Button>Button with global margins</Button>
    <Button margin="0">Margins overridden with margin prop</Button>
  </SpacingProvider>
</div>;
```

### An example form

With the provider developers can generate a margin ruleset once for a specific use case e.g. a form. The ruleset along with the `SpacingProvider` component can then be used to quickly create layouts in similar cases.

```js
import {
  Button,
  TextInput,
  Textarea,
  Paragraph,
  Heading,
  SpacingProvider
} from 'suomifi-ui-components';

<div
  style={{
    border: '1px dotted blue',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  }}
>
  <SpacingProvider
    margins={{
      all: { mb: 'xs' },
      button: { mb: 'xxs' }
    }}
  >
    <Heading variant="h2">Feedback</Heading>
    <Paragraph>Please tell us how we did.</Paragraph>
    <TextInput
      onBlur={(event) => console.log(event.target.value)}
      labelText="Name"
    />
    <TextInput
      type="email"
      onBlur={(event) => console.log(event.target.value)}
      labelText="Email"
    />
    <Textarea labelText="Your message" />
    <Button>Submit</Button>
  </SpacingProvider>
</div>;
```
