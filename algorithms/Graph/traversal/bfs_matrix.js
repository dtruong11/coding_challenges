import { Queue } from '../../../data_structures/queue.js'

function createMatrix(row_len, col_len) {
  // Create an empty 2D matrix
  const matrix = new Array(row_len);

  // Initialize each row with an array of zeroes
  for (let i = 0; i < row_len; i++) {
    matrix[i] = new Array(col_len).fill(0);
  }

  return matrix;
}

// 3 is a starting point. 4 is the end point. 1 is an obstacle. 0 are free. 
const matrix = [
  [0, 4, 0, 0],
  [1, 0, 0, 1],
  [0, 0, 3, 0],
  [1, 0, 0, 0]
]

function bfsShortestDistance(matrix, start, end) {
  const row_len = matrix.length
  const col_len = matrix[0].length

  const queue = new Queue()

}

// BFS - first time finding the path => also find the shortest path. 
function shortestDist(startX, startY) {
  // iterate through matrix to find start point 
  const matrixLen = matrix.length
  const numCols = matrix[0].length

  function bfs(startX, startY) {
    const queue = new Queue()

    queue.push([startX, startY, 0])

    while (queue.length) {
      const [r, c, dist] = queue.unshift()

      if (matrix[r][c] === 4) {
        return dist
      }

      if (isInbound(r + 1, c)) queue.push([r + 1, c, dist + 1])
      if (isInbound(r - 1, c)) queue.push([r - 1, c, dist + 1])
      if (isInbound(r, c + 1)) queue.push([r, c + 1, dist + 1])
      if (isInbound(r, c - 1)) queue.push([r, c - 1, dist + 1])
    }

    return -1 // never find a path 
  }
}

