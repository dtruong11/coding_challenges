import heapq

def dijkstra(graph, start, end):
    distances = {vertex: float('inf') for vertex in graph}
    distances[start] = 0
    previous = {vertex: None for vertex in graph}
    queue = [(0, start)]

    while queue:
        current_distance, current_vertex = heapq.heappop(queue)

        if current_vertex == end:
            break

        if current_distance > distances[current_vertex]:
            continue

        for neighbor, weight in graph[current_vertex]:
            distance = current_distance + weight

            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous[neighbor] = current_vertex
                heapq.heappush(queue, (distance, neighbor))

    if distances[end] == float('inf'):
        print("No path found.")
    else:
        path = []
        current_vertex = end
        while current_vertex is not None:
            path.append(current_vertex)
            current_vertex = previous[current_vertex]

        path.reverse()
        print("Shortest path:", path)
        print("Shortest distance:", distances[end])


# Example graph
graph = {
    'A': [['B', 6], ['D', 1]],
    'D': [['A', 1], ['B', 2], ['E', 1]],
    'B': [['D', 2], ['A', 6], ['E', 2], ['C', 5]],
    'C': [['B', 5], ['E', 5]],
    'E': [['D', 1], ['B', 2], ['C', 5]]
}

start_vertex = 'A'
end_vertex = 'C'
dijkstra(graph, start_vertex, end_vertex)


# In the given code, the line if current_distance > distances[current_vertex]: performs the check to not revisit node.
# If the condition is true, it means that a shorter path to current_vertex has already been found, so the loop skips further processing of that vertex.
# By skipping the processing of vertices that have already been visited with a shorter distance, the algorithm guarantees that it won't revisit nodes unnecessarily and will find the shortest path from the start vertex to the end vertex.
