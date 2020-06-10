/* eslint-disable @typescript-eslint/interface-name-prefix */
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
    'aria-labelledby'?: string;
  };

  export const MenuButton: React.SFC<MenuButtonProps>;

  export type MenuListProps = JSX.IntrinsicElements['div'] & {
    children: React.ReactNode;
  };

  export const MenuList: React.SFC<MenuListProps>;

  export type PRect = Partial<DOMRect> & {
    readonly bottom: number;
    readonly height: number;
    readonly left: number;
    readonly right: number;
    readonly top: number;
    readonly width: number;
  };

  export type Position = (
    targetRect?: PRect | null,
    popoverRect?: PRect | null,
  ) => React.CSSProperties;

  export type MenuPopoverProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    position?: Position;
  };

  export const MenuPopover: React.SFC<MenuPopoverProps>;

  export type MenuItemsProps = {
    children: React.ReactNode;
  } & React.HTMLAttributes<HTMLDivElement>;

  export const MenuItems: React.ForwardRefExoticComponent<
    {
      children: React.ReactNode;
    } & React.HTMLAttributes<HTMLDivElement> &
      React.RefAttributes<HTMLDivElement>
  >;

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

declare module 'react-styleguidist/lib/client/rsg-components/ComponentsList/ComponentsList' {
  interface ComponentsListProps {
    [key: string]: any | any[];
  }

  const ComponentsList: React.FunctionComponent<ComponentsListProps>;
  // eslint-disable-next-line import/no-default-export
  export default ComponentsList;
}
