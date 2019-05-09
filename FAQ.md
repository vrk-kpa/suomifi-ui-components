# 🔮 FAQ

1. ## Fonts don't seem to be correct

   Add `@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');` to your applications CSS.

2. ## Content-Security-Policy (CSP) problems?

   You need to configure DEV env to allow

   ```bash
   style-src: 'unsafe-inline'
   ```

   And also might need to set `dangerously omit style nonce` to `true`.

3. ## Some components won't work on old browsers (e.g. IE) at all

   Add polyfills to your application.
