### Basic usage

A `<WizardNavigationItem>` can have one of these 5 statuses:

- visited: the user has already visited this step and can go back to it
- current: currently active step
- proceed: the step directly following the current step. Is reachable
- not-visited: a step which follows the current step but is not directly after it, not reachable
- disabled: disabled step, not reachable

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

<div style={{ width: '300px' }}>
  <WizardNavigation heading="Steps">
    <WizardNavigationItem stepNumber={1} status="visited">
      <RouterLink href="https://suomi.fi">
        Step 1 (visited)
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem stepNumber={2} status="current">
      <RouterLink aria-current="step" aria-disabled href="#">
        Step 2 (current)
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem stepNumber={3} status="proceed">
      <RouterLink
        asComponent={Comp}
        onClick={() => console.log('Step 3 clicked!')}
        role="button"
        tabIndex={0}
      >
        Step 3 (proceed)
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem stepNumber={4} status="not-visited">
      <RouterLink aria-disabled tabIndex={-1} href="#">
        Step 4 (not visited)
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem stepNumber={5} status="disabled">
      <RouterLink aria-disabled tabIndex={-1} href="#">
        Step 5 (disabled)
      </RouterLink>
    </WizardNavigationItem>
  </WizardNavigation>
</div>;
```

For frameworks where its internal link component is used as a wrapper for the actual link, for example NextJS, the following approach can be used:

```jsx static
<WizardNavigationItem stepNumber={1} status="current">
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
    heading="Steps"
    variant="smallScreen"
    initiallyExpanded={false}
  >
    <WizardNavigationItem stepNumber={1} status="visited">
      <RouterLink href="https://suomi.fi">
        Step 1 (visited)
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem stepNumber={2} status="current">
      <RouterLink aria-current="step" aria-disabled href="#">
        Step 2 (current)
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem stepNumber={3} status="proceed">
      <RouterLink
        asComponent={Comp}
        onClick={() => console.log('Step 3 clicked!')}
        role="button"
        tabIndex={0}
      >
        Step 3 (proceed)
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem stepNumber={4} status="not-visited">
      <RouterLink aria-disabled tabIndex={-1} href="#">
        Step 4 (not visited)
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem stepNumber={5} status="disabled">
      <RouterLink aria-disabled tabIndex={-1} href="#">
        Step 5 (disabled)
      </RouterLink>
    </WizardNavigationItem>
  </WizardNavigation>
</div>;
```
