import React, { forwardRef, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { baseStyles } from './Details.baseStyles';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../theme';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
} from '../theme/utils/spacing';
import {
  HtmlDetails,
  HtmlDetailsProps,
} from '../../reset/HtmlDetails/HtmlDetails';
import { HtmlDiv } from '../../reset';

interface InternalDetailsProps extends HtmlDetailsProps, MarginProps {
  /** Disables the details element */
  disabled?: boolean;
  /** CSS class for custom styles */
  className?: string;
  children: ReactNode;
  /** Callback fired on summary element click */
  onClick?: (event: React.MouseEvent) => void;
  /** Ref object is passed to the details element. Alternative to React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLDetailsElement>;
  /** Label for the component. Will be used as content in the summary element */
  summaryLabel: ReactNode;
  /** Open status of the component for controlled state */
  open?: boolean;
}

export type DetailsProps = InternalDetailsProps;

const baseClassName = 'fi-details';
const disabledClassName = `${baseClassName}--disabled`;
const summaryClassName = `${baseClassName}_summary`;
const contentClassName = `${baseClassName}_content`;

const BaseDetails: React.FC<DetailsProps> = ({
  className,
  disabled,
  children,
  style,
  summaryLabel,
  ...rest
}) => {
  const [marginProps, passProps] = separateMarginProps(rest);
  const marginStyle = spacingStyles(marginProps);

  return (
    <HtmlDetails
      {...passProps}
      className={classnames(baseClassName, className, {
        [disabledClassName]: !!disabled,
      })}
      style={{ ...marginStyle, ...style }}
    >
      <summary className={summaryClassName}>{summaryLabel}</summary>
      <HtmlDiv className={contentClassName}>{children}</HtmlDiv>
    </HtmlDetails>
  );
};

const StyledDetails = styled(
  ({ theme, forwardedRef, ...passProps }: DetailsProps & SuomifiThemeProp) => (
    <BaseDetails {...passProps} forwardedRef={forwardedRef} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const Details = forwardRef(
  (props: DetailsProps, ref: React.RefObject<HTMLDetailsElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledDetails theme={suomifiTheme} forwardedRef={ref} {...props} />
      )}
    </SuomifiThemeConsumer>
  ),
);

Details.displayName = 'Details';
export { Details };
