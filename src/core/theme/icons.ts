import iconLoginSvg from './icons/icon-login.svg';

export interface Icons {
  login: string;
}

export type IconKeys = keyof Icons;

export const icons: Icons = {
  login: iconLoginSvg,
};
