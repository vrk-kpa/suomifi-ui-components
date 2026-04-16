import React, { Component, forwardRef, ReactNode, createRef } from 'react';
import { styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlLi, HtmlLiProps } from '../../../reset';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { Button } from '../../Button/Button';
import {
  IconOptionsVertical,
  IconChevronUp,
  IconChevronDown,
} from 'suomifi-icons';
import {
  ReorderableListConsumer,
  ReorderableListContextValue,
} from '../ReorderableList/ReorderableList';
import { baseStyles } from './ReorderableListItem.baseStyles';
import { InteractionBlocker } from '../IntearctionBlocker/InteractionBlocker';

const baseClassName = 'fi-reorderable-list-item';
const itemClassNames = {
  inner: `${baseClassName}_inner`,
  dragHandle: `${baseClassName}_drag-handle`,
  content: `${baseClassName}_content`,
  buttons: `${baseClassName}_buttons`,
  buttonUp: `${baseClassName}_button-up`,
  buttonDown: `${baseClassName}_button-down`,
  dragging: `${baseClassName}--dragging`,
  dragOver: `${baseClassName}--drag-over`,
  viewMode: `${baseClassName}--view-mode`,
  editMode: `${baseClassName}--edit-mode`,
};

export interface ReorderableListItemProps extends Omit<HtmlLiProps, 'ref'> {
  /** Unique identifier for order tracking */
  itemKey: string;
  /** Accessible label for announcements */
  ariaLabel: string;
  /** Accessible label for move up button */
  moveUpButtonAriaLabel: string;
  /** Accessible label for move down button */
  moveDownButtonAriaLabel: string;
  /** Item content - any ReactNode */
  children: ReactNode;
  /** CSS class for custom styles */
  className?: string;
  /** Ref is placed to the li element. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLLIElement>;
}

interface BaseReorderableListItemProps extends ReorderableListItemProps {
  consumer: ReorderableListContextValue;
}

class BaseReorderableListItem extends Component<
  BaseReorderableListItemProps & SuomifiThemeProp
> {
  private liRef = createRef<HTMLLIElement>();

  private upButtonRef = createRef<HTMLButtonElement>();

  private downButtonRef = createRef<HTMLButtonElement>();

  componentDidMount() {
    const { consumer, itemKey, ariaLabel } = this.props;
    consumer.registerItem(itemKey, ariaLabel, this.liRef);
  }

  componentDidUpdate(
    prevProps: BaseReorderableListItemProps & SuomifiThemeProp,
  ) {
    const { consumer, itemKey: key, ariaLabel } = this.props;
    if (prevProps.ariaLabel !== ariaLabel) {
      consumer.registerItem(key, ariaLabel, this.liRef);
    }
  }

  componentWillUnmount() {
    const { consumer, itemKey } = this.props;
    consumer.unregisterItem(itemKey);
  }

  private handleMoveUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { consumer, itemKey } = this.props;
    const wasFirst = consumer.isFirstItem(itemKey);
    consumer.moveUp(itemKey);
    if (!wasFirst) {
      requestAnimationFrame(() => {
        this.upButtonRef.current?.focus();
      });
    }
  };

  private handleMoveDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { consumer, itemKey } = this.props;
    const wasLast = consumer.isLastItem(itemKey);
    consumer.moveDown(itemKey);
    if (!wasLast) {
      requestAnimationFrame(() => {
        this.downButtonRef.current?.focus();
      });
    }
  };

  private handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const { consumer, itemKey } = this.props;
    consumer.setDraggedItemKey(itemKey);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', itemKey);
  };

  private handleDragEnd = () => {
    const { consumer } = this.props;
    consumer.setDraggedItemKey(null);
    consumer.setDragOverItemKey(null);
  };

  private handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  private handleDragEnter = () => {
    const { consumer, itemKey } = this.props;
    if (consumer.draggedItemKey && consumer.draggedItemKey !== itemKey) {
      consumer.setDragOverItemKey(itemKey);
    }
  };

  private handleDragLeave = () => {
    const { consumer, itemKey } = this.props;
    if (consumer.dragOverItemKey === itemKey) {
      consumer.setDragOverItemKey(null);
    }
  };

  private handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { consumer, itemKey } = this.props;
    consumer.handleItemDrop(itemKey);
  };

  render() {
    const {
      itemKey,
      ariaLabel,
      moveUpButtonAriaLabel,
      moveDownButtonAriaLabel,
      children,
      className,
      consumer,
      theme,
      forwardedRef,
      ...passProps
    } = this.props;

    const { editMode } = consumer;
    const isDragging = consumer.draggedItemKey === itemKey;
    const isDragOver = consumer.dragOverItemKey === itemKey && !isDragging;
    const isFirst = consumer.isFirstItem(itemKey);
    const isLast = consumer.isLastItem(itemKey);

    const combinedRef = (node: HTMLLIElement | null) => {
      (this.liRef as React.MutableRefObject<HTMLLIElement | null>).current =
        node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLLIElement | null>).current =
          node;
      }
    };

    return (
      <HtmlLi
        {...passProps}
        forwardedRef={combinedRef}
        role="listitem"
        aria-label={editMode ? ariaLabel : undefined}
        className={classnames(baseClassName, className, {
          [itemClassNames.dragging]: isDragging,
          [itemClassNames.dragOver]: isDragOver,
          [itemClassNames.viewMode]: !editMode,
          [itemClassNames.editMode]: editMode,
        })}
      >
        <HtmlDiv
          className={itemClassNames.inner}
          draggable={editMode}
          onDragStart={editMode ? this.handleDragStart : undefined}
          onDragEnd={editMode ? this.handleDragEnd : undefined}
          onDragOver={editMode ? this.handleDragOver : undefined}
          onDragEnter={editMode ? this.handleDragEnter : undefined}
          onDragLeave={editMode ? this.handleDragLeave : undefined}
          onDrop={editMode ? this.handleDrop : undefined}
        >
          {editMode && (
            <HtmlDiv className={itemClassNames.buttons}>
              <Button
                variant="secondaryNoBorder"
                className={classnames(itemClassNames.buttonUp, {
                  [`${baseClassName}_button--boundary`]: isFirst,
                })}
                aria-label={moveUpButtonAriaLabel}
                onClick={this.handleMoveUp}
                icon={<IconChevronUp />}
                forwardedRef={this.upButtonRef}
              />
              <Button
                variant="secondaryNoBorder"
                className={classnames(itemClassNames.buttonDown, {
                  [`${baseClassName}_button--boundary`]: isLast,
                })}
                aria-label={moveDownButtonAriaLabel}
                onClick={this.handleMoveDown}
                icon={<IconChevronDown />}
                forwardedRef={this.downButtonRef}
              />
            </HtmlDiv>
          )}
          <InteractionBlocker
            className={itemClassNames.content}
            {...(editMode
              ? { disableInteraction: true }
              : { disableInteraction: false })}
          >
            {children}
          </InteractionBlocker>
          {editMode && (
            <HtmlDiv className={itemClassNames.dragHandle} aria-hidden="true">
              <IconOptionsVertical
                className={`${baseClassName}_drag-handle-icon`}
              />
              <IconOptionsVertical
                className={`${baseClassName}_drag-handle-icon`}
              />
            </HtmlDiv>
          )}
        </HtmlDiv>
      </HtmlLi>
    );
  }
}

const StyledReorderableListItem = styled(
  ({
    theme,
    ...passProps
  }: BaseReorderableListItemProps & SuomifiThemeProp) => (
    <BaseReorderableListItem {...passProps} theme={theme} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const ReorderableListItem = forwardRef<HTMLLIElement, ReorderableListItemProps>(
  (props: ReorderableListItemProps, ref: React.Ref<HTMLLIElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <ReorderableListConsumer>
          {(consumer) => (
            <StyledReorderableListItem
              theme={suomifiTheme}
              forwardedRef={ref}
              consumer={consumer}
              {...props}
            />
          )}
        </ReorderableListConsumer>
      )}
    </SuomifiThemeConsumer>
  ),
);

ReorderableListItem.displayName = 'ReorderableListItem';
export { ReorderableListItem };
