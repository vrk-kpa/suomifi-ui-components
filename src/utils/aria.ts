const ifAriaNoLabel = (ariaLabel?: string) => !!ariaLabel || ariaLabel === '';

export const ariaLabelOrHidden = (ariaLabel?: string) =>
  ifAriaNoLabel(ariaLabel)
    ? { 'aria-label': ariaLabel, role: 'img' }
    : { 'aria-hidden': true };

export type ariaLiveModes = 'assertive' | 'polite' | 'off';

/**
 * Set element ability to be focusable based on aria-label
 * @param {String} ariaLabel optional aria-label
 */
export const ariaFocusableNoLabel = (ariaLabel?: string) =>
  ifAriaNoLabel(ariaLabel) ? {} : { focusable: false };

type ariaPropName = 'aria-describedby' | 'aria-labelledby' | 'aria-label';
type ariaProp = { [key in ariaPropName]: string } | {};

/**
 * Returns object with 'aria-' property which can be spread to props.
 * E.g:
 * @example
 * <Component
 *   {...getConditionalAriaProp('aria-describedby', [
 *      "id-of-describing-element",
 *      otherDescribingElement ? "id-of-other-describing-element" : undefined,
 *   ])}
 * />
 * @param propName String of Aria property name
 * @param describedByIds Array of id-strings
 * @returns Object with 'aria-' property if there is atleast one string value that is not undefined. Otherwise returns empty Object.
 */
export const getConditionalAriaProp = (
  propName: ariaPropName,
  describedByIds: (string | undefined)[],
): ariaProp => {
  const existing = describedByIds.filter((id) => !!id);
  if (existing.length > 0) {
    const ariaIds = existing.join(' ').trim();
    return { [propName]: ariaIds };
  }
  return {};
};
