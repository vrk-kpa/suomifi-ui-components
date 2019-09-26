export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type classnamesValue = string | { [key: string]: string | boolean };

export function objValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

// From styled-components, does not export from there
export type asPropType = keyof JSX.IntrinsicElements | React.ComponentType<any>;
