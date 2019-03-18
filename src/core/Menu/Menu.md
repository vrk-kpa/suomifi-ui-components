```js
<Menu className="menu-test" name="Menu">
  <MenuItem onSelect={() => console.log('Menu test 1')}>Item 1</MenuItem>
  <MenuItem onSelect={() => console.log('Menu test 2')}>Item 2</MenuItem>
  <MenuLink href="http://www.suomi.fi/">Suomi.fi</MenuLink>
</Menu>

<Menu.language className="menu-language-test" name="FI">
  <MenuItem.language onSelect={() => console.log('FI')} selected>Suomeksi (FI)</MenuItem.language>
  <MenuLink.language href="/sv">På svenska (SV)</MenuLink.language>
</Menu.language>
```
