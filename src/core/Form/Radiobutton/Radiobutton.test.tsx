import React from 'react';
import { render } from '@testing-library/react';
import { Radiobutton } from './Radiobutton';

describe('disabled', () => {
  it('has "--disabled"-class', () => {
    const { container } = render(
      <Radiobutton disabled={true}>Option 1</Radiobutton>,
    );
    expect(container.firstChild).toHaveClass('fi-radiobutton--disabled');
  });
  it('will add "disabled"-attribute for input', () => {
    const { getByRole } = render(
      <Radiobutton disabled={true}>Option 1</Radiobutton>,
    );
    expect(getByRole('radio')).toHaveAttribute('disabled');
  });
});
