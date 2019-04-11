import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { BreadcrumbProps } from './Breadcrumb';
import { nav, list, listItem, font } from '../theme/reset';

export const baseStyles = ({ theme = suomifiTheme }: BreadcrumbProps) => css`
  ${nav}
  ${font}
  background-color: ${theme.colors.white};

  & .fi-breadcrumb {
    &-list {
      ${list}
      ${font}
      margin: 0;
      padding: 0;
    }
    &-item {
      ${listItem}
      ${font}
      float: left;
    }
    &-item,
    &-link,
    &-icon {
      font-size: ${theme.typography.fontSizeBreadcrumb};
    }
  }
`;
