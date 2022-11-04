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
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { baseStyles } from './Label.baseStyles';
import { asPropType } from '../../../utils/typescript';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import {
  HtmlSpan,
  HtmlSpanProps,
  HtmlDivProps,
  HtmlDivWithRef,
} from '../../../reset';
import { TooltipProps } from '../../Tooltip/Tooltip';

export type LabelMode = 'hidden' | 'visible';

export interface LabelProps extends Omit<HtmlSpanProps, 'as'> {
  /** id for label content */
  id?: string;
  /** Wrapper class name for styling and customizing */
  className?: string;
  /** Label element content */
  children: ReactNode;
  /** Content class name for styling and customizing */
  contentClassName?: string;
  /** Content style for styling and customizing */
  contentStyle?: CSSProperties;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: LabelMode;
  /** Props for label wrapper element */
  wrapperProps?: Omit<HtmlDivProps, 'as' | 'className'>;
  /** Render the wrapping element as another element
   *
   * @default 'label'
   */
  asProp?: asPropType;
  /** Text to mark the field as optional. Shown after labelText and wrapped in parentheses. */
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
    wrapperProps,
    children,
    asProp = 'label',
    optionalText,
    tooltipComponent: tooltipComponentProp,
    forceTooltipRerender = false,
    ...passProps
  }: LabelProps & SuomifiThemeProp) => {
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
        {...wrapperProps}
        forwardedRef={(ref: SetStateAction<HTMLDivElement | null>) =>
          setWrapperRef(ref)
        }
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
  ${({ theme }) => baseStyles(theme)}
`;

const Label = (props: LabelProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => <StyledLabel theme={suomifiTheme} {...props} />}
  </SuomifiThemeConsumer>
);

Label.displayName = 'Label';
export { Label };
