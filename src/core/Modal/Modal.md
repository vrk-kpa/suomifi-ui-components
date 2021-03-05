```js
import { useState } from 'react';
import {
  Modal,
  Button,
  Paragraph,
  Text
} from 'suomifi-ui-components';

const [visible, setVisible] = useState(false);

<>
  <Button
    onClick={() => {
      setVisible(!visible);
    }}
  >
    Open modal dialogue
  </Button>
  <Modal
    title="Test modal"
    primaryButtonLabel="OK"
    visible={visible}
    primaryButtonProps={{ onClick: () => setVisible(!visible) }}
    onEscKeyDown={() => setVisible(!visible)}
    style={{ height: '500px' }}
  >
    <Paragraph>
      <Text>
        I'm baby cold-pressed selfies edison bulb, hot chicken master
        cleanse hoodie tote bag 3 wolf moon yuccie shoreditch quinoa
        put a bird on it. XOXO lo-fi man bun raclette vice thundercats
        hoodie ethical godard master cleanse 8-bit chillwave
        church-key pok pok. Food truck beard bushwick four loko,
        flexitarian ugh mixtape tattooed jianbing tbh irony pitchfork
        small batch bitters. Hoodie DIY man braid kale chips,
        gochujang trust fund neutra edison bulb roof party
        single-origin coffee iceland. Direct trade heirloom cliche
        tote bag YOLO. Wolf mumblecore lumbersexual tattooed ethical
        authentic. Kale chips post-ironic sartorial ugh mustache
        helvetica fashion axe, vinyl wolf neutra jean shorts.
      </Text>
    </Paragraph>
  </Modal>
</>;
```
