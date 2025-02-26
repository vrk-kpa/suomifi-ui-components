import { css } from 'styled-components';
import { TypographyProp, SuomifiTheme } from '../';

export const element = (theme: SuomifiTheme) => css`
  color: ${theme.colors.blackBase};
`;

const fontBase = css`
  letter-spacing: 0;
  text-decoration: none;
  word-break: break-word;
  overflow-wrap: break-word;
  -webkit-font-smoothing: antialiased;
`;

export const font =
  (theme: SuomifiTheme) => (typographyToken: TypographyProp) => css`
    ${fontBase}
    ${theme.typography[typographyToken]}
  `;

export const input = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('actionElementInnerText')}
  min-width: 245px;
  max-width: 100%;
  padding: ${theme.spacing.insetM} ${theme.spacing.insetXl};
  border: 1px solid ${theme.colors.depthLight1};
  border-radius: ${theme.radiuses.basic};
  line-height: 1;
`;

export const containerIEFocus = (theme: SuomifiTheme) => css`
  > input:focus {
    /* For IE/Edge */
    outline-color: ${theme.colors.accentSecondary};
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

export const fixInternalMargins = () => css`
  & .fi-label,
  & .fi-hint-text,
  & .fi-status-text {
    margin: 0;
  }
`;

export const inputButton = (theme: SuomifiTheme) => css`
  ${input(theme)}
`;

export const button = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('actionElementInnerTextBold')}
  font-size: 14px;
  line-height: calc(20 / 14);
`;

export const nav = (theme: SuomifiTheme) => css`
  ${element(theme)}
  display: block;
`;

export const list = (theme: SuomifiTheme) => css`
  ${element(theme)}
  list-style: none;
`;

export const listItem = (theme: SuomifiTheme) => css`
  ${element(theme)}
  list-style: none;
`;
