import React from 'react';
import { render } from 'react-testing-library';
import { TextInput } from './TextInput';

test('calling render with the same component on the same container does not remount', () => {
  const buttonRendered = render(
    <TextInput labelText="Test input" data-testid="textinput" />,
  );
  const { container } = buttonRendered;
  expect(container.firstChild).toMatchSnapshot();
});
