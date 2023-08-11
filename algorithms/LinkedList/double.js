
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
    const removed = this.head
    const newHead = this.head.next
    if (!newHead) {
      this.head = null
      this.tail = null
    } else {
      newHead.prev = null
      removed.next = null
      this.head = newHead
    }
    this.length--
    return this
  }
  // 1 -2 -3 
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

  insertAfterIndex (val, idx) {
    if (idx < 0 || idx >= this.size) return this

    if (!this.head) {
      this.addToHead(val)
      return this
    }
    if (idx === this.size - 1) {
      this.addToTail(val)
      return this
    }
    const node = new Node(val)
    let cur = this.head

    for (let i = 0; i < idx; i++) {
      if (!cur) return this
      cur = cur.next
    }

    let curNext = cur.next
    cur.next = node
    node.prev = cur
    node.next = curNext

    this.length += 1

    return this
  }

  print () {
    if (this.head) {
      let cur = this.head
      while (cur.next) {
        console.log(cur ? cur.val : null)
        cur = cur.next
      }
      console.log('tail', cur ? cur.val : null)
    } else {
      console.log('Empty list')
    }
  }
}


module.exports = {
  DoubleLinkedList,
  ListNode
}
