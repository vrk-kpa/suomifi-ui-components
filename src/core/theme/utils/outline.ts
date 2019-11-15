import { css } from 'styled-components';
import { colors } from '../colors';
import { radius } from '../radius';

const boxshadow = ({
  borderRadius,
  border,
  color,
}: {
  borderRadius: string;
  border: string;
  color: string;
}) => css`
  border-radius: ${borderRadius};
  border: ${border} solid ${color};
  box-sizing: border-box;
  box-shadow: 0 0 10px 0 ${color};
`;

const afterBoxshadow = ({
  offset,
  borderRadius,
  border,
  color,
  zIndex,
}: {
  offset: string;
  borderRadius: string;
  border: string;
  color: string;
  zIndex: number;
}) => css`
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
    ${!!zIndex && `z-index: ${zIndex};`}
  }`;

// TODO Refactor, create interfaces (and extend with Partial<>), add JSDOC for functions
export const boxshadowOutline = ({
  color = colors.accentBase.hsl,
  offset = '0',
  border = '1px',
  borderRadius = radius.focus,
  zIndex = 9999,
  afterPseudo = true,
}: {
  color?: string;
  offset?: string;
  border?: string;
  borderRadius?: string;
  zIndex?: number;
  afterPseudo?: boolean;
}) => {
  const focusVisible = !!afterPseudo
    ? '&:not(:focus-visible):after { content: none; }'
    : '&:not(:focus-visible) { box-shadow: none; }';
  return css`
    outline: 0;
    ${!!afterPseudo
      ? afterBoxshadow({ offset, borderRadius, border, color, zIndex })
      : boxshadow({ borderRadius, border, color })}
    ${focusVisible}
  `;
};
