```jsx
<Panel className="panel-test">Test</Panel>
<Panel.expansion title="Test expansion" className="panel-expansion-test">Test expansion content</Panel.expansion>
```

### Example with controlled open-prop:

```jsx
<Component initialState={{ open: true }}>
  {({ setState, state }) => (
    <Panel.expansion
      title="Test expansion bgr"
      noPadding
      open={state.open}
      onClick={() => setState({ open: !state.open })}
    >
      <div style={{ backgroundColor: 'green', padding: '20px' }}>
        Test expansion content
      </div>
    </Panel.expansion>
  )}
</Component>
```
