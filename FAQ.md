# 🔮 FAQ

1. ## Fonts don't seem to be correct

   Add `@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300:400,600&display=swap');` to your applications CSS.

2. ## Content-Security-Policy (CSP) problems?

   If strict content security policy is not required, you can simply use

   ```bash
   style-src: 'unsafe-inline'
   ```

   to allow the use of dynamic inline styling.

   You might also need to set `dangerously omit style nonce` to `true`.

   ### Strict content security policies

   Strict content security policy does not allow dynamic styling without extra safety measures. Styled components uses `__webpack_nonce__` to provide these measures.

   Add `__webpack_nonce__ = '<some generated nonce>'` in the beginning of your entry file. It must be defined before any other scripts. One way to do this is to introduce the nonce as above in a new file and import that in your entry file. More information can be found in [webpack documentation.](https://webpack.js.org/guides/csp/)

   Use [helmet](https://helmetjs.github.io/docs/csp/) or a similar tool to provide the generated nonce to the browser. See our [simplified example setup](https://github.com/ketsappi/strict-csp-expressed-with-suomifi-ui-components) for reference.

   Styled components now has access to the compiled value of `__webpack_nonce__` through the window object, which allows styled-components to create necessary nonce values for changing styles, ensuring the integrity of the changes and meeting strict content security policy rules.

   If you are using TypeScript, make sure you have the latest version of `@types/webpack-env` as it containts the `__webpack_nonce__`.

   Also notice that `__webpack_nonce__` does not work with hot reload in local development environment.

3. ## Some components won't work on old browsers (e.g. IE) at all

   Add polyfills to your application.

4. ## Do you support server side rendering?

   Yes. For server side rendering, make sure you are are following the [Styled Components guidelines for it.](https://styled-components.com/docs/advanced#server-side-rendering)
