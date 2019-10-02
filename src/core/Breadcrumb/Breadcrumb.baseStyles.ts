import { css } from 'styled-components';
import { withSuomifiTheme, SuomifiThemeComponent } from '../theme';
import { nav, list, listItem } from '../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: SuomifiThemeComponent) => css`
  ${nav({ theme })}
  ${theme.typography.bodyText}
  background-color: ${theme.colors.whiteBase};

  & .fi-breadcrumb {
    &_list {
      ${list({ theme })}
      ${theme.typography.bodyText}
      margin: 0;
      padding: 0;
    }
    &_item {
      ${listItem({ theme })}
      ${theme.typography.bodyText}
      float: left;
    }
    &_item,
    &_link,
    &_icon {
      font-size: ${theme.values.typography.bodyText.fontSize};
    }
    &_icon {
      transform: translateY(.2em);
    }
  }
`,
);
