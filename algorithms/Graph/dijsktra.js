/*
- Shortest Path in Weighted Graph using Dijkstra 
*/
class WeightedGraph {
  constructor() {
    this.vertices = []
    this.adjList = {}
  }

  shortestPath(start, end) {
    let visited = {}
    let previous = {}
    let distances = {}
    let pq = new PriorityQueue()

    // set up 
    for (let i = 0; i < this.vertices.length; i++) {
      const vertex = this.vertices[i]
      if (vertex === start) {
        distances[vertex] = 0
        pq.enqueue(start)
      } else {
        distances[vertex] = Infinity
      }
      previous[vertex] = null
    }

    while (pq.isNotEmpty()) {
      const node = pq.dequeue()

      const neighbors = this.adjList[node]
      // for (let element of neighbors) {
      //   if (!visited[element]) {
      //     distances[element] = distances[node] + 
      //   }
      // }

    }


  }
}

const example = {
  A: [{ B: 1 }, { C: 2 }],
  B: [{ A: 1 }, { C: 2 }, { D: 3 }],
  C: [{ A: 2 }, { B: 2 }, { D: 1 }],
  D: [{ C: 1 }, { B: 3 }, { E: 1 }]
}