```js noeditor
import { default as styled } from 'styled-components';
import { colors } from '../src/core/theme/colors';
import { cssValueToString } from '../src/utils/css';
import { element, fonts } from '../src/core/theme/reset';
import { spacing } from '../src/core/theme/spacing';
import { Text } from '../src/core/Text/Text';
import clipboardCopy from 'clipboard-copy';

const Container = styled(({ size, name, ...passProps }) => (
  <div
    {...passProps}
    onClick={() => (!!name ? clipboardCopy(name) : {})}
  />
))(
  ({ size }) => `
  min-height: calc(${size} + 2em);
  max-width: 420px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: ${cssValueToString(spacing.xl)};
  cursor: pointer;

  * {
    cursor: inherit;
  }

  > div:not(:first-of-type) {
    margin-left: ${cssValueToString(spacing.s)};
  }
`
);

const Square = styled(props => (
  <div {...props}>
    <div className="box" />
  </div>
))(
  ({ size = '0xp' }) => `
    flex: none;
    display: flex;
    align-items: flex-end;
    width: 100px;

    > .box {
      height: ${size};
      width: ${size};
      border: 1px dashed ${colors.blackBase};
      overflow: hidden;
    }
  `
);

const Bar = styled(props => (
  <div {...props}>
    <div className="row" />
    <div className="col" />
  </div>
))(
  ({ size = '0xp' }) => `
    position: relative;
    flex: 1;
    align-self: stretch;
    display: flex;
    align-items: flex-end;

    > .row {
      height: ${size};
      width: 100%;
      background-color: ${colors.depthDark1};
    }
    > .col {
      position: absolute;
      bottom: 0;
      right: 0;
      height: 100%;
      width: ${size};
      background-color: ${colors.depthDark1};
    }
  `
);

const Name = styled(({ name, value, ...passProps }) => (
  <div {...passProps}>
    <Text.lead>{name}</Text.lead>
    <Text>{value}</Text>
  </div>
))(
  () => `
  flex: 1;
  display: flex;
  flex-direction: column;
`
);

Object.entries(spacing).map(([key, value]) => {
  const spacingValue = cssValueToString(value);
  return (
    <Container size={spacingValue} name={key} key={key}>
      <Name name={key} value={spacingValue} />
      <Square size={spacingValue} />
      <Bar size={spacingValue} />
    </Container>
  );
});
```
