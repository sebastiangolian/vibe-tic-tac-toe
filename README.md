# vibe-tic-tac-toe

A Tic-Tac-Toe game built with vanilla JavaScript, designed around SOLID principles.

Play it here: https://sebastiangolian.github.io/vibe-tic-tac-toe/

## Rules

Two players, X and O, take turns marking empty cells on a 3x3 grid. The first player to line up
three of their own marks horizontally, vertically or diagonally wins. If all nine cells are filled
without a winner, the game ends in a draw. X always moves first.

## Running locally

The game is a static site with no build step or dependencies. Serve the project root with any
static file server and open it in a browser, for example:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Architecture

Each module has a single, narrow responsibility, and the game is assembled from small,
independently replaceable pieces:

| Module | Responsibility |
| --- | --- |
| [`src/Board.js`](src/Board.js) | Owns the 3x3 grid state only — no game rules, no rendering (**Single Responsibility**). |
| [`src/Player.js`](src/Player.js) | Represents a participant and their mark. |
| [`src/WinStrategy.js`](src/WinStrategy.js) | Abstraction for win/draw detection. New rule sets can be added without changing existing code (**Open/Closed**). |
| [`src/ThreeByThreeWinStrategy.js`](src/ThreeByThreeWinStrategy.js) | Default win/draw rules for a standard 3x3 board; substitutable for any other `WinStrategy` implementation (**Liskov Substitution**). |
| [`src/GameEngine.js`](src/GameEngine.js) | Orchestrates turns and moves. Receives `Board`, `Player`s and a `WinStrategy` via constructor injection, depending only on their abstractions (**Dependency Inversion**). |
| [`src/Renderer.js`](src/Renderer.js) | Abstraction for presenting game state, so the game logic never depends on a concrete UI (**Dependency Inversion**). |
| [`src/DomRenderer.js`](src/DomRenderer.js) | Draws the board and status message into the DOM. |
| [`src/InputHandler.js`](src/InputHandler.js) | Translates DOM clicks into move requests through a callback, without depending on `GameEngine`'s full interface (**Interface Segregation**). |
| [`src/main.js`](src/main.js) | Composition root — the only place that wires all the concrete pieces together. |

See [TODO.md](TODO.md) for the original design breakdown and progress.

## Versioning

The version shown in the bottom-right corner ([`src/version.js`](src/version.js)) is bumped
automatically on every deploy to `main` by [`scripts/bump-version.js`](scripts/bump-version.js),
based on Conventional Commit messages pushed in that deploy:

- a breaking change (`feat!:`, `fix!:`, or a `BREAKING CHANGE` footer) bumps the **major** version,
- `feat:` bumps the **minor** version,
- anything else (`fix:`, `chore:`, ...) bumps the **patch** version.

The bump commit is pushed back to `main` with a `[skip ci]` marker so it doesn't trigger another
deploy.
