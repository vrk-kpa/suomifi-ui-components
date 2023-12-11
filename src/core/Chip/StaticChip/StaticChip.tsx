import React, { Component, forwardRef } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { HtmlSpan, HtmlSpanProps } from '../../../reset';
import {
  BaseChipProps,
  baseClassName,
  chipClassNames,
} from '../BaseChip/BaseChip';
import { staticChipBaseStyles } from './StaticChip.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
} from '../../theme/utils/spacing';

export interface StaticChipProps
  extends BaseChipProps,
    MarginProps,
    Omit<HtmlSpanProps, 'children'> {
  /** Ref is forwarded to the span element. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLSpanElement>;
}

class BaseChip extends Component<StaticChipProps> {
  render() {
    const { className, children, disabled = false, ...rest } = this.props;
    const [marginProps, passProps] = separateMarginProps(rest);
    const marginStyle = spacingStyles(marginProps);

    return (
      <HtmlSpan
        className={classnames(baseClassName, className, {
          [chipClassNames.disabled]: !!disabled,
        })}
        {...passProps}
        style={{ ...marginStyle, ...passProps?.style }}
      >
        <HtmlSpan className={chipClassNames.content}>{children}</HtmlSpan>
      </HtmlSpan>
    );
  }
}

const StyledChip = styled(
  ({ theme, ...passProps }: StaticChipProps & SuomifiThemeProp) => (
    <BaseChip {...passProps} />
  ),
)`
  ${({ theme }) => staticChipBaseStyles(theme)}
`;

const StaticChip = forwardRef(
  (props: StaticChipProps, ref: React.Ref<HTMLSpanElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledChip theme={suomifiTheme} forwardedRef={ref} {...props} />
      )}
    </SuomifiThemeConsumer>
  ),
);

StaticChip.displayName = 'StaticChip';
export { StaticChip };
