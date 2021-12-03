import { ColorDesignTokens } from 'suomifi-design-tokens';
import { alphaHex } from '../../../utils/css';

export const shadows = (colors: ColorDesignTokens) => ({
  invertTextShadow: `0 1px 1px ${alphaHex(0.5)(colors.brandBase)}`,
  menuShadow: `0 2px 3px 0 ${alphaHex(0.2)(colors.blackBase)}`,
  panelShadow: `0 1px 2px 0 ${alphaHex(0.14)(
    colors.blackBase,
  )}, 0 1px 5px 0 ${alphaHex(0.12)(colors.blackBase)}`,
  actionElementBoxShadow: `0 1px 2px 0 ${alphaHex(0.1)(
    colors.brandBase,
  )} inset`,
});
