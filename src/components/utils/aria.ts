const ifAriaNoLabel = (ariaLabel?: string) => !!ariaLabel || ariaLabel === '';

export const ariaLabelOrHidden = (ariaLabel?: string) => {
  return ifAriaNoLabel(ariaLabel)
    ? { 'aria-label': ariaLabel, role: 'img' }
    : { 'aria-hidden': true };
};

/**
 * Set element ability to be focusable based on aria-label
 * @param {String} ariaLabel optional aria-label
 */
export const ariaFocusableNoLabel = (ariaLabel?: string) => {
  return ifAriaNoLabel(ariaLabel) ? {} : { focusable: false };
};
