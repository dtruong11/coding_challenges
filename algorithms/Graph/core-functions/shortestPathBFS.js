import Graph from '../graph'
import Queue from '../queue'

function shortestPath(graph, start, end) {
  if (start == end) return [start, end]
  const queue = new Queue()
  const visited = {}
  const path = []
  const prev = {}

  queue.add(start)
  prev[start] = null

  while (!queue.isEmpty()) {
    const current = queue.remove()
    const neighbors = graph.neighbors[current]
    for (let el of neighbors) {
      distances[el]
    }
  }
}