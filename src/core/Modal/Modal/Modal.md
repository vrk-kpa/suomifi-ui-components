### Basic Modal

Visibility of the Modal is controlled outside the component. Opening and closing the Modal needs to be explicitly set on desired functionality (primary and secondary buttons, esc key).

Aria props override the primary and secondary button labels for screenreaders and allow more detailed description.

```js
import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalFooter,
  ModalButton,
  Button,
  Paragraph,
  Text
} from 'suomifi-ui-components';

const [visible, setVisible] = useState(false);

<>
  <Button
    onClick={() => {
      setVisible(true);
    }}
  >
    Open modal dialog
  </Button>
  <Modal visible={visible} onEscKeyDown={() => setVisible(false)}>
    <ModalContent>
      <ModalTitle>Test modal</ModalTitle>
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
      <ModalButton
        arial-label="Accept changes and close modal dialog"
        onClick={() => setVisible(false)}
      >
        OK
      </ModalButton>
      <ModalButton
        variant="secondary"
        arial-label="Discard changes and close modal dialog"
        onClick={() => setVisible(false)}
      >
        Cancel
      </ModalButton>
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
  ModalButton,
  Button,
  Paragraph,
  Text
} from 'suomifi-ui-components';

const [visible, setVisible] = useState(false);

<>
  <Button
    onClick={() => {
      setVisible(!visible);
    }}
  >
    Open modal dialog
  </Button>
  <Modal
    visible={visible}
    onEscKeyDown={() => setVisible(false)}
    style={{ height: '200px' }}
  >
    <ModalContent scrollable={false}>
      <ModalTitle>Test modal</ModalTitle>
      <Paragraph>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </Paragraph>
    </ModalContent>
    <ModalFooter>
      <ModalButton onClick={() => setVisible(false)}>OK</ModalButton>
    </ModalFooter>
  </Modal>
</>;
```

### Modal Small Screen Variant with no portal

Small screen variant takes all available screen space.

Not scrollable modals do not allow content scrolling by default. Disabling scrolling also removes the horizontal divider line above the buttons.

Disabling portal renders content inside the modal component, not as the last DOM node when using a portal. When portals are disabled, z-index of the portal is set to 100.

```js
import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalFooter,
  ModalButton,
  Button,
  Paragraph,
  Text
} from 'suomifi-ui-components';

const [visible, setVisible] = useState(false);

<>
  <Button
    onClick={() => {
      setVisible(!visible);
    }}
  >
    Open modal dialog
  </Button>
  <Modal
    visible={visible}
    usePortal={false}
    variant="smallScreen"
    onEscKeyDown={() => setVisible(false)}
  >
    <ModalContent scrollable={false}>
      <ModalTitle>Test modal</ModalTitle>
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
      <ModalButton onClick={() => setVisible(false)}>OK</ModalButton>
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
  ModalButton,
  Button,
  Paragraph,
  Text
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
  <input ref={returnFocusRef} />
  <Modal
    visible={visible}
    focusOnOpenRef={initialFocusRef}
    focusOnCloseRef={returnFocusRef}
    onEscKeyDown={() => setVisible(false)}
  >
    <ModalContent>
      <ModalTitle>Test modal</ModalTitle>
      <Button>Test Button</Button>
      <input ref={initialFocusRef} />
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
      <ModalButton onClick={() => setVisible(false)}>OK</ModalButton>
    </ModalFooter>
  </Modal>
</>;
```
