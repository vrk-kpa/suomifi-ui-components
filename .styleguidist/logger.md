## Instructions

Some of the components have additional logging to guide the right use of those and which was not able to be guided through API or Typescript.

By default, nothing is logged. User of the library needs to enable logging when needed. User can use console or some 3rd party logging library for their needs.

### Console

Basic setup to log to your console.

```jsx static
import { setLogger } from 'suomifi-ui-components';

setLogger(console);
```

Some customization.

```jsx static
import { setLogger, Logger } from 'suomifi-ui-components';

const logging: Logger = {
  log: (val: string) => {
    console.log(`[INFO] ${val}`);
  },
  warn: (val: string) => {
    console.warn(`[WARN] ${val}`);
  },
  error: (val: string) => {
    console.error(`[ERR] ${val}`);
  }
};
setLogger(logging);
```

