import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axeTest } from '../../../utils/test/axe';

import { Toggle } from './Toggle';

const doNothing = () => ({});

const CreateTestToggle = (
  variant: 'withInput' | 'default',
  text: string,
  dataTestId: string,
  onClick: () => {} = doNothing,
) => (
  <Toggle
    onClick={onClick}
    data-testid={dataTestId}
    id="test-toggle"
    variant={variant}
  >
    {text}
  </Toggle>
);

describe.each([['withInput'], ['default']])(
  'Toggle variant %s: ',
  (variant: 'withInput' | 'default') => {
    test('calling render with the same component on the same container does not remount', () => {
      const toggleInputRendered = render(
        CreateTestToggle(variant, 'Test', 'toggle'),
      );
      const { getByTestId, container, rerender } = toggleInputRendered;
      expect(container.firstChild).toMatchSnapshot();
      expect(getByTestId('toggle').textContent).toBe('Test');

      // re-render the same component with different props
      rerender(CreateTestToggle(variant, 'Test two', 'elggot'));
      expect(getByTestId('elggot').textContent).toBe('Test two');
    });

    test('onClick should activate toggle and deactivate when clicked again', async () => {
      const mockClickHandler = jest.fn();
      const { getByTestId, container } = render(
        CreateTestToggle(variant, 'Test two', 'elggot', mockClickHandler),
      );
      const toggle = getByTestId('elggot');
      fireEvent.click(toggle);
      expect(mockClickHandler).toHaveBeenCalledTimes(1);
      const svgClassList = container.querySelector('svg')?.classList;
      expect(svgClassList).toContain('fi-toggle_icon');
      expect(svgClassList).toContain('fi-toggle_icon--checked');
      if (variant === 'withInput') {
        const inputElement = container.querySelector('input');
        expect(inputElement).toBeChecked();
      }
      fireEvent.click(toggle);
      expect(svgClassList).not.toContain('fi-toggle_icon--checked');
    });

    test('onClick should not change toggle state when checked is controlled', async () => {
      const mockClickHandler = jest.fn();
      const { getByTestId, container } = render(
        <Toggle
          variant={variant}
          data-testid={'elggot'}
          checked={false}
          id="test-toggle"
          onClick={mockClickHandler}
        >
          Controlled checked state
        </Toggle>,
      );
      const toggle = getByTestId('elggot');
      fireEvent.click(toggle);
      expect(mockClickHandler).toHaveBeenCalledTimes(1);
      const svgClassList = container.querySelector('svg')?.classList;
      expect(svgClassList).toContain('fi-toggle_icon');
      expect(svgClassList).not.toContain('fi-toggle_icon--checked');
      if (variant === 'withInput') {
        const inputElement = container.querySelector('input');
        expect(inputElement).not.toBeChecked();
      }
    });

    test(
      'should not have basic accessibility issues',
      axeTest(CreateTestToggle(variant, 'Test', 'toggle')),
    );
  },
);
