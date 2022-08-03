```js
import { MultiSelect } from 'suomifi-ui-components';

const tools = [
  {
    name: 'Jackhammer',
    price: 230,
    tax: false,
    labelText: 'Jackhammer',
    uniqueItemId: 'jh2435626'
  },
  {
    name: 'Hammer',
    price: 15,
    tax: true,
    labelText: 'Hammer',
    uniqueItemId: 'h9823523'
  },
  {
    name: 'Sledgehammer',
    price: 36,
    tax: false,
    labelText: 'Sledgehammer',
    uniqueItemId: 'sh908293482'
  },
  {
    name: 'Spade',
    price: 50,
    tax: true,
    labelText: 'Spade',
    uniqueItemId: 's82502335'
  },
  {
    name: 'Powersaw',
    price: 150,
    tax: false,
    labelText: 'Powersaw',
    disabled: true,
    uniqueItemId: 'ps9081231'
  },
  {
    name: 'Shovel',
    price: 115,
    tax: true,
    labelText: 'Shovel',
    uniqueItemId: 's05111511'
  },
  {
    name: 'Iron stick',
    price: 85,
    tax: false,
    labelText: 'Iron stick',
    uniqueItemId: 'is3451261'
  },
  {
    name: 'Rake',
    price: 50,
    tax: true,
    labelText: 'Rake',
    uniqueItemId: 'r09282626'
  },
  {
    name: 'Motorsaw',
    price: 450,
    tax: false,
    labelText: 'Motorsaw',
    disabled: true,
    uniqueItemId: 'ms6126266'
  }
];

const defaultSelectedTools = [
  {
    name: 'Hammer',
    price: 15,
    tax: true,
    labelText: 'Hammer',
    uniqueItemId: 'h9823523'
  },
  {
    name: 'Powersaw',
    price: 150,
    tax: false,
    labelText: 'Powersaw',
    disabled: true,
    uniqueItemId: 'ps9081231'
  }
];

<>
  <MultiSelect
    labelText="Tools"
    hintText="You can filter options by typing in the field"
    items={tools}
    chipListVisible={true}
    ariaChipActionLabel="Remove"
    removeAllButtonLabel="Remove all selections"
    visualPlaceholder="Choose your tools"
    noItemsText="No items"
    defaultSelectedItems={defaultSelectedTools}
    ariaSelectedAmountText="tools selected"
    ariaOptionsAvailableText="options available"
    ariaOptionChipRemovedText="removed"
  />
</>;
```

### Allowing user to add their own items to the list

```js
import { MultiSelect } from 'suomifi-ui-components';

const tools = [
  {
    name: 'Jackhammer',
    price: 230,
    tax: false,
    labelText: 'Jackhammer',
    uniqueItemId: 'jh2435626'
  },
  {
    name: 'Hammer',
    price: 15,
    tax: true,
    labelText: 'Hammer',
    uniqueItemId: 'h9823523'
  },
  {
    name: 'Sledgehammer',
    price: 36,
    tax: false,
    labelText: 'Sledgehammer',
    uniqueItemId: 'sh908293482'
  },
  {
    name: 'Spade',
    price: 50,
    tax: true,
    labelText: 'Spade',
    uniqueItemId: 's82502335'
  },
  {
    name: 'Powersaw',
    price: 150,
    tax: false,
    labelText: 'Powersaw',
    disabled: true,
    uniqueItemId: 'ps9081231'
  },
  {
    name: 'Shovel',
    price: 115,
    tax: true,
    labelText: 'Shovel',
    uniqueItemId: 's05111511'
  },
  {
    name: 'Iron stick',
    price: 85,
    tax: false,
    labelText: 'Iron stick',
    uniqueItemId: 'is3451261'
  },
  {
    name: 'Rake',
    price: 50,
    tax: true,
    labelText: 'Rake',
    uniqueItemId: 'r09282626'
  },
  {
    name: 'Motorsaw',
    price: 450,
    tax: false,
    labelText: 'Motorsaw',
    disabled: true,
    uniqueItemId: 'ms6126266'
  }
];

const defaultSelectedTools = [
  {
    name: 'Hammer',
    price: 15,
    tax: true,
    labelText: 'Hammer',
    uniqueItemId: 'h9823523'
  },
  {
    name: 'Powersaw',
    price: 150,
    tax: false,
    labelText: 'Powersaw',
    disabled: true,
    uniqueItemId: 'ps9081231'
  }
];

<MultiSelect
  allowItemAddition={true}
  itemAdditionHelpText="Add custom item"
  labelText="Tools"
  hintText="You can filter options by typing in the field"
  items={tools}
  chipListVisible={true}
  ariaChipActionLabel="Remove"
  removeAllButtonLabel="Remove all selections"
  visualPlaceholder="Choose your tools"
  defaultSelectedItems={defaultSelectedTools}
  ariaSelectedAmountText="tools selected"
  ariaOptionsAvailableText="options available"
  ariaOptionChipRemovedText="removed"
/>;
```

### Controlled

```js
const [selectedAnimals, setSelectedAnimals] = React.useState([]);
const animals = [
  {
    age: 2,
    labelText: 'Rabbit',
    uniqueItemId: 'rabbit-123'
  },
  {
    age: 1,
    labelText: 'Snail',
    uniqueItemId: 'snail-321'
  },
  {
    price: 5,
    labelText: 'Turtle',
    uniqueItemId: 'turtle-987'
  }
];

<>
  <MultiSelect
    items={animals}
    selectedItems={selectedAnimals}
    labelText="Animals"
    hintText="You can filter options by typing in the field"
    noItemsText="No animals"
    chipListVisible={true}
    visualPlaceholder="Try to choose animals"
    ariaChipActionLabel="Remove"
    ariaSelectedAmountText="animals selected"
    ariaOptionsAvailableText="options available"
    ariaOptionChipRemovedText="removed"
  />

  <span>There can be only one!</span>
  <button
    onClick={() =>
      setSelectedAnimals([
        { labelText: 'Turtle', uniqueItemId: 'turtle-987' }
      ])
    }
  >
    Turtle
  </button>
  <button
    onClick={() =>
      setSelectedAnimals([
        { labelText: 'Rabbit', uniqueItemId: 'rabbit-123' }
      ])
    }
  >
    Rabbit
  </button>
  <button
    onClick={() =>
      setSelectedAnimals([
        { labelText: 'Snail', uniqueItemId: 'snail-321' }
      ])
    }
  >
    Snail
  </button>
</>;
```

### Controlled + allowing user to add a custom options

```js
import { MultiSelect } from 'suomifi-ui-components';

const animals = [
  {
    age: 2,
    labelText: 'Rabbit',
    uniqueItemId: 'rabbit-123'
  },
  {
    age: 1,
    labelText: 'Snail',
    uniqueItemId: 'snail-321'
  },
  {
    price: 5,
    labelText: 'Turtle',
    uniqueItemId: 'turtle-987'
  }
];
const [appendedAnimals, setAppendedAnimals] = React.useState(animals);
const [selectedAnimals, setSelectedAnimals] = React.useState([]);

const handleSelection = (newSelectedItems) => {
  const userAddedAnimals = newSelectedItems.filter((nsi) =>
    animals.every(
      (animal) => animal.uniqueItemId !== nsi.uniqueItemId
    )
  );
  setAppendedAnimals(animals.concat(userAddedAnimals));
  setSelectedAnimals(newSelectedItems);
};

<MultiSelect
  allowItemAddition={true}
  itemAdditionHelpText="Add custom item"
  items={appendedAnimals}
  selectedItems={selectedAnimals}
  labelText="Animals"
  hintText="You can filter options by typing in the field. You can also add a custom options if no suitable match is found in the list."
  chipListVisible={true}
  visualPlaceholder="Choose animals"
  removeAllButtonLabel="Remove all selections"
  ariaChipActionLabel="Remove"
  ariaSelectedAmountText="animals selected"
  ariaOptionsAvailableText="options available"
  ariaOptionChipRemovedText="removed"
  onItemSelectionsChange={(selectedItems) =>
    handleSelection(selectedItems)
  }
/>;
```

### Disabled

```js
import { MultiSelect } from 'suomifi-ui-components';

const foods = [
  {
    labelText: 'Pizza',
    uniqueItemId: 'pizza-123'
  },
  {
    labelText: 'Burger',
    uniqueItemId: 'burger-321'
  }
];

<MultiSelect
  disabled={true}
  items={foods}
  labelText="Food"
  visualPlaceholder="Selection disabled"
  ariaSelectedAmountText="items selected"
  ariaOptionsAvailableText="options available"
  ariaOptionChipRemovedText="removed"
/>;
```

### Using functions for template literals

```js
import { MultiSelect } from 'suomifi-ui-components';

const foods = [
  {
    labelText: 'Pizza',
    uniqueItemId: 'pizza-123'
  },
  {
    labelText: 'Burger',
    uniqueItemId: 'burger-321'
  }
];

const defaultSelectedTools = [
  {
    labelText: 'Pizza',
    uniqueItemId: 'pizza-123'
  },
  {
    labelText: 'Burger',
    uniqueItemId: 'burger-321'
  }
];

<>
  <MultiSelect
    items={foods}
    chipListVisible={true}
    ariaChipActionLabel="Remove"
    removeAllButtonLabel="Remove all selections"
    visualPlaceholder="Choose your foods"
    noItemsText="No items"
    defaultSelectedItems={defaultSelectedTools}
    ariaSelectedAmountText="foods selected"
    ariaOptionsAvailableTextFunction={(lenght) =>
      `there are ${lenght} options`
    }
    ariaOptionChipRemovedTextFunction={(option) =>
      `removed option ${option} from selected`
    }
  />
</>;
```
