/*
LEFT => RIGHT => ROOT
*/

const { TreeNode } = require('../util')

function postOrderIterative(root) {
  if (!root) return null // return null or []
  let stack = [root]
  let result = []

  while (stack.length) {
    root = stack.pop()
    result.push(root.val)
    if (root.left) stack.push(root.left)
    if (root.right) stack.push(root.right)
  }
  return result.reverse()
}

function postOrderRecursive(root) {
  if (!root) return null // return null or []
  let result = []

  function recurse(root, result) {
    if (!root) return
    recurse(root.left, result)
    recurse(root.right, result)
    result.push(root.val)
  }

  recurse(root, result)
  return result
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


console.log(postOrderIterative(a))
console.log(postOrderRecursive(a))
/*
   		3
     / \
    4   5
   / \
  1   2
     /
    0   
*/
