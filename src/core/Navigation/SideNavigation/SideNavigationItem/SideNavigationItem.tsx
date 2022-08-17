import React, { ReactElement, ReactNode } from 'react';
import classnames from 'classnames';
import { HtmlLi, HtmlSpan, HtmlUl } from '../../../../reset';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../../theme';
import { baseStyles } from './SideNavigationItem.baseStyles';
import styled from 'styled-components';
import { Icon } from '../../../Icon/Icon';

interface BasicSideNavigationItemProps {
  /** Custom class */
  className?: string;
  /** Use the polymorphic RouterLink component to get intended CSS styling */
  content: ReactNode;
  /** Use the polymorphic RouterLink component or as child to get intended CSS styling */
  children?: ReactNode | ReactNode[];
  /** Sub-level of this item. 1-3 */
  subLevel: 1 | 2 | 3;
  /** If this item's child is selected, this prop must be applied to get correct CSS styles */
  childSelected?: boolean;
  /** Disable the item */
  disabled?: boolean;
  /** Force the item to show its children */
  expanded?: boolean;
}

type SelectedProps =
  | {
      /** Show item as the selected one */
      selected: boolean;
      /** Selected item information for screen reader. Required when `selected` is true */
      ariaCurrent: 'step' | 'page' | 'location';
    }
  | {
      selected?: never;
      ariaCurrent?: never;
    };

export type SideNavigationItemProps = BasicSideNavigationItemProps &
  SelectedProps;

const baseClassName = 'fi-side-navigation-item';
const selectedClassName = `${baseClassName}--selected`;
const childSelectedClassName = `${baseClassName}--child-selected`;
const disabledClassName = `${baseClassName}--disabled`;
const subListClassName = `${baseClassName}_sub-list`;
const contentWrapperClassName = `${baseClassName}_content-wrapper`;

const BaseSideNavigationItem = ({
  subLevel,
  selected,
  ariaCurrent,
  className,
  children,
  content,
  disabled,
  expanded,
  ...passProps
}: SideNavigationItemProps) => {
  let childIsSelected = false;
  React.Children.forEach(children, (element) => {
    if (!React.isValidElement(element)) return;

    if (element.props) {
      if (element.props.selected) {
        childIsSelected = true;
      } else if (element.props.children) {
        element.props.children.forEach((c: ReactElement) => {
          if (c.props) {
            if (c.props.selected) {
              childIsSelected = true;
              return;
            }
          }
        });
      }
    }
  });

  return (
    <HtmlLi
      className={classnames(
        className,
        baseClassName,
        `${baseClassName}--level-${subLevel}`,
        {
          [selectedClassName]: selected,
          [childSelectedClassName]: childIsSelected,
          [disabledClassName]: disabled,
        },
      )}
      aria-current={!!ariaCurrent ? ariaCurrent : undefined}
      aria-disabled={disabled}
      {...passProps}
    >
      <HtmlSpan className={contentWrapperClassName}>
        {content}
        {subLevel === 2 &&
          !!children &&
          (selected || childIsSelected || expanded) && (
            <Icon icon="chevronUp" />
          )}
        {subLevel === 2 &&
          !!children &&
          !selected &&
          !childIsSelected &&
          !expanded && <Icon icon="chevronDown" />}
      </HtmlSpan>
      {!!children && (selected || childIsSelected || expanded) && (
        <HtmlUl className={subListClassName}>{children}</HtmlUl>
      )}
    </HtmlLi>
  );
};

const StyledSideNavigationItem = styled(
  (props: SideNavigationItemProps & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseSideNavigationItem {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)}
`;

const SideNavigationItem = (props: SideNavigationItemProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <StyledSideNavigationItem theme={suomifiTheme} {...props} />
    )}
  </SuomifiThemeConsumer>
);

SideNavigationItem.displayName = 'SideNavigationItem';
export { SideNavigationItem };
