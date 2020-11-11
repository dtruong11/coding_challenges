/*
 start: 7:30AM
 end: 8:19AM
 */

class ListNode {
    constructor(key = 0, val = 0, prev = null, next = null) {
        this.key = key
        this.val = val
        this.prev = null
        this.next = null
    }
}

class DoubleLinkedList {
    constructor(){
        this.head = new ListNode()
        this.tail = new ListNode()
        this.head.next = this.tail
        this.tail.prev = this.head
    }
    addToHead (node) {
        const headCurNext = this.head.next
        this.head.next = node
        node.prev = this.head
        node.next = headCurNext
        headCurNext.prev = node
    }
    
    // remove node from anywhere. remove 2 from h -> 1 -> 2 -> t
    remove (node) {
        const next = node.next 
        const prev = node.prev
        prev.next = next
        next.prev = prev
        return node
    }
}

/** 
 head most recent
 remove from tail -> least used
 */
class LRUCache {
    constructor (capacity) {
        this.capacity = capacity
        this.cache = {}
        this.size = 0
        this.list = new DoubleLinkedList()
    }
    
    removeNode (node) {
        this.list.remove(node)
        this.size--
        delete this.cache[node.key]
    }
    
    addNode (node) {
        this.list.addToHead(node)
        this.size++
        this.cache[node.key] = node
    }
    
    moveToHead (node) {
        this.removeNode(node)
        this.addNode(node)
    }
    
    removeFromTail () {
        const prevTail = this.list.tail.prev
        this.removeNode(prevTail)
    }
    
  /*
  get
  - check if exists in hashmap
   - if exist
     - removeNode
     - addToHead
     - return its value
   - non exist -> -1
  */
    get(key) {
        let node = this.cache[key]
        if (!node) return -1
        this.moveToHead(node)
        return node.val
    }
    
  /*
  put
  1. check if exist in map
  2. if exist
      - update value
      - removeNode
      - addToHead
  3. if not
      create node
      addTo Map
      addToHead
      increase size
      size > capacity
        removeFromTail
  */
    put (key, value) {
        let node = this.cache[key]
        if (node) {
            node.val = value
            this.moveToHead(node)
        } else {
            const newNode = new ListNode(key, value)
            this.cache[key] = newNode
            this.addNode(newNode)
            // evict
            if (this.size > this.capacity) {
                this.removeFromTail()
            }
        }
    }
}

/*
STRUGGLE
- forget to delete from cache after evict
=> add delete key from cache in removeNode()
*/
