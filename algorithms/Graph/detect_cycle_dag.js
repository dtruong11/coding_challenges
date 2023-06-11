class DAG {
  constructor() {
    this.vertices = [];
    this.adjacencyList = {};
  }
  addVertices(vertices) {
    this.vertices = vertices;
    for (let vertex of vertices) {
      this.adjacencyList[vertex] = [];
    }
  }
  addVertex(vertex) {
    if (!this.vertices.includes(vertex)) {
      this.vertices.push(vertex);
      this.adjacencyList[vertex] = [];
    }
  }
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
  }
  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (v) => v !== vertex2
    );
  }
}

const graph = new DAG();
graph.addVertices([0, 1, 2, 3, 4]);
graph.addEdge(0, 1);
graph.addEdge(2, 1);
graph.addEdge(2, 3);
graph.addEdge(4, 0);
graph.addEdge(4, 2);
graph.addEdge(3, 4);
console.log("graph", graph);

const graphNonCyclic = new DAG();
graphNonCyclic.addVertices([0, 1, 2, 3, 4, 5]);
graphNonCyclic.addEdge(0, 1);
graphNonCyclic.addEdge(0, 2);
graphNonCyclic.addEdge(1, 2);
graphNonCyclic.addEdge(1, 3);
graphNonCyclic.addEdge(2, 3);
graphNonCyclic.addEdge(3, 4);
graphNonCyclic.addEdge(3, 5);
graphNonCyclic.addEdge(4, 5);
graphNonCyclic.addEdge(2, 5);

function isCyclicUtil(nodeVal, adjList, visited) {
  if (visited[nodeVal] === true) {
    return true;
  }

  visited[nodeVal] = true;
  for (const child of adjList[nodeVal]) {
    if (isCyclicUtil(child, adjList, visited)) return true;
  }
  visited[nodeVal] = false;
  return false;
}

function checkCycleInDAG(vertices, adjList) {
  const visited = {};
  // loop through all vertices: set visited to F
  for (let vertex of vertices) {
    visited[vertex] = false;
  }

  // go through adjancy list, loop through each key
  for (const key in adjList) {
    if (isCyclicUtil(key, adjList, visited)) {
      return true;
    }
  }
  return false;
}

const isCyclic = checkCycleInDAG(graph.vertices, graph.adjacencyList);
console.log("isCyclic", isCyclic);
console.log(
  "isNonCyclic",
  checkCycleInDAG(graphNonCyclic.vertices, graphNonCyclic.adjacencyList)
);
