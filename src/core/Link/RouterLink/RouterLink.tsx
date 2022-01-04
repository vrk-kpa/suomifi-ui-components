import React, { ReactNode } from 'react';
// import { default as styled } from 'styled-components';
import classnames from 'classnames';
// import { RouterLinkStyles } from './RouterLink.baseStyles';
// import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { baseClassName } from '../BaseLink/BaseLink';

//
// Source: https://www.benmvp.com/blog/polymorphic-react-components-typescript/
//
// Source: https://github.com/emotion-js/emotion/blob/master/packages/styled-base/types/helper.d.ts
// A more precise version of just React.ComponentPropsWithoutRef on its own
export type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>,
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>;

type AsProp<C extends React.ElementType> = {
  /**
   * An override of the default HTML tag.
   * Can also be another React component.
   */
  as?: C;
};

/**
 * Allows for extending a set of props (`ExtendedProps`) by an overriding set of props
 * (`OverrideProps`), ensuring that any duplicates are overridden by the overriding
 * set of props.
 */
export type ExtendableProps<
  ExtendedProps = {},
  OverrideProps = {},
> = OverrideProps & Omit<ExtendedProps, keyof OverrideProps>;

/**
 * Allows for inheriting the props from the specified element type so that
 * props like children, className & style work, as well as element-specific
 * attributes like aria roles. The component (`C`) must be passed in.
 */
export type InheritableElementProps<
  C extends React.ElementType,
  Props = {},
> = ExtendableProps<PropsOf<C>, Props>;

/**
 * A more sophisticated version of `InheritableElementProps` where
 * the passed in `as` prop will determine which props can be included
 */
export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {},
> = InheritableElementProps<C, Props & AsProp<C>>;
//
//
//
const routerLinkClassName = `${baseClassName}--router`;

interface Props {
  /** Custom classname to extend or customize */
  className?: string;
  /**
   * Link element displayed content
   */
  children: ReactNode;
}

export type RouterLinkProps<C extends React.ElementType> =
  PolymorphicComponentProps<C, Props>;

export const RouterLink = <C extends React.ElementType = 'a'>({
  as,
  children,
  className,
  ...passProps
}: RouterLinkProps<C>) => {
  const Component = as || 'a';

  return (
    <Component
      className={classnames(className, routerLinkClassName)}
      {...passProps}
    >
      {children}
    </Component>
  );
};

// export class RouterLink extends Component<RouterLinkProps> {
//   render() {
//     const { className, ...passProps } = this.props;
//     return (
//       <BaseRouterLink
//         className={classnames(className, routerLinkClassName)}
//         {...passProps}
//       />
//     );
//   }
// }
