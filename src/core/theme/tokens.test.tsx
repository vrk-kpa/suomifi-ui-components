import React from 'react';
import { render } from 'react-testing-library';
import { axeTest } from '../../utils/test/axe';

import { Panel, defaultTokens } from '../../';

const { colors } = defaultTokens;
const customColors = { ...colors, highlightBase: 'hsl(1, 2, 3)' };

const Test = (
  <Panel.expansionGroup
    OpenAll={'Open all'}
    CloseAll={'Close all'}
    tokens={{ colors: customColors }}
  >
    <Panel.expansion title="Test expansion 1">
      Test expansion content 1
    </Panel.expansion>
    <Panel.expansion title="Test expansion 2">
      Test expansion content 2
    </Panel.expansion>
    <Panel.expansion title="Test expansion 3">
      Test expansion content 3
    </Panel.expansion>
  </Panel.expansionGroup>
);

test('snapshot testing', () => {
  const TestRendered = render(Test);
  const { container } = TestRendered;
  expect(container.firstChild).toMatchSnapshot();
});

test('should not have basic accessibility issues', axeTest(Test));
