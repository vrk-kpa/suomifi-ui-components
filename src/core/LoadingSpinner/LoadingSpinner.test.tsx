import React from 'react';
import { render } from '@testing-library/react';
import { LoadingSpinner } from './LoadingSpinner';
import { axeTest } from '../../utils/test';

describe('props', () => {
  describe('labelMode should be visually-hidden', () => {
    const { getByText } = render(
      <LoadingSpinner labelText="To be hidden" labelMode="hidden" />,
    );
    const spinner = getByText('To be hidden');
    expect(spinner).toHaveClass('fi-visually-hidden');
  });
  describe('id', () => {
    const LoadingSpinnerWithElementId = (
      <LoadingSpinner id="TestId" labelText="Loading data" />
    );
    const { container } = render(LoadingSpinnerWithElementId);
    expect(container.querySelector('#TestId')).toHaveClass('fi-loadingSpinner');
  });
  it('labelAlign', () => {
    const labelAlignLoadingSpinner = (
      <LoadingSpinner labelAlign="right" labelText="Loading data" />
    );
    const { container } = render(labelAlignLoadingSpinner);
    expect(container.firstChild).toHaveClass(
      'fi-loadingSpinner-labelAlign--right',
    );
  });
  describe('className', () => {
    const customClassLoadingSpinner = (
      <LoadingSpinner labelText="Loading data" className="custom-class" />
    );

    it('contains base classname', () => {
      const { container } = render(customClassLoadingSpinner);
      expect(container.firstChild).toHaveClass('fi-loadingSpinner');
    });

    it('contains custom classname', () => {
      const { container } = render(customClassLoadingSpinner);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
  it('labelText', () => {
    const LabelTextLoadingSpinner = (
      <LoadingSpinner labelText="Loading data" className="custom-class" />
    );
    const { getByText } = render(LabelTextLoadingSpinner);
    const label = getByText('Loading data');
    expect(label).toHaveClass('fi-loadingSpinner_label');
  });
});
describe('snapshot', () => {
  const TestLoadingSpinner = <LoadingSpinner labelText="Loading data" />;
  it('should match snapshot', () => {
    const { container } = render(TestLoadingSpinner);
    expect(container).toMatchSnapshot();
  });
});
describe('accessibility', () => {
  const TestLoadingSpinner = <LoadingSpinner labelText="Loading data" />;
  test(
    'should not have basic accessibility issues',
    axeTest(TestLoadingSpinner),
  );
});
