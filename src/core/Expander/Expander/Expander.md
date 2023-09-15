The `<Expander>` component is used to hide information under an expandable title. Expanders can shorten an otherwise lengthy page and make it easier to perceive a page with a lot of information.

Examples:

- [Basic use](./#/Components/Expander?id=basic-use)
- [Default open](./#/Components/Expander?id=default-open)
- [Heading semantics](./#/Components/Expander?id=heading-semantics)
- [Expanders in group](./#/Components/Expander?id=expanders-in-group)
- [Group without open/close all button](./#/Components/Expander?id=group-without-openclose-all-button)
- [Controlled state](./#/Components/Expander?id=controlled-state)
- [Interactive elements in Expander title](./#/Components/Expander?id=interactive-elements-in-expander-title)

<div style="margin-bottom: 5px">
  [Props & methods (Expander)](./#/Components/Expander?id=props--methods)
</div>
<div style="margin-bottom: 5px">
  [Props & methods (ExpanderTitleButton)](./#/Components/Expander?id=expandertitlebutton)
</div>
<div style="margin-bottom: 5px">
  [Props & methods (ExpanderContent)](./#/Components/Expander?id=expandercontent)
</div>
<div style="margin-bottom: 5px">
  [Props & methods (ExpanderGroup)](./#/Components/Expander?id=expandergroup)
</div>
<div style="margin-bottom: 40px">
  [Props & methods (ExpanderTitle)](./#/Components/Expander?id=expandertitle)
</div>

### Basic use

Compose the Expander using `<ExpanderTitleButton>` and `<ExpanderContent>`

```jsx
import {
  Expander,
  ExpanderTitleButton,
  ExpanderContent,
  Paragraph
} from 'suomifi-ui-components';

<Expander>
  <ExpanderTitleButton>
    Assistance with financial problems
  </ExpanderTitleButton>
  <ExpanderContent>
    <Paragraph mb="l">
      If your company is experiencing financial or payment
      difficulties, please contact the Yrittäjän talousapu counselling
      service.
    </Paragraph>
    <Paragraph mb="l">Telephone Service 0295 024 882</Paragraph>
    <Paragraph>Monday - Friday 9.00–16.15</Paragraph>
  </ExpanderContent>
</Expander>;
```

### Default open

Use the `defaultOpen` prop to make the Expander show its content on first render.

```jsx
import {
  Expander,
  ExpanderTitleButton,
  ExpanderContent,
  Paragraph
} from 'suomifi-ui-components';

<Expander defaultOpen>
  <ExpanderTitleButton>
    Assistance with financial problems
  </ExpanderTitleButton>
  <ExpanderContent>
    <Paragraph mb="l">
      If your company is experiencing financial or payment
      difficulties, please contact the Yrittäjän talousapu counselling
      service.
    </Paragraph>
    <Paragraph mb="l">Telephone Service 0295 024 882</Paragraph>
    <Paragraph>Monday - Friday 9.00–16.15</Paragraph>
  </ExpanderContent>
</Expander>;
```

### Heading semantics

You can use the `asHeading` prop in ExpanderTitleButton to render the Expander button inside a heading element. Should always be used when the ExpanderContent might contain subheadings. Make sure the heading hierarchy is logical.

```jsx
import {
  Expander,
  ExpanderTitleButton,
  ExpanderContent,
  Paragraph
} from 'suomifi-ui-components';

<Expander>
  <ExpanderTitleButton asHeading="h3">
    Assistance with financial problems
  </ExpanderTitleButton>
  <ExpanderContent>
    <Paragraph mb="l">
      If your company is experiencing financial or payment
      difficulties, please contact the Yrittäjän talousapu counselling
      service.
    </Paragraph>
    <Paragraph mb="l">Telephone Service 0295 024 882</Paragraph>
    <Paragraph>Monday - Friday 9.00–16.15</Paragraph>
  </ExpanderContent>
</Expander>;
```

### Expanders in group

Use the `<ExpanderGroup>` wrapper to group Expanders together.

All Expanders in a group can be toggled simultaneously with a close/open all button (`openAllText` and `closeAllText` props).

For screen readers, it is recommended to provide a more descriptive label for the button using the `ariaOpenAllText` and `ariaCloseAllText` props.

```jsx
import {
  Expander,
  ExpanderGroup,
  ExpanderTitleButton,
  ExpanderContent,
  Paragraph,
  Text
} from 'suomifi-ui-components';

<ExpanderGroup
  openAllText="Open all"
  ariaOpenAllText="Open all expanders"
  closeAllText="Close all"
  ariaCloseAllText="Close all expanders"
>
  <Expander>
    <ExpanderTitleButton>
      Can I manage my own devices?
    </ExpanderTitleButton>
    <ExpanderContent>
      <Paragraph mb="l">
        You can manage the devices you use:
      </Paragraph>
      <Paragraph mb="l">
        <Text variant="bold">In the Suomi.fi application</Text>
        <ul>
          <li>Settings: Login and Security</li>
        </ul>
        <Text variant="bold">
          In the Suomi.fi Web Service or mobile device browser{' '}
        </Text>
        <ul>
          <li>Messages section: Device Manager</li>
        </ul>
      </Paragraph>
      <Paragraph>
        Device data will include the name of each device and the time
        at which the application has last been used. You can log out
        of the Suomi.fi application the devices you choose. Logging
        out will remove all Suomi.fi applications from the device you
        have selected. In this case, the Suomi.fi Messages cannot be
        used on the device until a new e-identification.
      </Paragraph>
    </ExpanderContent>
  </Expander>
  <Expander>
    <ExpanderTitleButton>
      Is the application secure?
    </ExpanderTitleButton>
    <ExpanderContent>
      <Paragraph mb="l">
        Suomi.fi Messages is a secure way to communicate with
        organisations that use the service.
        <ul>
          <li>
            The messages and attachments shown in the application are
            transmitted in encrypted form between the mobile device
            and the server.
          </li>
          <li>
            The app requires permissions to use your mobile device’s
            photographs and other files, so it can process attachments
            included in messages.
          </li>
          <li>
            The user is individually identified using strong
            identification. This means that you are the only person
            who can access your data.
          </li>
        </ul>
      </Paragraph>
      <Paragraph>
        If you break your mobile device or lose it, you can sign out
        of the Suomi.fi application either in the Suomi.fi web service
        or by using another phone.
      </Paragraph>
    </ExpanderContent>
  </Expander>
  <Expander>
    <ExpanderTitleButton>
      Errors in the Suomi.fi mobile application
    </ExpanderTitleButton>
    <ExpanderContent>
      <Paragraph mb="l">
        If the application does not work on your mobile device for
        some reason, you can also read your messages via a browser
      </Paragraph>
      <Paragraph>
        Errors occurring in the Suomi.fi application generally do not
        affect the preservation of Suomi.fi Messages.
      </Paragraph>
    </ExpanderContent>
  </Expander>
</ExpanderGroup>;
```

### Group without open/close all button

You can hide the open/close all button of the group with `showToggleAllButton={false}`

```jsx
import {
  Expander,
  ExpanderGroup,
  ExpanderTitleButton,
  ExpanderContent,
  Paragraph,
  Text
} from 'suomifi-ui-components';

<ExpanderGroup
  openAllText="Open all"
  ariaOpenAllText="Open all expanders"
  closeAllText="Close all"
  ariaCloseAllText="Close all expanders"
  showToggleAllButton={false}
>
  <Expander>
    <ExpanderTitleButton>
      Can I manage my own devices?
    </ExpanderTitleButton>
    <ExpanderContent>
      <Paragraph mb="l">
        You can manage the devices you use:
      </Paragraph>
      <Paragraph mb="l">
        <Text variant="bold">In the Suomi.fi application</Text>
        <ul>
          <li>Settings: Login and Security</li>
        </ul>
        <Text variant="bold">
          In the Suomi.fi Web Service or mobile device browser{' '}
        </Text>
        <ul>
          <li>Messages section: Device Manager</li>
        </ul>
      </Paragraph>
      <Paragraph>
        Device data will include the name of each device and the time
        at which the application has last been used. You can log out
        of the Suomi.fi application the devices you choose. Logging
        out will remove all Suomi.fi applications from the device you
        have selected. In this case, the Suomi.fi Messages cannot be
        used on the device until a new e-identification.
      </Paragraph>
    </ExpanderContent>
  </Expander>
  <Expander>
    <ExpanderTitleButton>
      Is the application secure?
    </ExpanderTitleButton>
    <ExpanderContent>
      <Paragraph mb="l">
        Suomi.fi Messages is a secure way to communicate with
        organisations that use the service.
        <ul>
          <li>
            The messages and attachments shown in the application are
            transmitted in encrypted form between the mobile device
            and the server.
          </li>
          <li>
            The app requires permissions to use your mobile device’s
            photographs and other files, so it can process attachments
            included in messages.
          </li>
          <li>
            The user is individually identified using strong
            identification. This means that you are the only person
            who can access your data.
          </li>
        </ul>
      </Paragraph>
      <Paragraph>
        If you break your mobile device or lose it, you can sign out
        of the Suomi.fi application either in the Suomi.fi web service
        or by using another phone.
      </Paragraph>
    </ExpanderContent>
  </Expander>
  <Expander>
    <ExpanderTitleButton>
      Errors in the Suomi.fi mobile application
    </ExpanderTitleButton>
    <ExpanderContent>
      <Paragraph mb="l">
        If the application does not work on your mobile device for
        some reason, you can also read your messages via a browser
      </Paragraph>
      <Paragraph>
        Errors occurring in the Suomi.fi application generally do not
        affect the preservation of Suomi.fi Messages.
      </Paragraph>
    </ExpanderContent>
  </Expander>
</ExpanderGroup>;
```

### Controlled state

You can control the state of an individual Expander programmatically with the `open` prop.

```jsx
import {
  Expander,
  ExpanderGroup,
  ExpanderTitleButton,
  ExpanderContent,
  Paragraph,
  Text
} from 'suomifi-ui-components';
import { useState } from 'react';

const [expanderOneOpen, setExpanderOneOpen] = useState(false);
const [expanderTwoOpen, setExpanderTwoOpen] = useState(false);
const [expanderThreeOpen, setExpanderThreeOpen] = useState(true);

<>
  <button onClick={() => setExpanderTwoOpen(!expanderTwoOpen)}>
    Toggle middle expader
  </button>
  <ExpanderGroup
    openAllText="Open all"
    ariaOpenAllText="Open all sections"
    closeAllText="Close all"
    ariaCloseAllText="Close all sections"
    showToggleAllButton={false}
  >
    <Expander open={expanderOneOpen}>
      <ExpanderTitleButton>
        Can I manage my own devices?
      </ExpanderTitleButton>
      <ExpanderContent>
        <Paragraph mb="l">
          You can manage the devices you use:
        </Paragraph>
        <Paragraph mb="l">
          <Text variant="bold">In the Suomi.fi application</Text>
          <ul>
            <li>Settings: Login and Security</li>
          </ul>
          <Text variant="bold">
            In the Suomi.fi Web Service or mobile device browser{' '}
          </Text>
          <ul>
            <li>Messages section: Device Manager</li>
          </ul>
        </Paragraph>
        <Paragraph>
          Device data will include the name of each device and the
          time at which the application has last been used. You can
          log out of the Suomi.fi application the devices you choose.
          Logging out will remove all Suomi.fi applications from the
          device you have selected. In this case, the Suomi.fi
          Messages cannot be used on the device until a new
          e-identification.
        </Paragraph>
      </ExpanderContent>
    </Expander>
    <Expander open={expanderTwoOpen}>
      <ExpanderTitleButton>
        Is the application secure?
      </ExpanderTitleButton>
      <ExpanderContent>
        <Paragraph mb="l">
          Suomi.fi Messages is a secure way to communicate with
          organisations that use the service.
          <ul>
            <li>
              The messages and attachments shown in the application
              are transmitted in encrypted form between the mobile
              device and the server.
            </li>
            <li>
              The app requires permissions to use your mobile device’s
              photographs and other files, so it can process
              attachments included in messages.
            </li>
            <li>
              The user is individually identified using strong
              identification. This means that you are the only person
              who can access your data.
            </li>
          </ul>
        </Paragraph>
        <Paragraph>
          If you break your mobile device or lose it, you can sign out
          of the Suomi.fi application either in the Suomi.fi web
          service or by using another phone.
        </Paragraph>
      </ExpanderContent>
    </Expander>
    <Expander open={expanderThreeOpen}>
      <ExpanderTitleButton>
        Errors in the Suomi.fi mobile application
      </ExpanderTitleButton>
      <ExpanderContent>
        <Paragraph mb="l">
          If the application does not work on your mobile device for
          some reason, you can also read your messages via a browser
        </Paragraph>
        <Paragraph>
          Errors occurring in the Suomi.fi application generally do
          not affect the preservation of Suomi.fi Messages.
        </Paragraph>
      </ExpanderContent>
    </Expander>
  </ExpanderGroup>
</>;
```

### Interactive elements in Expander title

If you need to have interactive elements in the Expander title, use `<ExpanderTitle>` instead of `<ExpanderTitleButton>`.

ExpanderTitle creates a smaller toggle button to the right side of the Expander. For screen readers, it is recommended to provide a descriptive label for the button using `toggleButtonAriaLabel`. State is communicated to assistive technology using `aria-expanded`. Point `toggleButtonAriaDescribedBy` to the ID of interactive element to provide additional context for assistive technology. Screenreader reads `toggleButtonAriaLabel` and `toggleButtonAriaDescribedBy` together.

```jsx
import {
  Expander,
  ExpanderTitle,
  ExpanderContent,
  Checkbox,
  Paragraph
} from 'suomifi-ui-components';

<Expander>
  <ExpanderTitle
    toggleButtonAriaLabel="Additional information"
    toggleButtonAriaDescribedBy="checkbox-id"
  >
    <Checkbox id="checkbox-id">Guardianship</Checkbox>
  </ExpanderTitle>
  <ExpanderContent>
    <Paragraph mb="l">
      Guardianship means the management of other persons’ finances and
      looking after their interests when they are no longer able to do
      it. Choose guardianship if the matters of a person close to you
      cannot be managed in any other way.
    </Paragraph>
    <Paragraph>
      You can safeguard the management of your property and other
      personal matters with a continuing power of attorney.
    </Paragraph>
  </ExpanderContent>
</Expander>;
```

### Props & methods
