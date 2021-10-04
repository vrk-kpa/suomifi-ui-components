```js
import { Alert } from 'suomifi-ui-components';

<>
  <Alert closeText="Sulje" smallScreen>
    Palvelussa huoltokatko 5.6.2018 klo 21.00 – 23.59. Pahoittelemme
    häiriötä.
  </Alert>

  <Alert closeText="Sulje" labelText="Virheilmoitus">
    Jotain meni vikaan toimintoa suoritettaessa. Ole hyvä ja yritä
    uudelleen. Mikäli virhe ongelma ei poistu ota yhteyttä Lorem ipsum
    dolor sit amet, consectetur adipiscing elit. Morbi est nulla,
    rhoncus ac odio at, blandit ornare mi. Suspendisse potenti.
    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
    posuere cubilia curae; Suspendisse efficitur et turpis eget
    tempor. Nam sed lacus ut lorem feugiat tincidunt. Mauris quis nisi
    placerat, convallis turpis nec, auctor massa. Nam ornare tortor id
    tortor tristique, in semper augue fermentum. Nulla at pharetra
    leo, a ullamcorper metus. Donec molestie velit tristique feugiat
    interdum. Donec ultrices efficitur pellentesque. Sed luctus ac
    metus sed rhoncus.
  </Alert>

  <Alert variant="error" inline>
    Palvelussa huoltokatko 5.6.2018 klo 21.00 – 23.59. Pahoittelemme
    häiriötä.
  </Alert>

  <Alert variant="error" closeText="Pidempi sulje-teksti">
    Palvelussa huoltokatko 5.6.2018 klo 21.00 – 23.59. Pahoittelemme
    häiriötä.
  </Alert>

  <Alert variant="warning" closeText="Sulje">
    Palvelussa huoltokatko 5.6.2018 klo 21.00 – 23.59. Pahoittelemme
    häiriötä.
  </Alert>

  <Alert inline variant="warning" labelText="Varoitus">
    Palvelussa huoltokatko 5.6.2018 klo 21.00 – 23.59. Pahoittelemme
    häiriötä.
  </Alert>

  <Alert
    inline
    labelText="Rivittyvä labelteksti Rivittyvä labelteksti Rivittyvä labelteksti Rivittyvä labelteksti Rivittyvä labelteksti Rivittyvä labelteksti Rivittyvä labelteksti Rivittyvä labelteksti Rivittyvä labelteksti Rivittyvä labelteksti Rivittyvä labelteksti Rivittyvä labelteksti "
  >
    Palvelussa huoltokatko 5.6.2018 klo 21.00 – 23.59. Pahoittelemme
    häiriötä.
  </Alert>
</>;
```
