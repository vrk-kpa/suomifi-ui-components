import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { baseStyles } from '../BaseLink/BaseLink.baseStyles';
import { MarginProps, buildSpacingCSS } from '../../theme/utils/spacing';

export const ExternalLinkStyles = (
  theme: SuomifiTheme,
  margins?: MarginProps,
) => css`
  ${baseStyles(theme)}
  ${buildSpacingCSS(margins)}
  & .fi-link_icon {
    margin: 0;
    padding-left: ${theme.spacing.insetXs};
    font-size: 16px;
    box-sizing: content-box;
  }
`;
