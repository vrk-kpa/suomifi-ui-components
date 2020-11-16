import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../utils/test/axe';

import { defaultThemeTokens } from './';
import { Expander } from '../../';

const { colors } = defaultThemeTokens;
const customColors = {
  ...colors,
  highlightBase: 'hsl(1, 2%, 3%)',
};

const Test = (
  <Expander.group
    OpenAllText={'Open all'}
    CloseAllText={'Close all'}
    tokens={{ colors: customColors }}
  >
    <Expander title="Test expander 1" id="id-expander-1">
      Test expander content 1
    </Expander>
    <Expander title="Test expander 2" id="id-expander-2">
      Test expander content 2
    </Expander>
    <Expander title="Test expander 3" id="id-expander-3">
      Test expander content 3
    </Expander>
  </Expander.group>
);

test('snapshot testing', () => {
  const TestRendered = render(Test);
  const { container } = TestRendered;
  expect(container.firstChild).toMatchSnapshot();
});

test('should not have basic accessibility issues', axeTest(Test));
