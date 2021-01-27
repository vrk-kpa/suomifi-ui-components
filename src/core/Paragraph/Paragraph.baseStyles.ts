import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../theme';
import { ParagraphProps } from './Paragraph';
import { element, font } from '../theme/reset';
import { objValue } from '../../utils/typescript';
import { margin } from '../theme/utils/spacing';

export const baseStyles = withSuomifiTheme(
  ({
    theme,
    color,
    marginBottomSpacing = '0',
  }: ParagraphProps & TokensAndTheme) => css`
    ${element({ theme })}
    ${font({ theme })('bodyText')}
    ${margin({ theme })('0', '0', marginBottomSpacing, '0')};
    color: ${!!color ? objValue(theme.colors, color) : theme.colors.blackBase};
  `,
);
