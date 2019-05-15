```jsx
<Icon ariaLabel="Login here" className="my-icon--test" />
```

```jsx noeditor
const styled = require('@emotion/styled').default;
const { allIcons, allStaticIcons } = require('suomifi-icons');
const clipboardCopy = require('clipboard-copy');
const StyledIcon = styled(props => <Icon {...props} />)({
  height: '50px',
  width: 'auto',
  margin: '8px'
});

<div>
  <div>
    {allIcons.map(icon => (
      <StyledIcon
        mousePointer
        icon={icon}
        key={icon}
        onClick={() => clipboardCopy(icon)}
      />
    ))}
  </div>
  <div>
    {allStaticIcons.map(icon => (
      <StyledIcon
        mousePointer
        icon={icon}
        key={icon}
        onClick={() => clipboardCopy(icon)}
      />
    ))}
  </div>
</div>;
```
