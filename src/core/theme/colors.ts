import { parseToRgb, toColorString, darken, lighten } from 'polished';
import { boxshadowOutline } from './utils/outline';
import { zindexes } from './zindexes';

const palette = {
  black: '#282828',
  white: '#FFFFFF',
  colorSuomi: '#003479',
  suomiDarkest: '#01193c',
  suomiDarker: '#002454',
  suomiDark: '#002e6c',
  suomiLight: '#1a4886',
  suomiLighter: '#4d71a1',
  suomiLightest: '#8199bc',
  lake: '#2A6EBB',
  lakeDarkest: '#14365d',
  lakeDarker: '#1d4d83',
  lakeDark: '#2562a7',
  lakeLight: '#3f7cc1',
  lakeLighter: '#6a99cf',
  lakeLightest: '#94b6dd',
  lakeExtralight: '#e9f0f8',
  darkness: '#002e5f',
  darknessDarkest: '#00162f',
  darknessDarker: '#002042',
  darknessDark: '#002955',
  darknessLight: '#1a436f',
  darknessLighter: '#4d6d8f',
  darknessLightest: '#8096af',
  sky: '#34b6e4',
  skyDarkest: '#195a71',
  skyDarker: '#247fa0',
  skyDark: '#2ea3cc',
  skyLight: '#48bde6',
  skyLighter: '#71ccec',
  skyLightest: '#99daf1',
  aurora: '#60cdcb',
  auroraDarkest: '#2f6665',
  auroraDarker: '#438f8e',
  auroraDark: '#56b8b6',
  auroraLight: '#70d2d0',
  auroraLighter: '#90dcda',
  auroraLightest: '#afe6e5',
  evergreen: '#007770',
  evergreenDarkest: '#003b37',
  evergreenDarker: '#00534e',
  evergreenDark: '#006a64',
  evergreenLight: '#1a847e',
  evergreenLighter: '#4da09b',
  evergreenLightest: '#80bbb7',
  birch: '#b9cf96',
  birchDarkest: '#5c674a',
  birchDarker: '#819169',
  birchDark: '#a6b986',
  birchLight: '#c0d3a0',
  birchLighter: '#ceddb5',
  birchLightest: '#dce7ca',
  cloudberry: '#ea7125',
  cloudberryDarkest: '#743812',
  cloudberryDarker: '#a44f19',
  cloudberryDark: '#d26521',
  cloudberryLight: '#ec7f3b',
  cloudberryLighter: '#f09b66',
  cloudberryLightest: '#f4b892',
  blueberry: '#8b2346',
  blueberryDarkest: '#451122',
  blueberryDarker: '#611831',
  blueberryDark: '#7c1f3e',
  blueberryLight: '#963958',
  blueberryLighter: '#af657d',
  blueberryLightest: '#c591a2',
  berryPudding: '#e30450',
  berryPuddingDarkest: '#710127',
  berryPuddingDarker: '#9f0238',
  berryPuddingDark: '#cb0347',
  berryPuddingLight: '#e51d61',
  berryPuddingLighter: '#eb4f84',
  berryPuddingLightest: '#f181a7',
  heather: '#9f60b5',
  heatherDarkest: '#4f2f5a',
  heatherDarker: '#6f437f',
  heatherDark: '#8e56a2',
  heatherLight: '#a870bc',
  heatherLighter: '#bb90cb',
  heatherLightest: '#cfafda',
  gray: '#A5ACB0',
  gray60: '#C9CDCF',
  gray20: '#EDEEEF',
  gray10: '#F6F6F7',
  gray5: '#FAFAFA',
  grayK20: '#84898C',
  grayK40: '#636769',
  green: '#00B38A',
  yellow: '#F4AA00',
  red: '#C13832',
};

const alphaHex = (value: number) => (hex: string) =>
  toColorString({
    ...parseToRgb(hex),
    alpha: value,
  });

const alphaHex50 = alphaHex(0.5);

export type IColors = typeof colors;

export const colors = {
  white: palette.white,
  black: '#000000',
  activeBgr: palette.gray20,
  disabledColor: palette.gray60,
  disabledBgr: palette.gray10,
  brandColor: palette.colorSuomi,
  text: palette.black,
  invertText: palette.white,
  primarycolor: palette.white,
  secondaryColor: palette.lake,
  invertBgrDark: palette.lakeDark,
  focusRing: palette.cloudberry,
  elementBorder: palette.gray60,
  elementHover: palette.lakeExtralight,
  caret: palette.grayK40,
  toggleOn: palette.green,
  toggleOnSlide: alphaHex50(palette.green),
  panelExpansionBgr: '#f6f9fc', // TODO!! New colors and names to be defined by PAMU
  // secondaryBackground: palette.lakeDark,
  // text: '#fff',
  // background: '#212121',
  // primaryText: '#fff',
  // primary: '#2196F3',
  // title: '#fff',
  // alert: '#d9534f',
  // border: '#666',
  // ...palette,
};

export type IShadows = typeof shadows;

export const shadows = {
  invertTextShadow: `0 1px 1px ${alphaHex50(palette.suomiDarkest)}`,
  menuShadow: `0 2px 3px 0 ${alphaHex(0.2)(palette.black)}`,
  panelShadow: `0 0 4px 0 ${alphaHex(0.3)(palette.black)}`,
};

export type IGradients = typeof gradients;

export const gradients = {
  basic: `linear-gradient(0deg, ${palette.lakeDark} 0%, ${palette.lake} 100%)`,
  basicLight: `linear-gradient(0deg, ${darken(
    0.07,
    palette.lakeExtralight,
  )} 0%, ${palette.lakeExtralight} 100%)`,
  basicLighter: `linear-gradient(0deg, ${darken(
    0.02,
    palette.lakeExtralight,
  )} 0%, ${palette.lakeExtralight} 100%)`,
  basicDark: `linear-gradient(0deg, ${lighten(
    0.1,
    palette.darknessLightest,
  )} 0%, ${lighten(0.2, palette.darknessLightest)} 100%)`,
  light: `linear-gradient(-180deg, ${palette.lakeLight} 0%, ${
    palette.lake
  } 100%)`,
  lightNegative: `linear-gradient(-180deg, ${alphaHex(0.1)(
    palette.white,
  )} 0%, ${alphaHex(0)(palette.white)} 100%)`,
  lightSecondary: `linear-gradient(-180deg, ${palette.gray20} 0%, ${
    palette.white
  } 100%)`,
  dark: `linear-gradient(0deg, ${palette.lakeDarker} 0%, ${
    palette.lakeDark
  } 100%)`,
  gray: `linear-gradient(0deg, ${palette.gray} 0%, ${palette.gray60} 100%)`,
};

export const outlines = {
  basic: boxshadowOutline({
    color: colors.focusRing,
    offset: '4px',
    zIndex: zindexes.focus,
  }),
};
