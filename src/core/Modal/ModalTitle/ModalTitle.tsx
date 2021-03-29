import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { hLevels } from '../../../reset';
import { Heading, HeadingProps } from '../../Heading/Heading';
import { ModalConsumer, ModalVariant, baseClassName } from '../Modal/Modal';
import { baseStyles } from './ModalTitle.baseStyles';

export interface ModalTitleProps
  extends Omit<HeadingProps, 'className' | 'id' | 'variant'> {
  /** Children */
  children: ReactNode;
  /** Modal container div class name for custom styling. */
  className?: string;
  /** Variant */
  variant?: hLevels | 'h1hero';
}

interface InternalModalTitleProps extends ModalTitleProps {
  id?: string;
  modalVariant: ModalVariant;
  scrollable: boolean;
}

const headingClassName = `${baseClassName}_title`;
const headingClassNames = {
  smallScreen: `${headingClassName}--smallScreen`,
  noScroll: `${headingClassName}--no-scroll`,
};

class BaseModalTitle extends Component<InternalModalTitleProps> {
  render() {
    const {
      className,
      children,
      modalVariant,
      scrollable,
      variant = 'h3',
      as = 'h2',
      id,
      ...passProps
    } = this.props;

    return (
      <Heading
        className={classnames(className, headingClassName, {
          [headingClassNames.smallScreen]: modalVariant === 'smallScreen',
          [headingClassNames.noScroll]: scrollable === false,
        })}
        id={id}
        variant={variant}
        as={as}
        {...passProps}
      >
        {children}
      </Heading>
    );
  }
}

const StyledModalTitle = styled(BaseModalTitle)`
  ${baseStyles}
`;

/**
 * <i class="semantics" />
 * ModalTitle
 * Id and smallScreen variant are provided by Modal context and cannot be given as props.
 * Children are wrapped in h2 heading and styled as h3 by default.
 */
export class ModalTitle extends Component<ModalTitleProps> {
  render() {
    return (
      <ModalConsumer>
        {({ variant, titleId, scrollable }) => (
          <StyledModalTitle
            id={titleId}
            modalVariant={variant}
            scrollable={scrollable}
            {...this.props}
          />
        )}
      </ModalConsumer>
    );
  }
}
