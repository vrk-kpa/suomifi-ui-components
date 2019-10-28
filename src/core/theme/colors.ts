import { tokens } from 'suomifi-design-tokens';
import { lighten } from 'polished';
import { alphaHex } from '../../utils/css';
import { boxshadowOutline } from './utils/outline';
import { zindexes } from './zindexes';

export { ColorDesingTokens } from 'suomifi-design-tokens';

// TODO replace with above one
export type IColors = typeof colors;

export const { colors } = tokens;

export type IShadows = typeof shadows;

export const shadows = {
  invertTextShadow: `0 1px 1px ${colors.brandBase}`,
  menuShadow: `0 2px 3px 0 ${alphaHex(0.2)(colors.blackBase.hsl)}`,
  panelShadow: `0 1px 2px 0 ${alphaHex(0.14)(
    colors.blackBase.hsl,
  )}, 0 1px 5px 0 ${alphaHex(0.12)(colors.blackBase.hsl)}`,
};

export type IGradients = typeof gradients;

export const gradients = {
  highlightBase: `linear-gradient(0deg, ${colors.highlightBase} 0%, ${lighten(
    0.1,
    colors.highlightBase.hsl,
  )} 100%)`,
  highlightLight4: `linear-gradient(0deg, ${
    colors.highlightLight4
  } 0%, ${lighten(0.1, colors.highlightLight4.hsl)} 100%)`,
  highlightDark9: `linear-gradient(0deg, ${colors.highlightDark9} 0%, ${lighten(
    0.1,
    colors.highlightDark9.hsl,
  )} 100%)`,
  depthBase: `linear-gradient(0deg, ${colors.depthBase} 0%, ${lighten(
    0.1,
    colors.depthBase.hsl,
  )} 100%)`,
  whiteBaseNegative: `linear-gradient(-180deg, ${alphaHex(0.1)(
    colors.whiteBase.hsl,
  )} 0%, ${alphaHex(0)(colors.whiteBase.hsl)} 100%)`,
  depthLight26: `linear-gradient(0deg, ${colors.depthLight26} 0%, ${
    colors.whiteBase
  } 100%)`,
  highlightLight45ToHighlightLight50: `linear-gradient(0deg, ${
    colors.highlightLight45
  }, ${colors.highlightLight50})`,
};

export const outlines = {
  basic: boxshadowOutline({
    color: colors.accentBase.hsl,
    offset: '4px',
    zIndex: zindexes.focus,
  }),
};
