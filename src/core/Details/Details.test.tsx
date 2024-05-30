import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Details } from './Details';
import { axeTest } from '../../utils/test';

describe('props', () => {
  describe('summaryLabel', () => {
    it('has summary component with given content', () => {
      const { getByText } = render(
        <Details summaryLabel="More information on benefits">
          More information
        </Details>,
      );
      const label = getByText('More information on benefits');
      expect(label.tagName).toBe('SUMMARY');
    });
  });
  describe('children', () => {
    it('has given content', () => {
      const { getByText } = render(
        <Details summaryLabel="More information on benefits">
          More information
        </Details>,
      );
      const content = getByText('More information');
      expect(content).toBeInTheDocument();
    });
    it('accepts varying content', () => {
      const { getByText } = render(
        <Details summaryLabel="More information on benefits">
          <h2>Heading</h2>
          <p>Paragraph</p>
        </Details>,
      );
      const heading = getByText('Heading');
      const paragraph = getByText('Paragraph');
      expect(heading).toBeInTheDocument();
      expect(paragraph).toBeInTheDocument();
    });
  });
  describe('className', () => {
    it('has given class', () => {
      const { container } = render(
        <Details summaryLabel="More information on benefits" className="test">
          More information
        </Details>,
      );
      const details = container.querySelector('.fi-details');
      expect(details).toHaveClass('test');
    });
  });
  describe('style', () => {
    it('has given style', () => {
      const { container } = render(
        <Details
          summaryLabel="More information on benefits"
          style={{ display: 'block' }}
        >
          More information
        </Details>,
      );
      const details = container.querySelector('.fi-details');
      expect(details).toHaveStyle('display: block');
    });
  });
  describe('onClick', () => {
    it('is called when details is clicked', () => {
      const onClick = jest.fn();
      const { container } = render(
        <Details summaryLabel="More information on benefits" onClick={onClick}>
          More information
        </Details>,
      );
      const details = container.getElementsByClassName('fi-details')[0];
      fireEvent.click(details);
      expect(onClick).toHaveBeenCalled();
    });
  });
  describe('open', () => {
    it('is open when true', () => {
      const { container } = render(
        <Details summaryLabel="More information on benefits" open>
          More information
        </Details>,
      );
      const details = container.getElementsByClassName('fi-details')[0];
      expect(details).toHaveAttribute('open');
    });
  });
});

describe('snapshot', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <Details summaryLabel="More information on benefits" open>
        More information
      </Details>,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('accessibility', () => {
  const TestDetails = (
    <Details summaryLabel="More information on benefits" open>
      More information
    </Details>
  );
  test('should not have basic accessibility issues', axeTest(TestDetails));
});
