import React from 'react';
import { storiesOf } from '@storybook/react';
declare module '@storybook/react' {
  export interface Story {
    addWithJSX(storyName: string, callback: RenderFunction): this;
  }
}

import Button from './Button';
import { withInfo } from '@storybook/addon-info';

storiesOf('Components/Button', module).addWithJSX(
  'basic Button',
  withInfo({
    inline: true,
    source: false,
    text: `

  ### Notes

  This is a button

  ### Usage
  ~~~js
  <Button>Hello</Button>
  ~~~`,
  })(() => <Button>Button</Button>),
);
