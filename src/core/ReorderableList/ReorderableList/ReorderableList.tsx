import React, {
  Component,
  forwardRef,
  ReactNode,
  createContext,
  createRef,
} from 'react';
import { styled } from 'styled-components';
import classnames from 'classnames';
import { AutoId } from '../../utils/AutoId/AutoId';
import { HtmlDiv, HtmlDivWithRef, HtmlDivWithRefProps } from '../../../reset';
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
import { InlineAlert } from '../../InlineAlert/InlineAlert';
import { Button } from '../../Button/Button';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { baseStyles } from './ReorderableList.baseStyles';
import { filterDuplicateKeys } from '../../../utils/common/common';

const baseClassName = 'fi-reorderable-list';
const listClassNames = {
  editMode: `${baseClassName}--edit-mode`,
  editButton: `${baseClassName}_edit-button`,
  instruction: `${baseClassName}_instruction`,
  list: `${baseClassName}_list`,
  liveRegion: `${baseClassName}_live-region`,
  gapElement: `${baseClassName}_gap`,
  gapActive: `${baseClassName}_gap--active`,
};

export interface ReorderableListAnnouncements {
  editModeActivated: () => string;
  editModeCancelled: () => string;
  movedUp: (
    itemLabel: string,
    newPosition: number,
    totalItems: number,
  ) => string;
  movedDown: (
    itemLabel: string,
    newPosition: number,
    totalItems: number,
  ) => string;
  movedToPosition: (
    itemLabel: string,
    newPosition: number,
    totalItems: number,
  ) => string;
  cannotMoveUp: (itemLabel: string) => string;
  cannotMoveDown: (itemLabel: string) => string;
  itemsSwapped: (item1Label: string, item2Label: string) => string;
}

export interface ReorderableListProps
  extends MarginProps,
    Omit<HtmlDivWithRefProps, 'onChange'> {
  children: ReactNode;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  /** Callback fired when items are reordered. Receives new ordered array of itemKeys. */
  onReorder: (newOrder: string[]) => void;
  /** Text for the edit mode toggle button */
  editButtonText: string;
  /** Text for the cancel button (shown in edit mode) */
  cancelButtonText: string;
  /** Heading text for the keyboard instruction shown in edit mode */
  editModeInstructionHeading: string;
  /** Keyboard instruction text shown in edit mode */
  editModeInstructionText: string;
  /** Screen reader announcement callbacks (required for i18n) */
  announcements: ReorderableListAnnouncements;
  /** Controlled edit mode state */
  editMode?: boolean;
  /** Callback when edit mode changes */
  onEditModeChange?: (editMode: boolean) => void;
  /** CSS class for custom styles */
  className?: string;
  /** Ref is placed to the outermost div element of the component. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLDivElement>;
}

interface RegisteredItem {
  itemKey: string;
  ariaLabel: string;
  ref: React.RefObject<HTMLLIElement>;
}

export interface ReorderableListContextValue {
  editMode: boolean;
  itemOrder: string[];
  registerItem: (
    itemKey: string,
    ariaLabel: string,
    ref: React.RefObject<HTMLLIElement>,
  ) => void;
  unregisterItem: (itemKey: string) => void;
  moveUp: (itemKey: string) => void;
  moveDown: (itemKey: string) => void;
  focusedItemKey: string | null;
  setFocusedItemKey: (key: string | null) => void;
  draggedItemKey: string | null;
  setDraggedItemKey: (key: string | null) => void;
  dragOverItemKey: string | null;
  setDragOverItemKey: (key: string | null) => void;
  handleItemDrop: (targetKey: string) => void;
  listId: string;
  getItemPosition: (itemKey: string) => number;
  getTotalItems: () => number;
  getItemLabel: (itemKey: string) => string;
  isFirstItem: (itemKey: string) => boolean;
  isLastItem: (itemKey: string) => boolean;
}

const defaultContextValue: ReorderableListContextValue = {
  editMode: false,
  itemOrder: [],
  registerItem: () => null,
  unregisterItem: () => null,
  moveUp: () => null,
  moveDown: () => null,
  focusedItemKey: null,
  setFocusedItemKey: () => null,
  draggedItemKey: null,
  setDraggedItemKey: () => null,
  dragOverItemKey: null,
  setDragOverItemKey: () => null,
  handleItemDrop: () => null,
  listId: '',
  getItemPosition: () => 0,
  getTotalItems: () => 0,
  getItemLabel: () => '',
  isFirstItem: () => false,
  isLastItem: () => false,
};

const { Provider: ReorderableListProvider, Consumer: ReorderableListConsumer } =
  createContext(defaultContextValue);

export { ReorderableListConsumer };

interface BaseReorderableListProps extends ReorderableListProps {
  id: string;
}

interface ReorderableListState {
  internalEditMode: boolean;
  itemOrder: string[];
  focusedItemKey: string | null;
  draggedItemKey: string | null;
  dragOverItemKey: string | null;
  liveAnnouncement: string;
}

class BaseReorderableList extends Component<
  BaseReorderableListProps & SuomifiThemeProp,
  ReorderableListState
> {
  private registeredItems: Map<string, RegisteredItem> = new Map();

  private registrationOrder: string[] = [];

  private editButtonRef = createRef<HTMLButtonElement>();

  private announcementTimer: ReturnType<typeof setTimeout> | null = null;

  state: ReorderableListState = {
    internalEditMode: false,
    itemOrder: [],
    focusedItemKey: null,
    draggedItemKey: null,
    dragOverItemKey: null,
    liveAnnouncement: '',
  };

  componentWillUnmount() {
    if (this.announcementTimer) {
      clearTimeout(this.announcementTimer);
    }
  }

  private get isEditMode(): boolean {
    const { editMode } = this.props;
    return editMode !== undefined ? editMode : this.state.internalEditMode;
  }

  private get currentOrder(): string[] {
    return this.state.itemOrder.length > 0
      ? this.state.itemOrder
      : this.registrationOrder;
  }

  private announce = (text: string) => {
    if (this.announcementTimer) {
      clearTimeout(this.announcementTimer);
    }
    this.setState({ liveAnnouncement: '' }, () => {
      this.announcementTimer = setTimeout(() => {
        this.setState({ liveAnnouncement: text });
      }, 100);
    });
  };

  private toggleEditMode = () => {
    const { onEditModeChange, announcements, editMode } = this.props;
    const newEditMode = !this.isEditMode;
    const controlled = editMode !== undefined;

    if (!controlled) {
      this.setState({ internalEditMode: newEditMode });
    }

    if (onEditModeChange) {
      onEditModeChange(newEditMode);
    }

    if (newEditMode) {
      this.announce(announcements.editModeActivated());
    } else {
      this.announce(announcements.editModeCancelled());
      this.setState({ focusedItemKey: null });
    }
  };

  private registerItem = (
    itemKey: string,
    ariaLabel: string,
    ref: React.RefObject<HTMLLIElement>,
  ) => {
    this.registeredItems.set(itemKey, { itemKey, ariaLabel, ref });
    if (!this.registrationOrder.includes(itemKey)) {
      this.registrationOrder.push(itemKey);
    }
    if (this.state.itemOrder.length === 0) {
      this.setState({ itemOrder: [...this.registrationOrder] });
    }
  };

  private unregisterItem = (itemKey: string) => {
    this.registeredItems.delete(itemKey);
    this.registrationOrder = this.registrationOrder.filter(
      (k) => k !== itemKey,
    );
  };

  private moveUp = (itemKey: string) => {
    const order = [...this.currentOrder];
    const idx = order.indexOf(itemKey);
    const item = this.registeredItems.get(itemKey);
    const label = item?.ariaLabel || itemKey;

    if (idx <= 0) {
      this.announce(this.props.announcements.cannotMoveUp(label));
      return;
    }

    [order[idx - 1], order[idx]] = [order[idx], order[idx - 1]];
    this.setState({ itemOrder: order });
    this.props.onReorder(order);
    this.announce(this.props.announcements.movedUp(label, idx, order.length));
  };

  private moveDown = (itemKey: string) => {
    const order = [...this.currentOrder];
    const idx = order.indexOf(itemKey);
    const item = this.registeredItems.get(itemKey);
    const label = item?.ariaLabel || itemKey;

    if (idx >= order.length - 1) {
      this.announce(this.props.announcements.cannotMoveDown(label));
      return;
    }

    [order[idx], order[idx + 1]] = [order[idx + 1], order[idx]];
    this.setState({ itemOrder: order });
    this.props.onReorder(order);
    this.announce(
      this.props.announcements.movedDown(label, idx + 2, order.length),
    );
  };

  private handleItemDrop = (targetKey: string) => {
    const { draggedItemKey } = this.state;
    if (!draggedItemKey || draggedItemKey === targetKey) {
      this.setState({ draggedItemKey: null, dragOverItemKey: null });
      return;
    }

    const order = [...this.currentOrder];
    const fromIdx = order.indexOf(draggedItemKey);
    const toIdx = order.indexOf(targetKey);

    if (fromIdx === -1 || toIdx === -1) return;

    const draggedLabel =
      this.registeredItems.get(draggedItemKey)?.ariaLabel || draggedItemKey;
    const targetLabel =
      this.registeredItems.get(targetKey)?.ariaLabel || targetKey;

    [order[fromIdx], order[toIdx]] = [order[toIdx], order[fromIdx]];
    this.setState({
      itemOrder: order,
      draggedItemKey: null,
      dragOverItemKey: null,
    });
    this.props.onReorder(order);
    this.announce(
      this.props.announcements.itemsSwapped(draggedLabel, targetLabel),
    );
  };

  private getItemPosition = (itemKey: string): number =>
    this.currentOrder.indexOf(itemKey) + 1;

  private getTotalItems = (): number => this.currentOrder.length;

  private getItemLabel = (itemKey: string): string =>
    this.registeredItems.get(itemKey)?.ariaLabel || itemKey;

  private isFirstItem = (itemKey: string): boolean =>
    this.currentOrder.indexOf(itemKey) === 0;

  private isLastItem = (itemKey: string): boolean =>
    this.currentOrder.indexOf(itemKey) === this.currentOrder.length - 1;

  private setFocusedItemKey = (key: string | null) => {
    this.setState({ focusedItemKey: key });
  };

  private setDraggedItemKey = (key: string | null) => {
    this.setState({ draggedItemKey: key });
  };

  private setDragOverItemKey = (key: string | null) => {
    this.setState({ dragOverItemKey: key });
  };

  private handleListKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!this.isEditMode) return;
    const { focusedItemKey } = this.state;

    if (e.key === 'Escape') {
      e.preventDefault();
      this.toggleEditMode();
      this.editButtonRef.current?.focus();
      return;
    }

    if (!focusedItemKey) return;
  };

  private getSortedChildren = (): ReactNode => {
    const { children } = this.props;
    const order = this.currentOrder;

    if (order.length === 0) return children;

    const childArray = React.Children.toArray(children);
    const childMap = new Map<string, React.ReactNode>();

    childArray.forEach((child) => {
      if (React.isValidElement(child) && child.props.itemKey) {
        childMap.set(child.props.itemKey, child);
      }
    });

    const sorted: React.ReactNode[] = [];
    order.forEach((key) => {
      const child = childMap.get(key);
      if (child) {
        sorted.push(child);
        childMap.delete(key);
      }
    });

    childMap.forEach((child) => sorted.push(child));

    return sorted;
  };

  render() {
    const {
      id,
      className,
      children,
      theme,
      editButtonText,
      cancelButtonText,
      editModeInstructionHeading,
      editModeInstructionText,
      announcements,
      onReorder,
      editMode: controlledEditMode,
      onEditModeChange,
      forwardedRef,
      style,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...rest
    } = this.props;

    const [_marginProps, passProps] = separateMarginProps(rest);
    const editMode = this.isEditMode;
    const { liveAnnouncement, focusedItemKey } = this.state;

    const contextValue: ReorderableListContextValue = {
      editMode,
      itemOrder: this.currentOrder,
      registerItem: this.registerItem,
      unregisterItem: this.unregisterItem,
      moveUp: this.moveUp,
      moveDown: this.moveDown,
      focusedItemKey,
      setFocusedItemKey: this.setFocusedItemKey,
      draggedItemKey: this.state.draggedItemKey,
      setDraggedItemKey: this.setDraggedItemKey,
      dragOverItemKey: this.state.dragOverItemKey,
      setDragOverItemKey: this.setDragOverItemKey,
      handleItemDrop: this.handleItemDrop,
      listId: id,
      getItemPosition: this.getItemPosition,
      getTotalItems: this.getTotalItems,
      getItemLabel: this.getItemLabel,
      isFirstItem: this.isFirstItem,
      isLastItem: this.isLastItem,
    };

    return (
      <HtmlDivWithRef
        {...passProps}
        id={id}
        forwardedRef={forwardedRef}
        className={classnames(baseClassName, className, {
          [listClassNames.editMode]: editMode,
        })}
        style={style}
      >
        <ReorderableListProvider value={contextValue}>
          <Button
            className={listClassNames.editButton}
            onClick={this.toggleEditMode}
            forwardedRef={this.editButtonRef}
            aria-pressed={editMode}
          >
            {editMode ? cancelButtonText : editButtonText}
          </Button>

          {editMode && (
            <InlineAlert
              className={listClassNames.instruction}
              labelText={editModeInstructionHeading}
            >
              {editModeInstructionText}
            </InlineAlert>
          )}

          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <HtmlDiv
            className={listClassNames.list}
            role={editMode ? 'application' : undefined}
            aria-roledescription={editMode ? 'Reorderable list' : undefined}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            onKeyDown={this.handleListKeyDown}
          >
            <ul>{this.getSortedChildren()}</ul>
          </HtmlDiv>

          <VisuallyHidden
            className={listClassNames.liveRegion}
            aria-live="assertive"
            aria-atomic="true"
            role="status"
          >
            {liveAnnouncement}
          </VisuallyHidden>
        </ReorderableListProvider>
      </HtmlDivWithRef>
    );
  }
}

const StyledReorderableList = styled(
  ({
    theme,
    globalMargins,
    ...passProps
  }: BaseReorderableListProps & SuomifiThemeProp & GlobalMarginProps) => (
    <BaseReorderableList {...passProps} theme={theme} />
  ),
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.reorderableList || {},
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const ReorderableList = forwardRef<HTMLDivElement, ReorderableListProps>(
  (props: ReorderableListProps, ref: React.Ref<HTMLDivElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SpacingConsumer>
        {({ margins }) => (
          <SuomifiThemeConsumer>
            {({ suomifiTheme }) => (
              <AutoId id={propId}>
                {(id) => (
                  <StyledReorderableList
                    forwardedRef={ref}
                    theme={suomifiTheme}
                    globalMargins={margins}
                    id={id}
                    {...passProps}
                  />
                )}
              </AutoId>
            )}
          </SuomifiThemeConsumer>
        )}
      </SpacingConsumer>
    );
  },
);

ReorderableList.displayName = 'ReorderableList';
export { ReorderableList, ReorderableListProvider };
