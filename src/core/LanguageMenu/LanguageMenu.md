```js
import {
  LanguageMenu,
  LanguageMenuItem,
  LanguageMenuLink
} from 'suomifi-ui-components';

<LanguageMenu
  className="language-menu-language-test"
  name="Suomeksi (FI)"
>
  <LanguageMenuItem onSelect={() => console.log('FI')} selected>
    Suomeksi (FI)
  </LanguageMenuItem>
  <LanguageMenuLink href="/sv">På svenska (SV)</LanguageMenuLink>
  <LanguageMenuLink href="/en">In English (EN)</LanguageMenuLink>
</LanguageMenu>;
```
