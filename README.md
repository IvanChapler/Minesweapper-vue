# Minesweeper-game!

Hi, this is a classic minesweeper game made on Vue 3 + Vite with a cool design and some features

## Rules of the game

The playing field is a rectangle of cells. At the beginning of the game, all the cells are "closed" - there is nothing on them. At the beginning of the game, mines are placed randomly under the cells, without being shown to the player

The player can click the left mouse button on any unopened cell to open it, the rules for opening cells:

If there is a mine in the cage, then the player loses
If there is at least one mine in the next 8 cells bordering it at least at an angle, then the cell will show the number of mines in these cells
The digit should have a color depending on the number of mines around: 1 — blue, 2 — green, 3 — red, 4 — dark blue 5 - brown 6 — turquoise 7 — black 8 — white
If the first two conditions are not met, then the cell automatically opens all eight cells around it and remains empty. So the cells should open until they reach the border of the playing field or stumble upon the cells under which there will be numbers
The player can put a mark on an uncovered cell with the right mouse button. Available labels: "checkbox", "question" and without a label, change cyclically

If all fields are either open or flagged, and the counter is 0, then the player wins
