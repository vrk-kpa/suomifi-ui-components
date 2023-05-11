```js
import {
  LanguageMenu,
  LanguageMenuItem
} from 'suomifi-ui-components';

<LanguageMenu
  buttonText="In English (EN)"
  aria-label="Change language. Current language is English"
>
  <LanguageMenuItem onClick={() => console.log('FI')} lang="fi">
    Suomeksi (FI)
  </LanguageMenuItem>
  <LanguageMenuItem href="/sv" lang="sv">
    På svenska (SV)
  </LanguageMenuItem>
  <LanguageMenuItem href="/en" lang="en" selected>
    In English (EN)
  </LanguageMenuItem>
</LanguageMenu>;
```
