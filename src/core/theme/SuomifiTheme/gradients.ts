import { ColorDesignTokens } from '../';
import { alphaHex } from '../../../utils/css';

export const gradients = (colors: ColorDesignTokens) => ({
  highlightBaseToHighlightDark1: `linear-gradient(0deg, ${colors.highlightDark1} 0%, ${colors.highlightBase} 100%)`,
  highlightLight1ToHighlightBase: `linear-gradient(0deg, ${colors.highlightBase} 0%, ${colors.highlightLight1} 100%)`,
  depthLight1ToDepthBase: `linear-gradient(0deg, ${colors.depthBase} 0%, ${colors.depthLight1} 100%)`,
  whiteBaseNegative: `linear-gradient(-180deg, ${alphaHex(0.1)(
    colors.whiteBase,
  )} 0%, ${alphaHex(0)(colors.whiteBase)} 100%)`,
  whiteBaseToDepthLight2: `linear-gradient(-180deg, ${
    colors.depthLight2
  } 0%, ${alphaHex(0)(colors.whiteBase)} 100%)`,
  whiteBaseToDepthLight1: `linear-gradient(-180deg, ${
    colors.depthLight1
  } 0%, ${alphaHex(0)(colors.whiteBase)} 100%)`,
  highlightLight3ToHighlightLight2: `linear-gradient(0deg, ${colors.highlightLight2}, ${colors.highlightLight3})`,
  depthLight3ToDepthLight2: `linear-gradient(0deg, ${colors.depthLight2}, ${colors.depthLight3})`,
  depthSecondaryToDepthSecondaryDark1: `linear-gradient(0deg, ${colors.depthSecondaryDark1}, ${colors.depthSecondary})`,
  highlightLight4ToDepthSecondary: `linear-gradient(0deg, ${colors.depthSecondary}, ${colors.highlightLight4})`,
});
