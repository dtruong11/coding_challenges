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

const { DoubleLinkedList } = require('../../algorithms/LinkedList/double.js')
class Node {
  constructor({ val = null, second = null }) {
    this.val = val;
    this.second = second;
    this.next = null;
    this.prev = null;
  }
}

/**
 * Use a doubly linked list to keep track of the values in the last X seconds.
 */
class StreamProcessor {
  constructor(seconds_ago) {
    this.queue = new DoubleLinkedList();
    this.seconds_ago = seconds_ago
  }

  /**
   * While inserting any value check if the front entry time is less than t - X, if yes erase that entry (keep erasing till this statement is true)
   * Starting from back pop the entries which have value less than value
   * Insert your new entry at end of deque
   */
  setValue ({ second, value }) {
    if (this.queue.length === 0) {
      this.queue.addToHead({ second, value })
      return this
    }

    // Queue is not empty
    // 1. remove old entries that are older then current second - X seconds. The queue keeps max X seconds ago
    // time increases monotonically, so older entries will not be relevant
    while (this.queue.length && second - this.seconds_ago > 0) {
      this.queue.removeFromHead()
    }

    // 2. the new value to add to the queue. 
    // If it is more than the previous values in the queue, pop from the queue to override the max with the current value
    // If it is smaller than the last value in the queue, the order in the queue will be descending from head to tail. The value at head is the max
    while (this.queue.length && value > this.queue.tail.val['value']) {
      this.queue.removeFromTail()
    }

    /**
     * after adding, the queue can have more than X seconds ago. 
     * seconds_ago: 3
     * value    8   7   6
     * second   0   1   2
     * 
     * At second = 3, value = 5. We will have this:
     * 
     * seconds_ago: 3
     * value    8   7   6   5
     * second   0   1   2   3
     */
    this.queue.addToTail({ second, value })
    return this
  }

  /**
   * While retrieving the maximum value in last X seconds check if the front entry time is less than curr_t - X, if yes erase that entry (keep erasing till this statement is true)
   * Return the value of front entry
   * @param {*} cur_time 
   */
  maxValuePastSeconds (cur_time) {
    // if current time if far after last X seconds ago
    if (cur_time - this.seconds_ago > this.queue.tail.val.second) {
      return undefined
    }

    // remove old entries that are older then current second - X seconds. The queue keeps max X seconds ago
    let start_time = cur_time - this.seconds_ago
    while (this.queue.length > 0 && this.queue.head.val.second < start_time) {
      this.queue.removeFromHead()
    }

    return this.queue.head ? this.queue.head.val.value : undefined
  }
}

const streamProcessor = new StreamProcessor(5)
streamProcessor.setValue({ second: 0, value: 10 })
streamProcessor.setValue({ second: 1, value: 11 })
streamProcessor.setValue({ second: 2, value: 12 })
streamProcessor.setValue({ second: 3, value: 7 })
streamProcessor.setValue({ second: 5, value: 9 })
console.log(streamProcessor.maxValuePastSeconds(8))
