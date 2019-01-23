interface NormalizeProps {
  normalize?: string;
  cssToString?: boolean;
}
type cssString = { [key: string]: string };

declare module 'normalize.cssinjs' {
  export function normalizeCssInJs(props?: NormalizeProps): cssString;
  const reset: { [key: string]: string };
  export default reset;
}
