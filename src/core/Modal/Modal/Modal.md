### Basic Modal

Visibility of the Modal is controlled outside the component. Opening and closing the Modal needs to be explicitly set on desired functionality (primary and secondary buttons, esc key).

Small screen variant takes all available screen space.

**NOTE:** React-modal does not consider some inline elements to be focusable. To ensure focusability inside Modal, components must have non-zero size, be visible, have tabindex of 0 or greater, must be of node type input, select, textarea, button, object or a with either tabIndex or href attribute and cannot be disabled! ([source](https://github.com/reactjs/react-modal/blob/827796d48e7d4c74b4362cf90955e162082ee46d/src/helpers/tabbable.js))

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
  ToggleInput,
  Dropdown,
  DropdownItem
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
    appElementId="rsg-root"
    visible={visible}
    variant={smallScreen ? 'smallScreen' : 'default'}
    onEscKeyDown={() => setVisible(false)}
  >
    <ModalContent>
      <ModalTitle>Test modal</ModalTitle>
      <Dropdown labelText="Dropdown" defaultValue={'dropdown-item-2'}>
        <DropdownItem value={'dropdown-item-1'}>
          Dropdown Item 1
        </DropdownItem>
        <DropdownItem value={'dropdown-item-2'}>
          Dropdown Item 2
        </DropdownItem>
      </Dropdown>
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
    appElementId="rsg-root"
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

By default, initial focus will be in the modal title. When closed, focus will return to where it was before opening.

_focusOnOpenRef_ and _focusOnCloseRef_ props can be used to change this behaviour.

NOTE: **use with caution** as screen reader users may get confused if initial focus is not in the beginning of modal or if focus does not return to where it was before opening the modal.

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
    appElementId="rsg-root"
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

### Complex Modal

Modal content wrapper default styles, e.g. width, can be overriden using the `style` prop. However, also styles for the smallScreen variant should be provided as inline styles override all variant defaults. Modal should always be fullscreen on small sceens.

It is possible to override the default styles using css as well. Using the className prop e.g. with `custom` and defining `.fi-modal.custom` and `.fi-modal--small-screen.custom` styles overrides the defaults.

ModalContent `scroll-padding-bottom` style defaults to 75px and determines how the browser scrolls the content when focus shifts outside or close to the borders of the current view. This style can be overridden with method described above using `.fi-modal_content` classname.

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
  suomifiDesignTokens,
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
    Open modal dialog
  </Button>
  <ToggleInput onChange={(value) => setSmallScreen(value)}>
    smallScreen
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
