<!-- ```js
import { LanguageMenu, LanguageMenuItem, LanguageMenuLink } from 'suomifi-ui-components';

<LanguageMenu className="language-menu-test" name="LanguageMenu">
  <LanguageMenuItem onSelect={() => console.log('LanguageMenu test 1')}>
    Item 1
  </LanguageMenuItem>
  <LanguageMenuItem onSelect={() => console.log('LanguageMenu test 2')}>
    Item 2
  </LanguageMenuItem>
  <LanguageMenuLink href="http://www.suomi.fi/">Suomi.fi</LanguageMenuLink>
</LanguageMenu>;
``` -->

```js
import {
  LanguageMenu,
  LanguageMenuItem,
  LanguageMenuLink
} from 'suomifi-ui-components';

<LanguageMenu className="language-menu-language-test" name="FI">
  <LanguageMenuItem onSelect={() => console.log('FI')} selected>
    Suomeksi (FI)
  </LanguageMenuItem>
  <LanguageMenuLink href="/sv">På svenska (SV)</LanguageMenuLink>
</LanguageMenu>;
```
