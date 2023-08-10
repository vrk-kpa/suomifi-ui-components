`<LanguageMenu>` can be used to select a website's language.

Examples:

<ul>
  <li><a href="/#/Components/LanguageMenu?id=basic-use">Basic use</a></li>
</ul>

<div style="margin-bottom: 5px">
  <a href="/#/Components/LanguageMenu?id=props--methods">Props & methods (LanguageMenu)</a>
</div>
<div style="margin-bottom: 40px">
  <a href="/#/Components/LanguageMenu?id=languagemenuitem">Props & methods (LanguageMenuItem)</a>
</div>

### Basic use

- Compose the menu with `<LanguageMenuItem>` components
- Describe both the purpose of the menu and the currently selected language using `aria-label` as shown in the example below.
- Set the `lang` prop for each menu item
- Currently selected menu item can be marked with the `selected` prop
- Use the `onSelect()` function of menu items to run any logic needed to change language (e.g. navigate to a different URL)

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

## Props & methods
