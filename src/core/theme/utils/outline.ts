export const boxshadowOutline = ({
  color = 'red',
  offset = '0',
  border = '1px',
  borderRadius = '4px',
}: {
  color?: string;
  offset?: string;
  border?: string;
  borderRadius?: string;
} = {}) => `outline: 0;
position: relative;
&:after {
  content: '';
  position: absolute;
  top: -${offset};
  right: -${offset};
  bottom: -${offset};
  left: -${offset};
  border-radius: ${borderRadius};
  ${offset !== '0' ? 'background-color: transparent;' : ''}
  border: ${border} solid ${color};
  box-sizing: border-box;
  box-shadow: 0 0 10px 0 ${color};
}
&:not(:focus-visible):after {
  content: none;
}`;
