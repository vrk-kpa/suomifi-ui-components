import { TypographyDesignTokens } from 'suomifi-design-tokens';
import { SuomifiTheme } from '../../';
import { cssValueToString } from '../../../../utils/css';

type ValueTypographyTokenProp = keyof TypographyDesignTokens;
export interface FontSizeProps {
  theme: SuomifiTheme;
  [key: string]: any;
}
export const fontSize = ({ theme }: FontSizeProps) => (
  typographyToken: ValueTypographyTokenProp,
) => cssValueToString(theme.values.typography[typographyToken].fontSize);
