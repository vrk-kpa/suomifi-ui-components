```js
import { Button } from 'suomifi-ui-components';
import React from 'react';

const exampleRef = React.createRef();

<>
  <Button
    className="my-button--test"
    onClick={() => console.log('Test button click')}
    type="submit"
  >
    Button
  </Button>

  <Button disabled fullWidth>
    Button disabled fullWidth
  </Button>
  <Button
    ref={exampleRef}
    onClick={() => {
      console.log(exampleRef.current);
    }}
  >
    Button with ref
  </Button>
</>;
```

```js
import { Button, Paragraph, Text } from 'suomifi-ui-components';

<>
  <Button
    aria-describedby="additional-info"
    aria-disabled={true}
    onClick={() => console.log('Test button click')}
    type="submit"
  >
    Aria-disabled button
  </Button>
  <Paragraph id="additional-info">
    <Text>Additional information for aria-disabled button</Text>
  </Paragraph>
</>;
```

```js
import { Button } from 'suomifi-ui-components';

<>
  <Button icon="login" aria-label="Login">
    Button icon="login" aria-label="Login"
  </Button>

  <Button iconRight="login" aria-labelledby="button-label">
    <span id="button-label">Login</span> iconRight="login"
    aria-labelledby="button-label"
  </Button>
</>;
```

```js
import { Button } from 'suomifi-ui-components';

<>
  <div example="inverted">
    <Button variant="inverted">Inverted Button </Button>

    <Button variant="inverted" disabled fullWidth icon="login">
      Inverted Button disabled fullWidth icon="login"
    </Button>
  </div>
</>;
```

```js
import { Button } from 'suomifi-ui-components';

<>
  <Button variant="secondary">Button</Button>

  <Button variant="secondary" icon="login">
    Secondary Button icon="login"
  </Button>

  <Button variant="secondary" disabled fullWidth icon="login">
    Secondary Button disabled fullWidth icon="login"
  </Button>

  <Button variant="secondaryNoborder">
    Borderless secondary Button
  </Button>

  <Button variant="secondaryNoborder" icon="login">
    Borderless secondary Button icon="login"
  </Button>

  <Button variant="secondaryNoborder" disabled icon="login">
    Borderless secondary Button disabled icon="login"
  </Button>
</>;
```

```js
import { Button } from 'suomifi-ui-components';

<>
  <Button variant="tertiary">Tertiary Button</Button>

  <Button variant="tertiary" disabled icon="login">
    Tertiary Button disabled icon="login"
  </Button>
</>;
```
