import { css } from '@emotion/core';
import { ThemeProp, suomifiTheme } from '../';
import { focus as focusUtil } from '../utils';
import { fonts } from './typography';
export { fonts } from './typography';

export const focus = (theme: ThemeProp = suomifiTheme) => focusUtil({ theme });

export const element = (theme: ThemeProp = suomifiTheme) => css`
  color: ${theme.colors.blackBase};
`;

export const input = (theme: ThemeProp = suomifiTheme) => css`
  ${element(theme)}
  ${fonts(theme).input}
  min-width: 245px;
  max-width: 100%;
  padding: ${theme.spacing.s} ${theme.spacing.m};
  border: 1px solid ${theme.colors.depthBase};
  border-radius: ${theme.radius.basic};
`;

export const inputContainer = (theme: ThemeProp = suomifiTheme) => css`
  > input:focus {
    /* For IE/Edge */
    outline-color: ${theme.colors.accentBase};
    outline-width: 4px;
    outline-offset: 2px;
  }
  &:focus-within {
    ${focusUtil({ theme, noPseudo: true })}
    > input:focus {
      outline: none;
    }
  }
`;

export const inputButton = (theme: ThemeProp = suomifiTheme) => css`
  ${input(theme)}
  ${focus(theme)}
`;

export const nav = (theme: ThemeProp = suomifiTheme) => css`
  ${element(theme)}
  display: block;
`;

export const list = (theme: ThemeProp = suomifiTheme) => css`
  ${element(theme)}
  list-style: none;
`;

export const listItem = (theme: ThemeProp = suomifiTheme) => css`
  ${element(theme)}
  list-style: none;
`;
