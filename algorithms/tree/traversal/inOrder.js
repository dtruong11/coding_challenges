/*
LEFT => ROOT => RIGHT
*/

const { TreeNode } = require('../util')

// ITERATION
function inOrderIterative(root) {
  if (!root) return
  let stack = []
  
  while (stack.length || root) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    console.log(root.val)
    root = root.right 
  }
}

// RECURSION
function inOrderRecursive(root) {
  if (!root) return
  inOrderRecursive(root.left)
  console.log(root.val)
  inOrderRecursive(root.right)
}

let a = new TreeNode(3)
let b = new TreeNode(4)
let c = new TreeNode(5)
let d = new TreeNode(1)
let f = new TreeNode(2)
let g = new TreeNode(0)


a.left = b 
a.right = c
b.left = d
b.right = f
f.left = g


// TEST
console.log(inOrderIterative(a))
console.log(inOrderRecursive(a))

/*
   		3
     / \
    4   5
   / \
  1   2
     /
    0   
*/

/* 
ITERATION
- Time: O(N)
- Space: O(N)

RECURSION
- Time: O(N)
- Space: O(H) 
*/


/*
Where I got stuck?
Iteration: 
- inner loop to push all left nodes to stack
- after print root.val, set root = root.right

Space complexity of Recursive traversal
*/
