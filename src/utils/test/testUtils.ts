import { act } from '@testing-library/react';

/**
 * Wait for component positioning calculations
 *
 * Components using floating-ui for positioning (Dropdown, Select, SearchInput)
 * perform calculations in requestAnimationFrame. This helper ensures those
 * calculations complete before assertions run.
 *
 * @example
 * await user.click(button);
 * await waitForPosition();
 * expect(getByRole('listbox')).toBeInTheDocument();
 */
export async function waitForPosition() {
  // Wait for positioning (requestAnimationFrame)
  await act(
    () =>
      new Promise((resolve) => {
        requestAnimationFrame(() => resolve(null));
      }),
  );
  await act(
    () =>
      new Promise((resolve) => {
        requestAnimationFrame(() => resolve(null));
      }),
  );
}
