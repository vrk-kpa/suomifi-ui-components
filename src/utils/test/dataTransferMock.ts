/* eslint-disable max-classes-per-file */

/**
 * jsdom does not implement DataTransfer (https://github.com/jsdom/jsdom/issues/1568),
 * so components which build FileLists with `new DataTransfer()` (FileInput) cannot be
 * tested without a mock.
 *
 * Two things are needed:
 *
 * 1. A DataTransfer/DataTransferItemList implementation. Installed as a global in
 *    jest/jest.setup.js so component internals can call `new DataTransfer()`.
 * 2. A way to produce a *genuine* FileList. This is the part that cannot be faked with a
 *    plain object: jsdom's `HTMLInputElement.files` setter runs a WebIDL brand check and
 *    rejects anything that is not a real FileList wrapper. FileList itself is not
 *    constructible, so createFileList() borrows the empty FileList that jsdom creates
 *    lazily for a detached file input and pushes files into its backing implementation
 *    (which extends Array).
 */

/** Description of the symbol jsdom uses to attach the implementation to a wrapper object */
const JSDOM_IMPL_SYMBOL = 'Symbol(impl)';

/**
 * Creates a real FileList containing the given files.
 *
 * The returned object is a genuine jsdom FileList, so it can be assigned to
 * `inputElement.files` and passes `instanceof FileList`.
 */
export const createFileList = (files: File[] = []): FileList => {
  const input = document.createElement('input');
  input.type = 'file';
  // jsdom lazily creates an empty FileList for file inputs on first access
  const fileList = input.files;

  const implSymbol = fileList
    ? Object.getOwnPropertySymbols(fileList).find(
        (symbol) => symbol.toString() === JSDOM_IMPL_SYMBOL,
      )
    : undefined;

  if (!fileList || !implSymbol) {
    throw new Error(
      'createFileList(): could not access the jsdom FileList implementation. ' +
        'The jsdom internals this helper relies on have most likely changed.',
    );
  }

  // jsdom's FileListImpl extends Array, and the wrapper reads through to it
  const impl = (fileList as unknown as Record<symbol, File[]>)[implSymbol];
  impl.length = 0;
  impl.push(...files);

  return fileList;
};

class DataTransferItemMock {
  public readonly kind: 'file' | 'string';

  public readonly type: string;

  private readonly file: File | null;

  private readonly data: string;

  constructor(data: File | string, type?: string) {
    if (typeof data === 'string') {
      this.kind = 'string';
      this.type = type || 'text/plain';
      this.file = null;
      this.data = data;
    } else {
      this.kind = 'file';
      this.type = data.type;
      this.file = data;
      this.data = '';
    }
  }

  getAsFile(): File | null {
    return this.file;
  }

  getAsString(callback: ((data: string) => void) | null): void {
    if (callback) {
      // Matches the spec: the callback is invoked asynchronously
      setTimeout(() => callback(this.data), 0);
    }
  }

  static webkitGetAsEntry(): null {
    return null;
  }

  /** Not part of the DOM API. Synchronous access to string data. */
  getValue(): string {
    return this.data;
  }
}

class DataTransferItemListMock {
  private readonly entries: DataTransferItemMock[] = [];

  get length(): number {
    return this.entries.length;
  }

  add(data: File | string, type?: string): DataTransferItemMock {
    const item = new DataTransferItemMock(data, type);
    this.entries.push(item);
    return item;
  }

  remove(index: number): void {
    this.entries.splice(index, 1);
  }

  clear(): void {
    this.entries.length = 0;
  }

  item(index: number): DataTransferItemMock | null {
    return this.entries[index] || null;
  }

  [Symbol.iterator](): IterableIterator<DataTransferItemMock> {
    return this.entries[Symbol.iterator]();
  }

  /** Not part of the DOM API. Used by DataTransferMock. */
  toArray(): DataTransferItemMock[] {
    return [...this.entries];
  }
}

export class DataTransferMock {
  /**
   * NOTE: `items` is deliberately the only own property of an instance. When a mock is
   * passed to fireEvent as `dataTransfer`, testing-library rebuilds it by copying own
   * property names onto a fresh `new window.DataTransfer()`. Anything kept on the
   * prototype (getters, methods) survives that; anything else would be silently dropped
   * or redefined as read-only.
   */
  public readonly items = new DataTransferItemListMock();

  get files(): FileList {
    const files = this.items
      .toArray()
      .filter((item) => item.kind === 'file')
      .map((item) => item.getAsFile() as File);
    return createFileList(files);
  }

  get types(): string[] {
    return this.items
      .toArray()
      .map((item) => (item.kind === 'file' ? 'Files' : item.type));
  }

  static get dropEffect(): string {
    return 'none';
  }

  static get effectAllowed(): string {
    return 'all';
  }

  getData(format: string): string {
    const item = this.items
      .toArray()
      .find((entry) => entry.kind === 'string' && entry.type === format);
    return item ? item.getValue() : '';
  }

  setData(format: string, data: string): void {
    this.items.add(data, format);
  }

  clearData(): void {
    this.items.clear();
  }

  static setDragImage(): void {
    // No-op. Nothing observable in jsdom.
  }
}
