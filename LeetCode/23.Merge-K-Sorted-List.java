
/**
 * Definition for singly-linked list. public class ListNode { int val; ListNode
 * next; ListNode() {} ListNode(int val) { this.val = val; } ListNode(int val,
 * ListNode next) { this.val = val; this.next = next; } }
 */
class Solution {
  // 18:15 18:23 18:26
  // Time: O(nlogk)
  // Space: O(k) for priority queue
  // Where k is the number of lists
  // And n is the total number of nodes
  public ListNode mergeKLists(ListNode[] lists) {
    if (lists == null || lists.length == 0) {
      return null;
    }

    // By default without the lambda function, priority queue is already min heap
    // -> specifying the lambda function just for better understanding
    PriorityQueue<ListNode> pq = new PriorityQueue<>(lists.length, (a, b) -> a.val - b.val);
    // Add all first nodes
    for (ListNode listNode : lists) {
      // Edge: Only add if not null
      if (listNode != null) {
        pq.add(listNode);
      }
    }

    ListNode dummyHead = new ListNode(0);
    ListNode curNode = dummyHead;
    while (!pq.isEmpty()) {
      ListNode curMinNode = pq.poll();
      // Add next to the heap if exists
      if (curMinNode.next != null) {
        pq.add(curMinNode.next);
      }
      // Unlink the node
      curMinNode.next = null;

      // Update cursor of result list
      curNode.next = curMinNode;
      curNode = curNode.next;
    }

    return dummyHead.next;
  }
}