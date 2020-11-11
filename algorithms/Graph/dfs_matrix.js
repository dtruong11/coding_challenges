const findCircleNum = function (matrix) {
  let dfs = function (rowIdx, visited) {
    let curRow = matrix[rowIdx]
    if (!curRow) return
    for (let i = 0; i < curRow.length; i++) {
      if (curRow[i] != 0 && !visited.has(i)) {
        visited.add(i)
        dfs(i, visited)
      }
    }
  }

  let maxtrixLength = matrix.length
  let visited = new Set()

  let count = 0;
  for (let n = 0; n < maxtrixLength; n++) {
    if (!visited.has(n)) {
      visited.add(n)
      dfs(n, visited)
      count++
    }
  }
  return count
}

const friendCircles = [
  [1, 1, 0],
  [1, 1, 0],
  [0, 0, 1]
]

const islands = [
  [1, 1, 1, 1, 0],
  [1, 1, 0, 1, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0]
]

const islands1 = [
  [1, 1, 0, 1, 0],
  [1, 1, 0, 0, 1],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 1, 1]
]
console.log(findCircleNum(friendCircles))
console.log(findCircleNum(islands))
console.log(findCircleNum(islands1))


/*
- Time complexity : O(n^2). The complete matrix of size n^2 is traversed.
- Space complexity : O(n). Visited set of size n is used.
*/