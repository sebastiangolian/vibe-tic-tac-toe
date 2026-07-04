import { Renderer } from "./Renderer.js";

// Maps a winning line (three cell indices, as produced by ThreeByThreeWinStrategy) to the
// modifier class that positions the win-line overlay for a standard 3x3 grid layout.
const WIN_LINE_CLASS_BY_KEY = {
  "0,1,2": "win-line--row-0",
  "3,4,5": "win-line--row-1",
  "6,7,8": "win-line--row-2",
  "0,3,6": "win-line--col-0",
  "1,4,7": "win-line--col-1",
  "2,5,8": "win-line--col-2",
  "0,4,8": "win-line--diag-main",
  "2,4,6": "win-line--diag-anti",
};

// Draws board cells, the status message and the winning-line overlay into the DOM.
// Knows nothing about game rules beyond the 3x3 layout it renders.
export class DomRenderer extends Renderer {
  #boardElement;
  #statusElement;
  #winLineElement;

  constructor(boardElement, statusElement, winLineElement) {
    super();
    this.#boardElement = boardElement;
    this.#statusElement = statusElement;
    this.#winLineElement = winLineElement;
  }

  render(cells, statusMessage, winningLine = null) {
    this.#renderBoard(cells);
    this.#renderWinLine(winningLine);
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

  #renderWinLine(winningLine) {
    const modifierClass = winningLine ? WIN_LINE_CLASS_BY_KEY[winningLine.join(",")] : null;

    this.#winLineElement.className = "win-line";
    if (modifierClass) {
      this.#winLineElement.classList.add(modifierClass, "is-visible");
    }
  }
}
