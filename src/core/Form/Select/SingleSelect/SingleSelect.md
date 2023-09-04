```js
import {
  SingleSelect,
  TextInput,
  Button
} from 'suomifi-ui-components';

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
  }
];

const defaultSelectedTool = {
  name: 'Rake',
  price: 50,
  tax: true,
  labelText: 'Rake',
  uniqueItemId: 'r09282626'
};

const [selectedValue, setSelectedValue] = React.useState(
  defaultSelectedTool
);

const [stateTools, setStateTools] = React.useState(tools);

const [status, setStatus] = React.useState('default');

const [key, setKey] = React.useState(22);

const inputRef = React.createRef();

<>
  <TextInput ref={inputRef} labelText="Array 0" />

  <Button
    onClick={() => {
      // stateTools[0].labelText = event.target.value;

      console.log(inputRef.current.value);

      const temp = stateTools[0];
      console.log(stateTools);

      temp.labelText = inputRef.current.value;
      temp.name = inputRef.current.value;
      // temp.uniqueId = Math.random().toString();

      const tempArr = [...stateTools];
      tempArr[0] = temp;

      setStateTools(tempArr);

      // setKey(key +1);
    }}
    type="submit"
  >
    Update array[0]
  </Button>

  <Button
    onClick={() => {
      const temp = stateTools[0];
      console.log(stateTools);

      const tempArr = [
        {
          name: 'Butter',
          price: 12,
          tax: true,
          labelText: 'Butter',
          uniqueItemId: '737ur23'
        },
        {
          name: 'Olive',
          price: 33,
          tax: false,
          labelText: 'Olive',
          uniqueItemId: 'jdh8382'
        }
      ];

      setStateTools(tempArr);

      // setKey(key +1);
    }}
    type="submit"
  >
    Change array
  </Button>

  <div>
    Value: {stateTools[0].labelText} id: {stateTools[0].uniqueId}
  </div>
  <SingleSelect
    // key={key}
    labelText="Tool"
    hintText="You can filter options by typing in the field"
    clearButtonLabel="Clear selection"
    items={stateTools}
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
