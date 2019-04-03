declare module '*.jpg';
declare module '*.png';
declare module '*.svg';

declare module '@reach/menu-button' {
  interface IButtonRect {
    height: number;
    width: number;
    left: number;
    top: number;
  }

  interface IState {
    isOpen: boolean;
    closingWithClick: boolean;
    selectionIndex: number;
    buttonRect: undefined | IButtonRect;
    buttonId: string;
  }

  export interface IMenuProps {
    children: React.ReactNode;
  }

  export const Menu: React.SFC<IMenuProps>;

  export type MenuButtonProps = JSX.IntrinsicElements['button'] & {
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
    children: React.ReactNode;
  };

  export const MenuButton: React.SFC<MenuButtonProps>;

  export type MenuListProps = JSX.IntrinsicElements['div'] & {
    children: React.ReactNode;
  };

  export const MenuList: React.SFC<MenuListProps>;

  type ResolvedMenuLinkProps<T> = T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : T;

  type ResolvedMenuLinkComponent<T> = T extends keyof JSX.IntrinsicElements
    ? T
    : React.ComponentType<T>;

  export type MenuLinkProps<
    T extends SupportedMenuLinkComponent
  > = ResolvedMenuLinkProps<T> & {
    to?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    component?: ResolvedMenuLinkComponent<T>;
    index?: number;
    style?: React.CSSProperties;
    setState?: (s: IState) => Partial<IState>;
    state?: IState;
    _ref?: (node: HTMLElement) => void;
  };

  type SupportedMenuLinkComponent = object | keyof JSX.IntrinsicElements;

  export function MenuLink<T extends SupportedMenuLinkComponent>(
    props: MenuLinkProps<T>,
  ): React.ReactElement<MenuLinkProps<T>>;

  export type MenuItemProps = JSX.IntrinsicElements['div'] & {
    onSelect: () => void;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
    onMouseMove?: (e: React.MouseEvent<HTMLElement>) => void;
    role?: string;
    state?: IState;
    setState?: (s: IState) => Partial<IState>;
    index?: number;
    _ref?: (node: HTMLElement) => void;
  };

  export const MenuItem: React.SFC<MenuItemProps>;
}

declare module '@reach/component-component' {
  type Args<P, S> = {
    props: P;
    state: S;
    setState<K extends keyof S>(
      state:
        | ((prevState: Readonly<S>, props: P) => Pick<S, K> | S | null)
        | (Pick<S, K> | S | null),
      callback?: () => void,
    ): void;
    forceUpdate(callBack?: () => void): void;
  };

  type Refs = { [key: string]: React.RefObject<HTMLElement> };

  type StateProps<P, S> = Pick<Args<P, S>, 'state' | 'props'>;

  export type ComponentProps<P, S> = {
    initialState?: S;
    getInitialState?(): S;
    refs?: Refs;
    getRefs?(): Refs;
    didMount?(args: Args<P, S> & Refs): void;
    didUpdate?(args: Args<P, S> & Refs & { prevProps: P; prevState: S }): void;
    willUnmount?(args: StateProps<P, S> & Refs): void;
    getSnapshotBeforeUpdate?(
      args: StateProps<P, S> & Refs & { prevProps: P; prevState: S },
    ): any;
    shouldUpdate?(
      args: StateProps<P, S> & { nextProps: P; nextState: S },
    ): boolean;
    children?(
      args: Args<P, S> & Refs,
    ): Args<P, S> & Refs | React.ReactNode | null;
    render?(args: Args<P, S>): void;
  };

  class Component<
    P extends ComponentProps<P, S>,
    S = any
  > extends React.Component<ComponentProps<P, S>, {}> {}

  export default Component;
}

declare module 'react-styleguidist/lib/rsg-components/Type/TypeRenderer' {
  interface TypeRendererProps {
    classes: any;
    children?: ReactNode;
  }

  const TypeRenderer: React.SFC<TypeRendererProps>;
  export default TypeRenderer;
}
