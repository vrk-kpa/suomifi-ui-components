import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { ParagraphProps } from './Paragraph';
import { element, fonts } from '../theme/reset';
import { objValue } from '../../utils/typescript';
import { margin } from '../theme/utils/spacing';

export const baseStyles = ({
  theme = suomifiTheme,
  color,
  marginBottomSpacing,
}: ParagraphProps) => css`
  ${element}
  ${fonts.body}
  ${margin(theme)('0', '0', marginBottomSpacing, '0')};
  color: ${!!color ? objValue(theme.colors, color) : theme.colors.blackBase};
`;
