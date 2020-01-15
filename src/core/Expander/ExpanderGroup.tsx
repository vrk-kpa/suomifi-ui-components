import React from 'react';
import { default as styled } from 'styled-components';
import { Omit } from '../../utils/typescript';
import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensProp, InternalTokensProp } from '../theme';
import {
  ExpanderGroup as CompExpanderGroup,
  ExpanderGroupProps as CompExpanderGroupProps,
} from '../../components/Expander/ExpanderGroup';
import { Button, ButtonProps } from '../Button/Button';
import { baseStyles } from './ExpanderGroup.baseStyles';

const openAllButtonClassName = 'fi-expander-group_all-button';

type ButtonOrText = React.ReactElement<ButtonProps> | string;
interface OpenCloseAll {
  /** 'Open all'-component (Button) */
  OpenAll: ButtonOrText;
  /** 'Close all'-component (Button) */
  CloseAll: ButtonOrText;
}
export interface ExpanderGroupProps
  extends Omit<CompExpanderGroupProps, 'OpenAll' | 'CloseAll'>,
    TokensProp,
    OpenCloseAll {}

interface ExpanderOpenAllButtonProps extends ButtonProps, TokensProp {
  children: ButtonOrText;
}

const StyledExpanderGroup = styled(
  ({ tokens, ...passProps }: CompExpanderGroupProps & InternalTokensProp) => (
    <CompExpanderGroup {...passProps} />
  ),
)`
  ${props => baseStyles(props)};
`;

const OpenAllButton = ({
  children,
  ...passProps
}: ExpanderOpenAllButtonProps) => {
  const Component = React.Children.toArray(children)[0];
  if (typeof Component === 'string' || Component.type !== Button) {
    return (
      <Button.unstyled {...passProps} className={openAllButtonClassName}>
        {children}
      </Button.unstyled>
    );
  }
  return Component;
};

/**
 * <i class="semantics" />
 * Used for grouping expander panels
 */
export class ExpanderGroup extends React.Component<ExpanderGroupProps> {
  render() {
    const { OpenAll, CloseAll, ...passProps } = withSuomifiDefaultProps(
      this.props,
    );
    return (
      <StyledExpanderGroup
        {...passProps}
        OpenAll={
          <OpenAllButton tokens={passProps.tokens}>{OpenAll}</OpenAllButton>
        }
        CloseAll={
          <OpenAllButton tokens={passProps.tokens}>{CloseAll}</OpenAllButton>
        }
      />
    );
  }
}
