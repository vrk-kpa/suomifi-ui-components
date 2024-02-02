Spacing provider is a wrapper component that allows giving its children margin rules to follow.

```js
import {
  ActionMenu,
  Alert,
  ActionMenuItem,
  SpacingProvider,
  Button,
  TextInput,
  Textarea,
  SingleSelect,
  StatusText,
  TimeInput,
  ToggleInput,
  ToggleButton
} from 'suomifi-ui-components';

const countries = [
  {
    labelText: 'Switzerland',
    uniqueItemId: 'sw2435626'
  },
  {
    labelText: 'France',
    uniqueItemId: 'fr9823523'
  },
  {
    labelText: 'Spain',
    uniqueItemId: 'sp908293482'
  }
];

<div>
  <SpacingProvider
    margins={{
      alert: { my: 'l' },
      all: { ml: 'xl' },
      button: { ml: 'xl', mb: 'm' },
      textInput: { mb: 'm' },
      singleSelect: { ml: 'xxl' },
      statusText: { mt: 'xl' },
      textarea: { ml: 'xxl' },
      toggleInput: { ml: 'xxxl' },
      toggleButton: { ml: 'xl' },
      actionMenu: { mt: 'l' }
    }}
  >
    <Alert
      closeText="Close"
      onCloseButtonClick={() => setShowAlert(false)}
    >
      You are using a beta version of the service. It might contain
      some bugs or glitches.
    </Alert>
    <Button>Testinappi</Button>
    <TextInput
      onBlur={(event) => console.log(event.target.value)}
      labelText="TextInput with visible label"
      statusText="Tietoa statuksesta"
    />
    <TextInput
      onBlur={(event) => console.log(event.target.value)}
      labelText="TextInput with visible label"
    />
    <SpacingProvider margins={{ singleSelect: { ml: 'xs' } }}>
      <SingleSelect
        labelText="Country of residence"
        hintText="Select your current country of residence. You can filter options by typing in the field."
        clearButtonLabel="Clear selection"
        items={countries}
        visualPlaceholder="Choose country"
        noItemsText="No items"
        ariaOptionsAvailableTextFunction={(amount) =>
          amount === 1 ? 'option available' : 'options available'
        }
      />
    </SpacingProvider>
    <Textarea labelText="Tekstikenttä" />
    <TimeInput labelText="Opening time" />
    <StatusText>Statusta</StatusText>
    <ToggleButton onClick={(checked) => console.log(checked)}>
      Airplane mode
    </ToggleButton>
    <ToggleInput onClick={(checked) => console.log(checked)}>
      Another airplane mode (ToggleInput)
    </ToggleInput>
    <ActionMenu buttonText="Actions">
      <ActionMenuItem onClick={() => console.log('Copy')}>
        Copy
      </ActionMenuItem>
      <ActionMenuItem onClick={() => console.log('Edit')}>
        Edit
      </ActionMenuItem>
      <ActionMenuItem onClick={() => console.log('Move')}>
        Move
      </ActionMenuItem>
      <ActionMenuItem onClick={() => console.log('Remove')}>
        Remove
      </ActionMenuItem>
    </ActionMenu>
  </SpacingProvider>
</div>;
```
