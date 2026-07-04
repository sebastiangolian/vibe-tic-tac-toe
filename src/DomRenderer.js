import { Renderer } from "./Renderer.js";

// Draws board cells and the status message into the DOM. Knows nothing about game rules.
export class DomRenderer extends Renderer {
  #boardElement;
  #statusElement;

  constructor(boardElement, statusElement) {
    super();
    this.#boardElement = boardElement;
    this.#statusElement = statusElement;
  }

  render(cells, statusMessage) {
    this.#renderBoard(cells);
    this.#statusElement.textContent = statusMessage;
  }

  #renderBoard(cells) {
    this.#boardElement.innerHTML = "";

    cells.forEach((mark, index) => {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "cell";
      cell.dataset.index = String(index);
      cell.textContent = mark ?? "";
      cell.disabled = mark !== null;
      this.#boardElement.appendChild(cell);
    });
  }
}
