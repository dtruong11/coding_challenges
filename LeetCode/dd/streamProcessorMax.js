/**
 * Given a streaming data of the form (timestamp, value), find the maximum value in the stream in the last X seconds.
 *
 * Assume time is monotonically increasing.
 * Assume time is in the order of seconds.
 * max_value() function finds the max in the last X seconds.
 *
 * StreamProcessor(5) // last 5 seconds
 * set_value(0, 5)
 * set_value(1, 6)
 * set_value(2, 4)
 * max_value(3) = 6 -> always the current time
 *
 * class StreamProcessor:
 * def init(self, x):
 * ​ self.x = x
 *
 * def set_value(self, t, v):
 * ​ pass
 *
 * def max_value(self, cur_t):
 * ​ pass
 *
 * Algorithm
 * doubly linked list
 * sliding window with fixed size seconds
 */

//

class Node {
  constructor({ val = null, second = null }) {
    this.val = val;
    this.second = second;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = new Node()
    this.tail = this.head
  }
}

class StreamProcessor {
  constructor(seconds_ago) {
    this.queue = new DoublyLinkedList();
    this.seconds_ago = seconds_ago
  }
  setValue (second, value) {
    if (this.queue === undefined) {
      this.queue = new Node({ second, value })
      return this
    }
    // 1. remove old entries that are before x seconds
    let cur = this.queue
    while (cur !== undefined && second - this.seconds_ago)
  }

  maxValuePastSeconds(seconds) {}
}

const streamProcessor = new StreamProcessor(5)
