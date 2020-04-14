import { css } from 'styled-components';

export const allStates = (styles: string) => css`
  &:hover,
  &:active,
  &:focus,
  &:focus-within {
    ${styles}
  }
`;

type absolutePseudos = 'before' | 'after';
// This is probably because of prettier bug #6794. Prettier now adds extra space between &:$ which breaks the selector.
// Ignore can be removed once bug is fixed.
// prettier-ignore
export const absolute = (pseudo: absolutePseudos) => css`
  position: relative;
  &:${/* sc-prop */ pseudo} {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;
