const adjGraph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A'],
  'D': ['B'],
  'E': ['J', 'B'],
  'J': ['E'],
}

/**
 * Check if there is a path from start to dest
 * @param {*} graph 
 * @param {string} start 
 * @param {string} dest 
 * @returns {boolean}
 */
function dfs (graph, start, dest) {
  const visited = new Set()
  return dfsUtil(graph, start, dest, visited)
}

function dfsUtil (graph, start, dest, visited) {
  if (!start) return false
  if (visited.has(start)) return false

  if (start === dest) return true
  visited.add(start)

  for (let neighbor of graph[start]) {
    if (dfsUtil(graph, neighbor, dest, visited)) {
      return true
    }
  }
  return false
}

console.log('start A, dest J', dfs(adjGraph, 'A', 'J'))