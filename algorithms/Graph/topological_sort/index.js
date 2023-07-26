// https://www.geeksforgeeks.org/topological-sorting-indegree-based-solution/
/* Usage: 

Real life:
- prerequisites & courses 

LeetCode: course-schedule 
- check for cycles in graph.  if visitedCount !== V
- Is it valid tree 
- sort in order of dependency: course schedule, package dependency
	- calculate indegree of all nodes
	- add all nodes with indegree 0 to a queue
	- go through nodes in queue. 
		add node to path 
		Look for its neighbors:
			-  --indegree of each neighbor
			- if (neighbor's indegree == 0) add to queue

			A => B 
				\	||
					C
 */

// step 0: calculate indegree of all nodes
/*
	- for each node in vertices
		- indegree[node] = 0 
		- for each connecting destination
			- indegree[dest]++

// { A: 0, B: 1, F: 1, C: 0, D: 1, E: 0 }
// simpler with edge list 
*/

function calculateIndegree(graph) {
	const vertices = graph.vertices
	const neighbors = graph.neighbors // { A: [ B, F]}
	const indegreeMap = {}

	for (let vertex of vertices) {
		indegreeMap[vertex] = 0
	}
	for (let vertex in neighbors) { // O(V + E)
		const destArr = neighbors[vertex]
		for (let dest of destArr) {
			indegreeMap[dest]++
		}
	}
	return indegreeMap
}


function topologicalSort(adjList) {
	const indegree = calculateIndegree(adjList)
	let visitedCount = 0
	const queue = []

	// Step 1: add nodes with indegree=0 to queue
	for (let node in indegree) {
		if (indegree[node] == 0) queue.push(node)
	}

	while (queue.length > 0) {
		const current = queue.shift()
		console.log(current)
		const neighbors = adjList[current]
		// will not revisit visited node => negative indegree 
		for (let dest of neighbors) {
			indegree[dest]--
			if (indegree[dest] == 0) queue.push(dest)
		}
		visitedCount++
	}
	if (visitedCount !== Object.keys(adjList).length) {
		console.log('Detected cycle in graph. No topological sort order.')
	}
}


// GRAPH 
class Graph {
	constructor() {
		this.vertices = []
		this.neighbors = {}
	}
	// add node or vertex
	addVertex(u) {
		this.neighbors[u] = []
		this.vertices.push(u)
		return this
	}

	// directed graph 
	addEdge(u, v) {
		if (!this.neighbors[u]) this.neighbors[u] = []
		if (!this.neighbors[v]) this.neighbors[v] = []
		this.neighbors[u].push(v)
		return this
	}
}

const g = new Graph()
g.addVertex('A').addVertex('B').addVertex('C').addVertex('D').addVertex('E').addVertex('F')
g.addEdge("A", "B")
g.addEdge("C", "B")
g.addEdge("C", "D")
g.addEdge("A", "F")
g.addEdge("F", "E")
g.addEdge("E", "D")

console.log('graph', g)

console.log(calculateIndegree(g))
// console.log(topologicalSort(g.neighbors))


/*
Algorithm: Steps involved in finding the topological ordering of a DAG:

Step-1: Compute in-degree (number of incoming edges) for each of the vertex present in the DAG and initialize the count of visited nodes as 0.
Step-2: Pick all the vertices with in-degree as 0 and add them into a queue (Enqueue operation)
Step-3: Remove a vertex from the queue (Dequeue operation) and then.
- Increment count of visited nodes by 1.
- Decrease in-degree by 1 for all its neighboring nodes.
- If in-degree of a neighboring nodes is reduced to zero, then add it to the queue.
Step 4: Repeat Step 3 until the queue is empty.
Step 5: If count of visited nodes is not equal to the number of nodes in the graph then the topological sort is not possible for the given graph.

TIME: O(V + E)
Space: O(V)
*/