// import React, { Component, ReactNode } from 'react';
import React, { forwardRef, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import { RouterLinkStyles } from './RouterLink.baseStyles';
import { IconChevronRight } from 'suomifi-icons';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SpacingConsumer,
} from '../../theme';
import {
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../../theme/utils/spacing';
import {
  baseClassName,
  linkClassNames,
  UnderlineVariant,
} from '../BaseLink/BaseLink';
import classnames from 'classnames';
import { HtmlA } from '../../../reset';
import { filterDuplicateKeys } from '../../../utils/common/common';

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
   * @default <a>
   */
  asComponent?: C;
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
 * Allows the component's ref type to comply with "asComponent" prop
 * E.g. asComponent = 'button', ref type must be React.Ref<HTMLButtonElement>
 */
type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

/**
 * This type definition exists solely to provide the component with a `forwardedRef` prop which
 * is visible in the Styleguidist API documentation ("ref" is not visible in Styleguidist)
 */
type ForwardedRef<C extends React.ElementType> = {
  /** Alternative for React `ref` attribute. Ref type is derived from the `asComponent` prop value.
   * Example: asComponent = 'button', ref type must be HTMLButtonElement
   */
  forwardedRef?: PolymorphicRef<C>;
};

/**
 * A more sophisticated version of `InheritableElementProps` where
 * the passed in `as` prop will determine which props can be included
 */
export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {},
> = InheritableElementProps<C, Props & AsProp<C> & ForwardedRef<C>>;

//
//
//

const routerLinkClassName = `${baseClassName}--router`;

interface Props extends MarginProps {
  /** CSS class for custom styles */
  className?: string;
  /**
   * Text content for the link
   */
  children: ReactNode;
  /**
   * 'initial' | 'hover'
   *
   * Option 'initial' shows underline in link's normal state, and no underline on hover.
   * Option 'hover' shows underline on hover, and no underline in link's normal state.
   *
   * Note: default will be changed from 'hover' to 'initial', so set 'hover' explicitly when necessary.
   *
   * @default hover
   */
  underline?: UnderlineVariant;
}

export type RouterLinkProps<C extends React.ElementType> =
  PolymorphicComponentProps<C, Props>;

const PolymorphicLink = <C extends React.ElementType>(
  props: RouterLinkProps<C> & SuomifiThemeProp,
) => {
  const {
    asComponent,
    globalMargins, // destructured out here to make typescript happy on styled level
    children,
    className,
    smallScreen,
    variant,
    theme,
    underline = 'hover',
    forwardedRef,
    ...rest
  } = props;
  const [_marginProps, passProps] = separateMarginProps(rest);

  const Component = asComponent || HtmlA;

  const classNames = classnames(baseClassName, routerLinkClassName, className, {
    [linkClassNames.linkUnderline]: underline === 'initial',
    [linkClassNames.accent]: variant === 'accent',
    [linkClassNames.small]: smallScreen,
  });

  // If asComponent is included, we assume it can take a normal ref-prop
  if (!!asComponent) {
    return (
      <Component
        className={classNames}
        ref={forwardedRef}
        {...passProps}
        style={{ ...passProps?.style }}
      >
        {variant === 'accent' && (
          <IconChevronRight color={theme.colors.accentBase} />
        )}
        {children}
      </Component>
    );
  }

  // HtmlA (which is rendered by default) exposes a prop called forwardedRef instead
  return (
    <Component
      className={classNames}
      forwardedRef={forwardedRef}
      {...passProps}
      style={{ ...passProps?.style }}
    >
      {children}
    </Component>
  );
};

const StyledRouterLink = styled(
  <C extends React.ElementType>(
    props: RouterLinkProps<C> & SuomifiThemeProp & GlobalMarginProps,
  ) => {
    const { ...passProps } = props;
    return <PolymorphicLink {...passProps} />;
  },
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.routerLink,
      marginProps,
    );
    return RouterLinkStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const RouterLinkInner = <C extends React.ElementType = 'a'>(
  props: RouterLinkProps<C>,
  ref?: PolymorphicRef<C>,
) => (
  <SpacingConsumer>
    {({ margins }) => (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledRouterLink
            theme={suomifiTheme}
            globalMargins={margins}
            forwardedRef={ref}
            {...props}
          />
        )}
      </SuomifiThemeConsumer>
    )}
  </SpacingConsumer>
);

// Type assertion is needed to set the function signature with generic type C.
export const RouterLink = forwardRef(RouterLinkInner) as <
  C extends React.ElementType = 'a',
>(
  props: RouterLinkProps<C> & {
    ref?: PolymorphicRef<C>;
  },
) => ReturnType<typeof RouterLinkInner>;

// Because of type assertion the displayName has to be set like this
(RouterLink as React.FC).displayName = 'RouterLink';
