import React from 'react';
import { axeTest } from '../../../utils/test';
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
      expect(getByTestId('regular_id').nextElementSibling?.textContent).toBe(
        'Regular',
      );

      rerender(
        <BaseCheckbox data-testid="regular_id_changed">
          Regular changed
        </BaseCheckbox>,
      );
      expect(
        getByTestId('regular_id_changed').nextElementSibling?.textContent,
      ).toBe('Regular changed');
    });

    it('has matching snapshot', () => {
      const { container } = render(RegularTestCheckbox);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('hintText', () => {
    it('has the hint text element', () => {
      const { getByText } = render(
        <Checkbox hintText="Example hint text">Text</Checkbox>,
      );
      expect(getByText('Example hint text')).toHaveClass('fi-hint-text');
    });

    it('will be added to input aria-describedby', () => {
      const { getByRole } = render(
        <Checkbox id="123" hintText="Example hint text">
          Text
        </Checkbox>,
      );
      expect(getByRole('checkbox')).toHaveAttribute(
        'aria-describedby',
        '123-hintText',
      );
    });
  });

  describe('statusText', () => {
    it('has the status text element', () => {
      const { getByText } = render(
        <Checkbox statusText="Example status text">Text</Checkbox>,
      );
      const statusText = getByText('Example status text');
      expect(statusText).toHaveClass('fi-status-text');
    });

    it('will be added to input aria-describedby', () => {
      const { getByRole } = render(
        <Checkbox id="123" statusText="Example status text">
          Text
        </Checkbox>,
      );
      expect(getByRole('checkbox')).toHaveAttribute(
        'aria-describedby',
        '123-statusText',
      );
    });
  });

  describe('disabled', () => {
    it('has disabled attribute and classname', () => {
      const { container, getByRole } = render(
        <Checkbox disabled statusText="Example status text">
          Text
        </Checkbox>,
      );
      expect(container.firstChild).toHaveClass('fi-checkbox--disabled');
      expect(getByRole('checkbox')).toHaveAttribute('disabled');
    });
  });

  describe('className', () => {
    it('has the given custom className', () => {
      const { container } = render(
        <Checkbox className="custom-style">Text</Checkbox>,
      );
      expect(container.firstChild).toHaveClass('custom-style');
    });
  });

  describe('margin', () => {
    it('should have margin style from margin prop', () => {
      const { container } = render(<Checkbox margin="xs">Text</Checkbox>);
      expect(container.firstChild).toHaveAttribute('style', 'margin: 10px;');
    });
  });
});
