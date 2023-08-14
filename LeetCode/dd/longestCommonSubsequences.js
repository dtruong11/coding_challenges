/**
 * https://www.techiedelight.com/longest-common-subsequence-finding-lcs/
Print all longest common sub-sequences in lexicographical order
You are given two strings, the task is to print all the longest common sub-sequences in lexicographical order.

Examples: 

Input:  text1 = abcbdab, text2 = bdcaba
Output: bcab, bcba, bdab

matrix [
       0  1  2  3  4  5  6
          b  d  c  a  b  a
0     [0, 0, 0, 0, 0, 0, 0],
1  a  [0, 0, 0, 0, 1, 1, 1],
2  b  [0, 1, 1, 1, 1, 2, 2],
3  c  [0, 1, 1, 2, 2, 2, 2],
4  b  [0, 1, 1, 2, 2, 3, 3],
5  d  [0, 1, 2, 2, 2, 3, 3],
6  a  [0, 1, 2, 2, 3, 3, 4],
7  b  [0, 1, 2, 2, 3, 4, 4]
]

Input : str1 = "abcabcaa", str2 = "acbacba"
Output: ababa
        abaca
        abcba
        acaba
        acaca
        acbaa
        acbca


matrix [
       a  c  b  a  c  b  a
   [0, 0, 0, 0, 0, 0, 0, 0],
a  [0, 1, 1, 1, 1, 1, 1, 1],
b  [0, 1, 1, 2, 2, 2, 2, 2],
c  [0, 1, 2, 2, 2, 3, 3, 3],
a  [0, 1, 2, 2, 3, 3, 3, 4],
b  [0, 1, 2, 3, 3, 3, 4, 4],
c  [0, 1, 2, 3, 3, 4, 4, 4],
a  [0, 1, 2, 3, 4, 4, 4, 5],
a  [0, 1, 2, 3, 4, 4, 4, 5]
]
*/

// print one LCS which is the longest LCS

function printLCS (text1, text2) {
  const matrix = buildLCSMatrix(text1, text2)
  const result = []

  function backtrack (r, c, strArr) {
    if (r === 0 || c === 0) {
      result.push([...strArr].reverse().join(''))
      return
    }

    // console.log('matrix[r][c]', matrix[r][c], 'r', r, 'c', c)

    if (text1[r - 1] === text2[c - 1]) {
      strArr.push(text1[r - 1])
      backtrack(r - 1, c - 1, strArr)
      strArr.pop()
    } else {
      // same length at left and top
      if (matrix[r][c - 1] === matrix[r - 1][c]) {
        backtrack(r, c - 1, strArr)
        backtrack(r - 1, c, strArr)
      } else if (matrix[r][c - 1] > matrix[r - 1][c]) {
        backtrack(r, c - 1, strArr)
      } else {
        backtrack(r - 1, c, strArr)
      }
    }
  }

  backtrack(matrix.length - 1, matrix[0].length - 1, [])
  return result
}


function buildLCSMatrix (text1, text2) {
  const rowLen = text1.length
  const colLen = text2.length

  const grid = Array.from(new Array(rowLen + 1), () => new Array(colLen + 1).fill(0))

  for (let r = 1; r < grid.length; r++) {
    for (let c = 1; c < grid[0].length; c++) {
      if (text1[r - 1] === text2[c - 1]) {
        grid[r][c] = 1 + grid[r - 1][c - 1]
      } else {
        grid[r][c] = Math.max(grid[r][c - 1], grid[r - 1][c])
      }
    }
  }
  return grid
}

console.log(printLCS('abcbdab', 'bdcaba'))