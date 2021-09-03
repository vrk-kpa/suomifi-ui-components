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
    display: inline-block;
    vertical-align: baseline;

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
