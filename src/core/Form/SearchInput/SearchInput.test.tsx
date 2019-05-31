import React from 'react';
import { render } from 'react-testing-library';
import { SearchInput } from './SearchInput';

test('calling render with the same component on the same container does not remount', () => {
  const buttonRendered = render(
    <SearchInput labelText="Test search input" data-testid="textinput" />,
  );
  const { container } = buttonRendered;
  expect(container.firstChild).toMatchSnapshot();
});
