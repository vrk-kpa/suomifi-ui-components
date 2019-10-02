import { css } from 'styled-components';
import { withSuomifiTheme, SuomifiThemeComponent } from '../theme';
import { ParagraphProps } from './Paragraph';
import { element } from '../theme/reset';
import { objValue } from '../../utils/typescript';
import { margin } from '../theme/utils/spacing';

export const baseStyles = withSuomifiTheme(
  ({
    theme,
    tokens,
    color,
    marginBottomSpacing = '0',
  }: ParagraphProps & SuomifiThemeComponent) => css`
  ${element({ theme })}
  ${theme.typography.bodyText}
  ${margin(tokens)('0', '0', marginBottomSpacing, '0')};
  color: ${!!color ? objValue(theme.colors, color) : theme.colors.blackBase};
`,
);
