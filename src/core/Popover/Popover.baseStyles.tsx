import { css } from 'styled-components';
import { PopoverProps } from './Popover';
import { withSuomifiTheme, TokensAndTheme } from '../theme';
import { element, font } from '../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: Partial<PopoverProps> & TokensAndTheme) => css`
    ${element({ theme })};
    ${font({ theme })('bodyText')};
    background-color: ${theme.colors.whiteBase};
  `,
);
