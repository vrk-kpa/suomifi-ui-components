import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { RadioButton } from './RadioButton';
import { RadioButtonGroup } from './RadioButtonGroup';

const RadioChildren = [1, 2, 3].map((value) => (
  <RadioButton key={value} id={`test-id-${value}`} value={`${value}`}>
    {`Label text ${value}`}
  </RadioButton>
));

describe('default, with only required props', () => {
  const DefaultGroup = (
    <RadioButtonGroup id="test-id" labelText="Label" name="name">
      {RadioChildren}
    </RadioButtonGroup>
  );

  it('should match snapshot', () => {
    const { container } = render(DefaultGroup);
    expect(container).toMatchSnapshot();
  });
});

describe('props', () => {
  describe('className', () => {
    const ClassnameGroup = (
      <RadioButtonGroup
        id="test-id"
        labelText="Label"
        name="name"
        className="custom-className"
      >
        {RadioChildren}
      </RadioButtonGroup>
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
      <RadioButtonGroup
        id="test-id"
        labelText="Label"
        name="name"
        groupHintText="Example hint text"
      >
        {RadioChildren}
      </RadioButtonGroup>
    );

    it('has hintText element', () => {
      const { getByText } = render(HintTextGroup);
      const hintText = getByText('Example hint text');
      expect(hintText).toHaveClass('fi-hint-text');
    });

    it('should match snapshot', () => {
      const { container } = render(HintTextGroup);
      expect(container).toMatchSnapshot();
    });
  });

  describe('label', () => {
    const LabelGroup = (
      <RadioButtonGroup id="test-id" labelText="Label here" name="name">
        {RadioChildren}
      </RadioButtonGroup>
    );

    it('has label element', () => {
      const { getByText } = render(LabelGroup);
      const label = getByText('Label here');
      expect(label).not.toEqual(null);
    });

    it('should match snapshot', () => {
      const { container } = render(LabelGroup);
      expect(container).toMatchSnapshot();
    });
  });

  describe('labelMode', () => {
    const LabelModeGroup = (
      <RadioButtonGroup
        id="test-id"
        labelText="Label here"
        name="name"
        labelMode="hidden"
      >
        {RadioChildren}
      </RadioButtonGroup>
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
      <RadioButtonGroup id="good-id" labelText="Label" name="name">
        {RadioChildren}
      </RadioButtonGroup>
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
      <RadioButtonGroup id="test-id" labelText="Label" name="nice-name">
        {RadioChildren}
      </RadioButtonGroup>
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
      <RadioButtonGroup id="test-id" labelText="Label" name="name" value="2">
        {RadioChildren}
      </RadioButtonGroup>
    );

    it('has the correct radio selected', () => {
      const { container, rerender } = render(ValueGroup);
      const radioButtons = container.querySelectorAll('.fi-radio-button');
      expect(radioButtons[0]).not.toHaveClass('fi-radio-button--checked');
      expect(radioButtons[1]).toHaveClass('fi-radio-button--checked');
      expect(radioButtons[2]).not.toHaveClass('fi-radio-button--checked');

      rerender(
        <RadioButtonGroup id="test-id" labelText="Label" name="name" value="3">
          {RadioChildren}
        </RadioButtonGroup>,
      );

      expect(radioButtons[0]).not.toHaveClass('fi-radio-button--checked');
      expect(radioButtons[1]).not.toHaveClass('fi-radio-button--checked');
      expect(radioButtons[2]).toHaveClass('fi-radio-button--checked');
    });

    it('controlled state persists when unchecked radio is clicked', () => {
      const { getAllByRole } = render(ValueGroup);
      const radioButtons = getAllByRole('radio') as HTMLInputElement[];
      fireEvent.click(radioButtons[0]);
      expect(radioButtons[0].checked).toBe(false);
    });

    it('should match snapshot', () => {
      const { container } = render(ValueGroup);
      expect(container).toMatchSnapshot();
    });
  });

  describe('defaultValue', () => {
    const DefaultValueGroup = (
      <RadioButtonGroup
        id="test-id"
        labelText="Label"
        name="name"
        defaultValue="3"
      >
        {RadioChildren}
      </RadioButtonGroup>
    );

    it('has the correct radio selected by default', () => {
      const { container } = render(DefaultValueGroup);
      const radioButtons = container.querySelectorAll('.fi-radio-button');
      expect(radioButtons[0]).not.toHaveClass('fi-radio-button--checked');
      expect(radioButtons[1]).not.toHaveClass('fi-radio-button--checked');
      expect(radioButtons[2]).toHaveClass('fi-radio-button--checked');
    });

    it('should match snapshot', () => {
      const { container } = render(DefaultValueGroup);
      expect(container).toMatchSnapshot();
    });
  });
});
