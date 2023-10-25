The `<WizardNavigation>` component is used for user interactions that progress in phases. It can help to break up a long form into manageable sections and allows the user to see their progress as well.

- [Basic use](./#/Components/WizardNavigation?id=basic-use)
- [Small screen](./#/Components/WizardNavigation?id=small-screen)
- [Using with frameworks](./#/Components/WizardNavigation?id=using-with-frameworks)

<div style="margin-bottom: 5px">
  [Props & methods (WizardNavigation)](./#/Components/WizardNavigation?id=props--methods)
</div>
<div style="margin-bottom: 40px">
  [Props & methods (WizardNavigationItem)](./#/Components/WizardNavigation?id=wizardnavigationitem)
</div>

### Basic use

- Compose the navigation with `<WizardNavigationItem>` components.
- Use `<RouterLink>` as the child of WizardNavigationItem to get inteded CSS styles. `<RouterLink>` is polymorphic, and can be rendered as any component of your choice, for example React Router Link.
- Use descriptive and short names for the steps
- Use `aria-current` for the currently active phase, `aria-disabled` for coming phases and an `aria-label` to mark completed phases.
- Provide the navigation a descriptive `heading` and use the correct heading level depending on the navigation's location in the page structure.
- When page content changes along with the phases, make sure this gets conveyed to screen reader users as well

A `<WizardNavigationItem>` can have one of these 6 statuses:

- `'default'`: An incomplete step which the user can reach
- `'current'`: Currently active step
- `'completed'`: A step where the user has filled all required information
- `'current-completed'`: Combination of current and completed statuses
- `'coming'`: A step which is not reachable at the moment (but will become available when e.g. the previous steps have been completed)
- `'disabled'`: A disabled step which will not become reachable. In most cases you should use `'coming'` instead of this

```js
import {
  WizardNavigation,
  WizardNavigationItem,
  RouterLink
} from 'suomifi-ui-components';

const Comp = (props) => {
  const { children, ...passProps } = props;
  return <div {...passProps}>{props.children}</div>;
};

<div style={{ width: '350px' }}>
  <WizardNavigation heading="Steps" aria-label="Steps">
    <WizardNavigationItem status="completed">
      <RouterLink
        href="https://suomi.fi"
        aria-label="1. Parties. This step is completed"
      >
        1. Parties
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="default">
      <RouterLink href="#">2. Mandate themes</RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="current">
      <RouterLink aria-current="step" href="#">
        3. Selected mandate themes
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="coming">
      <RouterLink aria-disabled role="link" tabIndex={0}>
        4. Validity
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="coming">
      <RouterLink aria-disabled role="link" tabIndex={0}>
        5. Summary and validation
      </RouterLink>
    </WizardNavigationItem>
  </WizardNavigation>
</div>;
```

### Small screen

- Apply `variant="smallScreen"` to get mobile screen styles. This includes a toggle button to show/hide the menu.
- Control the menu's initially opened state with the `initiallyExpanded` prop.

```js
import {
  WizardNavigation,
  WizardNavigationItem,
  RouterLink
} from 'suomifi-ui-components';

const Comp = (props) => {
  const { children, ...passProps } = props;
  return <div {...passProps}>{props.children}</div>;
};

<div style={{ width: '300px' }}>
  <WizardNavigation
    heading="Steps"
    aria-label="Steps"
    variant="smallScreen"
    initiallyExpanded={false}
  >
    <WizardNavigationItem status="completed">
      <RouterLink
        href="https://suomi.fi"
        aria-label="1. Parties. This step is completed"
      >
        1. Parties
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="default">
      <RouterLink href="#">2. Mandate themes</RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="current">
      <RouterLink aria-current="step" href="#">
        3. Selected mandate themes
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="coming">
      <RouterLink aria-disabled role="link" tabIndex={0}>
        4. Validity
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="coming">
      <RouterLink aria-disabled role="link" tabIndex={0}>
        5. Summary and validation
      </RouterLink>
    </WizardNavigationItem>
  </WizardNavigation>
</div>;
```

### Using with frameworks

The polymorphic `<RouterLink>` component can be rendered as a component of your choice. This should provide support for most front-end frameworks.

For frameworks where the internal link component is used as a wrapper for the actual link (for example NextJS) the following approach can be used

```jsx static
<WizardNavigationItem status="default">
  <NextJSLink href="/some-route" passHref>
    <RouterLink>Step 1</RouterLink>
  </NextJSLink>
</WizardNavigationItem>
```

<div style="margin-bottom: 40px"></div>

### Props & methods

WizardNavigation component supports [margin props](./#/Spacing/Margin%20props) for spacing.
