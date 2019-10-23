import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../theme';
import { nav, list, listItem, font } from '../theme/reset';
import { fontSize } from '../theme/utils';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
  ${nav({ theme })}
  ${font({ theme })('bodyText')}
  background-color: ${theme.colors.whiteBase};

  & .fi-breadcrumb {
    &_list {
      ${list({ theme })}
      ${font({ theme })('bodyText')}
      margin: 0;
      padding: 0;
    }
    &_item {
      ${listItem({ theme })}
      ${font({ theme })('bodyText')}
      float: left;
    }
    &_item,
    &_link,
    &_icon {
      font-size: ${fontSize({ theme })('bodyText')};
    }
    &_icon {
      transform: translateY(.2em);
    }
  }
`,
);
