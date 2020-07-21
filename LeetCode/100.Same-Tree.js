var isSameTree = function (rootA, rootB) {
  if (!rootA && !rootB) return true
  if (!rootA || !rootB) return false

  return (rootA.val === rootB.val &&
    isSameTree(rootA.left, rootB.left) &&
    isSameTree(rootA.right, rootB.right))
};

/*
Algorithms
- base:
  both root null => return true
  if either root exists => return false (forgot this)
- check in a single line root value is the same on both level & recurse root.left on both & recurse root.right on both

Time: O(N)
Space: O(N)
*/
