Suomi.fi icons are available from the [suomifi-icons](https://github.com/vrk-kpa/suomifi-icons) library.

The API varies by component type. Any props not mentioned in the respective APIs are passed to the `svg` element.

Click on an icon to copy its component name to clipboard for easy importing.

## Usage

Icons can be imported either through `suomifi-ui-components` or directly from the `suomifi-icons` package.

After importing the individual icons, they can be used via the APIs described below.

```js
import { IconArchive } from 'suomifi-ui-components';
// OR import { IconArchive } from 'suomifi-icons';

<IconArchive color="green" mousePointer />;
```

To use icons as a property for other components, simply provide an icon element with the desired properties as a value for the component property.

```js
import { Button, IconLogin } from 'suomifi-ui-components';
// OR import { IconLogin } from 'suomifi-icons';

<Button iconRight={<IconLogin />}>Log in</Button>;
```

## Base icons

Base icons are the most commonly used icon set. Their color and size can be customized via props. By default the color value is set to `currentColor`, so the icons inherit the current font color.

### Base icons API

| Property | Property type | Description |
| --- | --- | --- |
| className | `string` | Custom classname to extend or customize |
| ariaLabel | `string` | Aria-label for SVG, undefined hides SVG from screen reader |
| mousePointer | `boolean` | Show mouse cursor as hand-pointer |
| color | `string` | Custom fill color |
| fill | `string` | Custom fill color, takes precedence over color if both are provided |

### Icons

Click on an icon to copy its component name to clipboard for easy importing

```jsx noeditor
import { BaseIcons } from '../src/docs/Icons/Icons';
<BaseIcons />;
```

## Illustrative icons

Illustrative icons are 2-color icons that can be customized to fit the required color scheme.

### Illustrative icons API

| Property | Property type | Description |
| --- | --- | --- |
| className | `string` | Custom classname to extend or customize |
| ariaLabel | `string` | Aria-label for SVG, undefined hides SVG from screen reader |
| mousePointer | `boolean` | Show mouse cursor as hand-pointer |
| baseColor | `string` | Custom base color |
| highlightColor | `string` | Custom highlight color |

### Icons

Click on an icon to copy its component name to clipboard for easy importing

```jsx noeditor
import { IllustrativeIcons } from '../src/docs/Icons/Icons';
<IllustrativeIcons />;
```

## Doctype icons

Doctype icons portray different document types.

### Doctype icons API

| Property | Property type | Description |
| --- | --- | --- |
| className | `string` | Custom classname to extend or customize |
| ariaLabel | `string` | Aria-label for SVG, undefined hides SVG from screen reader |
| mousePointer | `boolean` | Show mouse cursor as hand-pointer |

### Icons

Click on an icon to copy its component name to clipboard for easy importing

```jsx noeditor
import { DoctypeIcons } from '../src/docs/Icons/Icons';
<DoctypeIcons />;
```

## Logo icons

LogoIcons contains variations of the Suomi.fi logo. It offers only limited customisation options.

### Logo icons API

| Property | Property type | Description |
| --- | --- | --- |
| className | `string` | Custom classname to extend or customize |
| ariaLabel | `string` | Aria-label for SVG, undefined hides SVG from screen reader |
| mousePointer | `boolean` | Show mouse cursor as hand-pointer |

### Icons

Click on an icon to copy its component name to clipboard for easy importing

```jsx noeditor
import { LogoIcons } from '../src/docs/Icons/Icons';
<LogoIcons />;
```
