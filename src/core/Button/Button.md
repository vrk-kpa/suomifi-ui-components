```js
<Button
  className="my-button--test"
  onClick={() => console.log('Test button click')}
  type="submit"
>
  Button
</Button>


<Button disabled fullWidth>
  Button disabled fullWidth
</Button>


<Button
  icon="login"
  aria-label="Login"
>
  Button icon="login" aria-label="Login"
</Button>

<Button iconRight="login" aria-labelledby="button-label">
  <span id="button-label">Login</span> iconRight="login" aria-labelledby="button-label"
</Button>


<div example="negative">
    <Button.negative>
      Button.negative
    </Button.negative>

    <Button.negative
      disabled
      fullWidth
      icon="login">
      Button.negative disabled fullWidth icon="login"
    </Button.negative>
</div>


<Button.secondary>
  Button.secondary
</Button.secondary>

<Button.secondarySmall>
  Button.secondarySmall
</Button.secondarySmall>

<Button.secondary icon="login">
  Button.secondary icon="login"
</Button.secondary>

<Button.secondary
  disabled
  fullWidth
  icon="login">
  Button.secondary disabled fullWidth icon="login"
</Button.secondary>


<Button.secondaryNoborder>
  Button.secondaryNoborder
</Button.secondaryNoborder>

<Button.secondaryNoborder
  disabled
  icon="login">
  Button.secondaryNoborder disabled icon="login"
</Button.secondaryNoborder>


<Button.tertiary>
  Button.tertiary
</Button.tertiary>

<Button.tertiary
  disabled
  icon="login">
  Button.tertiary disabled icon="login"
</Button.tertiary>
```
