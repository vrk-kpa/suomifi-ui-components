import { css } from 'styled-components';
import { withSuomifiTheme, SuomifiThemeProp } from '../theme';
import { ParagraphProps } from './Paragraph';
import { element, font } from '../theme/reset';
import { objValue } from '../../utils/typescript';
import { margin } from '../theme/utils/spacing';

export const baseStyles = withSuomifiTheme(
  ({
    theme,
    tokens,
    color,
    marginBottomSpacing = '0',
  }: ParagraphProps & SuomifiThemeProp) => css`
  ${element({ theme })}
  ${font({ theme })('bodyText')}
  ${margin(tokens)('0', '0', marginBottomSpacing, '0')};
  color: ${!!color ? objValue(theme.colors, color) : theme.colors.blackBase};
`,
);
