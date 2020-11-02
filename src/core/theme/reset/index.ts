import { css } from 'styled-components';
import { TypographyProp, SuomifiThemeProp } from '../';
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

export const font = (props: SuomifiThemeProp) => (
  typographyToken: TypographyProp,
) => css`
  ${fontBase}
  ${props.theme.typography[typographyToken]}
`;

export const input = (props: SuomifiThemeProp) => {
  return css`
    ${element(props)}
    ${font(props)('actionElementInnerText')}
    min-width: 245px;
    max-width: 100%;
    padding: ${props.theme.spacing.insetM} ${props.theme.spacing.insetXl};
    border: 1px solid ${props.theme.colors.depthLight1};
    border-radius: ${props.theme.radius.basic};
    line-height: 1;
  `;
};

export const containerIEFocus = (props: TokensOrThemeProps) => css`
  > input:focus {
    /* For IE/Edge */
    outline-color: ${themeOrTokens(props).colors.accentSecondary};
    outline-width: 2px;
    outline-offset: 2px;
    outline-style: solid;
  }
  &:focus-within {
    > input:focus {
      outline: none;
    }
  }
`;

export const inputButton = (props: SuomifiThemeProp) => css`
  ${input(props)}
`;

export const button = (props: SuomifiThemeProp) => css`
  ${element(props)}
  ${font(props)('actionElementInnerTextBold')}
  font-size: 14px;
  line-height: 20px;
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
