import React from 'react';
import { render } from '@testing-library/react';
import { InlineAlert } from '../InlineAlert/InlineAlert';
import { axeTest } from '../../utils/test';

describe('children', () => {
  const alertWithElementChild = (
    <InlineAlert>
      <div>Test alert</div>
    </InlineAlert>
  );
  it('has the given content', () => {
    const { container } = render(alertWithElementChild);
    expect(container.firstChild).toHaveTextContent('Test alert');
  });

  it('should match snapshot', () => {
    const { container } = render(alertWithElementChild);
    expect(container).toMatchSnapshot();
  });
});

describe('props', () => {
  const InlineAlertComponent = (
    <InlineAlert labelText="Inline Alert label">Testcontent</InlineAlert>
  );
  it('Inline component should contain given labelText', () => {
    const { getByText } = render(InlineAlertComponent);
    const label = getByText('Inline Alert label');
    expect(label).toHaveClass('fi-inline-alert_label');
  });
});

describe('accessibility', () => {
  const TestAlert = <InlineAlert>Testcontent</InlineAlert>;
  test('should not have basic accessibility issues', axeTest(TestAlert));
});
