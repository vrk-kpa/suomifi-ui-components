import React from 'react';
import { render } from '@testing-library/react';
import { Alert } from './Alert';
import { axeTest } from '../../utils/test';

describe('children', () => {
  const alertWithElementChild = (
    <Alert>
      <div data-testid="test-div">Test alert</div>
    </Alert>
  );

  it('has the given content', () => {
    const { getByTestId } = render(alertWithElementChild);
    expect(getByTestId('test-div').textContent).toBe('Test alert');
  });

  it('should match snapshot', () => {
    const { container } = render(alertWithElementChild);
    expect(container).toMatchSnapshot();
  });
});

describe('classnames', () => {
  const customClassAlert = <Alert className="custom-class">Testcontent</Alert>;

  it('contains base classname', () => {
    const { container } = render(customClassAlert);
    expect(container.firstChild).toHaveClass('fi-alert');
  });

  it('contains custom classname', () => {
    const { container } = render(customClassAlert);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should match snapshot', () => {
    const { container } = render(customClassAlert);
    expect(container).toMatchSnapshot();
  });
});

describe('variants', () => {
  const InlineAlert = (
    <Alert
      className="custom-class"
      closeText="Sulje"
      inline
      labelText="Alert label"
    >
      Testcontent
    </Alert>
  );
  it('inline variant should contain given label text', () => {
    const { container } = render(InlineAlert);
    expect(container.firstChild).toHaveClass('fi-alert');
  });
});

describe('accessibility', () => {
  const TestAlert = (
    <Alert className="custom-class" closeText="Sulje">
      Testcontent
    </Alert>
  );
  test('should not have basic accessibility issues', axeTest(TestAlert));
});
