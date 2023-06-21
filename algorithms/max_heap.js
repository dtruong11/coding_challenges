/** MAX HEAP **/
class MaxHeap {
    constructor() {
        this.heap = []
    }

    peek() {
        return this.heap[0]
    }

    _isValidIdx(idx) {
        return idx >= 0 && idx < this.heap.length;
    }

    _getLeftChildIdx(index) {
        return index * 2 + 1;
    }

    _getRightChildIdx(index) {
        return index * 2 + 2;
    }

    _getParentIndex(index) {
        if (index === 0) return 0
        return Math.floor((index - 1) / 2);
    }

    _getBiggerValIdx(leftIdx, rightIdx) {
        if (!this._isValidIdx(rightIdx)) return leftIdx
        if (this._isValidIdx(rightIdx) && this._isValidIdx(leftIdx)) {
            if (this.heap[leftIdx][1] > this.heap[rightIdx][1]) return leftIdx;
            return rightIdx;
        }
    }

    _swapNodes(idx1, idx2) {
        const temp = this.heap[idx1]
        this.heap[idx1] = this.heap[idx2]
        this.heap[idx2] = temp
    }

    size() {
        return this.heap.length
    }

    enqueue(element) {
        this.heap.push(element)

        if (this.heap.length > 1) {
            let curIdx = this.heap.length - 1
            let parentIdx = this._getParentIndex(curIdx)

            while (this.heap[curIdx][1] > this.heap[parentIdx][1]) {
                this._swapNodes(curIdx, parentIdx)
                curIdx = parentIdx
                parentIdx = this._getParentIndex(curIdx)
            }
        }
        return this
    }

    dequeue() {
        if (this.heap.length === 0) return 0
        if (this.heap.length === 1) {
            return this.heap.pop()
        }

        // get the max node
        const topNode = this.heap[0];

        // swap first with last node
        this._swapNodes(0, this.heap.length - 1)

        // remove the last node or the max node to remove from the heap
        this.heap.pop()

        let curIdx = 0, leftChildIdx = this._getLeftChildIdx(curIdx), rightChildIdx = this._getRightChildIdx(curIdx)
        // bubble down
        while (
            (this._isValidIdx(leftChildIdx) &&
                this.heap[curIdx][1] < this.heap[leftChildIdx][1]) ||
            (this._isValidIdx(rightChildIdx) &&
                this.heap[curIdx][1] < this.heap[rightChildIdx][1])
        ) {
            const biggerChildIdx = this._getBiggerValIdx(
                leftChildIdx,
                rightChildIdx
            );
            this._swapNodes(curIdx, biggerChildIdx);
            curIdx = biggerChildIdx;
            leftChildIdx = this._getLeftChildIdx(curIdx);
            rightChildIdx = this._getRightChildIdx(curIdx);
        }
        return topNode;
    }
}
