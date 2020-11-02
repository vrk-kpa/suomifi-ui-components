import { css } from 'styled-components';
import { colors } from '../colors';
import { radius } from '../radius';

const boxshadow = ({
  borderRadius,
  color,
}: {
  borderRadius: string;
  color: string;
}) => css`
  border-radius: ${borderRadius};
  box-shadow: 0 0 0 2px ${color};
`;

const afterBoxshadow = ({
  offset,
  borderRadius,
  border,
  color,
  borderColor,
  zIndex,
}: {
  offset: string;
  borderRadius: string;
  border: string;
  color: string;
  zIndex: number;
  borderColor: string;
}) => css`
  position: relative;
  &:after {
    content: '';
    position: absolute;
    pointer-events: none;
    top: -${offset};
    right: -${offset};
    bottom: -${offset};
    left: -${offset};
    border-radius: ${borderRadius};
    ${offset !== '0' ? 'background-color: transparent;' : ''}
    border: ${border} solid ${borderColor};
    box-sizing: border-box;
    box-shadow: 0 0 0 2px ${color};
    ${!!zIndex && `z-index: ${zIndex};`}
  }`;

// TODO Refactor, create interfaces (and extend with Partial<>), add JSDOC for functions
export const boxshadowOutline = ({
  color = colors.accentSecondary,
  borderColor = colors.whiteBase,
  offset = '0',
  border = '1px',
  borderRadius = radius.focus,
  zIndex = 9999,
  afterPseudo = true,
}: {
  color?: string;
  borderColor?: string;
  offset?: string;
  border?: string;
  borderRadius?: string;
  zIndex?: number;
  afterPseudo?: boolean;
}) => {
  const focusVisible = !!afterPseudo
    ? '&:not(:focus-within):after { content: none; }'
    : '&:not(:focus-within) { box-shadow: none; }';
  return css`
    outline: 0;
    ${!!afterPseudo
      ? afterBoxshadow({
          offset,
          borderRadius,
          border,
          color,
          borderColor,
          zIndex,
        })
      : boxshadow({ borderRadius, color })}
    ${focusVisible}
  `;
};
