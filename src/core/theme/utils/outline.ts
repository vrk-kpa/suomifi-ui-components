export const boxshadowOutline = ({
  color = 'red',
  offset = '0',
  border = '1px',
  borderRadius = '4px',
  zIndex = 9999,
}: {
  color?: string;
  offset?: string;
  border?: string;
  borderRadius?: string;
  zIndex?: number;
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
  z-index: ${zIndex};
}
&:not(:focus-visible):after {
  content: none;
}`;
