import { css } from 'styled-components';
import { TokenProp, suomifiTheme } from '../';
import { focus as focusUtil } from '../utils';

export const focus = (tokens: TokenProp) => focusUtil({ tokens });

export const element = (tokens: TokenProp) => css`
  color: ${suomifiTheme(tokens).colors.blackBase};
`;

export const input = (tokens: TokenProp) => css`
  ${element(tokens)}
  ${suomifiTheme(tokens).typography.input}
  min-width: 245px;
  max-width: 100%;
  padding: ${suomifiTheme(tokens).spacing.s} ${suomifiTheme(tokens).spacing.m};
  border: 1px solid ${suomifiTheme(tokens).colors.depthBase};
  border-radius: ${suomifiTheme(tokens).radius.basic};
  line-height: 1;
`;

export const inputContainer = (tokens: TokenProp) => css`
  > input:focus {
    /* For IE/Edge */
    outline-color: ${suomifiTheme(tokens).colors.accentBase};
    outline-width: 4px;
    outline-offset: 2px;
  }
  &:focus-within {
    ${focusUtil({ tokens, noPseudo: true })}
    > input:focus {
      outline: none;
    }
  }
`;

export const inputButton = (tokens: TokenProp) => css`
  ${input(tokens)}
  ${focus(tokens)}
`;

export const button = (tokens: TokenProp) => css`
  ${element(tokens)}
  ${suomifiTheme(tokens).typography.inputSemibold}
  ${focus(tokens)}
  line-height: 1;
`;

export const nav = (tokens: TokenProp) => css`
  ${element(tokens)}
  display: block;
`;

export const list = (tokens: TokenProp) => css`
  ${element(tokens)}
  list-style: none;
`;

export const listItem = (tokens: TokenProp) => css`
  ${element(tokens)}
  list-style: none;
`;
