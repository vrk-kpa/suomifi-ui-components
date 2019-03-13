const ifAriaNoLabel = (ariaLabel?: string) => !!ariaLabel || ariaLabel === '';

export const ariaLabelOrHidden = (ariaLabel?: string) => {
  return ifAriaNoLabel(ariaLabel)
    ? { 'aria-label': ariaLabel }
    : { 'aria-hidden': true };
};

export const ariaFocusableNoLabel = (ariaLabel?: string) => {
  return ifAriaNoLabel(ariaLabel) ? {} : { focusable: false };
};
