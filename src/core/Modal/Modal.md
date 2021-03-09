### Basic Modal

Visibility of the Modal is controlled outside the component. Opening and closing the Modal needs to be explicitly set on desired functionality (primary and secondary buttons, esc key).

Aria props override the primary and secondary button labels for screenreaders and allow more detailed description.

```js
import { useState } from 'react';
import {
  Modal,
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
    Open modal dialogue
  </Button>
  <Modal
    visible={visible}
    title="Test modal"
    primaryButtonLabel="OK"
    ariaPrimaryButtonLabel="Accept changes and close modal dialogue"
    primaryButtonProps={{ onClick: () => setVisible(!visible) }}
    secondaryButtonLabel="Cancel"
    ariaSecondaryButtonLabel="Discard changes and close modal dialogue"
    secondaryButtonProps={{ onClick: () => setVisible(!visible) }}
    onEscKeyDown={() => setVisible(!visible)}
  >
    <Paragraph>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus scelerisque elit a consectetur tempor. Morbi sit
        amet lobortis ipsum. Nunc ac ante ligula. Mauris sem urna,
        feugiat eu faucibus in, vehicula sit amet nibh. Duis non
        egestas enim. Sed pharetra, eros a feugiat porttitor, nisi
        eros dapibus mi, in semper augue erat sit amet nulla. Quisque
        non sapien sem.
      </Text>
    </Paragraph>
  </Modal>
</>;
```

### Modal Small Screen Variant, no portal and no scrolling

Small screen variant takes all available screen space.

Not scrollable modals do not allow content scrolling by default. Disabling scrolling also removes the horizontal divider line above the buttons.

Disabling portal renders content inside the modal component, not as the last DOM node when using a portal. When portals are disabled, z-index of the portal is set to 100.

```js
import { useState } from 'react';
import {
  Modal,
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
    Open modal dialogue
  </Button>
  <Modal
    visible={visible}
    scrollable={false}
    usePortal={false}
    variant="smallScreen"
    title="Test modal"
    primaryButtonLabel="OK"
    primaryButtonProps={{ onClick: () => setVisible(!visible) }}
    onEscKeyDown={() => setVisible(!visible)}
  >
    <Paragraph>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus scelerisque elit a consectetur tempor. Morbi sit
        amet lobortis ipsum. Nunc ac ante ligula. Mauris sem urna,
        feugiat eu faucibus in, vehicula sit amet nibh. Duis non
        egestas enim. Sed pharetra, eros a feugiat porttitor, nisi
        eros dapibus mi, in semper augue erat sit amet nulla. Quisque
        non sapien sem.
      </Text>
    </Paragraph>
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
    Open modal dialogue
  </Button>
  <input ref={returnFocusRef} />
  <Modal
    title="Test modal"
    primaryButtonLabel="OK"
    visible={visible}
    primaryButtonProps={{ onClick: () => setVisible(!visible) }}
    focusOnOpenRef={initialFocusRef}
    focusOnCloseRef={returnFocusRef}
    onEscKeyDown={() => setVisible(!visible)}
  >
    <Button>Test Button</Button>
    <input ref={initialFocusRef} />
    <Paragraph>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus scelerisque elit a consectetur tempor. Morbi sit
        amet lobortis ipsum. Nunc ac ante ligula. Mauris sem urna,
        feugiat eu faucibus in, vehicula sit amet nibh. Duis non
        egestas enim. Sed pharetra, eros a feugiat porttitor, nisi
        eros dapibus mi, in semper augue erat sit amet nulla. Quisque
        non sapien sem.
      </Text>
    </Paragraph>
  </Modal>
</>;
```
