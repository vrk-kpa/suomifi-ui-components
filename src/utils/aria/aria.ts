const ifAriaNoLabel = (ariaLabel?: string) => !!ariaLabel || ariaLabel === '';

export const ariaLabelOrHidden = (ariaLabel?: string) =>
  ifAriaNoLabel(ariaLabel)
    ? { 'aria-label': ariaLabel, role: 'img' }
    : { 'aria-hidden': true };

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
 * Using the util prevents generation of empty 'aria-' properties when no valid values are given.
 * Using with different 'aria-' properties requires different kinds of use - see examples below.
 * E.g:
 * @example
 * <Component
 *   {...getConditionalAriaProp('aria-describedby', [
 *      "id-of-describing-element",
 *      otherDescribingElement ? "id-of-other-describing-element" : undefined,
 *   ])}
 * />
 * <Component
 *   {...getConditionalAriaProp('aria-label', [
 *      "Very describing label text value",
 *   ])}
 * />
 * @param propName String of Aria property name
 * @param idsOrValues Array of id-strings or an array with the actual value.
 * @returns Object with 'aria-' property if there is atleast one string value that is not undefined. Otherwise returns empty Object.
 */
export const getConditionalAriaProp = (
  propName: ariaPropName,
  idsOrValues: (string | undefined)[],
): ariaProp => {
  const existing = idsOrValues.filter((id) => !!id);
  if (existing.length > 0) {
    const ariaIdsOrValues = existing.join(' ').trim();
    return { [propName]: ariaIdsOrValues };
  }
  return {};
};
