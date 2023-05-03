```js
import {
  LanguageMenu,
  LanguageMenuItem
} from 'suomifi-ui-components';

<LanguageMenu buttonText="På svenska (SV)">
  <LanguageMenuItem onClick={() => console.log('FI')}>
    Suomeksi (FI)
  </LanguageMenuItem>
  <LanguageMenuItem href="/sv" selected>
    På svenska (SV)
  </LanguageMenuItem>
  <LanguageMenuItem href="/en">In English (EN)</LanguageMenuItem>
</LanguageMenu>;
```
