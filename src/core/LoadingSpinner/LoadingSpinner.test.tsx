import React from 'react';
import { render } from '@testing-library/react';
import { LoadingSpinner } from './LoadingSpinner';
import { axeTest } from '../../utils/test';

describe('props', () => {
  describe('textVisibility should be visually-hidden', () => {
    const { getByText } = render(
      <LoadingSpinner text="To be hidden" textVisibility="hidden" />,
    );
    const spinner = getByText('To be hidden');
    expect(spinner).toHaveClass('fi-visually-hidden');
  });
  describe('id', () => {
    const LoadingSpinnerWithElementId = (
      <LoadingSpinner id="TestId" text="Loading data" />
    );
    const { container } = render(LoadingSpinnerWithElementId);
    expect(container.querySelector('#TestId')).toHaveClass('fi-loadingSpinner');
  });
  it('textAlign', () => {
    const textAlignLoadingSpinner = (
      <LoadingSpinner textAlign="right" text="Loading data" />
    );
    const { container } = render(textAlignLoadingSpinner);
    expect(container.firstChild).toHaveClass(
      'fi-loadingSpinner-textAlign--right',
    );
  });
  describe('className', () => {
    const customClassLoadingSpinner = (
      <LoadingSpinner text="Loading data" className="custom-class" />
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
  describe('margin', () => {
    it('should have margin style from margin prop', () => {
      const { container } = render(<LoadingSpinner text="Test" margin="xs" />);
      expect(container.firstChild).toHaveAttribute('style', 'margin: 10px;');
    });
  });
  it('text', () => {
    const TextLoadingSpinner = (
      <LoadingSpinner text="Loading data" className="custom-class" />
    );
    const { getByText } = render(TextLoadingSpinner);
    const text = getByText('Loading data');
    expect(text).toHaveClass('fi-loadingSpinner_text');
  });
});
describe('snapshot', () => {
  const TestLoadingSpinner = <LoadingSpinner text="Loading data" />;
  it('should match snapshot', () => {
    const { container } = render(TestLoadingSpinner);
    expect(container).toMatchSnapshot();
  });
});
describe('accessibility', () => {
  const TestLoadingSpinner = <LoadingSpinner text="Loading data" />;
  test(
    'should not have basic accessibility issues',
    axeTest(TestLoadingSpinner),
  );
});
