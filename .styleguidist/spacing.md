```js noeditor
import styled from '@emotion/styled';
import { colors } from '../src/core/theme/colors';
import { element, fonts } from '../src/core/theme/reset';
import { spacing, spacingTokens } from '../src/core/theme/spacing';
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
  margin-bottom: ${spacing.l};
  cursor: pointer;

  * {
    cursor: inherit;
  }

  > div:not(:first-of-type) {
    margin-left: ${spacing.m};
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
    width: ${spacing.xl};

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
      background-color: ${colors.depthDark27};
    }
    > .col {
      position: absolute;
      bottom: 0;
      right: 0;
      height: 100%;
      width: ${size};
      background-color: ${colors.depthDark27};
    }
  `
);

const Name = styled(({ name, value, ...passProps }) => (
  <div {...passProps}>
    <Text.lead>{name}</Text.lead>
    <Text>{value}</Text>
  </div>
))(`
  flex: 1;
  display: flex;
  flex-direction: column;
`);

Object.entries(spacingTokens).map(([key, value]) => (
  <Container size={value} name={key} key={key}>
    <Name name={key} value={value} />
    <Square size={value} />
    <Bar size={value} />
  </Container>
));
```
