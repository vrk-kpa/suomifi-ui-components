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
  <ServiceNavigation>
    <ServiceNavigationItem aria-label="16 unread messages">
      <RouterLink
        asComponent={Comp}
        onClick={() => console.log('Nav item clicked')}
        role="button"
        tabIndex={0}
      >
        Inbox
        <StaticChip style={{ marginLeft: '15px' }}>16</StaticChip>
      </RouterLink>
    </ServiceNavigationItem>
    <ServiceNavigationItem>
      <RouterLink asComponent={ExternalLink} href="https://suomi.fi" hideIcon>
        Sent
      </RouterLink>
    </ServiceNavigationItem>
    <ServiceNavigationItem selected ariaCurrent="page">
      <RouterLink
        asComponent={ExternalLink}
        href="https://www.suomi.fi"
        hideIcon
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
        asComponent={ExternalLink}
        href="https://www.suomi.fi"
        hideIcon
      >
        Settings
      </RouterLink>
    </ServiceNavigationItem>
    <ServiceNavigationItem>
      <RouterLink>Devices</RouterLink>
    </ServiceNavigationItem>
  </ServiceNavigation>
);

test('calling render with the same component on the same container does not remount', () => {
  const ParagraphRendered = render(TestServiceNavigation);
  const { container } = ParagraphRendered;
  expect(container.firstChild).toMatchSnapshot();
});

test(
  'should not have basic accessibility issues',
  axeTest(TestServiceNavigation),
);
