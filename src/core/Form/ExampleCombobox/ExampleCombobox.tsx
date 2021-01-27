import React, { Component } from 'react';
import { HtmlDiv } from '../../../reset';
import { Combobox, ComboboxData } from '../Combobox/Combobox';

interface Product extends ComboboxData {
  name: string;
  price: number;
  tax: boolean;
}

const tools: Product[] = [
  {
    name: 'Jackhammer',
    price: 230,
    tax: false,
    labelText: 'Jackhammer',
    selected: false,
  },
  {
    name: 'Hammer',
    price: 15,
    tax: true,
    labelText: 'Hammer',
    selected: false,
  },
  {
    name: 'Sledgehammer',
    price: 36,
    tax: false,
    labelText: 'Sledgehammer',
    selected: false,
  },
  {
    name: 'Spade',
    price: 50,
    tax: true,
    labelText: 'Spade',
    selected: true,
  },
  {
    name: 'Powersaw',
    price: 150,
    tax: false,
    labelText: 'Powersaw',
    selected: true,
    disabled: true,
  },
];
export class ExampleCombobox extends Component {
  render() {
    return (
      <HtmlDiv>
        <Combobox
          labelText="Example of Combobox"
          items={tools}
          onItemSelectionsChange={(selectedItems) =>
            console.log('selected items:', selectedItems)
          }
        />
      </HtmlDiv>
    );
  }
}
