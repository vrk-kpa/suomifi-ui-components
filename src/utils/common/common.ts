import React, { MutableRefObject, Ref } from 'react';
import { getLogger } from '../../utils/log';

export function windowAvailable() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

export const useEnhancedEffect = windowAvailable()
  ? React.useLayoutEffect
  : React.useEffect;

export const getOwnerDocument = (elementRef: React.RefObject<any>) => {
  if (elementRef !== null && elementRef.current !== null) {
    const elem = elementRef.current;
    const ownerDocument = windowAvailable()
      ? elem
        ? elem.ownerDocument
        : document
      : null;
    return ownerDocument;
  }
  return null;
};

/**
 * This function takes an object and removes all properties that are present in the filterObject.
 * Used in cleaning up generated style properties
 */
export function filterDuplicateKeys<T extends object, U extends object>(
  mainObject?: T,
  filterObject?: U,
): Partial<T> {
  if (!mainObject) {
    return {};
  }
  return mainObject && filterObject
    ? (Object.fromEntries(
        Object.entries(mainObject).filter(
          ([key]) => !Object.prototype.hasOwnProperty.call(filterObject, key),
        ),
      ) as Partial<T>)
    : {};
}

export const escapeStringRegexp = (string: String) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/-/g, '\\x2d');

/** Idea for implementation more or less from react-fork-ref and @reach compose refs */
export const forkRefs =
  <T>(...refs: Ref<T>[]) =>
  (element: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(element);
      } else if (!!ref) {
        try {
          /* eslint-disable no-param-reassign */
          (ref as MutableRefObject<T | null>).current = element;
        } catch {
          getLogger().error(`Cannot assign element ${element} to ref ${ref}`);
        }
      }
    });
  };

// String is of type XX:YY or XX.YY where XX is 0-24 and YY is 0-59
const isValidTimeString = (timeStr: string) => {
  if (timeStr.match(/^\d{1,2}\.\d{2}$/) || timeStr.match(/^\d{1,2}\:\d{2}$/)) {
    const parts = timeStr.split(timeStr.includes('.') ? '.' : ':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    if (hours >= 0 && hours < 25 && minutes >= 0 && minutes < 60) {
      return true;
    }
  }

  return false;
};

/**
 * Contains logic to autocomplete a time string in certain scenarios:
 *  - 1-2 characters which form a valid hour designation are autocompleted to full time: 14 --> 14.00 and 9 --> 9.00
 *  - 4 characters which form a valid "military time" will be autocompleted to full time: 1400 --> 14.00
 *  - A leading zero will be removed from hours in an otherwise valid time: 09.00 --> 9.00
 *  - The colon : character will be replaced by the dot . character in an otherwise valid time: 12:00 --> 12.00
 * @param timeStr Time input value
 * @returns An autocompleted time string or `null` if no automatic completions could be perfomed
 */
export const autocompleteTimeString = (timeStr: string): string | null => {
  if (!timeStr.match(/^[0-9:.]+$/)) return null;

  const inputValInt = parseInt(timeStr, 10);

  // Handle automatic filling of 1 or 2 characters
  // Also remove leading zero from hours
  if (timeStr.match(/^\d{1,2}$/) && inputValInt >= 0 && inputValInt < 25) {
    return `${inputValInt}.00`;
  }

  // Handle automatic filling of 4 characters: 1400 --> 14.00
  // Also remove leading zero from hours
  if (
    timeStr.match(/^\d{4}$/) &&
    isValidTimeString(`${timeStr[0]}${timeStr[1]}.${timeStr[2]}${timeStr[3]}`)
  ) {
    const hoursInt = parseInt(`${timeStr[0]}${timeStr[1]}`, 10);
    return `${hoursInt}.${timeStr[2]}${timeStr[3]}`;
  }

  // Remove leading zero from an otherwise valid time
  if (isValidTimeString(timeStr) && timeStr[0] === '0') {
    return `${timeStr[1]}.${timeStr[3]}${timeStr[4]}`;
  }

  // Change : to . in an otherwise valid time
  if (isValidTimeString(timeStr)) {
    return timeStr.replace(':', '.');
  }

  return null;
};

/**
 * The following interface allows data-* attributes in places where props are defined outside JSX.
 * Typescript allows non-javascript props by default, but only inside JSX.
 * E.g. The basic React.HTMLAttributes interface throws errors when trying to do something like
 * <Component wrapperProps={{ 'data-testid': 'something' }}
 * Solution inspired by: https://github.com/microsoft/TypeScript/issues/28960
 */
export interface HTMLAttributesIncludingDataAttributes<T>
  extends React.HTMLAttributes<T> {
  [dataAttribute: `data-${string}`]: any;
}
