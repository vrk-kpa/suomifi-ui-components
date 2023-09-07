Use the `<Modal>` component to create accessible modals in your application.

Examples:

- [Basic use](./#/Components/Modal?id=basic-use)
- [Full screen](./#/Components/Modal?id=full-screen)
- [No scrolling (dialog)](./#/Components/Modal?id=no-scrolling-dialog)
- [Set focus on open and close](./#/Components/Modal?id=set-focus-on-open-and-close)
- [Complex Modal with custom styling](./#/Components/Modal?id=complex-modal-with-custom-styling)

<div style="margin-bottom: 5px">
  [Props & methods (Modal)](./#/Components/Modal?id=props--methods)
</div>
<div style="margin-bottom: 5px">
  [Props & methods (ModalContent)](./#/Components/Modal?id=modalcontent)
</div>
<div style="margin-bottom: 5px">
  [Props & methods (ModalTitle)](./#/Components/Modal?id=modaltitle)
</div>
<div style="margin-bottom: 40px">
  [Props & methods (ModalFooter)](./#/Components/Modal?id=modalfooter)
</div>

### Basic use

Compose the Modal with `<ModalContent>`, `<ModalTitle>` and `<ModalFooter>`

Hide the application root node from the keyboard focus order and assistive technology using the `appElementId` prop.

Visibility state of the Modal is controlled outside the component. Closing the Modal needs to be done explicitly on footer buttons and esc keypress.

```js
import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalFooter,
  Button,
  Paragraph,
  Text
} from 'suomifi-ui-components';

const [visible, setVisible] = useState(false);

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Phasellus scelerisque elit a consectetur tempor. Morbi sit
amet lobortis ipsum. Nunc ac ante ligula. Mauris sem urna,
feugiat eu faucibus in, vehicula sit amet nibh. Duis non
egestas enim. Sed pharetra, eros a feugiat porttitor, nisi
eros dapibus mi, in semper augue erat sit amet nulla.
Quisque non sapien sem.`;

<>
  <Button onClick={() => setVisible(true)}>Open example modal</Button>
  <Modal
    appElementId="rsg-root"
    visible={visible}
    onEscKeyDown={() => setVisible(false)}
  >
    <ModalContent>
      <ModalTitle>Modal example</ModalTitle>
      <Paragraph>
        {Array.apply(null, { length: 10 }).map((e, i) => (
          <Paragraph marginBottomSpacing="l" key={i}>
            <Text>{text}</Text>
          </Paragraph>
        ))}
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

### Full screen

Use `variant="smallScreen"` to make the Modal take all available screen space. This also makes the footer buttons full width.

Full screen modal should always be used on mobile devices.

```js
import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalFooter,
  Button,
  Paragraph,
  Text
} from 'suomifi-ui-components';

const [visible, setVisible] = useState(false);

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Phasellus scelerisque elit a consectetur tempor. Morbi sit
amet lobortis ipsum. Nunc ac ante ligula. Mauris sem urna,
feugiat eu faucibus in, vehicula sit amet nibh. Duis non
egestas enim. Sed pharetra, eros a feugiat porttitor, nisi
eros dapibus mi, in semper augue erat sit amet nulla.
Quisque non sapien sem.`;

<>
  <Button onClick={() => setVisible(true)}>Open example modal</Button>
  <Modal
    appElementId="rsg-root"
    visible={visible}
    onEscKeyDown={() => setVisible(false)}
    variant="smallScreen"
  >
    <ModalContent>
      <ModalTitle>Modal example</ModalTitle>
      <Paragraph>
        {Array.apply(null, { length: 10 }).map((e, i) => (
          <Paragraph marginBottomSpacing="l" key={i}>
            <Text>{text}</Text>
          </Paragraph>
        ))}
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

### No scrolling (dialog)

Set `scrollable={false}` to prevent content scrolling. Disabling scrolling also removes the horizontal divider line above the ModalFooter. This makes the Modal appear more like a dialog.

```js
import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalFooter,
  Button,
  Paragraph,
  Text
} from 'suomifi-ui-components';

const [visible, setVisible] = useState(false);

<>
  <Button onClick={() => setVisible(true)}>Open modal dialog</Button>
  <Modal
    appElementId="rsg-root"
    visible={visible}
    scrollable={false}
    onEscKeyDown={() => setVisible(false)}
  >
    <ModalContent>
      <ModalTitle>Example dialog</ModalTitle>
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

### Set focus on open and close

By default, initial focus will be in the modal title. When closed, focus will return to where it was before opening.

The `focusOnOpenRef` and `focusOnCloseRef` props can be used to change this behaviour.

**NOTE**: Use with caution as screen reader users may get confused if initial focus is not in the beginning of modal or if focus does not return to where it was before opening the modal. In modals with little content, initial focus could be set on the first interactive element, e.g. an "OK" button or a text input.

**NOTE 2:** The component is built with React-modal, which does not consider some inline elements to be focusable. To ensure focusability inside Modal, components must have non-zero size, be visible, have tabindex of 0 or greater, must be of node type input, select, textarea, button, object or a with either tabIndex or href attribute and cannot be disabled! ([source](https://github.com/reactjs/react-modal/blob/827796d48e7d4c74b4362cf90955e162082ee46d/src/helpers/tabbable.js))

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
    Open example modal
  </Button>
  <TextInput
    labelText="TextInput to be focused on close"
    ref={returnFocusRef}
  />
  <Modal
    appElementId="rsg-root"
    visible={visible}
    focusOnOpenRef={initialFocusRef}
    focusOnCloseRef={returnFocusRef}
    onEscKeyDown={() => setVisible(false)}
  >
    <ModalContent>
      <ModalTitle>Example modal</ModalTitle>
      <Block my="xl">
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

### Complex Modal with custom styling

Modal content wrapper default styles (e.g. width) can be overriden using the `style` prop. Remember to provide styles for the smallScreen variant separately since inline styles override all variant defaults.

It is possible to override the default styles using CSS as well. Use e.g. `className="custom"` and define `.fi-modal.custom` and `.fi-modal--small-screen.custom` to override default styles.

ModalContent `scroll-padding-bottom` style defaults to 75px and determines how the browser scrolls the content when focus shifts outside or close to the borders of the current view. This style can be overridden with the method described above using `.fi-modal_content` classname.

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
  InlineAlert
} from 'suomifi-ui-components';
import { IconError } from 'suomifi-icons';

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
    Open complex modal
  </Button>
  <ToggleInput onChange={(value) => setSmallScreen(value)}>
    smallScreen variant
  </ToggleInput>
  <Modal
    appElementId="rsg-root"
    visible={visible}
    variant={smallScreen ? 'smallScreen' : 'default'}
    style={{ width: smallScreen ? '100%' : '1000px' }}
    onEscKeyDown={() => setVisible(false)}
  >
    <ModalContent style={{ scrollPaddingBottom: '150px' }}>
      <ModalTitle>Test modal</ModalTitle>
      <ExpanderGroup
        openAllText="Open all"
        ariaOpenAllText="Open all expanders"
        closeAllText="Close all"
        ariaCloseAllText="Close all expanders"
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
      <InlineAlert status="warning">
        We are experiencing connectivity issues
      </InlineAlert>
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

### Props & methods
