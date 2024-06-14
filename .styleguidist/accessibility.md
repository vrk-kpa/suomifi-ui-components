Our goal is to be WCAG 2.2 compliant at an AA level for all components. Additionally, components are tested in commonly used user agents and with common assistive technology. We also aim to support Windows High Contrast mode. Based on our testing, almost all components fulfill these goals, with a few [outstanding issues](./#Accessibility?=known-issues).

Using the Suomi.fi component library does not automatically make your project accessible, but it will hopefully significantly reduce the amount of work you need to do to provice an accessible user experience. It is important to read the documentation for each component carefully.

* [Known issues](./#/Accessibility?id=known-issues)
* [Our acccessibility checklist](./#/Accessibility?id=our-accessibility-checklist)
    * [On the tests](./#/Accessibility?id=on-the-tests)
    * [Automated](./#/Accessibility?id=automated)
    * [Visual inspection](./#/Accessibility?id=visual-inspection)
    * [Keyboard](./#/Accessibility?id=keyboard)
    * [Pointer devices](./#/Accessibility?id=pointer-devices)
    * [Adaptability](./#/Accessibility?id=adaptability)
    * [Code inspection](./#/Accessibility?id=code-inspection)
    * [Windows High Contrast Mode](./#/Accessibility?id=windows-high-contrast-mode)
    * [Motion](./#/Accessibility?id=motion)
    * [Screen reader tests and support](./#/Accessibility?id=screen-reader-tests-and-support)
    * [Other assistive technology](./#/Accessibility?id=other-assistive-technology)

## Known issues

- **MultiSelect** and **SingleSelect**: Options are not read out by VoiceOver on macOS when using Safari and when navigating options using up/down arrow keys. Options remain accessible using regular VO+arrow key combinations.
- **MultiSelect** and **SingleSelect**: The selected state of an option is not read out by JAWS with either Chrome or Firefox or macOS VoiceOver with Safari.
- **MultiSelect**, **SingleSelect** and **DropDown**: Browsing the options of the opened listbox in VoiceOver on iOS requires using touch navigation.
- **Textarea** and **TextInput**: Success/error states are not distinguishable without colour.
- **Breadcrumb**: Height does not adjust when text wraps, e.g. when text is resized 200%.
- **Dropdown**: Height does not adjust when only text is resized 200%.
- **DateInput**: Disabled dates are not distuinguishable from non-disabled ones in Windows High Contrast mode.

## Our accessibility checklist

### On the tests

This checklist reflects the current features of the component library. It is not meant to be a comprehensive WCAG checklist. For example, we do not test for Page Titled (WCAG-criterion 2.4.2), because the component library only includes invividual components, not pages. Similarly, we do not have a test for Captions (WCAG-criterion *2.2) or other media-related criteria, because there is no video content within our components. You should always do your own accessibility testing. A good start is the <a href="https://webaim.org/standards/wcag/checklist">WebAIM WCAG 2 Checklist</a>.

### Automated

* No errors reported by axe Devtools.

### Visual inspection

* Text contrast is at least 4.5:1 in each component state
* The contrast of essential non-text information is at least 3:1 with its surrroundings.
* Colour is not used as the only way to convey information.

### Keyboard and pointer device

* All functionality can be accessed with keyboard
* Keyboard focus is clearly visible
* The element in focus is visible when it receives keyboard focus.
* The keyboard focus order within a component is logical
* Focusing a component or its sub-component does not cause a change of context.
* Component has no single-character shortcuts.

### Pointer devices

* Focusing or hovering a component or its sub-component does not cause a change of context.
* No actions are performed using the pointer down-event, unless it is native functionality defined by the user-agent.
* Any actions that use a dragging movement can also be performed using a single pointer without dragging.
* Target sizes fulfill WCAG 2.5.8 Target Size (Minimum) requirement 24 x 24 px.

### Adaptability

* Text resizing to 200% does not cause loss of information or overlapping content. **Must** support full-page zoom. **Should** support text-only zoom. 
* Changing text settings according to WCAG 1.4.12 does not cause loss of information or overlap.
* Zooming to 400% in a 1280px wide window does not cause horizontal scrolling, loss or overlap of information.
* Content is not limited to a specific device orientation.

### Code inspection

* Lists are marked using the correct HTML elements.
* Correct semantic elements are used where appropriate (headings, lists)
* For components with text in a different language than the surrounding text, check that the language can be programmatically evaluated.

### Windows High Contrast mode

* Components and their different states are distinguishable when running in Windows High Contrast Mode.
* Keyboard focus is visible when running in Windows High Contrast Mode.

### Motion

* If the component has animations, check that they respect the Reduced Motion platform setting.

### Screen reader tests and support

Officially supported browser / screen reader combinations:

| Operating system | Browsers              | Screen reader |
| ---------------- | --------------------- | ------------- |
| macOS            | Safari, Chrome, Edge  | VoiceOver     |
| Windows          | Chrome, Firefox, Edge | NVDA          |
| iOS              | Safari                | VoiceOver     |
| Android          | Chrome                | TalkBack      |

Additionally, components are tested using Narrator and Edge in Windows, the latest JAWS version and Chrome on Windows, and Orca and Firefox on Linux. 

All content should be available in reading mode, and all interactive functionality  available in focus mode. Commands vary in different screen readers, and support for different HTML and ARIA features also varies and can depend both on what the accessibility tree of the browser exposes, as well as the screen reader itself.

### Other assistive technology

When appropriate, components are tested using Voice Control on macOS and voice access on Windows.
