import React from 'react';
import { render } from '@testing-library/react';
import { Radiobutton } from './Radiobutton';
import { RadiobuttonGroup } from './RadiobuttonGroup';

const RadioChildren = [1, 2, 3].map((value) => (
  <Radiobutton key={value} id={`test-id-${value}`}>
    {`Label text ${value}`}
  </Radiobutton>
));

describe('className', () => {
  it('has the given classname', () => {
    const { container } = render(
      <RadiobuttonGroup
        id="test-id"
        label="Label"
        name="name"
        className="custom-className"
      >
        {RadioChildren}
      </RadiobuttonGroup>,
    );
    expect(container.firstChild).toHaveClass('custom-className');
  });
});

describe('hintText', () => {
  it('has hintText element', () => {
    const { getByText } = render(
      <RadiobuttonGroup
        id="test-id"
        label="Label"
        name="name"
        hintText="Example hint text"
      >
        {RadioChildren}
      </RadiobuttonGroup>,
    );
    const hintText = getByText('Example hint text');
    expect(hintText).toHaveClass('fi-radiobuttongroup_hintText');
  });
});

describe('label', () => {
  it('has label element', () => {
    const { getByText } = render(
      <RadiobuttonGroup id="test-id" label="Label here" name="name">
        {RadioChildren}
      </RadiobuttonGroup>,
    );
    const label = getByText('Label here');
    expect(label).toHaveClass('fi-radiobuttongroup_label');
  });
});

describe('labelMode', () => {
  it('has visually hidden label element', () => {
    const { getByText } = render(
      <RadiobuttonGroup
        id="test-id"
        label="Label here"
        name="name"
        labelMode="hidden"
      >
        {RadioChildren}
      </RadiobuttonGroup>,
    );
    const label = getByText('Label here');
    expect(label).toHaveClass('fi-visually-hidden');
  });
});

describe('id', () => {
  it('has the given id', () => {
    const { container } = render(
      <RadiobuttonGroup id="good-id" label="Label" name="name">
        {RadioChildren}
      </RadiobuttonGroup>,
    );
    expect(container.firstChild).toHaveAttribute('id', 'good-id');
  });
});

describe('name', () => {
  it('has children, which all have the given name', () => {
    const { getAllByRole } = render(
      <RadiobuttonGroup id="test-id" label="Label" name="nice-name">
        {RadioChildren}
      </RadiobuttonGroup>,
    );
    const radios = getAllByRole('radio');
    radios.map((radio) => expect(radio).toHaveAttribute('name', 'nice-name'));
  });
});
