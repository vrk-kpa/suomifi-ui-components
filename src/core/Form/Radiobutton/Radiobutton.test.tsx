import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Radiobutton, RadiobuttonProps } from './Radiobutton';

const Radio = (props: RadiobuttonProps) => {
  const { id, children, ...passProps } = props;
  return (
    <Radiobutton {...passProps} id={id || 'test-id'}>
      {children || 'Label text here'}
    </Radiobutton>
  );
};

describe('disabled', () => {
  const DisabledRadiobutton = <Radio value="value" disabled={true} />;

  it('has "--disabled"-class', () => {
    const { container } = render(DisabledRadiobutton);
    expect(container.firstChild).toHaveClass('fi-radiobutton--disabled');
  });

  it('will add "disabled"-attribute for input', () => {
    const { getByRole } = render(DisabledRadiobutton);
    expect(getByRole('radio')).toHaveAttribute('disabled');
  });

  it('should match snapshot', () => {
    const { container } = render(DisabledRadiobutton);
    expect(container).toMatchSnapshot();
  });
});

describe('className', () => {
  const ClassnameRadiobutton = (
    <Radio value="value" className="custom-className" />
  );

  it('has the given custom className', () => {
    const { container } = render(ClassnameRadiobutton);
    expect(container.firstChild).toHaveClass('custom-className');
  });

  it('should match snapshot', () => {
    const { container } = render(ClassnameRadiobutton);
    expect(container).toMatchSnapshot();
  });
});

describe('name', () => {
  const NameRadiobutton = <Radio value="value" name="group-name" />;

  it('has the given "name"-attribute', () => {
    const { getByRole } = render(NameRadiobutton);
    expect(getByRole('radio')).toHaveAttribute('name', 'group-name');
  });

  it('should match snapshot', () => {
    const { container } = render(NameRadiobutton);
    expect(container).toMatchSnapshot();
  });
});

describe('value', () => {
  const ValueRadiobutton = <Radio value="option-value-1" />;

  it('has the given "value"-attribute', () => {
    const { getByRole } = render(ValueRadiobutton);
    expect(getByRole('radio')).toHaveAttribute('value', 'option-value-1');
  });

  it('should match snapshot', () => {
    const { container } = render(ValueRadiobutton);
    expect(container).toMatchSnapshot();
  });
});

describe('hintText', () => {
  const HintTextRadiobutton = (
    <Radio value="value" hintText="Example hint text" />
  );

  it('has element for hintText when prop is given', () => {
    const { getByText } = render(HintTextRadiobutton);
    const hintText = getByText('Example hint text');
    expect(hintText).toHaveClass('fi-radiobutton_hintText');
  });

  it('should match snapshot', () => {
    const { container } = render(HintTextRadiobutton);
    expect(container).toMatchSnapshot();
  });
});

describe('variant', () => {
  const VariantRadiobutton = <Radio value="value" variant="large" />;

  it('has "--large"-class when using large', () => {
    const { container } = render(VariantRadiobutton);
    expect(container.firstChild).toHaveClass('fi-radiobutton--large');
  });

  it('should match snapshot', () => {
    const { container } = render(VariantRadiobutton);
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
  const IdRadiobutton = <Radio value="value" id="good-id" />;

  it('has the given id', () => {
    const { getByRole } = render(IdRadiobutton);
    expect(getByRole('radio')).toHaveAttribute('id', 'good-id');
  });

  it('should match snapshot', () => {
    const { container } = render(IdRadiobutton);
    expect(container).toMatchSnapshot();
  });
});

describe('children', () => {
  const ChildrenRadiobutton = <Radio value="value">Option 1</Radio>;

  it('has the given children as label', () => {
    const { container } = render(ChildrenRadiobutton);
    const label = container.querySelector('label');
    expect(label?.textContent).toBe('Option 1');
  });

  it('should match snapshot', () => {
    const { container } = render(ChildrenRadiobutton);
    expect(container).toMatchSnapshot();
  });
});
