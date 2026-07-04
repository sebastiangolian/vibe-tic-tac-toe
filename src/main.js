import { Board } from "./Board.js";
import { Player } from "./Player.js";
import { ThreeByThreeWinStrategy } from "./ThreeByThreeWinStrategy.js";
import { GameEngine } from "./GameEngine.js";
import { DomRenderer } from "./DomRenderer.js";
import { InputHandler } from "./InputHandler.js";

const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const winLineElement = document.getElementById("win-line");
const resetButton = document.getElementById("reset-button");

const board = new Board();
const players = [new Player("Player X", "X"), new Player("Player O", "O")];
const winStrategy = new ThreeByThreeWinStrategy();
const engine = new GameEngine(board, players, winStrategy);
const renderer = new DomRenderer(boardElement, statusElement, winLineElement);

function describeResult() {
  const { status, winner } = engine.result;

  if (status === "win") {
    return `${winner} wins!`;
  }

  if (status === "draw") {
    return "It's a draw!";
  }

  return `${engine.currentPlayer.mark}'s turn`;
}

function update() {
  renderer.render(engine.board.getCells(), describeResult(), engine.result.line);
}

new InputHandler(boardElement, (index) => {
  if (engine.isOver() || !engine.board.isCellEmpty(index)) {
    return;
  }

  engine.playMove(index);
  update();
});

resetButton.addEventListener("click", () => {
  engine.reset();
  update();
});

update();
