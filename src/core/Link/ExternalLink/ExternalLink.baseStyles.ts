import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { baseStyles } from '../BaseLink/BaseLink.baseStyles';

export const ExternalLinkStyles = css`
  ${baseStyles}
  & .fi-link_icon {
    padding-left: ${suomifiTheme.spacing.insetXs};
    font-size: 16px;
    box-sizing: content-box;
  }
`;
