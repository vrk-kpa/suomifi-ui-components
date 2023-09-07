import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlDivProps } from '../../../reset';
import { ModalConsumer, ModalVariant, baseClassName } from '../Modal/Modal';
import { baseStyles } from './ModalFooter.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';

export interface ModalFooterProps extends HtmlDivProps {}

interface InternalModalFooterProps extends ModalFooterProps, SuomifiThemeProp {
  modalVariant: ModalVariant;
  scrollable: boolean;
  propClassName?: string;
}

export const footerBaseClassName = `${baseClassName}_footer`;
const footerClassNames = {
  smallScreen: `${footerBaseClassName}--small-screen`,
  content: `${footerBaseClassName}_content`,
  contentGradientOverlay: `${footerBaseClassName}_content-gradient-overlay`,
  contentGradient: `${footerBaseClassName}_content-gradient`,
  button: `${footerBaseClassName}_button`,
};

class BaseModalFooter extends Component<InternalModalFooterProps> {
  render() {
    const {
      children,
      className,
      theme,
      propClassName,
      modalVariant = 'default',
      scrollable = true,
      ...passProps
    } = this.props;

    return (
      <HtmlDiv
        className={classnames(className, footerBaseClassName, {
          [footerClassNames.smallScreen]: modalVariant === 'smallScreen',
        })}
      >
        <HtmlDiv
          className={classnames(propClassName, footerClassNames.content)}
          {...passProps}
        >
          {children}
        </HtmlDiv>
        {scrollable && (
          <HtmlDiv className={footerClassNames.contentGradientOverlay}>
            <HtmlDiv className={footerClassNames.contentGradient} />
          </HtmlDiv>
        )}
      </HtmlDiv>
    );
  }
}

const StyledModalFooter = styled(BaseModalFooter)`
  ${({ theme }) => baseStyles(theme)}
`;

const ModalFooter = (props: ModalFooterProps) => {
  const { className, ...passProps } = props;
  return (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <ModalConsumer>
          {({ variant, scrollable }) => (
            <StyledModalFooter
              modalVariant={variant}
              scrollable={scrollable}
              propClassName={className}
              theme={suomifiTheme}
              {...passProps}
            />
          )}
        </ModalConsumer>
      )}
    </SuomifiThemeConsumer>
  );
};

ModalFooter.displayName = 'ModalFooter';
export { ModalFooter };
