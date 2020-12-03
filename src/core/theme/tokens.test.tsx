import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../utils/test/axe';

import { defaultThemeTokens } from './';
import {
  ExpanderGroup,
  Expander,
  ExpanderTitleButton,
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
      <ExpanderTitleButton>Test expander 1</ExpanderTitleButton>
    </Expander>
    <Expander id="id-expander-2">
      <ExpanderTitleButton>Test expander 2</ExpanderTitleButton>
      <ExpanderContent>Test expander content 2</ExpanderContent>
    </Expander>
    <Expander id="id-expander-3">
      <ExpanderTitleButton>Test expander 3</ExpanderTitleButton>
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
