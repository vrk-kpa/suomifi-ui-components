interface IProps {
  normalize?: string;
  cssToString?: boolean;
}
type cssString = { [key: string]: string };

declare module 'normalize.cssinjs' {
  export function normalizeCssInJs(props?: IProps): cssString;
  const reset: { [key: string]: string };
  export default reset;
}
