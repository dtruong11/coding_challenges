class Graph{
    constructor(){
        this.adjacencyList = {};
    }

    addVertex(vertex){
        if(this.adjacencyList[vertex] === undefined) this.adjacencyList[vertex] = [];
    }

    addEdge(v1,v2){
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);
    }

    removeEdge(vertex1,vertex2){
        const index_v2 = this.adjacencyList[vertex1].indexOf(vertex2);
        if (index_v2 !== -1) {
            this.adjacencyList[vertex1].splice(index_v2, 1);
        }

        const index_v1 = this.adjacencyList[vertex2].indexOf(vertex1);
        if (index_v1 !== -1) {
            this.adjacencyList[vertex2].splice(index_v1, 1);
        }
    }

    removeVertex(vertex){
        while(this.adjacencyList[vertex].length){
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex]
    }

    depthFirstRecursive(start){
        const result = [];
        const visited = {};
        const adjacencyList = this.adjacencyList;

        (function dfs(vertex){
            if(!vertex) return null;
            visited[vertex] = true;
            result.push(vertex);
            adjacencyList[vertex].forEach(neighbor => {
                if(!visited[neighbor]){
                    return dfs(neighbor)
                }
            });
        })(start);

        return result;
    }

    depthFirstIterative(start){
        const stack = [start];
        const result = [];
        const visited = {};
        let currentVertex;

        visited[start] = true;
        while(stack.length){
            currentVertex = stack.pop();
            result.push(currentVertex);

            this.adjacencyList[currentVertex].forEach(neighbor => {
               if(!visited[neighbor]){
                   visited[neighbor] = true;
                   stack.push(neighbor)
               } 
            });
        }
        return result;
    }

    breadthFirst(start){
        const queue = [start];
        const result = [];
        const visited = {};
        let currentVertex;
        visited[start] = true;

        while(queue.length){
            currentVertex = queue.shift();
            result.push(currentVertex);
            this.adjacencyList[currentVertex].forEach(neighbor => {
                if(!visited[neighbor]){
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
        }
        return result;
    }

  /**
   * Return true if the (undirected) graph contains at least one cycle,
   * otherwise false.
   */
  hasCycle() {
    const visited = new Set();

    // depth-first search that tracks the vertex we arrived from
    const dfs = (vertex, parent) => {
      visited.add(vertex);

      for (const neighbor of this.adjacencyList[vertex]) {
        if (!visited.has(neighbor)) {
          if (dfs(neighbor, vertex)) return true;          // found a cycle below
        } else if (neighbor !== parent) {
          return true;                                     // visited & not parent → back-edge
        }
      }
      return false;
    };

    // the graph might not be connected
    for (const vertex of Object.keys(this.adjacencyList)) {
      if (!visited.has(vertex) && dfs(vertex, null)) {
        return true;
      }
    }
    return false;
  }  
}

let g = new Graph();

g.addVertex("A")
g.addVertex("B")
g.addVertex("C")
g.addVertex("D")
g.addVertex("E")
g.addVertex("F")


g.addEdge("A", "B")
g.addEdge("A", "C")
g.addEdge("B","D")
g.addEdge("C","E")
g.addEdge("D","E")
g.addEdge("D","F")
g.addEdge("E","F")

//          A
//        /   \
//       B     C
//       |     |
//       D --- E
//        \   /
//          F

// QUEUE: []
// RESULT: [A, B, C, D, E, F]

