import React from 'react';
import { axeTest } from '../../../utils/test/axe';
import { render } from '@testing-library/react';
import { Checkbox, CheckboxProps } from './Checkbox';

const BaseCheckbox = (props: CheckboxProps) => {
  const { id, children, ...passProps } = props;
  return (
    <Checkbox id="test" {...passProps}>
      {children || 'Default label'}
    </Checkbox>
  );
};

const RegularTestCheckbox = (
  <BaseCheckbox data-testid="regular_id">Regular</BaseCheckbox>
);

const LargeTestCheckboxWithHintText = (
  <BaseCheckbox variant="large" hintText="Take a hint">
    Large
  </BaseCheckbox>
);

const CheckedLargeTestCheckboxWithError = (
  <BaseCheckbox
    variant="large"
    statusText="EROR EROR"
    defaultChecked
    status="error"
  >
    Large Checked with error
  </BaseCheckbox>
);

const DisabledTestCheckbox = (
  <BaseCheckbox disabled>Regular disabled</BaseCheckbox>
);

describe('accessibility', () => {
  test(
    'RegularTestCheckbox should not have basic accessibility issues',
    axeTest(RegularTestCheckbox),
  );

  test(
    'LargeTestCheckboxWithHintText should not have basic accessibility issues',
    axeTest(LargeTestCheckboxWithHintText),
  );

  test(
    'CheckedLargeTestCheckboxWithError should not have basic accessibility issues',
    axeTest(CheckedLargeTestCheckboxWithError),
  );

  test(
    'DisabledTestCheckbox should not have basic accessibility issues',
    axeTest(DisabledTestCheckbox),
  );
});

describe('props', () => {
  describe('name', () => {
    it('has the given name prop on start and after prop change', () => {
      const { getByRole, rerender } = render(<BaseCheckbox name="magical" />);
      const input = getByRole('checkbox');
      expect(input).toHaveAttribute('name', 'magical');

      rerender(<BaseCheckbox name="unicorn" />);
      expect(input).toHaveAttribute('name', 'unicorn');
    });
  });

  describe('value', () => {
    it('do not have value attribute if prop is not given', () => {
      const { getByRole } = render(<BaseCheckbox />);
      const input = getByRole('checkbox');
      expect(input).not.toHaveAttribute('value');
    });

    it('has the given value prop on start and after prop change', () => {
      const { getByRole, rerender } = render(
        <BaseCheckbox value="test-value-1" />,
      );
      const input = getByRole('checkbox');
      expect(input).toHaveAttribute('value', 'test-value-1');

      rerender(<BaseCheckbox value="test-value-2" />);
      expect(input).toHaveAttribute('value', 'test-value-2');
    });
  });

  describe('children', () => {
    it('has the given children and it changes on prop change', () => {
      const { getByTestId, rerender } = render(RegularTestCheckbox);
      expect(getByTestId('regular_id').textContent).toBe('Regular');

      rerender(
        <BaseCheckbox data-testid="regular_id_changed">
          Regular changed
        </BaseCheckbox>,
      );
      expect(getByTestId('regular_id_changed').textContent).toBe(
        'Regular changed',
      );
    });

    it('has matching snapshot', () => {
      const { container } = render(RegularTestCheckbox);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
