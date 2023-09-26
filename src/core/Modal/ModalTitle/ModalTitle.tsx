import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { hLevels, HtmlSpan } from '../../../reset';
import { Heading, HeadingProps } from '../../Heading/Heading';
import { ModalConsumer, ModalVariant, baseClassName } from '../Modal/Modal';
import { baseStyles } from './ModalTitle.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
export interface ModalTitleProps
  extends Omit<
    HeadingProps,
    'className' | 'variant' | 'margin' | 'mx' | 'my' | 'mt' | 'mr' | 'mb' | 'ml'
  > {
  /** Children */
  children: ReactNode;
  /** Modal container div class name for custom styling. */
  className?: string;
  /** Variant */
  variant?: hLevels | 'h1hero';
}

interface InternalModalTitleProps extends ModalTitleProps, SuomifiThemeProp {
  focusTitleOnOpen: boolean;
  titleRef: React.RefObject<HTMLHeadingElement>;
  modalVariant: ModalVariant;
  scrollable: boolean;
}

const titleClassName = `${baseClassName}_title`;
const titleClassNames = {
  smallScreen: `${titleClassName}--smallScreen`,
  focusWrapper: `${titleClassName}_focus-wrapper`,
};

class BaseModalTitle extends Component<InternalModalTitleProps> {
  state = {
    titleFocusable: true,
  };

  render() {
    const {
      className,
      theme,
      children,
      focusTitleOnOpen,
      titleRef,
      modalVariant,
      scrollable,
      variant = 'h3',
      as = 'h2',
      ...passProps
    } = this.props;

    return (
      <HtmlSpan
        className={classnames(className, titleClassName, {
          [titleClassNames.smallScreen]: modalVariant === 'smallScreen',
        })}
      >
        <Heading
          className={titleClassNames.focusWrapper}
          {...(this.state.titleFocusable && focusTitleOnOpen
            ? { tabIndex: 0 }
            : {})}
          onBlur={() => this.setState({ titleFocusable: false })}
          variant={variant}
          ref={titleRef}
          as={as}
          {...passProps}
        >
          {children}
        </Heading>
      </HtmlSpan>
    );
  }
}

const StyledModalTitle = styled(BaseModalTitle)`
  ${({ theme }) => baseStyles(theme)}
`;

const ModalTitle = (props: ModalTitleProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <ModalConsumer>
        {({ focusTitleOnOpen, titleRef, variant, scrollable }) => (
          <StyledModalTitle
            focusTitleOnOpen={focusTitleOnOpen}
            {...(titleRef ? { titleRef } : {})}
            modalVariant={variant}
            scrollable={scrollable}
            theme={suomifiTheme}
            {...props}
          />
        )}
      </ModalConsumer>
    )}
  </SuomifiThemeConsumer>
);

ModalTitle.displayName = 'ModalTitle';
export { ModalTitle };
