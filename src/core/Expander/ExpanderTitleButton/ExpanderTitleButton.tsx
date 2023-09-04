import React, { Component, ReactNode, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlButton, HtmlButtonProps, HtmlSpan } from '../../../reset';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../theme';
import { ExpanderConsumer, ExpanderTitleBaseProps } from '../Expander/Expander';
import { expanderTitleButtonBaseStyles } from './ExpanderTitleButton.baseStyles';
import { IconChevronDown } from 'suomifi-icons';

const baseClassName = 'fi-expander_title-button';
const titleOpenClassName = `${baseClassName}--open`;
const titleButtonClassName = `${baseClassName}_button`;
const iconClassName = `${baseClassName}-icon`;
const iconOpenClassName = `${iconClassName}--open`;

export interface ExpanderTitleButtonProps {
  /** CSS class for custom styles */
  className?: string;
  /** Title for Expander */
  children?: ReactNode;
  /** Wrap the title button inside a heading tag */
  asHeading?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Properties for title open/close toggle button */
  toggleButtonProps?: Omit<
    HtmlButtonProps,
    | 'onClick'
    | 'onMouseDown'
    | 'onMouseUp'
    | 'onKeyPress'
    | 'onKeyUp'
    | 'onKeyDown'
  >;
  /** Ref is forwarded to the button element. Alternative for React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLButtonElement>;
}

interface InternalExpanderTitleButtonProps
  extends ExpanderTitleButtonProps,
    ExpanderTitleBaseProps,
    SuomifiThemeProp {}

class BaseExpanderTitleButton extends Component<InternalExpanderTitleButtonProps> {
  render() {
    const {
      asHeading,
      children,
      className,
      theme,
      toggleButtonProps,
      consumer,
      forwardedRef,
      ...passProps
    } = this.props;

    return (
      <HtmlDiv
        {...passProps}
        className={classnames(className, baseClassName, {
          [titleOpenClassName]: !!consumer.open,
        })}
      >
        <HtmlSpan {...(!!asHeading ? { as: asHeading } : {})}>
          <HtmlButton
            forwardedRef={forwardedRef}
            {...toggleButtonProps}
            onClick={consumer.onToggleExpander}
            aria-expanded={!!consumer.open}
            className={titleButtonClassName}
            aria-controls={consumer.contentId}
          >
            <HtmlSpan id={consumer.titleId}>{children}</HtmlSpan>
            <IconChevronDown
              className={classnames(iconClassName, {
                [iconOpenClassName]: consumer.open,
              })}
            />
          </HtmlButton>
        </HtmlSpan>
      </HtmlDiv>
    );
  }
}

const StyledExpanderTitle = styled(BaseExpanderTitleButton)`
  ${({ theme }) => expanderTitleButtonBaseStyles(theme)}
`;

const ExpanderTitleButton = forwardRef(
  (
    props: ExpanderTitleButtonProps,
    ref: React.RefObject<HTMLButtonElement>,
  ) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <ExpanderConsumer>
          {(consumer) => (
            <StyledExpanderTitle
              theme={suomifiTheme}
              consumer={consumer}
              forwardedRef={ref}
              {...props}
            />
          )}
        </ExpanderConsumer>
      )}
    </SuomifiThemeConsumer>
  ),
);

ExpanderTitleButton.displayName = 'ExpanderTitleButton';
export { ExpanderTitleButton };
