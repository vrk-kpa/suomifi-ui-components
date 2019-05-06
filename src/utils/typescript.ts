export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type classnamesValue = string | { [key: string]: string | boolean };

export function objValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
