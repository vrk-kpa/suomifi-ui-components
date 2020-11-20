import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../utils/test/axe';

import { defaultThemeTokens } from './';
import {
  ExpanderGroup,
  Expander,
  ExpanderTitle,
  ExpanderContent,
} from '../../';

const { colors } = defaultThemeTokens;
const customColors = {
  ...colors,
  highlightBase: 'hsl(1, 2%, 3%)',
};

const Test = (
  <ExpanderGroup
    OpenAllText={'Open all'}
    CloseAllText={'Close all'}
    tokens={{ colors: customColors }}
  >
    <Expander id="id-expander-1">
      <ExpanderTitle>Test expander 1</ExpanderTitle>
    </Expander>
    <Expander id="id-expander-2">
      <ExpanderTitle>Test expander 2</ExpanderTitle>
      <ExpanderContent>Test expander content 2</ExpanderContent>
    </Expander>
    <Expander id="id-expander-3">
      <ExpanderTitle>Test expander 3</ExpanderTitle>
      <ExpanderContent>Test expander content 3</ExpanderContent>
    </Expander>
  </ExpanderGroup>
);

test('snapshot testing', () => {
  const TestRendered = render(Test);
  const { container } = TestRendered;
  expect(container.firstChild).toMatchSnapshot();
});

test('should not have basic accessibility issues', axeTest(Test));
