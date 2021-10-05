export type classnamesValue = string | { [key: string]: string | boolean };

// From styled-components, does not export from there
export type asPropType = keyof JSX.IntrinsicElements | React.ComponentType<any>;
