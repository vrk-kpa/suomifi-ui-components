import { css } from '@emotion/core';
import { suomifiTheme } from '../';
import { focus as focusUtil } from '../utils';
import { fonts } from './typography';
export { fonts } from './typography';

export const focus = focusUtil({ theme: suomifiTheme });

export const element = css`
  color: ${suomifiTheme.colors.blackBase};
`;

export const input = css`
  ${element}
  ${fonts.input}
  min-width: 245px;
  max-width: 100%;
  padding: 8px 12px;
  border: 1px solid ${suomifiTheme.colors.depthBase};
  border-radius: ${suomifiTheme.radius.basic};
`;

export const inputContainer = css`
  > input:focus {
    /* For IE/Edge */
    outline-color: ${suomifiTheme.colors.accentBase};
    outline-width: 4px;
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
  ${element}
  display: block;
`;

export const list = css`
  ${element}
  list-style: none;
`;

export const listItem = css`
  ${element}
  list-style: none;
`;
