import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { cssValueToString } from '../../utils/css';
import { nav, list, listItem, font } from '../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${nav(theme)}
  ${font(theme)('bodyTextSmall')}
  background-color: ${theme.colors.whiteBase};
  height: 1.5em;

  & .fi-breadcrumb {
    &_list {
      ${list(theme)}
      ${font(theme)('bodyTextSmall')}
      margin: 0;
      padding: 0;
    }
    &_item {
      ${listItem(theme)}
      ${font(theme)('bodyTextSmall')}
      float: left;
      color: ${theme.colors.depthDark1};
    }
    &_item,
    &_link,
    &_icon {
      font-size: ${cssValueToString(
        theme.values.typography.bodyTextSmall.fontSize,
      )};
    }
    &_icon {
      transform: translateY(0.2em);
      margin: 0 ${theme.spacing.insetXs};
      fill: ${theme.colors.depthDark1};
    }
  }
`;
