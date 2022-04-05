import React, {
  ReactElement,
  SetStateAction,
  Component,
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
  style?: CSSProperties;
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
}

const baseClassName = 'fi-label-text';
const labelTextClassNames = {
  labelSpan: `${baseClassName}_label-span`,
  optionalText: `${baseClassName}_optionalText`,
};

const StyledLabel = styled(
  ({
    className,
    style,
    contentClassName,
    theme,
    labelMode = 'visible',
    wrapperProps,
    children,
    id,
    asProp = 'label',
    optionalText,
    tooltipComponent: tooltipComponentProp,
    ...passProps
  }: LabelProps & SuomifiThemeProp) => {
    const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);

    function getTooltipComponent(
      tooltipComponent: ReactElement | undefined,
    ): ReactNode {
      if (isValidElement(tooltipComponent)) {
        return cloneElement(tooltipComponent, {
          anchorElement: wrapperRef,
          // trick to force tooltip to rerender every time when label changes.
          key: Date.now(),
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
          <VisuallyHidden>
            {children}
            {optionalText && `(${optionalText})`}
          </VisuallyHidden>
        ) : (
          <>
            <HtmlSpan
              as={asProp}
              {...(style ? { style } : {})}
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

export class Label extends Component<LabelProps> {
  render() {
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledLabel theme={suomifiTheme} {...this.props} />
        )}
      </SuomifiThemeConsumer>
    );
  }
}
