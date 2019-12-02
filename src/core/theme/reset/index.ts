import { css } from 'styled-components';
import { TypographyProp } from '../';
import {
  focus as focusUtil,
  themeOrTokens,
  TokensOrThemeProps,
} from '../utils';

export const focus = (props: TokensOrThemeProps) => focusUtil(props);

export const element = (props: TokensOrThemeProps) => css`
  color: ${themeOrTokens(props).colors.blackBase};
`;

const fontBase = css`
  letter-spacing: 0;
  text-decoration: none;
  word-break: break-word;
  overflow-wrap: break-word;
  -webkit-font-smoothing: antialiased;
`;

export const font = (props: TokensOrThemeProps) => (
  typographyToken: TypographyProp,
) => css`
  ${fontBase}
  ${themeOrTokens(props).typography[typographyToken]}
`;

export const input = (props: TokensOrThemeProps) => {
  const theme = themeOrTokens(props);
  return css`
    ${element(props)}
    ${font(props)('actionElementInnerText')}
    min-width: 245px;
    max-width: 100%;
    padding: ${theme.spacing.s} ${theme.spacing.m};
    border: 1px solid ${theme.colors.depthBase};
    border-radius: ${theme.radius.basic};
    line-height: 1;
  `;
};

export const inputContainer = (props: TokensOrThemeProps) => css`
  > input:focus {
    /* For IE/Edge */
    outline-color: ${themeOrTokens(props).colors.accentBase};
    outline-width: 4px;
    outline-offset: 2px;
  }
  &:focus-within {
    ${focusUtil({ ...props, noPseudo: true })}
    > input:focus {
      outline: none;
    }
  }
`;

export const inputButton = (props: TokensOrThemeProps) => css`
  ${input(props)}
  ${focus(props)}
`;

export const button = (props: TokensOrThemeProps) => css`
  ${element(props)}
  ${font(props)('actionElementInnerTextBold')}
  ${focus(props)}
  line-height: 1;
`;

export const nav = (props: TokensOrThemeProps) => css`
  ${element(props)}
  display: block;
`;

export const list = (props: TokensOrThemeProps) => css`
  ${element(props)}
  list-style: none;
`;

export const listItem = (props: TokensOrThemeProps) => css`
  ${element(props)}
  list-style: none;
`;
