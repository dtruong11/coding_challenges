// RECURSION
var maxDepth = function(root) {
  if (!root) return 0
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};

// ITERATION
function maxDepth (root) {
  let max = 0 
  let queue = [root]
  
  while (queue.length) {
      const size = queue.length 
      for (let i = 0; i < size; i++) {
          const current = queue.shift()
          if (current.left) queue.push(current.left)
          if (current.right) queue.push(current.right)
      }
      max++
  }
  return max
}

/*
Time: O(N)
Space: O(N) 
  - dfs: O(H) - longest path -> O(N). Good for depth related problems
  - bfs: the max numbers of nodes at a level -> O(N)
*/