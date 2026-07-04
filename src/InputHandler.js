// Translates DOM click events on the board into move requests, decoupled from rendering.
// Depends only on a callback, not on GameEngine's full interface (Interface Segregation).
export class InputHandler {
  #boardElement;
  #onCellSelected;

  constructor(boardElement, onCellSelected) {
    this.#boardElement = boardElement;
    this.#onCellSelected = onCellSelected;
    this.#boardElement.addEventListener("click", this.#handleClick);
  }

  #handleClick = (event) => {
    const cell = event.target.closest("[data-index]");
    if (!cell) {
      return;
    }

    this.#onCellSelected(Number(cell.dataset.index));
  };
}
