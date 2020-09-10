import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Chip as OrigChip, ChipProps } from './Chip';

const Chip = (props: ChipProps) => {
  const { children, ...passProps } = props;
  return <OrigChip {...passProps}>{children || 'Chip content'}</OrigChip>;
};

describe('disabled', () => {
  const DisabledChip = <Chip disabled={true} />;

  it('has "--disabled"-class', () => {
    const { container } = render(DisabledChip);
    expect(container.firstChild).toHaveClass('fi-chip--disabled');
  });

  it('will add "disabled"-attribute for the button element', () => {
    const { getByRole } = render(DisabledChip);
    expect(getByRole('button')).toHaveAttribute('disabled');
  });

  it('should match snapshot', () => {
    const { container } = render(DisabledChip);
    expect(container).toMatchSnapshot();
  });
});

describe('children', () => {
  const chipWithChildren = (
    <Chip>
      <div data-testid="test-div">Selection 1</div>
    </Chip>
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
  const customClassChip = <Chip className="custom-class" />;

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
});

describe('variants', () => {
  const removableChip = <Chip removable={true} />;

  it('has the elements corresponding the variant', () => {
    const { container } = render(removableChip);
    const icon = container.querySelector('.fi-chip--icon');
    expect(container.contains(icon)).toBeTruthy();
  });
});

describe('onClick', () => {
  it('is called when clicked', () => {
    const mockClick = jest.fn();
    const { getByRole } = render(<Chip onClick={mockClick} />);
    const chip = getByRole('button');
    fireEvent.click(chip);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
