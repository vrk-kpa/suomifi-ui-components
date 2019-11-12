import { ColorDesignTokens } from 'suomifi-design-tokens';
import { InternalTokensProp } from '../';

export const colorValue = (props: InternalTokensProp) => (
  colorToken: keyof ColorDesignTokens,
) => props.tokens.colors[colorToken].hsl;

export const colorsUtils = (colors: ColorDesignTokens) =>
  Object.entries(colors).reduce(
    (retObj, [key, value]) => ({
      ...retObj,
      [key]: value.hsl,
    }),
    {} as { [key in keyof ColorDesignTokens]: string },
  );
