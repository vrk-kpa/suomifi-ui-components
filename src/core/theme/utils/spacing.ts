import { spacingTokensProp, spacingTokensKeys } from '../spacing';
import { suomifiTheme, ThemeProp } from '../';

type SpaceProp = spacingTokensProp | '0';

const SpaceVal = (theme: ThemeProp) => (val?: SpaceProp) => {
  if (val === '0') return '0';
  return !!val ? theme.spacing[val] : '';
};

const space = (theme: ThemeProp = suomifiTheme) => (
  type: 'padding' | 'margin',
) => (t: SpaceProp, r?: SpaceProp, b?: SpaceProp, l?: SpaceProp) =>
  `${type}: ${SpaceVal(theme)(t)} ${SpaceVal(theme)(r)} ${SpaceVal(theme)(
    b,
  )} ${SpaceVal(theme)(l)} ;`;

export const margin = (theme: ThemeProp) => space(theme)('margin');
export const padding = (theme: ThemeProp) => space(theme)('padding');

export const spacingModifiers = (theme: ThemeProp) => (
  spacing: 'padding' | 'margin',
) => (selector: string) =>
  spacingTokensKeys.reduce(
    (ret, k) =>
      `${ret}${selector}-${k}{
    ${space(theme)(spacing)(k)}
  } `,
    '',
  );
