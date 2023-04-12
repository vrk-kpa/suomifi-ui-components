import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { baseStyles } from '../BaseLink/BaseLink.baseStyles';

export const ExternalLinkStyles = (theme: SuomifiTheme) => css`
  ${baseStyles(theme)}
  & .fi-link_icon {
    margin: 0;
    padding-left: ${theme.spacing.insetXs};
    font-size: 16px;
    box-sizing: content-box;
  }
`;
