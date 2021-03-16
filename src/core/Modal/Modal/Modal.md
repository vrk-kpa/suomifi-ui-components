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
      <Button onClick={() => setVisible(false)}>Cancel</Button>
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
  Block,
  TextInput,
  Button,
  ButtopProps,
  Heading,
  Paragraph,
  Text,
  ToggleInput,
  Icon
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

const ModalHeading = (variant) => (
  <Text.lead
    style={{
      padding:
        variant === smallScreen ? '20px' : '24px 30px 20px 30px',
      borderBottom: '1px solid hsl(202,7%,80%)'
    }}
  >
    <span
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <Icon
        color="hsl(3, 59%, 48%)"
        icon="error"
        style={{ marginRight: '10px' }}
      />
    </span>
    Exotic static header with important information
  </Text.lead>
);

const ModalButton = ({ smallScreen, style, ...passProps }) => (
  <Button
    style={{
      marginRight: smallScreen ? '0' : '15px',
      marginTop: '10px',
      ...style
    }}
    {...passProps}
  >
    Reset
  </Button>
);

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
    <ModalHeading variant={smallScreen ? 'smallScreen' : 'default'} />
    <ModalContent>
      <ModalTitle>Test modal</ModalTitle>
      <Paragraph>
        <Text>{textArr.map((text) => text)}</Text>
      </Paragraph>
    </ModalContent>
    <ModalFooter>
      <Text
        style={{
          display: 'block',
          margin: smallScreen
            ? '20px 20px 0 0'
            : '20px 20px 15px 15px'
        }}
      >
        <span
          style={{ display: 'inline-block', verticalAlign: 'middle' }}
        >
          <Icon
            color="hsl(166, 90%, 34%)"
            icon="info"
            style={{ marginRight: '10px' }}
          />
        </span>
        Additonal information in footer
      </Text>
      <div
        style={{
          display: 'flex',
          flexDirection: smallScreen ? 'column' : 'row'
        }}
      >
        <ModalButton
          smallScreen={smallScreen}
          onClick={() => setVisible(false)}
        >
          OK
        </ModalButton>
        <ModalButton
          smallScreen={smallScreen}
          variant="secondary"
          onClick={() => setVisible(false)}
        >
          Reset
        </ModalButton>
        <ModalButton
          smallScreen={smallScreen}
          style={{
            marginLeft: smallScreen ? '0' : 'auto'
          }}
          variant="secondary"
          onClick={() => setVisible(false)}
        >
          Cancel
        </ModalButton>
      </div>
    </ModalFooter>
  </Modal>
</>;
```
