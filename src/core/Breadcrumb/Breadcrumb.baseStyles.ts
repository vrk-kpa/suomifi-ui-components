import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { BreadcrumbProps } from './Breadcrumb';
import { nav, list, listItem, fonts } from '../theme/reset';

export const baseStyles = ({ theme = suomifiTheme }: BreadcrumbProps) => css`
  ${nav(theme)}
  ${fonts(theme).body}
  background-color: ${theme.colors.whiteBase};

  & .fi-breadcrumb {
    &_list {
      ${list(theme)}
      ${fonts(theme).body}
      margin: 0;
      padding: 0;
    }
    &_item {
      ${listItem(theme)}
      ${fonts(theme).body}
      float: left;
    }
    &_item,
    &_link,
    &_icon {
      font-size: ${theme.typography.fontSize.body};
    }
    &_icon {
      transform: translateY(.2em);
    }
  }
`;
