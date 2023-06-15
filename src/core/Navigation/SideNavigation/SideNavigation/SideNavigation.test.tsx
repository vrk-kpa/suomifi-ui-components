import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../../utils/test';

import { SideNavigation } from './SideNavigation';
import { SideNavigationItem } from '../SideNavigationItem/SideNavigationItem';
import { ExternalLink, RouterLink } from '../../../Link';
import { IconPiggyBank } from 'suomifi-icons';

interface TestProps {
  children: string;
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
}

const CustomButton = (props: TestProps) => {
  const { children, ...passProps } = props;
  return <button {...passProps}>{props.children}</button>;
};

const TestSideNavigation = (
  <SideNavigation heading="Economy" icon={<IconPiggyBank />} aria-label="Test">
    <SideNavigationItem
      subLevel={1}
      content={
        <RouterLink href="/" aria-current="location">
          Personal economy
        </RouterLink>
      }
    >
      <SideNavigationItem
        subLevel={2}
        content={
          <RouterLink href="/" aria-current="location">
            Crisis situations in personal finances
          </RouterLink>
        }
      >
        <SideNavigationItem
          subLevel={3}
          content={
            <RouterLink href="/">
              If you are unable to pay your debts
            </RouterLink>
          }
        />
        <SideNavigationItem
          subLevel={3}
          selected
          content={
            <RouterLink href="/" aria-current="page">
              Advice on banking and insurance matters
            </RouterLink>
          }
        />
      </SideNavigationItem>
      <SideNavigationItem
        subLevel={2}
        content={<RouterLink href="/">Last will and testament</RouterLink>}
      />
    </SideNavigationItem>
    <SideNavigationItem
      subLevel={1}
      content={
        <RouterLink asComponent={ExternalLink} href="https://suomi.fi" hideIcon>
          Taxation and public economy
        </RouterLink>
      }
    />
    <SideNavigationItem
      content={
        <RouterLink
          asComponent={CustomButton}
          onClick={() => console.log('Nav item clicked')}
        >
          Consumer protection
        </RouterLink>
      }
      subLevel={1}
    />
    <SideNavigationItem
      disabled
      content={<RouterLink>Finance</RouterLink>}
      subLevel={1}
    />
  </SideNavigation>
);

test('calling render with the same component on the same container does not remount', () => {
  const NavRendered = render(TestSideNavigation);
  const { container } = NavRendered;
  expect(container.firstChild).toMatchSnapshot();
});

test('should not have basic accessibility issues', axeTest(TestSideNavigation));
