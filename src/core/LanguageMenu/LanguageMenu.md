```js
import {
  LanguageMenu,
  LanguageMenuItem
} from 'suomifi-ui-components';

<LanguageMenu
  buttonText="In English (EN)"
  aria-label="Change language. Current language is English"
>
  <LanguageMenuItem
    onSelect={() => console.log('Changing lang to FI')}
    lang="fi"
  >
    Suomeksi (FI)
  </LanguageMenuItem>
  <LanguageMenuItem
    onSelect={() => console.log('Changing lang to SV')}
    lang="sv"
  >
    På svenska (SV)
  </LanguageMenuItem>
  <LanguageMenuItem
    onSelect={() => console.log('Changing lang to EN')}
    lang="en"
    selected
  >
    In English (EN)
  </LanguageMenuItem>
</LanguageMenu>;
```
