class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }

  add (val) {
    const node = new Node(val)
    let current
    if (!this.head) this.head = node
    else {
      current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    this.size++
    return this
  }

  insertAt (val, index) {
    if (index > this.size || index < 0) return
    let cur, prev
    const node = new Node(val)

    cur = this.head
    if (index === 0) {
      node.next = this.head
      this.head = node
    } else {
      cur = this.head
      let startIdx = 0
      while (startIdx < index) {
        startIdx++
        prev = cur
        cur = cur.next
      }
      node.next = cur
      prev.next = node
    }
    this.size++
    return this
  }

  addToFront (val) {
    const node = new Node(val)
    node.next = this.head
    this.head = node
    this.size++
    return this
  }

  getAtIdx (index) {
    if (index >= this.size || index < 0) return
    let cur = this.head
    let startIdx = 0

    while (startIdx < index) {
      cur = cur.next
      startIdx++
    }
    return cur ? cur.val : undefined
  }

  removeFrom (index) {
    if (index < 0 || index >= this.size) return -1
    let cur = this.head
    let prev = cur
    let startIdx = 0

    if (index === 0) {
      this.head = cur.next
    } else {
      while (startIdx < index) {
        startIdx++
        prev = cur
        cur = cur.next
      }
      prev.next = cur.next
    }
    this.size--
    return cur.val
  }

  clear () {
    this.head = null
    return this
  }

  isEmpty () {
    return this.size === 0
  }
}

module.exports = {
  Node,
  LinkedList
}