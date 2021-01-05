```js
import { FilterInput } from 'suomifi-ui-components';

const tools = [
  { name: 'Jackhammer', price: 230, tax: false },
  { name: 'Hammer', price: 15, tax: true },
  { name: 'Sledgehammer', price: 36, tax: false },
  { name: 'Spade', price: 50, tax: true },
  { name: 'Powersaw', price: 150, tax: false }
];
const [filteredItems, setFilteredItems] = React.useState(tools);

const filter = (tool, query) => {
  return tool.name.toLowerCase().includes(query.toLowerCase());
};

<>
  <div
    style={{
      height: 150,
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start'
    }}
  >
    <FilterInput
      labelAlign="left"
      labelText="Label"
      items={tools}
      onFiltering={(filtered) => setFilteredItems(filtered)}
      filterRule={filter}
    />

    <div>
      <ul>
        {filteredItems.map((item, index) => {
          if (item) {
            return <li key={index}>{item.name}</li>;
          } else {
            return { item };
          }
        })}
      </ul>
    </div>
  </div>
</>;
```
