/**
 * @param {number} capacity
 */

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.keys = {}
    this.list = new DoubleLinkedList() // queue
  }

  // get 1 => disconnect 1 => add to head
  get (key) {
    const existingNode = this.keys[key]
    if (!existingNode) return -1
      const removed = this.list.removeNode(existingNode)
      this.list.addToTail(removed.val)
      return existingNode.val
  }

  put (key, value) {
    const existingNode = this.keys[key]
    if (existingNode) {
      if (existingNode.val !== value) existingNode.val = value
      const removed = this.list.removeNode(existingNode)
      this.list.addToTail(value)
    } else {
      const newNode = new ListNode(value)
      this.list.addToTail(value)
      this.keys[key] = newNode
    }
    if (this.capacity < this.list.length) {
      this.list.removeFromHead()
        delete this.keys[key]
    }
  }

  print () {
    const result = []
    let root = this.list.head
    while (root) {
      result.push(root.val)
      root = root.next
    }
    return result 
  }
};


// Double Linked List
class ListNode {
  constructor(val, next = null, prev = null) {
    this.val = val
    this.next = next
    this.prev = prev
  }
}

class DoubleLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  addToHead (val) {
    const node = new ListNode(val)
    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      this.head.prev = node
      node.next = this.head
      this.head = node
    }
    this.length++
    return this
  }

  addToTail (val) {
    const node = new ListNode(val)
    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
    }
    this.length++
    return this
  }

  removeFromHead () {
    if (!this.head) return
    const next = this.head.next
    if (!next) {
      this.head = null
      this.tail = null
    } else {
      next.prev = null
      this.head = next
    }
    this.length--
    return this
  }

  removeFromTail () {
    if (!this.tail) return null
    const prev = this.tail.prev
    if (!prev) {
      this.tail = null
      this.head = null
    } else {
      prev.next = null
      this.tail = prev
    }
    this.length--
    return this
  }

  removeNode (node) {
    const prev = node.prev
    const next = node.next
    if (node === this.head) return this.removeFromHead()
    else if (node === this.tail) return this.removeFromTail()
    else {
      const prev = node.prev
      const next = node.next
      prev.next = next
    }
    this.length--
    return node
  }
}