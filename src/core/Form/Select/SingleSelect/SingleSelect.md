```js
import { SingleSelect } from 'suomifi-ui-components';

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

const defaultSelectedTool = {
  name: 'Hammer',
  price: 15,
  tax: true,
  labelText: 'Hammer',
  uniqueItemId: 'h9823523'
};

const [selectedValue, setSelectedValue] = React.useState(
  defaultSelectedTool
);
const [status, setStatus] = React.useState('default');

<>
  <SingleSelect
    labelText="Tool"
    hintText="You can filter options by typing in the field"
    clearButtonLabel="Clear selection"
    items={tools}
    visualPlaceholder="Choose a tool"
    noItemsText="No matching options"
    defaultSelectedItem={defaultSelectedTool}
    ariaOptionsAvailableText="Options available"
    onItemSelectionChange={(item) => {
      setSelectedValue(item);
    }}
    onBlur={() => {
      if (!selectedValue) {
        setStatus('error');
      } else {
        setStatus('default');
      }
    }}
    status={status}
    statusText={status === 'error' ? 'You must select a tool.' : ''}
  />
</>;
```

### Allowing user to add their own item to the list

```js
import { SingleSelect } from 'suomifi-ui-components';

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

const [selectedValue, setSelectedValue] = React.useState(null);
const [status, setStatus] = React.useState('default');

<>
  <SingleSelect
    labelText="Tool"
    hintText="You can filter options by typing in the field. You can also add a custom option if no suitable match is found in the list."
    clearButtonLabel="Clear selection"
    items={tools}
    visualPlaceholder="Choose a tool"
    ariaOptionsAvailableText="Options available"
    allowItemAddition={true}
    itemAdditionHelpText="Add custom item"
  />
</>;
```

### Controlled

```js
import { SingleSelect } from 'suomifi-ui-components';
const [selectedAnimal, setSelectedAnimal] = React.useState(null);
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
  <SingleSelect
    labelText="Animal"
    hintText="You can filter options by typing in the field"
    clearButtonLabel="Clear selection"
    items={animals}
    selectedItem={selectedAnimal}
    noItemsText="No matching options"
    visualPlaceholder="Try to choose animal"
    ariaOptionsAvailableText="Options available"
  />

  <span>There can be only one!</span>
  <button
    onClick={() =>
      setSelectedAnimal({
        labelText: 'Turtle',
        uniqueItemId: 'turtle-987'
      })
    }
  >
    Turtle
  </button>
  <button
    onClick={() =>
      setSelectedAnimal({
        labelText: 'Rabbit',
        uniqueItemId: 'rabbit-123'
      })
    }
  >
    Rabbit
  </button>
  <button
    onClick={() =>
      setSelectedAnimal({
        labelText: 'Snail',
        uniqueItemId: 'snail-321'
      })
    }
  >
    Snail
  </button>
</>;
```

### Controlled + allowing custom option to be added

```js
import { SingleSelect } from 'suomifi-ui-components';

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
const [selectedAnimal, setSelectedAnimal] = React.useState(null);

const handleSelection = (newSelectedItem) => {
  if (newSelectedItem !== null) {
    const animalIsNew = !animals.some(
      (animal) => animal.uniqueItemId === newSelectedItem.uniqueItemId
    );
    if (animalIsNew) {
      setAppendedAnimals(animals.concat([newSelectedItem]));
    } else {
      setAppendedAnimals(animals);
    }
  } else {
    setAppendedAnimals(animals);
  }
  setSelectedAnimal(newSelectedItem);
};

<SingleSelect
  allowItemAddition={true}
  itemAdditionHelpText="Add custom item"
  labelText="Animal"
  hintText="You can filter options by typing in the field. You can also add a custom option if no suitable match is found in the list."
  clearButtonLabel="Clear selection"
  items={appendedAnimals}
  selectedItem={selectedAnimal}
  noItemsText="No matching options"
  visualPlaceholder="Choose animal"
  ariaOptionsAvailableText="Options available"
  onItemSelectionChange={(item) => {
    handleSelection(item);
  }}
/>;
```

### Disabled with a preselected value

```js
import { SingleSelect } from 'suomifi-ui-components';
const foods = [
  {
    labelText: 'Pizza',
    uniqueItemId: 'pizza-123'
  },
  {
    labelText: 'Burger',
    uniqueItemId: 'burger-123'
  }
];
const defaultSelectedFood = {
  labelText: 'Pizza',
  uniqueItemId: 'pizza-123'
};

<>
  <SingleSelect
    disabled={true}
    labelText="Food"
    clearButtonLabel="Clear selection"
    items={foods}
    selectedItem={defaultSelectedFood}
    noItemsText="No matching options"
    ariaOptionsAvailableText="Options available"
  />
</>;
```

### SingleSelect with a tooltip

```js
import {
  SingleSelect,
  Tooltip,
  Heading,
  Text
} from 'suomifi-ui-components';
const foods = [
  {
    labelText: 'Pizza',
    uniqueItemId: 'pizza-123'
  },
  {
    labelText: 'Burger',
    uniqueItemId: 'burger-123'
  }
];
const defaultSelectedFood = {
  labelText: 'Pizza',
  uniqueItemId: 'pizza-123'
};

const labelText = 'Food';

<>
  <SingleSelect
    labelText={labelText}
    clearButtonLabel="Clear selection"
    items={foods}
    selectedItem={defaultSelectedFood}
    noItemsText="No matching options"
    ariaOptionsAvailableText="Options available"
    tooltipComponent={
      <Tooltip
        ariaToggleButtonLabelText={`${labelText}, additional information`}
        ariaCloseButtonLabelText={`${labelText}, close additional information`}
      >
        <Heading variant="h5" as="h2">
          Food
        </Heading>
        <Text>Choose your favorite food with great care</Text>
      </Tooltip>
    }
  />
</>;
```
