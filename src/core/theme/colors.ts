import { lighten } from 'polished';
import { alphaHex } from '../../utils/css/colors';
import { boxshadowOutline } from './utils/outline';
import { zindexes } from './zindexes';

export type IColors = typeof colors;

export const colorTokens = {
  base: {
    whiteBase: 'hsl(0, 0%, 100%)',
    blackBase: 'hsl(0, 0%, 16%)',
    blackLighten42: 'hsl(0, 0%, 58%)',
  },
  brand: {
    brandBase: 'hsl(214, 100%, 24%)',
  },
  depth: {
    depthDark27: 'hsl(202, 7%, 40%)',
    depthBase: 'hsl(202, 7%, 67%)',
    depthLight30: 'hsl(202, 7%, 97%)',
    depthLight26: 'hsl(202, 7%, 93%)',
    depthLight13: 'hsl(202, 7%, 80%)',
  },
  depthSecondary: {
    depthSecondaryDark6: 'hsl(215, 100%, 91%)',
    depthSecondary: 'hsl(215, 100%, 97%)',
  },
  hightlight: {
    highlightDark9: 'hsl(212, 63%, 37%)',
    highlightBase: 'hsl(212, 63%, 45%)',
    highlightLight4: 'hsl(212, 63%, 49%)',
    highlightLight45: 'hsl(212, 63%, 90%)',
    highlightLight50: 'hsl(212, 63%, 95%)',
    highlightLight53: 'hsl(212, 63%, 98%)',
  },
  accent: {
    accentBase: 'hsl(23, 82%, 53%)',
    accentSecondary: 'hsl(196, 77%, 55%)',
    accentSecondaryLight40: 'hsl(196, 77%, 95%)',
    accentTertiaryDark9: 'hsl(284, 36%, 45%)',
    accentTertiary: 'hsl(284, 36%, 54%)',
  },
  trafficlights: {
    successBase: 'hsl(166, 90%, 36%)',
    successSecondary: 'hsl(166, 54%, 80%)',
    warningBase: 'hsl(42, 100%, 49%)',
    alertBase: 'hsl(3, 59%, 48%)',
    alertLight47: 'hsl(3, 59%, 95%)',
  },
};

export const colors = {
  ...colorTokens.base,
  ...colorTokens.brand,
  ...colorTokens.depth,
  ...colorTokens.depthSecondary,
  ...colorTokens.hightlight,
  ...colorTokens.accent,
  ...colorTokens.trafficlights,
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
};

export const outlines = {
  basic: boxshadowOutline({
    color: colors.accentBase,
    offset: '4px',
    zIndex: zindexes.focus,
  }),
};
