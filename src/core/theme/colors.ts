import { suomifiDesignTokens } from 'suomifi-design-tokens';
import { alphaHex } from '../../utils/css';
import { boxshadowOutline } from './utils/outline';
import { zindexes } from './zindexes';

export { ColorDesignTokens } from 'suomifi-design-tokens';

export const { colors } = suomifiDesignTokens;

const {
  whiteBase,
  blackBase,
  blackLight1,
  brandBase,
  depthDark1,
  depthBase,
  depthLight3,
  depthLight2,
  depthLight1,
  depthSecondaryDark1,
  depthSecondary,
  highlightDark1,
  highlightBase,
  highlightLight1,
  highlightLight2,
  highlightLight3,
  highlightLight4,
  accentBase,
  accentSecondary,
  accentSecondaryLight1,
  accentTertiaryDark1,
  accentTertiary,
  successBase,
  successSecondary,
  warningBase,
  alertBase,
  alertLight1,
} = colors;
export const colorTokens = {
  base: {
    whiteBase,
    blackBase,
    blackLight1,
  },
  brand: {
    brandBase,
  },
  depth: {
    depthDark1,
    depthBase,
    depthLight3,
    depthLight2,
    depthLight1,
  },
  depthSecondary: {
    depthSecondaryDark1,
    depthSecondary,
  },
  hightlight: {
    highlightDark1,
    highlightBase,
    highlightLight1,
    highlightLight2,
    highlightLight3,
    highlightLight4,
  },
  accent: {
    accentBase,
    accentSecondary,
    accentSecondaryLight1,
    accentTertiaryDark1,
    accentTertiary,
  },
  trafficlights: {
    successBase,
    successSecondary,
    warningBase,
    alertBase,
    alertLight1,
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
  highlightBase: `linear-gradient(0deg, ${colors.highlightDark1} 0%, ${colors.highlightBase} 100%)`,
  highlightLight1: `linear-gradient(0deg, ${colors.highlightBase} 0%, ${colors.highlightLight1} 100%)`,
  depthBase: `linear-gradient(0deg, ${colors.depthBase} 0%, ${colors.depthLight1} 100%)`,
  whiteBaseNegative: `linear-gradient(-180deg, ${alphaHex(0.1)(
    colors.whiteBase,
  )} 0%, ${alphaHex(0)(colors.whiteBase)} 100%)`,
  depthLight2: `linear-gradient(0deg, ${colors.depthLight2} 0%, ${colors.whiteBase} 100%)`,
  highlightLight2ToHighlightLight3: `linear-gradient(0deg, ${colors.highlightLight2}, ${colors.highlightLight3})`,
  depthLight2ToDepthLight3: `linear-gradient(0deg, ${colors.depthLight2}, ${colors.depthLight3})`,
};

export const outlines = {
  afterPseudo: boxshadowOutline({
    border: '0px',
    offset: '2px',
    zIndex: zindexes.focus,
    afterPseudo: true,
  }),
  boxShadow: boxshadowOutline({
    afterPseudo: false,
  }),
};
