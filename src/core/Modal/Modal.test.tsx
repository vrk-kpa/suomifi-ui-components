import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../utils/test/axe';

import { Modal } from './Modal';

describe('Basic modal', () => {
  const BasicModal = (
    <Modal
      title="Test modal"
      primaryButtonLabel="OK"
      visible={true}
      style={{ height: '500px' }}
    >
      <p>
        Im baby cold-pressed selfies edison bulb, hot chicken master cleanse
        hoodie tote bag 3 wolf moon yuccie shoreditch quinoa put a bird on it.
        XOXO lo-fi man bun raclette vice thundercats hoodie ethical godard
        master cleanse 8-bit chillwave church-key pok pok. Food truck beard
        bushwick four loko, flexitarian ugh mixtape tattooed jianbing tbh irony
        pitchfork small batch bitters. Hoodie DIY man braid kale chips,
        gochujang trust fund neutra edison bulb roof party single-origin coffee
        iceland. Direct trade heirloom cliche tote bag YOLO. Wolf mumblecore
        lumbersexual tattooed ethical authentic. Kale chips post-ironic
        sartorial ugh mustache helvetica fashion axe, vinyl wolf neutra jean
        shorts.
      </p>
    </Modal>
  );
  it('should match snapshot', () => {
    const { container } = render(BasicModal);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', axeTest(BasicModal));
});
