/* import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../../utils/test';

import { SideNavigation } from './SideNavigation';
import { SideNavigationItem } from '../SideNavigationItem/SideNavigationItem';
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

const TestSideNavigation = (
  <div data-testid="test-paragraph">
    <SideNavigation>
      <SideNavigationItem aria-label="16 unread messages">
        <RouterLink
          asComponent={Comp}
          onClick={() => console.log('Nav item clicked')}
          role="button"
          tabIndex={0}
        >
          Inbox
          <StaticChip style={{ marginLeft: '15px' }}>16</StaticChip>
        </RouterLink>
      </SideNavigationItem>
      <SideNavigationItem>
        <RouterLink asComponent={ExternalLink} href="https://suomi.fi" hideIcon>
          Sent
        </RouterLink>
      </SideNavigationItem>
      <SideNavigationItem selected ariaCurrent="page">
        <RouterLink
          asComponent={ExternalLink}
          href="https://www.suomi.fi"
          hideIcon
        >
          New Message
        </RouterLink>
      </SideNavigationItem>
      <SideNavigationItem>
        <RouterLink
          asComponent={ExternalLink}
          href="https://www.suomi.fi"
          hideIcon
        >
          Drafts
        </RouterLink>
      </SideNavigationItem>
      <SideNavigationItem>
        <RouterLink
          asComponent={ExternalLink}
          href="https://www.suomi.fi"
          hideIcon
        >
          Settings
        </RouterLink>
      </SideNavigationItem>
      <SideNavigationItem>
        <RouterLink>Devices</RouterLink>
      </SideNavigationItem>
    </SideNavigation>
  </div>
);

test('calling render with the same component on the same container does not remount', () => {
  const ParagraphRendered = render(TestSideNavigation);
  const { container } = ParagraphRendered;
  expect(container.firstChild).toMatchSnapshot();
});

test('should not have basic accessibility issues', axeTest(TestSideNavigation)); */
