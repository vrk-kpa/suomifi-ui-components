import { css } from 'styled-components';

export const iconBaseStyles = ({
  color,
  fill,
}: {
  color?: string;
  fill: string;
}) => {
  const resolvedColor = fill ?? color ?? 'currentColor';
  return css`
    vertical-align: baseline;
    &.fi-icon {
      display: inline-block;
    }
    .fi-icon-base-fill {
      fill: ${resolvedColor};
    }

    .fi-icon-base-stroke {
      stroke: ${resolvedColor};
    }

    &.fi-icon--cursor-pointer {
      cursor: pointer;
      & * {
        cursor: inherit;
      }
    }
  `;
};
