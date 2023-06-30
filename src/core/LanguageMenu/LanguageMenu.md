```js
import {
  LanguageMenu,
  LanguageMenuItem
} from 'suomifi-ui-components';

const languages = [
  { text: 'Suomeksi (FI)', lang: 'fi' },
  { text: 'På svenska (SV)', lang: 'sv' },
  { text: 'In English (EN)', lang: 'en' }
];

const [selectedLanguage, setSelectedLanguage] = React.useState(
  languages[2]
);

<LanguageMenu
  buttonText={selectedLanguage.text}
  aria-label={`Change language, selected language: ${selectedLanguage.text}`}
>
  {languages.map((item) => (
    <LanguageMenuItem
      onSelect={() => setSelectedLanguage(item)}
      lang={item.lang}
      key={item.lang}
      selected={selectedLanguage.lang === item.lang}
    >
      {item.text}
    </LanguageMenuItem>
  ))}
</LanguageMenu>;
```
