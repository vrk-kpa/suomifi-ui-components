import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../../utils/test';

import { WizardNavigation } from './WizardNavigation';
import { WizardNavigationItem } from '../WizardNavigationItem/WizardNavigationItem';
import { RouterLink } from '../../../Link';

const TestWizardNavigation = (
  <WizardNavigation heading="Steps" aria-label="Test">
    <WizardNavigationItem status="default">
      <RouterLink href="https://suomi.fi">1. Step</RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="completed">
      <RouterLink href="#" aria-label="Step 2. This step is completed">
        2. Step
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="current">
      <RouterLink aria-current="step" href="#">
        3. Step
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="coming">
      <RouterLink aria-disabled tabIndex={-1} href="#">
        4. Step
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="coming">
      <RouterLink aria-disabled tabIndex={-1} href="#">
        5. Step
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="disabled">
      <RouterLink aria-disabled tabIndex={-1} href="#">
        6. Step
      </RouterLink>
    </WizardNavigationItem>
    <WizardNavigationItem status="coming">
      <RouterLink asComponent="button" aria-disabled tabIndex={-1}>
        7. Step
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

describe('margin', () => {
  it('should have margin style from margin prop', () => {
    const { container } = render(
      <WizardNavigation aria-label="" heading="" margin="xs">
        <WizardNavigationItem status="current">Test</WizardNavigationItem>
      </WizardNavigation>,
    );
    expect(container.firstChild).toHaveAttribute('style', 'margin: 10px;');
  });

  it('should have margin style overridden by style prop', async () => {
    const { container } = render(
      <WizardNavigation
        aria-label=""
        heading=""
        margin="xs"
        style={{ margin: 2 }}
      >
        <WizardNavigationItem status="current">Test</WizardNavigationItem>
      </WizardNavigation>,
    );
    expect(container.firstChild).toHaveAttribute('style', 'margin: 2px;');
  });
});
