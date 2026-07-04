# TODO

Design breakdown for the Tic-Tac-Toe game, following SOLID principles. Each item is a
self-contained unit of work; later items depend on the abstractions introduced earlier.

- [x] 1. Project scaffolding — base folder structure, `index.html` shell, empty entry point and
      stylesheet.
- [x] 2. `Board` — owns the 3x3 grid state only (cell values, empty-cell lookup, reset).
      Single Responsibility: no game rules, no rendering.
- [x] 3. `Player` — represents a participant and their mark (X/O).
- [x] 4. `WinChecker` — a `WinStrategy` interface plus a default 3x3 implementation that detects
      a win or a draw. Open/Closed: new rule sets (e.g. bigger boards) can be added later without
      touching existing code.
- [x] 5. `GameEngine` — orchestrates `Board`, `Player`s and a `WinStrategy`, all received via
      constructor injection. Dependency Inversion: the engine depends on abstractions, not
      concrete implementations.
- [x] 6. `Renderer` — a rendering interface plus a DOM-based implementation. Keeps game logic
      completely unaware of the DOM (Dependency Inversion / Interface Segregation).
- [x] 7. `InputHandler` — translates DOM click events into moves sent to `GameEngine`, kept
      separate from rendering concerns (Interface Segregation).
- [x] 8. Composition root — wire `Board`, `Player`s, `WinChecker`, `Renderer` and `InputHandler`
      together in `main.js`.
- [x] 9. Styling — CSS for the board grid, cells and game status message.
- [ ] 10. Documentation — README with game rules, how to run it, and how the modules map to
      SOLID principles.
