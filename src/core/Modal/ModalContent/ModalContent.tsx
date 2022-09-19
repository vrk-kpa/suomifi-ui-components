import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlDivProps } from '../../../reset';
import { ModalConsumer, ModalVariant, baseClassName } from '../Modal/Modal';
import { baseStyles } from './ModalContent.baseStyles';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../theme';

export interface ModalContentProps
  extends Omit<HtmlDivProps, 'children' | 'className'> {
  /** Modal container div class name for custom styling. */
  className?: string;
  /** Children */
  children: ReactNode;
}

interface InternalModalContentProps
  extends ModalContentProps,
    SuomifiThemeProp {
  id?: string;
  modalVariant: ModalVariant;
  scrollable: boolean;
}

const contentClassName = `${baseClassName}_content`;
const modalContentClassNames = {
  smallScreen: `${contentClassName}--small-screen`,
  noScroll: `${contentClassName}--no-scroll`,
  heading: `${contentClassName}_heading`,
};

class BaseModalContent extends Component<InternalModalContentProps> {
  render() {
    const {
      className,
      theme,
      title,
      children,
      scrollable,
      modalVariant,
      ...passProps
    } = this.props;

    return (
      <HtmlDiv
        className={classnames(contentClassName, className, {
          [modalContentClassNames.noScroll]: scrollable === false,
          [modalContentClassNames.smallScreen]: modalVariant === 'smallScreen',
        })}
        {...passProps}
      >
        {children}
      </HtmlDiv>
    );
  }
}

const StyledModalContent = styled(BaseModalContent)`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Use for showing modal content.
 * Props other than specified explicitly are passed on to outermost content div.
 */
const ModalContent = (props: ModalContentProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <ModalConsumer>
        {({ variant, scrollable }) => (
          <StyledModalContent
            theme={suomifiTheme}
            modalVariant={variant}
            scrollable={scrollable}
            {...props}
          />
        )}
      </ModalConsumer>
    )}
  </SuomifiThemeConsumer>
);

ModalContent.displayName = 'ModalContent';
export { ModalContent };
