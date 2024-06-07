import React, {
  ReactElement,
  SetStateAction,
  ReactNode,
  useState,
  isValidElement,
  cloneElement,
  CSSProperties,
} from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SpacingConsumer,
} from '../../theme';
import {
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../../theme/utils/spacing';
import { baseStyles } from './Label.baseStyles';
import { asPropType } from '../../../utils/typescript';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { HtmlSpan, HtmlSpanProps, HtmlDivWithRef } from '../../../reset';
import { TooltipProps } from '../../Tooltip/Tooltip';
import { filterDuplicateKeys } from '../../../utils/common/common';

export type LabelMode = 'hidden' | 'visible';

export interface LabelProps extends Omit<HtmlSpanProps, 'as'>, MarginProps {
  /** HTML id attribute */
  id?: string;
  /** CSS class for custom styles. Placed on the outermost div of the component. */
  className?: string;
  /** Label element content */
  children: ReactNode;
  /** CSS class for custom styles. Placed on the label span. */
  contentClassName?: string;
  /** Inline styles for the label span */
  contentStyle?: CSSProperties;
  /**
   * `'hidden'` | `'visible'`;
   *
   * Hides or shows the label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: LabelMode;
  /** Renders the wrapping element as another HTML element
   *
   * @default 'label'
   */
  asProp?: asPropType;
  /** Text to mark the field as optional. Shown after `labelText` and wrapped in parentheses. */
  optionalText?: string;
  /** Tooltip component for label */
  tooltipComponent?: ReactElement;
  /**
   * Forces the label's tooltip to rerender every time the label changes.
   * This prop can be used when you are using a tooltip with the label and there is dynamic content in the label
   * to make sure the tooltip's arrow points to the correct position after the label changes.
   * @default false
   */
  forceTooltipRerender?: boolean;
}

const baseClassName = 'fi-label';
const labelTextClassNames = {
  labelSpan: `${baseClassName}_label-span`,
  optionalText: `${baseClassName}_optional-text`,
};

const StyledLabel = styled(
  ({
    className,
    contentStyle,
    contentClassName,
    theme,
    labelMode = 'visible',
    style,
    children,
    asProp = 'label',
    globalMargins,
    optionalText,
    tooltipComponent: tooltipComponentProp,
    forceTooltipRerender = false,
    ...rest
  }: LabelProps & SuomifiThemeProp & GlobalMarginProps) => {
    const [_marginProps, passProps] = separateMarginProps(rest);

    const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);

    function getTooltipComponent(
      tooltipComponent: ReactElement<TooltipProps> | undefined,
    ): ReactNode {
      if (isValidElement(tooltipComponent)) {
        return cloneElement(tooltipComponent, {
          anchorElement: wrapperRef,
          // trick to force tooltip to rerender every time when label changes.
          key: forceTooltipRerender ? Date.now() : null,
        });
      }
      return null;
    }

    return (
      <HtmlDivWithRef
        className={classnames(className, baseClassName)}
        forwardedRef={(ref: SetStateAction<HTMLDivElement | null>) =>
          setWrapperRef(ref)
        }
        style={style}
      >
        {labelMode === 'hidden' ? (
          <VisuallyHidden as={asProp} {...passProps}>
            {children}
            {optionalText && `(${optionalText})`}
          </VisuallyHidden>
        ) : (
          <>
            <HtmlSpan
              as={asProp}
              style={contentStyle ? { ...contentStyle } : {}}
              {...passProps}
              className={classnames(
                labelTextClassNames.labelSpan,
                contentClassName,
              )}
            >
              {children}
              {optionalText && (
                <HtmlSpan className={labelTextClassNames.optionalText}>
                  {` (${optionalText})`}
                </HtmlSpan>
              )}
            </HtmlSpan>
            {!!tooltipComponentProp &&
              getTooltipComponent(tooltipComponentProp)}
          </>
        )}
      </HtmlDivWithRef>
    );
  },
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.label,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const Label = (props: LabelProps) => (
  <SpacingConsumer>
    {({ margins }) => (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledLabel
            globalMargins={margins}
            theme={suomifiTheme}
            {...props}
          />
        )}
      </SuomifiThemeConsumer>
    )}
  </SpacingConsumer>
);

Label.displayName = 'Label';
export { Label };
