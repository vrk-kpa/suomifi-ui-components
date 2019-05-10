import React from 'react';
import { render } from 'react-testing-library';

import { Paragraph } from './Paragraph';

test('calling render with the same component on the same container does not remount', () => {
  const ParagraphRendered = render(
    <div data-testid="test-paragraph">
      <Paragraph>Hey this is test</Paragraph>
    </div>,
  );
  const { container } = ParagraphRendered;
  expect(container.firstChild).toMatchSnapshot();
});
