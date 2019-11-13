import { ColorDesingTokens } from 'suomifi-design-tokens';
import { InternalTokensProp } from '../';

export const colorValue = (props: InternalTokensProp) => (
  colorToken: keyof ColorDesingTokens,
) => props.tokens.colors[colorToken].hsl;

export const colorsUtils = (colors: ColorDesingTokens) =>
  Object.entries(colors).reduce(
    (retObj, [key, value]) => ({
      ...retObj,
      [key]: value.hsl,
    }),
    {} as { [key in keyof ColorDesingTokens]: string },
  );
