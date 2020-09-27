class TreeNode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

module.exports = {
  TreeNode
}

/*
2 TYPES  OF  TRAVERSAL

        1 - root
    2       3
  4   5   6
         
DFS
Stack - LIFO []
Popped: 
Result [1, 3, 6, 2, 5, 4]

BFS
Queue - FIFO []
Popped 
Result [1, 2, 3,  4, 5, 6]

DFS Depth First Search
- preorder
- inorder
- post order 
=> used for depth, longest path  
Time: O(N) 
Space: 

BFS Breadth  First Search 
- shortest path 

 
N - number of nodes in  the tree 
Time: O(N)
Space:  


NOTE
1. check if when backtrack, does that count time 
2. Why use queue for bfs? Parent goes first, hierachy 
3. Why use DFS to get depth? family line going together. 
*/ 