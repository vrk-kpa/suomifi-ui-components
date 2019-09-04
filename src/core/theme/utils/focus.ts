import { suomifiTheme, TokensComponent } from '../';

export const focus = ({
  outline,
  noPseudo,
  tokens,
}: TokensComponent & {
  outline?: string;
  noPseudo?: boolean;
}) => {
  const style = !!outline ? outline : suomifiTheme(tokens).outlines.basic;
  return !!noPseudo
    ? style
    : `&:focus {
    ${style}
  }`;
};
