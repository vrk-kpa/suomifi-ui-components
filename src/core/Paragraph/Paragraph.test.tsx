import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../utils/test';

import { Paragraph } from './Paragraph';

const TestParagraph = (
  <div data-testid="test-paragraph">
    <Paragraph>Hey this is test</Paragraph>
  </div>
);

describe('margin', () => {
  it('should have margin style from margin prop', () => {
    const { container } = render(<Paragraph margin="xs">Test</Paragraph>);
    expect(container.firstChild).toHaveStyle('margin: 10px');
  });

  it('should have margin prop overwritten from style prop', () => {
    const { container } = render(
      <Paragraph margin="xs" style={{ margin: 2 }}>
        Test
      </Paragraph>,
    );
    expect(container.firstChild).toHaveAttribute('style', 'margin: 2px;');
  });
});

test('calling render with the same component on the same container does not remount', () => {
  const ParagraphRendered = render(TestParagraph);
  const { container } = ParagraphRendered;
  expect(container.firstChild).toMatchSnapshot();
});

test('should not have basic accessibility issues', axeTest(TestParagraph));
