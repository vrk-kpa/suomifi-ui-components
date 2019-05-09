import { spacingTokens } from '../spacing';

type SpaceProp = keyof typeof spacingTokens | '0';

const SpaceVal = (val: SpaceProp) => (val === '0' ? val : spacingTokens[val]);

const space = (type: 'padding' | 'margin') => (
  t: SpaceProp,
  r?: SpaceProp,
  b?: SpaceProp,
  l?: SpaceProp,
) =>
  `${type}: ${SpaceVal(t)} ${!!r && SpaceVal(r)} ${!!b && SpaceVal(b)} ${!!l &&
    SpaceVal(l)} ;`;

export const margin = space('margin');
export const padding = space('padding');
