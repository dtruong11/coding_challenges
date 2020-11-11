var validTree = function(n, edges) {
  if (edges.length !== n - 1) return false
  const adjList = createAdjList(edges)

  let visited = { 0: true }, visitedCount = 1, queue = [0]
  while (queue.length) {
      const node = queue.shift()
      const neighbors = adjList[node]
      if (neighbors !== undefined) {
          for (let next of neighbors) {
              if (visited[next]) { 
                  continue
              }
              visited[next] = true
              visitedCount += 1
              queue.push(next)
           }
      } 
  }
  console.log('visitedCount', visitedCount, n)
  return visitedCount === n
};


function createAdjList (edges) {
  let map = {}
  for (edgePair of edges) {
      const start = edgePair[0], end = edgePair[1]
      map[start] = map[start] || []
      map[end] = map[end] || []
      map[start].push(end)
      map[end].push(start)
  }
  return map
}

console.log(validTree(5, [[0,1], [1,2], [2,3], [1,3], [1,4]]))