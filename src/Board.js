// Owns the 3x3 grid state only — no game rules, no rendering (Single Responsibility).
export class Board {
  static SIZE = 3;

  #cells;

  constructor() {
    this.#cells = Board.#createEmptyCells();
  }

  static #createEmptyCells() {
    return Array.from({ length: Board.SIZE * Board.SIZE }, () => null);
  }

  getCell(index) {
    this.#assertValidIndex(index);
    return this.#cells[index];
  }

  setCell(index, mark) {
    this.#assertValidIndex(index);
    if (!this.isCellEmpty(index)) {
      throw new Error(`Cell ${index} is already occupied`);
    }
    this.#cells[index] = mark;
  }

  isCellEmpty(index) {
    return this.getCell(index) === null;
  }

  getEmptyCells() {
    return this.#cells
      .map((value, index) => (value === null ? index : null))
      .filter((index) => index !== null);
  }

  isFull() {
    return this.getEmptyCells().length === 0;
  }

  getCells() {
    return [...this.#cells];
  }

  reset() {
    this.#cells = Board.#createEmptyCells();
  }

  #assertValidIndex(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.#cells.length) {
      throw new RangeError(`Invalid cell index: ${index}`);
    }
  }
}
