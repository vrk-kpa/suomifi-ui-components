import React from 'react';
import { render } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

const CheckboxChilds = [1, 2, 3].map((value) => (
  <Checkbox key={value} id={`test-id-${value}`}>
    {`Label text ${value}`}
  </Checkbox>
));

describe('default, with only required props', () => {
  const DefaultGroup = (
    <CheckboxGroup labelText="Label">{CheckboxChilds}</CheckboxGroup>
  );

  it('should match snapshot', () => {
    const { container } = render(DefaultGroup);
    expect(container).toMatchSnapshot();
  });
});

describe('props', () => {
  describe('className', () => {
    const ClassNameGroup = (
      <CheckboxGroup labelText="Label" className="custom-className">
        {CheckboxChilds}
      </CheckboxGroup>
    );
    it('has the default className', () => {
      const { container } = render(ClassNameGroup);
      expect(container.firstChild).toHaveClass('fi-checkbox-group');
    });
    it('has the given className', () => {
      const { container } = render(ClassNameGroup);
      expect(container.firstChild).toHaveClass('custom-className');
    });
  });

  describe('groupHintText', () => {
    const HintTextGroup = (
      <CheckboxGroup labelText="Label" groupHintText="Example hint text">
        {CheckboxChilds}
      </CheckboxGroup>
    );

    it('has hintText element', () => {
      const { getByText } = render(HintTextGroup);
      const hintText = getByText('Example hint text');
      expect(hintText).toHaveClass('fi-hint-text');
    });
  });

  describe('id', () => {
    const IdGroup = (
      <CheckboxGroup labelText="Label" id="nice-id">
        {CheckboxChilds}
      </CheckboxGroup>
    );

    it('has the given id', () => {
      const { container } = render(IdGroup);
      expect(container.firstChild).toHaveAttribute('id', 'nice-id');
    });
  });

  describe('labelMode', () => {
    const LabelModeGroup = (
      <CheckboxGroup labelText="Label" labelMode="hidden">
        {CheckboxChilds}
      </CheckboxGroup>
    );

    it('has visually hidden label element', () => {
      const { getByText } = render(LabelModeGroup);
      const label = getByText('Label');
      expect(label).toHaveClass('fi-visually-hidden');
    });
  });

  describe('labelText', () => {
    const LabelTextGroup = (
      <CheckboxGroup labelText="Label">{CheckboxChilds}</CheckboxGroup>
    );

    it('has label element', () => {
      const { getByText } = render(LabelTextGroup);
      const label = getByText('Label');
      expect(label).not.toEqual(null);
    });
  });

  describe('optionalText', () => {
    const OptionalTextGroup = (
      <CheckboxGroup labelText="Label" optionalText="optional">
        {CheckboxChilds}
      </CheckboxGroup>
    );

    it('has optional text element', () => {
      const { getByText } = render(OptionalTextGroup);
      const optionalText = getByText('(optional)');
      expect(optionalText).not.toEqual(null);
    });
  });
});
