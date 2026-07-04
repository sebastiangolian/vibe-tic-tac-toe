import { WinStrategy } from "./WinStrategy.js";

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Default win/draw rules for a standard 3x3 board.
export class ThreeByThreeWinStrategy extends WinStrategy {
  getResult(board) {
    const cells = board.getCells();

    for (const line of WIN_LINES) {
      const [a, b, c] = line;
      if (cells[a] !== null && cells[a] === cells[b] && cells[b] === cells[c]) {
        return { status: "win", winner: cells[a], line };
      }
    }

    if (board.isFull()) {
      return { status: "draw", winner: null, line: null };
    }

    return { status: "in-progress", winner: null, line: null };
  }
}
