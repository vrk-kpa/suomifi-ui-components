import iconLoginSvg from './icons/icon-login.svg';

export interface IIcons {
  login: string;
}

export type IconKeys = keyof IIcons;

export const icons: IIcons = {
  login: iconLoginSvg,
};
