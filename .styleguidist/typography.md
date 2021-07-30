Suomifi-styleguide typography

```js noeditor
import { default as styled } from 'styled-components';
import { Text, Heading } from '../src';
import { suomifiTheme } from '../src/core/theme';

import clipboardCopy from 'clipboard-copy';

const fontFamily = 'Source Sans Pro';
const typographyTokens = suomifiTheme.typography;

const Row = styled(({ mb, code, ...passProps }) => (
  <div
    {...passProps}
    onClick={() => (!!code ? clipboardCopy(code) : {})}
  />
))((props) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  cursor: !!props.code ? 'pointer' : 'inherit',
  marginBottom: !!props.mb ? '34px' : undefined
}));
const Item = ({ flex, Component, ...passProps }) => (
  <div
    style={{
      flex: !!flex ? flex : '1',
      marginRight: '0.5em',
      cursor: 'inherit'
    }}
  >
    <Component {...passProps} />
  </div>
);

const TextItem = (props) => <Item {...props} Component={Text} />;
const HeadingItem = (props) => (
  <Item {...props} Component={Heading} />
);

const TextSet = ({ name, size, mb, code, ...passProps }) => (
  <Row mb={mb} code={code}>
    <TextItem {...passProps} flex="2">
      {name} {!!passProps.smallScreen && 'small screen'}
    </TextItem>
    <TextItem {...passProps}>{size}</TextItem>
    <TextItem {...passProps}>Aa</TextItem>
  </Row>
);

const HeadingSet = ({ name, size, mb, code, ...passProps }) => (
  <Row mb={mb} code={code}>
    <HeadingItem {...passProps} flex="2">
      {name} {!!passProps.smallScreen && 'small screen'}
    </HeadingItem>
    <HeadingItem {...passProps}>{size}</HeadingItem>
    <HeadingItem {...passProps}>Aa</HeadingItem>
  </Row>
);

<div style={{ maxWidth: '720px' }}>
  <Row mb>
    <TextItem variant="lead">{fontFamily}</TextItem>
  </Row>
  <TextSet
    variant="body"
    name="Body text"
    size={typographyTokens.bodyText.fontSize}
    code="<Text></Text>"
  />
  <TextSet
    mb
    smallScreen
    variant="body"
    name="Body text"
    size={typographyTokens.bodyTextSmall.fontSize}
    code="<Text smallScreen></Text>"
  />

  <TextSet
    variant="lead"
    name="Lead text"
    size={typographyTokens.leadText.fontSize}
    code="<Text.lead></Text.lead>"
  />
  <TextSet
    mb
    smallScreen
    variant="lead"
    name="Lead text"
    size={typographyTokens.leadTextSmallScreen.fontSize}
    code="<Text.lead smallScreen></Text.lead>"
  />

  <HeadingSet
    variant="h1hero"
    name="Heading 1 hero"
    size={typographyTokens.heading1.fontSize}
    code="<Heading.h1hero></Heading.h1hero>"
  />
  <HeadingSet
    mb
    smallScreen
    variant="h1hero"
    name="Heading 1 hero"
    size={typographyTokens.heading1SmallScreen.fontSize}
    code="<Heading.h1hero smallScreen></Heading.h1hero>"
  />

  {[1, 2, 3, 4, 5].map((n) => (
    <React.Fragment key={n}>
      <HeadingSet
        variant={`h${n}`}
        name={`Heading ${n}`}
        size={typographyTokens[`heading${n}`].fontSize}
        code={`<Heading.h${n}></Heading.h${n}>`}
      />
      <HeadingSet
        mb
        smallScreen
        variant={`h${n}`}
        name={`Heading ${n}`}
        size={typographyTokens[`heading${n}SmallScreen`].fontSize}
        code={`<Heading.h${n} smallScreen></Heading.h${n}>`}
      />
    </React.Fragment>
  ))}
</div>;
```
