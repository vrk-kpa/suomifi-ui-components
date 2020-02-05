import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../utils/test/axe';

import { SearchInput } from './SearchInput';

const TestSearchInput = (
  <SearchInput labelText="Test search input" data-testid="textinput" />
);

test('calling render with the same component on the same container does not remount', () => {
  const buttonRendered = render(TestSearchInput);
  const { container } = buttonRendered;
  expect(container.firstChild).toMatchSnapshot();
});

test('should not have basic accessibility issues', axeTest(TestSearchInput));
