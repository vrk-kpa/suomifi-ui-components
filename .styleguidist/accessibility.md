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

Updated 3rd October 2025.

* **MultiSelect** and **SingleSelect**: On iOS using VoiceOver, and macOS versions 14 and older using Safari and VoiceOver, accessing and reading out the options in the opened listbox element is either hard or not possible.
* **SingleSelect**: The selected state of an option is not read out by JAWS.
* **Breadcrumb**: Height does not adjust when only text is resized 200%.
* **Dropdown**: Line-height does not adjust when only text is resized 200%.

## Our accessibility checklist

### On the tests

This checklist reflects the current features of the component library and covers WCAG 2.2. It is not meant to be a comprehensive WCAG checklist. For example, we do not test for Page Titled (WCAG-criterion 2.4.2), because the component library only includes invividual components, not pages. Similarly, we do not have a test for Captions (WCAG-criterion 1.2.2) or other media-related criteria, because there is no video content within our components. You should always do your own accessibility testing. A good start is the <a href="https://webaim.org/standards/wcag/checklist">WebAIM WCAG 2 Checklist</a>.

### Automated

* No errors reported by axe Devtools.

### Visual inspection

* Text contrast is at least 4.5:1 in each component state
* The contrast of essential non-text information is at least 3:1 with its surrroundings.
* Colour is not used as the only way to convey information.
* Target size for interactive elements is at least 24 x 24 pixels or there are no adjacent interactive elements within a 24px circle.

### Keyboard and pointer device

* All functionality can be accessed with keyboard
* Keyboard focus is clearly visible
* The keyboard focus order within a component is logical
* Focusing a component or its sub-component does not cause a change of context.
* Component has no single-character shortcuts.
* Focused elements are not obscured.

### Pointer devices

* Focusing or hovering a component or its sub-component does not cause a change of context.
* No actions are performed using the pointer down-event, unless it is native functionality defined by the user-agent.
* No actions require dragging movements.

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

Additionally, components are regularly tested using Narrator and Edge in Windows, the latest JAWS version and Chrome on Windows, and Orca and Firefox on Linux. 

All content should be available in reading mode, and all interactive functionality available in focus mode. Commands vary in different screen readers, and support for different HTML and ARIA features also varies and can depend both on what the accessibility tree of the browser exposes, as well as the screen reader itself.

### Other assistive technology

When appropriate, components are tested using Voice Control on macOS and voice access on Windows.
