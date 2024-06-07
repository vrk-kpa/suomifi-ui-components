import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { nav, list, listItem, font } from '../../theme/reset';
import { MarginProps, buildSpacingCSS } from '../../theme/utils/spacing';

export const baseStyles = (
  theme: SuomifiTheme,
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  ${nav(theme)}
  ${font(theme)('bodyTextSmall')}
  ${buildSpacingCSS(globalMargins)}
  ${buildSpacingCSS(propMargins, true)};
  height: 1.5em;

  & .fi-breadcrumb {
    &_list {
      ${list(theme)}
      margin: 0;
      padding: 0;
    }
    &_item {
      ${listItem(theme)}
      float: left;
    }
  }
`;
