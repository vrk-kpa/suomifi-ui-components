import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { ParagraphProps } from './Paragraph';
import { element, fonts } from '../theme/reset';
import { objValue } from '../../utils/typescript';

export const baseStyles = ({
  theme = suomifiTheme,
  color,
}: ParagraphProps) => css`
  ${element}
  ${fonts.body}
  color: ${!!color ? objValue(theme.colors, color) : theme.colors.blackBase};
  margin-bottom: ${theme.spacing.m};
`;
