import { suomifiDesignTokens } from 'suomifi-design-tokens';
import { lighten } from 'polished';
import { alphaHex } from '../../utils/css';
import { boxshadowOutline } from './utils/outline';
import { zindexes } from './zindexes';

export { ColorDesignTokens } from 'suomifi-design-tokens';

export const { colors } = suomifiDesignTokens;

const {
  whiteBase,
  blackBase,
  blackLighten42,
  brandBase,
  depthDark27,
  depthBase,
  depthLight30,
  depthLight26,
  depthLight13,
  depthSecondaryDark6,
  depthSecondary,
  highlightDark9,
  highlightBase,
  highlightLight4,
  highlightLight45,
  highlightLight50,
  highlightLight53,
  accentBase,
  accentSecondary,
  accentSecondaryLight40,
  accentTertiaryDark9,
  accentTertiary,
  successBase,
  successSecondary,
  warningBase,
  alertBase,
  alertLight47,
} = colors;
export const colorTokens = {
  base: {
    whiteBase,
    blackBase,
    blackLighten42,
  },
  brand: {
    brandBase,
  },
  depth: {
    depthDark27,
    depthBase,
    depthLight30,
    depthLight26,
    depthLight13,
  },
  depthSecondary: {
    depthSecondaryDark6,
    depthSecondary,
  },
  hightlight: {
    highlightDark9,
    highlightBase,
    highlightLight4,
    highlightLight45,
    highlightLight50,
    highlightLight53,
  },
  accent: {
    accentBase,
    accentSecondary,
    accentSecondaryLight40,
    accentTertiaryDark9,
    accentTertiary,
  },
  trafficlights: {
    successBase,
    successSecondary,
    warningBase,
    alertBase,
    alertLight47,
  },
};

export type IShadows = typeof shadows;

export const shadows = {
  invertTextShadow: `0 1px 1px ${colors.brandBase}`,
  menuShadow: `0 2px 3px 0 ${alphaHex(0.2)(colors.blackBase)}`,
  panelShadow: `0 1px 2px 0 ${alphaHex(0.14)(
    colors.blackBase,
  )}, 0 1px 5px 0 ${alphaHex(0.12)(colors.blackBase)}`,
};

export type IGradients = typeof gradients;

export const gradients = {
  highlightBase: `linear-gradient(0deg, ${colors.highlightBase} 0%, ${lighten(
    0.1,
    colors.highlightBase,
  )} 100%)`,
  highlightLight4: `linear-gradient(0deg, ${
    colors.highlightLight4
  } 0%, ${lighten(0.1, colors.highlightLight4)} 100%)`,
  highlightDark9: `linear-gradient(0deg, ${colors.highlightDark9} 0%, ${lighten(
    0.1,
    colors.highlightDark9,
  )} 100%)`,
  depthBase: `linear-gradient(0deg, ${colors.depthBase} 0%, ${lighten(
    0.1,
    colors.depthBase,
  )} 100%)`,
  whiteBaseNegative: `linear-gradient(-180deg, ${alphaHex(0.1)(
    colors.whiteBase,
  )} 0%, ${alphaHex(0)(colors.whiteBase)} 100%)`,
  depthLight26: `linear-gradient(0deg, ${colors.depthLight26} 0%, ${
    colors.whiteBase
  } 100%)`,
  highlightLight45ToHighlightLight50: `linear-gradient(0deg, ${
    colors.highlightLight45
  }, ${colors.highlightLight50})`,
};

export const outlines = {
  basic: boxshadowOutline({
    color: colors.accentBase,
    offset: '4px',
    zIndex: zindexes.focus,
  }),
};
