import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import { asPropType } from '../../utils/typescript';
import classnames from 'classnames';
import { baseStyles } from './Link.baseStyles';
import { HtmlA, HtmlAProps } from '../../reset';

export const baseClassName = 'fi-link';

type LinkVariant = 'default' | 'external' | 'skip';
export interface LinkProps extends HtmlAProps {
  /** Link url. Link is not focusable without the href */
  href: string;
  /** Custom classname to extend or customize */
  className?: string;
  /**
   * Link element displayed content
   */
  children: ReactNode;
  variant?: LinkVariant;
  asProp?: asPropType;
}

class BaseLink extends Component<LinkProps> {
  render() {
    const { className, ...passProps } = this.props;
    return (
      <HtmlA
        {...passProps}
        className={classnames(className, {
          [baseClassName]: !className || !className.includes(baseClassName),
        })}
      />
    );
  }
}

const StyledLink = styled(({ asProp, ...passProps }: LinkProps) => (
  <BaseLink {...passProps} as={asProp} />
))`
  ${baseStyles};
`;

/**
 * <i class="semantics" />
 * Used for adding a link
 */
export class Link extends Component<LinkProps> {
  render() {
    return <StyledLink {...this.props} />;
  }
}
