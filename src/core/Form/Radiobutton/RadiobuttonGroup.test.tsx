import React from 'react';
import { render } from '@testing-library/react';
import { Radiobutton } from './Radiobutton';
import { RadiobuttonGroup } from './RadiobuttonGroup';

const RadioChildren = [1, 2, 3].map((value) => (
  <Radiobutton key={value} id={`test-id-${value}`} value={`${value}`}>
    {`Label text ${value}`}
  </Radiobutton>
));

describe('default, with only required props', () => {
  const DefaultGroup = (
    <RadiobuttonGroup id="test-id" label="Label" name="name">
      {RadioChildren}
    </RadiobuttonGroup>
  );

  it('should match snapshot', () => {
    const { container } = render(DefaultGroup);
    expect(container).toMatchSnapshot();
  });
});

describe('props', () => {
  describe('className', () => {
    const ClassnameGroup = (
      <RadiobuttonGroup
        id="test-id"
        label="Label"
        name="name"
        className="custom-className"
      >
        {RadioChildren}
      </RadiobuttonGroup>
    );

    it('has the given classname', () => {
      const { container } = render(ClassnameGroup);
      expect(container.firstChild).toHaveClass('custom-className');
    });

    it('should match snapshot', () => {
      const { container } = render(ClassnameGroup);
      expect(container).toMatchSnapshot();
    });
  });

  describe('hintText', () => {
    const HintTextGroup = (
      <RadiobuttonGroup
        id="test-id"
        label="Label"
        name="name"
        hintText="Example hint text"
      >
        {RadioChildren}
      </RadiobuttonGroup>
    );

    it('has hintText element', () => {
      const { getByText } = render(HintTextGroup);
      const hintText = getByText('Example hint text');
      expect(hintText).toHaveClass('fi-radiobuttongroup_hintText');
    });

    it('should match snapshot', () => {
      const { container } = render(HintTextGroup);
      expect(container).toMatchSnapshot();
    });
  });

  describe('label', () => {
    const LabelGroup = (
      <RadiobuttonGroup id="test-id" label="Label here" name="name">
        {RadioChildren}
      </RadiobuttonGroup>
    );

    it('has label element', () => {
      const { getByText } = render(LabelGroup);
      const label = getByText('Label here');
      expect(label).toHaveClass('fi-radiobuttongroup_label');
    });

    it('should match snapshot', () => {
      const { container } = render(LabelGroup);
      expect(container).toMatchSnapshot();
    });
  });

  describe('labelMode', () => {
    const LabelModeGroup = (
      <RadiobuttonGroup
        id="test-id"
        label="Label here"
        name="name"
        labelMode="hidden"
      >
        {RadioChildren}
      </RadiobuttonGroup>
    );

    it('has visually hidden label element', () => {
      const { getByText } = render(LabelModeGroup);
      const label = getByText('Label here');
      expect(label).toHaveClass('fi-visually-hidden');
    });

    it('should match snapshot', () => {
      const { container } = render(LabelModeGroup);
      expect(container).toMatchSnapshot();
    });
  });

  describe('id', () => {
    const IdGroup = (
      <RadiobuttonGroup id="good-id" label="Label" name="name">
        {RadioChildren}
      </RadiobuttonGroup>
    );

    it('has the given id', () => {
      const { container } = render(IdGroup);
      expect(container.firstChild).toHaveAttribute('id', 'good-id');
    });

    it('should match snapshot', () => {
      const { container } = render(IdGroup);
      expect(container).toMatchSnapshot();
    });
  });

  describe('name', () => {
    const NameGroup = (
      <RadiobuttonGroup id="test-id" label="Label" name="nice-name">
        {RadioChildren}
      </RadiobuttonGroup>
    );

    it('has children, which all have the given name', () => {
      const { getAllByRole } = render(NameGroup);
      const radios = getAllByRole('radio');
      radios.map((radio) => expect(radio).toHaveAttribute('name', 'nice-name'));
    });

    it('should match snapshot', () => {
      const { container } = render(NameGroup);
      expect(container).toMatchSnapshot();
    });
  });

  describe('value', () => {
    const ValueGroup = (
      <RadiobuttonGroup id="test-id" label="Label" name="name" value="2">
        {RadioChildren}
      </RadiobuttonGroup>
    );

    it('has the correct radio selected', () => {
      const { container, rerender } = render(ValueGroup);
      const radiobuttons = container.querySelectorAll('.fi-radiobutton');
      expect(radiobuttons[0]).not.toHaveClass('fi-radiobutton--checked');
      expect(radiobuttons[1]).toHaveClass('fi-radiobutton--checked');
      expect(radiobuttons[2]).not.toHaveClass('fi-radiobutton--checked');

      rerender(
        <RadiobuttonGroup id="test-id" label="Label" name="name" value="3">
          {RadioChildren}
        </RadiobuttonGroup>,
      );

      expect(radiobuttons[0]).not.toHaveClass('fi-radiobutton--checked');
      expect(radiobuttons[1]).not.toHaveClass('fi-radiobutton--checked');
      expect(radiobuttons[2]).toHaveClass('fi-radiobutton--checked');
    });

    it('should match snapshot', () => {
      const { container } = render(ValueGroup);
      expect(container).toMatchSnapshot();
    });
  });

  describe('defaultValue', () => {
    const DefaultValueGroup = (
      <RadiobuttonGroup id="test-id" label="Label" name="name" defaultValue="3">
        {RadioChildren}
      </RadiobuttonGroup>
    );

    it('has the correct radio selected by default', () => {
      const { container } = render(DefaultValueGroup);
      const radiobuttons = container.querySelectorAll('.fi-radiobutton');
      expect(radiobuttons[0]).not.toHaveClass('fi-radiobutton--checked');
      expect(radiobuttons[1]).not.toHaveClass('fi-radiobutton--checked');
      expect(radiobuttons[2]).toHaveClass('fi-radiobutton--checked');
    });

    it('should match snapshot', () => {
      const { container } = render(DefaultValueGroup);
      expect(container).toMatchSnapshot();
    });
  });
});
