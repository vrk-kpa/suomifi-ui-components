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
import { filterDuplicateKeys } from '../../../utils/common/common';

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
    const [_marginProps, passProps] = separateMarginProps(rest);

    return (
      <HtmlSpan
        className={classnames(baseClassName, className, {
          [chipClassNames.disabled]: !!disabled,
        })}
        {...passProps}
        style={{ ...passProps?.style }}
      >
        <HtmlSpan className={chipClassNames.content}>{children}</HtmlSpan>
      </HtmlSpan>
    );
  }
}

const StyledChip = styled(
  ({
    theme,
    globalMargins,
    ...passProps
  }: StaticChipProps & SuomifiThemeProp & GlobalMarginProps) => (
    <BaseChip {...passProps} />
  ),
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.staticChip,
      marginProps,
    );
    return staticChipBaseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const StaticChip = forwardRef(
  (props: StaticChipProps, ref: React.Ref<HTMLSpanElement>) => (
    <SpacingConsumer>
      {({ margins }) => (
        <SuomifiThemeConsumer>
          {({ suomifiTheme }) => (
            <StyledChip
              theme={suomifiTheme}
              globalMargins={margins}
              forwardedRef={ref}
              {...props}
            />
          )}
        </SuomifiThemeConsumer>
      )}
    </SpacingConsumer>
  ),
);

StaticChip.displayName = 'StaticChip';
export { StaticChip };
