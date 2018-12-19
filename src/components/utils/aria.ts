export const ariaLabelOrHidden = (ariaLabel?: string) => {
  return ariaLabel === undefined || ariaLabel === ''
    ? { 'aria-hidden': true }
    : { 'aria-label': ariaLabel };
};
