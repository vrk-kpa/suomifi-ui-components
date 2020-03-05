import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../utils/test/axe';

import { Paragraph } from './Paragraph';

const TestParagraph = (
  <div data-testid="test-paragraph">
    <Paragraph>Hey this is test</Paragraph>
  </div>
);

test('calling render with the same component on the same container does not remount', () => {
  const ParagraphRendered = render(TestParagraph);
  const { container } = ParagraphRendered;
  expect(container.firstChild).toMatchSnapshot();
});

test('should not have basic accessibility issues', axeTest(TestParagraph));
