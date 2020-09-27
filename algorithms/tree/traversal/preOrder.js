/*
ROOT => LEFT => RIGHT
*/
const { TreeNode } = require('../util')

function preOrderIterative(root) {
  if (!root) return null
  let stack = [root]
  while (stack.length) {
    root = stack.pop()
    console.log(root.val)
    if (root) {
      if (root.right) stack.push(root.right)
      if (root.left) stack.push(root.left)
    }
  }
}

function preOrderRecursive(root) {
  if (!root) return null
  console.log(root.val)
  preOrderRecursive(root.left)
  preOrderRecursive(root.right)
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
console.log(preOrderIterative(a))
console.log(preOrderRecursive(a))

module.exports = {
  preOrderIterative
}
