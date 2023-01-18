### Basic usage

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

For frameworks where its internal link component is used as a wrapper for the actual link, for example NextJS, the following approach can be used:

```jsx static
<WizardNavigationItem status="default">
  <NextJSLink href="/some-route" passHref>
    <RouterLink>Step 1</RouterLink>
  </NextJSLink>
</WizardNavigationItem>
```

### Small screen version

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
