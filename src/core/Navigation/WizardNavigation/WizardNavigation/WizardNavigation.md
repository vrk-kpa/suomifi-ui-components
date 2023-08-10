Wizard navigation is used for user interactions that progress in phases. It can help to break up a long form into manageable sections and allows the user to see their progress as well.

- Use descriptive and short names for the sections
- Use `aria-current` for the currently active phase, `aria-disabled` for disabled phases and `aria-label` to mark completed phases.
- Provide the navigation a descriptive heading and use the correct heading level depending on the navigation's location in the page structure.
- When page content changes along with the phases, make sure this gets conveyed to screen reader users as well

<ul>
  <li><a href="/#/Components/WizardNavigation?id=basic-use">Basic use</a></li>
  <li><a href="/#/Components/WizardNavigation?id=small-screens">Small screens</a></li>
  <li><a href="/#/Components/WizardNavigation?id=using-with-frameworks">Using with frameworks</a></li>
</ul>

<div style="margin-bottom: 5px">
  <a href="/#/Components/WizardNavigation?id=props--methods">Props & methods (WizardNavigation)</a>
</div>
<div style="margin-bottom: 40px">
  <a href="/#/Components/WizardNavigation?id=wizardnavigationitem">Props & methods (WizardNavigationItem)</a>
</div>

### Basic use

A `<WizardNavigationItem>` can have one of these 6 statuses:

- default: reachable & incomplete step
- current: currently active step
- completed: a step where the user has filled all necessary information
- current-completed: a combination of current and completed statuses
- coming: a step which is unreachable at the moment (but will become available when e.g. the previous steps have been completed)
- disabled: disabled step, not reachable. We do not recommend the use of this status unless absolutely necessary

Please use `<RouterLink>` as the child of `<WizardNavigationItem>` to get inteded CSS styles. `<RouterLink>` is polymorphic, and can be rendered as any component of your choice, for example React Router Link.

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
  <WizardNavigation heading="Steps" aria-label="Main">
    <WizardNavigationItem status="completed">
      <RouterLink
        href="https://suomi.fi"
        aria-label="Step 1. This step is completed"
      >
        Step 1
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="default">
      <RouterLink href="#">Step 2</RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="current">
      <RouterLink aria-current="step" href="#">
        Step 3
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="coming">
      <RouterLink aria-disabled role="link" tabIndex={0}>
        Step 4 with a long text that wraps to the second line like
        this
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="coming">
      <RouterLink aria-disabled role="link" tabIndex={0}>
        Step 5
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="disabled">
      <RouterLink aria-disabled role="link" tabIndex={0}>
        Step 6
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="coming">
      <RouterLink
        asComponent={Comp}
        role="button"
        aria-disabled
        tabIndex={0}
      >
        Step 7
      </RouterLink>
    </WizardNavigationItem>
  </WizardNavigation>
</div>;
```

### Small screens

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
    variant="smallScreen"
    heading="Steps"
    initiallyExpanded={false}
    aria-label="Main"
  >
    <WizardNavigationItem status="default">
      <RouterLink href="https://suomi.fi">Step 1</RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="completed">
      <RouterLink
        href="#"
        aria-label="Step 2. This step is completed"
      >
        Step 2
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="current">
      <RouterLink aria-current="step" href="#">
        Step 3
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="coming">
      <RouterLink aria-disabled role="link" tabIndex={0}>
        Step 4
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="coming">
      <RouterLink aria-disabled role="link" tabIndex={0}>
        Step 5
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="disabled">
      <RouterLink aria-disabled role="link" tabIndex={0}>
        Step 6
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="coming">
      <RouterLink
        asComponent={Comp}
        role="button"
        aria-disabled
        tabIndex={0}
      >
        Step 7
      </RouterLink>
    </WizardNavigationItem>
  </WizardNavigation>
</div>;
```

### Using with frameworks

The polymorphic `<RouterLink>` component can be rendered as a component of your choice. This should provide support for most front-end frameworks.

For frameworks where its internal link component is used as a wrapper for the actual link, for example NextJS, the following approach can be used:

```jsx static
<WizardNavigationItem status="default">
  <NextJSLink href="/some-route" passHref>
    <RouterLink>Step 1</RouterLink>
  </NextJSLink>
</WizardNavigationItem>
```

### Props & methods
