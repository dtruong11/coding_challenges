function bfs (root) {
  let queue = []
  queue.push(root)

  while (queue.length) {
    const node = queue.shift()
    console.log(node.val)
    
    if (node.left) queue.push(node.left)
    if (node.right) queue.push(node.right)
  }
}

/* 
Why you use Linked List?
- poll() => cut from head. O(1)

Use Array:
- cut from beginning => shift the rest of array O(N)
- maybe reaggrange a new mem block

Time: O(N)
Space: O(N)
*/