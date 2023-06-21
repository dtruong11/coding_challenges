class MinHeap {
  constructor() {
    this.heap = [];
  }

  enqueue(value) {
    this.heap.push(value);
    if (this.heap.length > 1) { 
      let curIdx = this.heap.length - 1;
      let parentIdx = this._getParentIndex(curIdx);

      // bubble up
      while (this.heap[curIdx] < this.heap[parentIdx]) {
        this._swapNodes(curIdx, parentIdx);
        curIdx = parentIdx;
        parentIdx = this._getParentIndex(curIdx);
      }
    }
    return this
  }

  dequeue() {
    if (this.heap.length === 0) return undefined
    if (this.heap.length === 1) return this.heap.pop()

    // get the min node
    const topNode = this.heap[0];
    
    // swap first and last node
    this._swapNodes(0, this.heap.length - 1);

    // remove the last node
    this.heap.pop();

    // bubble down
    let curIdx = 0;
    let leftChildIdx = this._getLeftChildIdx(curIdx);
    let rightChildIdx = this._getRightChildIdx(curIdx);

    while (
      (this._isValidIdx(leftChildIdx) &&
        this.heap[curIdx] > this.heap[leftChildIdx]) ||
      (this._isValidIdx(rightChildIdx) &&
        this.heap[curIdx] > this.heap[rightChildIdx])
    ) {
      const smallerChildIdx = this._getSmallerValIdx(
        leftChildIdx,
        rightChildIdx
      );
      this._swapNodes(curIdx, smallerChildIdx);
      curIdx = smallerChildIdx;
      leftChildIdx = this._getLeftChildIdx(curIdx);
      rightChildIdx = this._getRightChildIdx(curIdx);
    }
    return topNode;
  }

  peek() {
    return this.heap[0];
  }

  _getParentIndex(index) {
    if (index === 0) return 0
    return Math.floor((index - 1) / 2);
  }

  _getSmallerValIdx(leftIdx, rightIdx) {
    if (!this._isValidIdx(rightIdx)) return leftIdx
    if (this.heap[leftIdx] < this.heap[rightIdx]) return leftIdx;
    return rightIdx;
  }

  _getLeftChildIdx(index) {
    return index * 2 + 1;
  }

  _getRightChildIdx(index) {
    return index * 2 + 2;
  }

  _swapNodes(node1Idx, node2Idx) {
    let temp = this.heap[node1Idx];
    this.heap[node1Idx] = this.heap[node2Idx];
    this.heap[node2Idx] = temp;
  }

  _isValidIdx(idx) {
    return idx >= 0 && idx < this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

const minHeap = new MinHeap();
minHeap.enqueue(1);
minHeap.enqueue(2);
minHeap.enqueue(3);
minHeap.enqueue(4);
minHeap.enqueue(5);
minHeap.enqueue(6);
minHeap.enqueue(7);
minHeap.enqueue(0);

console.log("minHeap", minHeap.heap);
console.log("dequeue", minHeap.dequeue());
console.log("minHeap after dequeue", minHeap.heap);
