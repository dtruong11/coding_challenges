const createGrid = (rowLen, colLen) => {
  const grid = new Array(rowLen);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(colLen).fill(0);
  }
  return grid;
};

const grid = createGrid(6, 9);
const walls = [
  [0, 0],
  [1, 0],
  [1, 2],
  [1, 3],
  [0, 6],
  [0, 8],
  [2, 4],
  [2, 5],
  [2, 7],
  [3, 5],
  [4, 5],
  [4, 8],
  [5, 4],
  [5, 7],
  [5, 8],
];

const dashMarts = [
  [0, 3],
  [2, 3],
  [3, 3],
];
for (const wall of walls) {
  grid[wall[0]][wall[1]] = "X";
}

for (const mart of dashMarts) {
  grid[mart[0]][mart[1]] = "D";
}

// console.log("grid", grid);

/**
grid [
  ['X',0, 0, 'D', 0,  0, 'X', 0, 'X'],
  ['X',0,'X','X', 0,  0,  0,  0,  0],
  [ 0, 0, 0, 'D','X','X', 0, 'X', 0],
  [ 0, 0, 0, 'D', 0, 'X', 0,  0,  0],
  [ 0, 0, 0,  0,  0, 'X', 0,  0, 'X'],
  [ 0, 0, 0,  0, 'X', 0,  0, 'X','X']
]
 */
function findClosestDashMart(matrix, destR, destC) {
  if (
    destR >= matrix.length ||
    destR < 0 ||
    destC >= matrix[0].length ||
    destC < 0
  ) {
    return -1;
  }

  const queue = [];

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      if (matrix[r][c] === "D") {
        queue.push([r, c]);
      }
    }
  }

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  let distance = 0;
  while (queue.length) {
    const queueSize = queue.length;
    for (let i = 0; i < queueSize; i++) {
      const [curRow, curCol] = queue.shift();
      if (curRow === destR && curCol === destC) {
        return distance;
      }

      if (distance !== 0) {
        matrix[curRow][curCol] = distance;
      }

      for (const [rowOffset, colOffset] of directions) {
        const newRow = curRow + rowOffset;
        const newCol = curCol + colOffset;

        if (isValidPosition(matrix, newRow, newCol)) {
          queue.push([newRow, newCol]);
        }
      }
    }
    distance += 1;
  }
}

function isValidPosition(matrix, r, c) {
  if (
    r < 0 ||
    r >= matrix.length ||
    c < 0 ||
    c >= matrix[0].length ||
    matrix[r][c] !== 0
  ) {
    return false;
  }
  return true;
}

console.log(
  "findClosestDashMart",
  findClosestDashMart(grid, 1, 8),
  "grid",
  grid
);
