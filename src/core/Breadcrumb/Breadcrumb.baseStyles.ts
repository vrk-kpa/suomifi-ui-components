import { css } from 'styled-components';
import { suomifiTheme } from '../theme';
import { cssValueToString } from '../../utils/css';
import { nav, list, listItem, font } from '../theme/reset';

export const baseStyles = css`
  ${nav(suomifiTheme)}
  ${font(suomifiTheme)('bodyTextSmall')}
  background-color: ${suomifiTheme.colors.whiteBase};
  height: 1.5em;

  & .fi-breadcrumb {
    &_list {
      ${list(suomifiTheme)}
      ${font(suomifiTheme)('bodyTextSmall')}
      margin: 0;
      padding: 0;
    }
    &_item {
      ${listItem(suomifiTheme)}
      ${font(suomifiTheme)('bodyTextSmall')}
      float: left;
      color: ${suomifiTheme.colors.depthDark1};
    }
    &_item,
    &_link,
    &_icon {
      font-size: ${cssValueToString(
        suomifiTheme.values.typography.bodyTextSmall.fontSize,
      )};
    }
    &_icon {
      transform: translateY(0.2em);
      margin: 0 ${suomifiTheme.spacing.insetXs};
      fill: ${suomifiTheme.colors.depthDark1};
    }
  }
`;
