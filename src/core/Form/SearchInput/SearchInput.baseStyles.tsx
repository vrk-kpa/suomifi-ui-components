import { css } from '@emotion/core';
import { suomifiTheme } from '../../theme';
import { SearchInputProps } from './SearchInput';
import { math } from 'polished';

export const baseStyles = ({ theme = suomifiTheme }: SearchInputProps) => css`
  & .fi-search-input {
    &-input-container {
      position: relative;
    }
    &-input {
      padding-right: ${math(`${theme.spacing.m} * 2 + ${theme.spacing.s}`)};
    }
    &-icon {
      position: absolute;
      top: 50%;
      right: ${theme.spacing.m};
      margin-top: -0.5em;
    }
  }
`;
