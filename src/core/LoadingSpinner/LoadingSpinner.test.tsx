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

  describe('textAlign', () => {
    it('should apply styles based on given alignMent', () => {
      const textAlignLoadingSpinner = (
        <LoadingSpinner textAlign="right" text="Loading data" />
      );
      const { container } = render(textAlignLoadingSpinner);
      expect(container.firstChild).toHaveClass(
        'fi-loadingSpinner-textAlign--right',
      );
    });
  });

  describe('text', () => {
    it('should have given text content', () => {
      const TextLoadingSpinner = (
        <LoadingSpinner text="Loading data" className="custom-class" />
      );
      const { getByText } = render(TextLoadingSpinner);
      const text = getByText('Loading data');
      expect(text).toHaveClass('fi-loadingSpinner_text');
    });
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

    it('should have margin style overridden by style prop', async () => {
      const { container } = render(
        <LoadingSpinner text="Test" margin="xs" style={{ margin: 2 }} />,
      );
      expect(container.firstChild).toHaveAttribute('style', 'margin: 2px;');
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
    it('should not have any basuc accessibility issues', () => {
      const TestLoadingSpinner = <LoadingSpinner text="Loading data" />;
      axeTest(TestLoadingSpinner);
    });
  });
});
