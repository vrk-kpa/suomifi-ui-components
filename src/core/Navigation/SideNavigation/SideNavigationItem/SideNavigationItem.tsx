import React, { ReactElement, ReactNode } from 'react';
import classnames from 'classnames';
import { HtmlLi, HtmlSpan, HtmlUl } from '../../../../reset';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../../theme';
import { baseStyles } from './SideNavigationItem.baseStyles';
import styled from 'styled-components';
import { Icon } from '../../../Icon/Icon';

export interface SideNavigationItemProps {
  /** Custom class */
  className?: string;
  /** Content for the link element. Use the polymorphic RouterLink component to get intended CSS styling */
  content: ReactNode;
  /** Nested SideNavigationItems */
  children?: ReactNode;
  /** Sub-level of the item. 1-3 */
  subLevel: 1 | 2 | 3;
  /** Toggle to show item as the selected one */
  selected?: boolean;
  /** Disables the item */
  disabled?: boolean;
  /** Force the item to show its children even when not selected */
  expanded?: boolean;
}

const baseClassName = 'fi-side-navigation-item';
const selectedClassName = `${baseClassName}--selected`;
const childSelectedClassName = `${baseClassName}--child-selected`;
const disabledClassName = `${baseClassName}--disabled`;
const subListClassName = `${baseClassName}_sub-list`;
const contentWrapperClassName = `${baseClassName}_content-wrapper`;

const BaseSideNavigationItem = ({
  subLevel,
  selected,
  className,
  children,
  content,
  disabled,
  expanded,
  ...passProps
}: SideNavigationItemProps) => {
  // Loop through all children to check if a child of this item is selected
  let childIsSelected = false;
  React.Children.forEach(children, (element) => {
    if (!React.isValidElement(element) || !element.props) return;

    if (element.props.selected) {
      childIsSelected = true;
      return;
    }

    if (!element.props.children) return;

    element.props.children.forEach((child: ReactElement) => {
      if (child.props?.selected) {
        childIsSelected = true;
        return;
      }
    });
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
