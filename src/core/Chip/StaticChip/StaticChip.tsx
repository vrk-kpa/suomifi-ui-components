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

export interface StaticChipProps
  extends BaseChipProps,
    Omit<HtmlSpanProps, 'children'> {
  /** Ref is forwarded to the span element. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLSpanElement>;
}

class BaseChip extends Component<StaticChipProps> {
  render() {
    const { className, children, disabled = false, ...passProps } = this.props;

    return (
      <HtmlSpan
        className={classnames(baseClassName, className, {
          [chipClassNames.disabled]: !!disabled,
        })}
        {...passProps}
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
