import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { RadioButton, RadioButtonProps } from './RadioButton';

const Radio = (props: RadioButtonProps) => {
  const { id, children, ...passProps } = props;
  return (
    <RadioButton {...passProps} id={id || 'test-id'}>
      {children || 'Label text here'}
    </RadioButton>
  );
};

describe('disabled', () => {
  const DisabledRadioButton = <Radio value="value" disabled={true} />;

  it('has "--disabled"-class', () => {
    const { container } = render(DisabledRadioButton);
    expect(container.firstChild).toHaveClass('fi-radio-button--disabled');
  });

  it('will add "disabled"-attribute for input', () => {
    const { getByRole } = render(DisabledRadioButton);
    expect(getByRole('radio')).toHaveAttribute('disabled');
  });

  it('should match snapshot', () => {
    const { container } = render(DisabledRadioButton);
    expect(container).toMatchSnapshot();
  });
});

describe('className', () => {
  const ClassnameRadioButton = (
    <Radio value="value" className="custom-className" />
  );

  it('has the given custom className', () => {
    const { container } = render(ClassnameRadioButton);
    expect(container.firstChild).toHaveClass('custom-className');
  });

  it('should match snapshot', () => {
    const { container } = render(ClassnameRadioButton);
    expect(container).toMatchSnapshot();
  });
});

describe('name', () => {
  const NameRadioButton = <Radio value="value" name="group-name" />;

  it('has the given "name"-attribute', () => {
    const { getByRole } = render(NameRadioButton);
    expect(getByRole('radio')).toHaveAttribute('name', 'group-name');
  });

  it('should match snapshot', () => {
    const { container } = render(NameRadioButton);
    expect(container).toMatchSnapshot();
  });
});

describe('value', () => {
  const ValueRadioButton = <Radio value="option-value-1" />;

  it('has the given "value"-attribute', () => {
    const { getByRole } = render(ValueRadioButton);
    expect(getByRole('radio')).toHaveAttribute('value', 'option-value-1');
  });

  it('should match snapshot', () => {
    const { container } = render(ValueRadioButton);
    expect(container).toMatchSnapshot();
  });
});

describe('hintText', () => {
  const HintTextRadioButton = (
    <Radio value="value" hintText="Example hint text" />
  );

  it('has element for hintText when prop is given', () => {
    const { getByText } = render(HintTextRadioButton);
    const hintText = getByText('Example hint text');
    expect(hintText).toHaveClass('fi-hint-text');
  });

  it('should match snapshot', () => {
    const { container } = render(HintTextRadioButton);
    expect(container).toMatchSnapshot();
  });
});

describe('variant', () => {
  const VariantRadioButton = <Radio value="value" variant="large" />;

  it('has "--large"-class when using large', () => {
    const { container } = render(VariantRadioButton);
    expect(container.firstChild).toHaveClass('fi-radio-button--large');
  });

  it('should match snapshot', () => {
    const { container } = render(VariantRadioButton);
    expect(container).toMatchSnapshot();
  });
});

describe('onChange', () => {
  it('is called when clicked', () => {
    const mockClick = jest.fn();
    const { getByRole } = render(<Radio value="value" onChange={mockClick} />);
    const radio = getByRole('radio');
    fireEvent.click(radio);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});

describe('id', () => {
  const IdRadioButton = <Radio value="value" id="good-id" />;

  it('has the given id', () => {
    const { getByRole } = render(IdRadioButton);
    expect(getByRole('radio')).toHaveAttribute('id', 'good-id');
  });

  it('should match snapshot', () => {
    const { container } = render(IdRadioButton);
    expect(container).toMatchSnapshot();
  });
});

describe('children', () => {
  const ChildrenRadioButton = <Radio value="value">Option 1</Radio>;

  it('has the given children as label', () => {
    const { container } = render(ChildrenRadioButton);
    const label = container.querySelector('label');
    expect(label?.textContent).toBe('Option 1');
  });

  it('should match snapshot', () => {
    const { container } = render(ChildrenRadioButton);
    expect(container).toMatchSnapshot();
  });
});
