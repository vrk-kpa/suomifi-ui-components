import React from 'react';
import { render } from '@testing-library/react';
import { StaticChip } from './StaticChip';

describe('disabled', () => {
  const DisabledChip = <StaticChip disabled={true}>Testcontent</StaticChip>;

  it('has "--disabled"-class', () => {
    const { container } = render(DisabledChip);
    expect(container.firstChild).toHaveClass('fi-chip--disabled');
  });

  it('should match snapshot', () => {
    const { container } = render(DisabledChip);
    expect(container).toMatchSnapshot();
  });
});

describe('children', () => {
  const chipWithChildren = (
    <StaticChip>
      <div data-testid="test-div">Selection 1</div>
    </StaticChip>
  );

  it('has the given content', () => {
    const { getByTestId } = render(chipWithChildren);
    expect(getByTestId('test-div').textContent).toBe('Selection 1');
  });

  it('should match snapshot', () => {
    const { container } = render(chipWithChildren);
    expect(container).toMatchSnapshot();
  });
});

describe('classnames', () => {
  const customClassChip = (
    <StaticChip className="custom-class">Testcontent</StaticChip>
  );
  const staticChip = <StaticChip>Test selection</StaticChip>;

  it('contains base classname', () => {
    const { container } = render(customClassChip);
    expect(container.firstChild).toHaveClass('fi-chip');
  });

  it('contains custom classname', () => {
    const { container } = render(customClassChip);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should match snapshot', () => {
    const { container } = render(customClassChip);
    expect(container).toMatchSnapshot();
  });
  it('only has the clasees corresponding the variant', () => {
    const { container } = render(staticChip);
    expect(container.firstChild).not.toHaveClass('fi-chip--button');
  });

  describe('margin prop', () => {
    it('should have margin style from margin prop', () => {
      const { container } = render(<StaticChip margin="xs">Test</StaticChip>);
      expect(container.firstChild).toHaveStyle('margin: 10px');
    });

    it('should have margin prop style overwritten from style', () => {
      const { container } = render(
        <StaticChip margin="xs" style={{ margin: 2 }}>
          Test
        </StaticChip>,
      );
      expect(container.firstChild).toHaveAttribute('style', 'margin: 2px;');
    });
  });
});
