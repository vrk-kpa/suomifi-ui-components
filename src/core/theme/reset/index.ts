import { css } from '@emotion/core';
import { ThemeProp, suomifiTheme } from '../';
import { focus as focusUtil } from '../utils';
import { fonts } from './typography';
export { fonts } from './typography';

export const focus = focusUtil({ theme: suomifiTheme });

export const element = (theme: ThemeProp = suomifiTheme) => css`
  color: ${theme.colors.blackBase};
`;

export const input = css`
  ${element(suomifiTheme)}
  ${fonts(suomifiTheme).input}
  min-width: 245px;
  max-width: 100%;
  padding: ${suomifiTheme.spacing.s} ${suomifiTheme.spacing.m};
  border: 1px solid ${suomifiTheme.colors.depthBase};
  border-radius: ${suomifiTheme.radius.basic};
`;

export const inputContainer = css`
  > input:focus {
    /* For IE/Edge */
    outline-color: ${suomifiTheme.colors.accentBase};
    outline-width: 4px;
    outline-offset: 2px;
  }
  &:focus-within {
    ${focusUtil({ noPseudo: true, theme: suomifiTheme })}
    > input:focus {
      outline: none;
    }
  }
`;

export const inputButton = css`
  ${input}
  ${focus}
`;

export const nav = css`
  ${element(suomifiTheme)}
  display: block;
`;

export const list = css`
  ${element(suomifiTheme)}
  list-style: none;
`;

export const listItem = css`
  ${element(suomifiTheme)}
  list-style: none;
`;
