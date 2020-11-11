import Stack from '../stack'

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

	addEdge(u, v) {
		if (!this.neighbors[u]) this.neighbors[u] = []
		if (!this.neighbors[v]) this.neighbors[v] = []
		this.neighbors[u].push(v)
		this.neighbors[v].push(u)
		return this
	}

	// Avoid pushing repetitive nodes on to the stack
	dfs1(start) {
		let stack = new Stack()
		let result = []
		stack.push(start)
		let visited = {}
		visited[start] = true

		while (!stack.isEmpty()) {
			let top = stack.pop()
			result.push(top)
			for (let vertex of this.neighbors[top]) {
				if (!visited[vertex]) {
					stack.push(vertex)
					visited[vertex] = true
				}
			}
		}
		return result
	}
}

module.exports = Graph



let g = new Graph()
g.addVertex('A').addVertex('B').addVertex('C').addVertex('D').addVertex('E')

g.addEdge("A", "B")
g.addEdge("A", "D")
g.addEdge("B", "D")
g.addEdge("B", "C")
g.addEdge("C", "E")

console.log(g.dfs1('A'))
console.log(g.dfs2('A'))
