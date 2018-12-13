import propTypes from 'prop-types';
import { SerializedStyles } from '@emotion/core';
import { suomifiTheme, ITheme } from '../theme';

export const defaultPropsTheme = ({ defaultProps }: any = {}) => ({
  ...defaultProps,
  theme: suomifiTheme,
});

export const propTypesTheme = ({ propTypes: givenPropTypes }: any = {}) => ({
  ...givenPropTypes,
  theme: propTypes.object,
});

interface IBaseStyles {
  theme: ITheme;
  [key: string]: any;
}

export const cssFromBaseStyles = (
  baseStyles: ({ theme }: IBaseStyles) => SerializedStyles,
  props = {},
) => baseStyles({ ...props, theme: suomifiTheme }).styles;
