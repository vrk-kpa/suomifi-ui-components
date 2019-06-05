import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { BreadcrumbProps } from './Breadcrumb';
import { nav, list, listItem, fonts } from '../theme/reset';

export const baseStyles = ({ theme = suomifiTheme }: BreadcrumbProps) => css`
  ${nav}
  ${fonts(theme).body}
  background-color: ${theme.colors.whiteBase};

  & .fi-breadcrumb {
    &-list {
      ${list}
      ${fonts(theme).body}
      margin: 0;
      padding: 0;
    }
    &-item {
      ${listItem}
      ${fonts(theme).body}
      float: left;
    }
    &-item,
    &-link,
    &-icon {
      font-size: ${theme.typography.fontSize.body};
    }
  }
`;
