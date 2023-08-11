const grid = [
  [1, 1, 2, 3],
  [5, 5, 4, 3],
  [2, 5, 3, 6],
  [3, 5, 5, 6],
];

const grid2 = [
  [1, 1, 1, 1],
  [5, 5, 4, 1],
  [2, 5, 3, 1],
  [3, 5, 5, 1],
];

const createGrid = (rowLen, colLen) => {
  const grid = new Array(rowLen);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(colLen).fill(false);
  }
  return grid;
};
function findLongestPathDuplicateNumbers(matrix) {
  const visited = createGrid(matrix.length, matrix[0].length);

  let result = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      result = Math.max(dfs(matrix, i, j, visited), result);
      visited[i][j] = true;
    }
  }
  return result;
}

function isValidPosition(grid, r, c, visited) {
  if (
    r < 0 ||
    r >= grid.length ||
    c < 0 ||
    c >= grid[0].length ||
    visited[r][c] !== false
  ) {
    return false;
  }
  return true;
}

function dfs(grid, r, c, visited) {
  if (
    r < 0 ||
    r >= grid.length ||
    c < 0 ||
    c >= grid[0].length ||
    visited[r][c] !== false
  ) {
    return;
  }

  visited[r][c] = true;

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  let totalCount = 1;

  for (const [rowOffset, colOffset] of directions) {
    const newRow = rowOffset + r;
    const newCol = colOffset + c;

    if (
      isValidPosition(grid, newRow, newCol, visited) &&
      grid[newRow][newCol] === grid[r][c]
    ) {
      totalCount += dfs(grid, newRow, newCol, visited);
    } else {
      totalCount += 0;
    }
  }

  visited[r][c] = false; // DFS will mark the whole trail as visited. No need to backtrack.
  return totalCount;
}

console.log("grid1", findLongestPathDuplicateNumbers(grid));
console.log("grid2", findLongestPathDuplicateNumbers(grid2));
