// Abstraction for presenting game state. Concrete renderers (DOM, console, ...) can be swapped
// without the game logic ever depending on them directly (Dependency Inversion).
export class Renderer {
  /**
   * @param {Array<unknown | null>} cells
   * @param {string} statusMessage
   * @param {number[] | null} winningLine
   */
  render(cells, statusMessage, winningLine) {
    throw new Error("render must be implemented by a subclass");
  }
}
