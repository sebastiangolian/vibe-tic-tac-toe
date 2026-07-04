// Abstraction for win/draw detection. New board sizes or rule sets can provide their own
// implementation without changing anything that depends on this interface (Open/Closed).
export class WinStrategy {
  /**
   * @param {import("./Board.js").Board} board
   * @returns {{ status: "win" | "draw" | "in-progress", winner: unknown | null }}
   */
  getResult(board) {
    throw new Error("getResult must be implemented by a subclass");
  }
}
