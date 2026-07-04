// Orchestrates a match: turn order, moves and outcome detection.
// Depends only on the Board and WinStrategy abstractions, received via constructor injection
// (Dependency Inversion) — it has no knowledge of their concrete implementations.
export class GameEngine {
  #board;
  #players;
  #winStrategy;
  #currentPlayerIndex;
  #result;

  constructor(board, players, winStrategy) {
    if (players.length < 2) {
      throw new Error("GameEngine requires at least two players");
    }

    this.#board = board;
    this.#players = players;
    this.#winStrategy = winStrategy;
    this.#currentPlayerIndex = 0;
    this.#result = GameEngine.#initialResult();
  }

  get board() {
    return this.#board;
  }

  get currentPlayer() {
    return this.#players[this.#currentPlayerIndex];
  }

  get result() {
    return this.#result;
  }

  isOver() {
    return this.#result.status !== "in-progress";
  }

  playMove(cellIndex) {
    if (this.isOver()) {
      throw new Error("Cannot play a move after the game has ended");
    }

    this.#board.setCell(cellIndex, this.currentPlayer.mark);
    this.#result = this.#winStrategy.getResult(this.#board);

    if (!this.isOver()) {
      this.#advanceToNextPlayer();
    }
  }

  reset() {
    this.#board.reset();
    this.#currentPlayerIndex = 0;
    this.#result = GameEngine.#initialResult();
  }

  #advanceToNextPlayer() {
    this.#currentPlayerIndex = (this.#currentPlayerIndex + 1) % this.#players.length;
  }

  static #initialResult() {
    return { status: "in-progress", winner: null, line: null };
  }
}
