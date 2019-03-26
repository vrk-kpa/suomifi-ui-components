import { ThemeComponent, suomifiTheme } from '../';

export const focus = ({
  outline,
  noPseudo,
  theme = suomifiTheme,
}: ThemeComponent & { outline?: string; noPseudo?: boolean }) => {
  const style = !!outline ? outline : theme.outlines.basic;
  return !!noPseudo
    ? style
    : `&:focus {
    ${style}
  }`;
};
