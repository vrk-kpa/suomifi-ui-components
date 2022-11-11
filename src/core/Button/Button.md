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
import { IconLogin } from 'suomifi-icons/baseIcons';

<>
  <Button icon={<IconLogin />} aria-label="Login">
    Button icon="login" aria-label="Login"
  </Button>

  <Button iconRight={<IconLogin />} aria-labelledby="button-label">
    <span id="button-label">Login</span> iconRight="login"
    aria-labelledby="button-label"
  </Button>
</>;
```

```js
import { Button } from 'suomifi-ui-components';
import { IconLogin } from 'suomifi-icons/baseIcons';

<>
  <div example="inverted">
    <Button variant="inverted">Inverted Button </Button>

    <Button
      variant="inverted"
      disabled
      fullWidth
      icon={<IconLogin />}
    >
      Inverted Button disabled fullWidth icon="login"
    </Button>
  </div>
</>;
```

```js
import { Button } from 'suomifi-ui-components';
import { IconLogin } from 'suomifi-icons/baseIcons';

<>
  <Button variant="secondary">Button</Button>

  <Button variant="secondary" icon={<IconLogin />}>
    Secondary Button icon="login"
  </Button>

  <Button variant="secondary" disabled fullWidth icon={<IconLogin />}>
    Secondary Button disabled fullWidth icon={<IconLogin />}
  </Button>

  <Button variant="secondaryNoBorder">
    Borderless secondary Button
  </Button>

  <Button variant="secondaryNoBorder" icon={<IconLogin />}>
    Borderless secondary Button icon="login"
  </Button>

  <Button variant="secondaryNoBorder" disabled icon={<IconLogin />}>
    Borderless secondary Button disabled icon="login"
  </Button>
</>;
```

```js
import { Button } from 'suomifi-ui-components';
import { IconLogin } from 'suomifi-icons/baseIcons';

<>
  <Button variant="link">Link Button</Button>

  <Button variant="link" disabled icon={<IconLogin />}>
    Link Button disabled icon="login"
  </Button>
</>;
```
