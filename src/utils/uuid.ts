import { default as uuid } from 'uuid/v4';
export { uuid };

/**
 * Generate unique ID if given id is not defined
 * @param {String} id use this first if set
 */
export const idGenerator = (id?: string) => (!!id ? id : uuid());
