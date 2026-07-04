// Represents a participant and their mark on the board.
export class Player {
  #name;
  #mark;

  constructor(name, mark) {
    this.#name = name;
    this.#mark = mark;
  }

  get name() {
    return this.#name;
  }

  get mark() {
    return this.#mark;
  }
}
