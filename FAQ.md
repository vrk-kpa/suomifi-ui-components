# 🔮 FAQ

## 1. Fonts don't seem to be correct

Add the Source Sans 3 font to your application's CSS. The intended way is to use the font hosted by the Suomi.fi Design System:

```css
@import url('https://designsystem.suomi.fi/fonts/source-sans-3.css');
```

**Self-hosting:** If you need to host the fonts yourself, download the font files from https://designsystem.suomi.fi/fonts/SourceSans3.zip and import the CSS locally. The CSS file refers to the font files within the same folder, so make sure all the font files reside in the same folder.

## 2. Content-Security-Policy (CSP) problems?

If strict content security policy is not required, you can simply use

```bash
style-src: 'unsafe-inline'
```

to allow the use of dynamic inline styling.

### Strict content security policies

Strict content security policy does not allow dynamic styling without extra safety measures. Styled-components uses a `nonce` to provide these measures. Simply put, nonce is a single use identifier that gets sent with the changes, verifying that the changes are not coming from a malicious source. In practice, this should generally be a base64 hash.

Refer to the [styled-components documentation](https://styled-components.com/docs/faqs#csp-nonce-auto-detection) for instructions on how to provide a nonce.

## 3. Some components won't work on old browsers (e.g. IE) at all.

Add polyfills to your application. Internet Explorer is not officially supported.

## 4. Do you support server side rendering?

Yes. For server side rendering, make sure you are are following the [styled-components guidelines for it.](https://styled-components.com/docs/advanced#server-side-rendering)
