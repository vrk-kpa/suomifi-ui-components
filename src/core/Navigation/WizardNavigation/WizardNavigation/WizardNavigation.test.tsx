import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../../utils/test';

import { WizardNavigation } from './WizardNavigation';
import { WizardNavigationItem } from '../WizardNavigationItem/WizardNavigationItem';
import { RouterLink } from '../../../Link';

const TestWizardNavigation = (
  <WizardNavigation heading="Steps">
    <WizardNavigationItem stepNumber={1} status="visited">
      <RouterLink href="https://suomi.fi">Step 1 (visited)</RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem stepNumber={2} status="current">
      <RouterLink aria-current="step" aria-disabled href="#">
        Step 2 (current)
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem stepNumber={3} status="proceed">
      <RouterLink
        asComponent="button"
        onClick={() => console.log('Step 3 clicked!')}
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
);

test('calling render with the same component on the same container does not remount', () => {
  const WizardNavRendered = render(TestWizardNavigation);
  const { container } = WizardNavRendered;
  expect(container.firstChild).toMatchSnapshot();
});

test(
  'should not have basic accessibility issues',
  axeTest(TestWizardNavigation),
);
