import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../../utils/test';

import { ServiceNavigation } from './ServiceNavigation';
import { ServiceNavigationItem } from '../ServiceNavigationItem/ServiceNavigationItem';
import { ExternalLink, RouterLink } from '../../../Link';
import { StaticChip } from '../../../Chip';

interface TestProps {
  children: string;
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
}

const Comp = ({ children, ...passProps }: TestProps) => (
  <div {...passProps}>{children}</div>
);

const TestServiceNavigation = (
  <ServiceNavigation aria-label="Test">
    <ServiceNavigationItem>
      <RouterLink href="/" aria-label="Inbox. 16 unread messages.">
        Inbox
        <StaticChip style={{ marginLeft: '15px' }} aria-hidden>
          16
        </StaticChip>
      </RouterLink>
    </ServiceNavigationItem>
    <ServiceNavigationItem>
      <RouterLink asComponent={ExternalLink} href="https://suomi.fi" hideIcon>
        Sent
      </RouterLink>
    </ServiceNavigationItem>
    <ServiceNavigationItem selected>
      <RouterLink
        asComponent={ExternalLink}
        href="https://www.suomi.fi"
        hideIcon
        aria-current="page"
      >
        New Message
      </RouterLink>
    </ServiceNavigationItem>
    <ServiceNavigationItem>
      <RouterLink
        asComponent={ExternalLink}
        href="https://www.suomi.fi"
        hideIcon
      >
        Drafts
      </RouterLink>
    </ServiceNavigationItem>
    <ServiceNavigationItem>
      <RouterLink
        asComponent={Comp}
        onClick={() => console.log('Nav item clicked')}
      >
        Settings
      </RouterLink>
    </ServiceNavigationItem>
    <ServiceNavigationItem disabled>
      <RouterLink>Devices</RouterLink>
    </ServiceNavigationItem>
  </ServiceNavigation>
);

it('should match snapshot', () => {
  const NavRendered = render(TestServiceNavigation);
  const { container } = NavRendered;
  expect(container.firstChild).toMatchSnapshot();
});

test(
  'should not have basic accessibility issues',
  axeTest(TestServiceNavigation),
);

describe('margin', () => {
  it('should have margin style from margin prop', () => {
    const { container } = render(
      <ServiceNavigation aria-label="" margin="xs">
        <ServiceNavigationItem>Test</ServiceNavigationItem>
      </ServiceNavigation>,
    );
    expect(container.firstChild).toHaveAttribute('style', 'margin: 10px;');
  });
});
