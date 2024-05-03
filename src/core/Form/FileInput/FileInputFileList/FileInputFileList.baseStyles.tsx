import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-file-input_file-list {
    background: ${theme.colors.whiteBase};
  }
`;
