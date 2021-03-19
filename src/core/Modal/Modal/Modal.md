### Basic Modal

Visibility of the Modal is controlled outside the component. Opening and closing the Modal needs to be explicitly set on desired functionality (primary and secondary buttons, esc key).

Small screen variant takes all available screen space.

Aria props override the primary and secondary button labels for screenreaders and allow more detailed description.

```js
import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalFooter,
  Button,
  Paragraph,
  Text,
  ToggleInput
} from 'suomifi-ui-components';

const [visible, setVisible] = useState(false);
const [smallScreen, setSmallScreen] = useState(false);

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Phasellus scelerisque elit a consectetur tempor. Morbi sit
amet lobortis ipsum. Nunc ac ante ligula. Mauris sem urna,
feugiat eu faucibus in, vehicula sit amet nibh. Duis non
egestas enim. Sed pharetra, eros a feugiat porttitor, nisi
eros dapibus mi, in semper augue erat sit amet nulla.
Quisque non sapien sem.`;

const textArr = new Array(10).fill(text);

<>
  <Button onClick={() => setVisible(true)}>Open modal dialog</Button>
  <ToggleInput onChange={(value) => setSmallScreen(value)}>
    smallScreen
  </ToggleInput>
  <Modal
    visible={visible}
    variant={smallScreen ? 'smallScreen' : 'default'}
    onEscKeyDown={() => setVisible(false)}
  >
    <ModalContent>
      <ModalTitle>Test modal</ModalTitle>
      <Paragraph>
        <Text>{textArr.map((text) => text)}</Text>
      </Paragraph>
    </ModalContent>
    <ModalFooter>
      <Button
        arial-label="Accept changes and close modal dialog"
        onClick={() => setVisible(false)}
      >
        OK
      </Button>
      <Button
        variant="secondary"
        arial-label="Discard changes and close modal dialog"
        onClick={() => setVisible(false)}
      >
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
</>;
```

### Simple Modal with no scrolling

Not scrollable modals do not allow content scrolling by default. Disabling scrolling also removes the horizontal divider line above the buttons.

```js
import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalFooter,
  Button,
  Paragraph,
  Text,
  ToggleInput
} from 'suomifi-ui-components';

const [visible, setVisible] = useState(false);
const [smallScreen, setSmallScreen] = useState(false);

<>
  <Button onClick={() => setVisible(true)}>Open modal dialog</Button>
  <ToggleInput onChange={(value) => setSmallScreen(value)}>
    smallScreen
  </ToggleInput>
  <Modal
    visible={visible}
    variant={smallScreen ? 'smallScreen' : 'default'}
    scrollable={false}
    onEscKeyDown={() => setVisible(false)}
  >
    <ModalContent>
      <ModalTitle>Test modal</ModalTitle>
      <Paragraph>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </Paragraph>
    </ModalContent>
    <ModalFooter>
      <Button onClick={() => setVisible(false)}>OK</Button>
      <Button variant="secondary" onClick={() => setVisible(false)}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
</>;
```

### Modal with onClose and onOpen focus set

By default, Modal will focus the first focusable element inside the modal when opened and return the focus to where it was before opening the modal.

_focusOnOpenRef_ and _focusOnCloseRef_ props can be used to change this behaviour.

```js
import { useState, useRef } from 'react';
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalFooter,
  Button,
  Paragraph,
  Text,
  TextInput,
  Block
} from 'suomifi-ui-components';

const [visible, setVisible] = useState(false);

const returnFocusRef = useRef(null);
const initialFocusRef = useRef(null);

<>
  <Button
    onClick={() => {
      setVisible(!visible);
    }}
  >
    Open modal dialog
  </Button>
  <TextInput
    labelText="TextInput for focus on close"
    ref={returnFocusRef}
  />
  <Modal
    visible={visible}
    focusOnOpenRef={initialFocusRef}
    focusOnCloseRef={returnFocusRef}
    onEscKeyDown={() => setVisible(false)}
  >
    <ModalContent>
      <ModalTitle>Test modal</ModalTitle>
      <Button>Test Button</Button>
      <Block style={{ margin: '20px 0' }}>
        <TextInput
          labelText="TextInput for initial focus"
          ref={initialFocusRef}
        />
      </Block>
      <Paragraph>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus scelerisque elit a consectetur tempor. Morbi sit
          amet lobortis ipsum. Nunc ac ante ligula. Mauris sem urna,
          feugiat eu faucibus in, vehicula sit amet nibh. Duis non
          egestas enim. Sed pharetra, eros a feugiat porttitor, nisi
          eros dapibus mi, in semper augue erat sit amet nulla.
          Quisque non sapien sem.
        </Text>
      </Paragraph>
    </ModalContent>
    <ModalFooter>
      <Button onClick={() => setVisible(false)}>OK</Button>
      <Button variant="secondary" onClick={() => setVisible(false)}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
</>;
```

### Complex Modal with no portal

Disabling portal renders content inside the modal component, not as the last DOM node when using a portal. When portals are disabled, z-index of the portal is set to 100.

```js
import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalFooter,
  Button,
  Expander,
  ExpanderGroup,
  ExpanderTitleButton,
  ExpanderContent,
  Icon,
  Paragraph,
  Text,
  ToggleInput,
  suomifiDesignTokens
} from 'suomifi-ui-components';

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Phasellus scelerisque elit a consectetur tempor. Morbi sit
amet lobortis ipsum. Nunc ac ante ligula. Mauris sem urna,
feugiat eu faucibus in, vehicula sit amet nibh. Duis non
egestas enim. Sed pharetra, eros a feugiat porttitor, nisi
eros dapibus mi, in semper augue erat sit amet nulla.
Quisque non sapien sem.`;

const textArr = new Array(10).fill(text);

const [visible, setVisible] = useState(false);
const [smallScreen, setSmallScreen] = useState(false);

<>
  <Button
    onClick={() => {
      setVisible(!visible);
    }}
  >
    Open modal dialog
  </Button>
  <ToggleInput onChange={(value) => setSmallScreen(value)}>
    smallScreen
  </ToggleInput>
  <Modal
    visible={visible}
    variant={smallScreen ? 'smallScreen' : 'default'}
    usePortal={false}
    onEscKeyDown={() => setVisible(false)}
  >
    <ModalContent>
      <ModalTitle>Test modal</ModalTitle>
      <ExpanderGroup
        OpenAllText="Open all"
        AriaOpenAllText="Open all expanders"
        CloseAllText="Close all"
        AriaCloseAllText="Close all expanders"
      >
        {textArr.map((text, index) => (
          <Expander key={index}>
            <ExpanderTitleButton>
              Test expander {index + 1}
            </ExpanderTitleButton>
            <ExpanderContent>
              <Paragraph>
                <Text>{text}</Text>
              </Paragraph>
            </ExpanderContent>
          </Expander>
        ))}
      </ExpanderGroup>
    </ModalContent>
    <ModalFooter>
      <Paragraph
        style={{
          display: 'block',
          borderLeft: `4px solid ${suomifiDesignTokens.colors.alertBase}`,
          padding: `${suomifiDesignTokens.spacing.s} ${suomifiDesignTokens.spacing.m}`,
          backgroundColor: suomifiDesignTokens.colors.alertLight1,
          marginRight: suomifiDesignTokens.spacing.s,
          marginTop: smallScreen
            ? suomifiDesignTokens.spacing.s
            : suomifiDesignTokens.spacing.m
        }}
      >
        <Text
          style={{
            display: 'inline-block'
          }}
        >
          <Icon
            color={suomifiDesignTokens.colors.alertBase}
            icon="error"
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              transform: 'translateY(-0.1em)',
              marginRight: '10px'
            }}
          />
          We are experiencing connectivity issues
        </Text>
      </Paragraph>
      <Button aria-disabled={true} onClick={() => setVisible(false)}>
        Save
      </Button>
      <Button variant="secondary" onClick={() => setVisible(false)}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
</>;
```
