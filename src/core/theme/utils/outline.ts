export const boxshadowOutline = ({
  color = 'red',
  offset = '0',
  borderRadius = '2px',
}: {
  color?: string;
  offset?: string;
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
  box-shadow: 0 0 10px 0 ${color};
}`;
