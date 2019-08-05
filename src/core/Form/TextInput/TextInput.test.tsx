import React from 'react';
import { render } from 'react-testing-library';
import { axeTest } from '../../../utils/test/axe';

import { TextInput } from './TextInput';

const TestTextInput = (
  <TextInput labelText="Test input" data-testid="textinput" />
);

test('calling render with the same component on the same container does not remount', () => {
  const buttonRendered = render(TestTextInput);
  const { container } = buttonRendered;
  expect(container.firstChild).toMatchSnapshot();
});

test('should not have basic accessibility issues', axeTest(TestTextInput));
