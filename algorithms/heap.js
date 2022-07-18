class MinHeap {
	constructor(){
		this.realSize = 0
		this.heap = []
		this.heap[0] = 0
	}

	peek() {
		return this.heap[1]
	}

	size() {
		return this.realSize
	}

	// From this curIdx, can it have a left child index in bound
	_isLeaf(idx) {
		return idx*2 > this.realSize
	}

	add(element) {
		this.realSize += 1
		this.heap.push(element)

		// More than 1 element, then bubble up.
		if (this.heap.length > 2) {
			this._heapifyUp()
		}
		return this
	}

	_heapifyUp() {
		let idx = this.heap.length - 1
		let parentIdx = Math.floor(idx/2)

		// idx == 1, already finish swapping the root node. Fail idx > 1
		while (idx > 1 && this.heap[parentIdx] > this.heap[idx]) {
			let current = this.heap[idx]
			let parent = this.heap[parentIdx]
			this.heap[idx] = parent
			this.heap[parentIdx] = current
			idx = parentIdx
			parentIdx = Math.floor(idx/2)
		}
	}

	_heapifyDown() {
		let index = 1
		// once current index reaches a leaf node, we are done.
		while (!this._isLeaf(index)) {
			let current = this.heap[index]
			let left = 2*index
		  let right = 2*index + 1
			
			let smallerChildIdx = left
			// make sure right idx is in range
			if (right < this.heap.length && this.heap[right] < this.heap[left]) {
				smallerChildIdx = right
			}

			let child = this.heap[smallerChildIdx];
			if (current > child) {
				this.heap[smallerChildIdx] = current
				this.heap[index] = child
				index = smallerChildIdx
				left = 2*index
				right = 2*index + 1
			} else {
				break // current node is not bigger than any of its children
			}
		}	
	}

	pop() {
		// No element in the heap
		if (this.heap.length < 2) {
			return undefined
		}
		
		// More than 1 element
		let removed = this.heap[1]
		this.heap[1] = this.heap[this.heap.length - 1]
		this.heap.pop()
		this.realSize -= 1

		this._heapifyDown()
		return removed
		}
}



/** MAX HEAP **/
class MaxHeap {
	constructor(){
		this.realSize = 0
		this.heap = []
		this.heap[0] = 0
	}

	peek() {
		return this.heap[1]
	}

	size() {
		return this.realSize
	}

	// From this curIdx, can it have a left child index in bound
	_isLeaf(idx) {
		return idx*2 > this.realSize
	}

	add(element) {
		this.realSize += 1
		this.heap.push(element)

		// More than 1 element, then bubble up.
		if (this.heap.length > 2) {
			this._heapifyUp()
		}
		return this
	}

	_heapifyUp() {
		let idx = this.heap.length - 1
		let parentIdx = Math.floor(idx/2)

		// idx == 1, already finish swapping the root node. Fail idx > 1
		while (idx > 1 && this.heap[parentIdx] < this.heap[idx]) {
			let current = this.heap[idx]
			let parent = this.heap[parentIdx]
			this.heap[idx] = parent
			this.heap[parentIdx] = current
			idx = parentIdx
			parentIdx = Math.floor(idx/2)
		}
	}

	_heapifyDown() {
		let index = 1
		// once current index reaches a leaf node, we are done.
		while (!this._isLeaf(index)) {
			let current = this.heap[index]
			let left = 2*index
		  let right = 2*index + 1
			
			let biggerChildIdx = left
			// make sure right idx is in range
			if (right < this.heap.length && this.heap[right] < this.heap[left]) {
				biggerChildIdx = right
			}

			let child = this.heap[biggerChildIdx];
			if (current > child) {
				this.heap[biggerChildIdx] = current
				this.heap[index] = child
				index = biggerChildIdx
				left = 2*index
				right = 2*index + 1
			} else {
				break // current node is not bigger than any of its children
			}
		}	
	}

	pop() {
		// No element in the heap
		if (this.heap.length < 2) {
			return undefined
		}
		
		// More than 1 element
		let removed = this.heap[1]
		this.heap[1] = this.heap[this.heap.length - 1]
		this.heap.pop()
		this.realSize -= 1

		this._heapifyDown()
		return removed
		}
}

// Class MaxHeap - correct implementation
class MaxHeap {

    constructor() {
        this.heap = [];
    }
  
    getMax() {
      return this.heap[1]
    }
  

    // define add function
    add(element) {
        this.heap.push(element);
        //Sort uusing O(N)
        
        let i = this.heap.length - 1;
        while (i > 0) {
            let parent = Math.floor((i - 1) / 2);
            if (this.heap[i] > this.heap[parent]) {
                let temp = this.heap[i];
                this.heap[i] = this.heap[parent];
                this.heap[parent] = temp;
            }
            i = parent;
        }

    }

    // define pop
    pop() {
        let last = this.heap.pop();
        if (this.heap.length === 0) {
            return last;
        }
        let first = this.heap[0];
        this.heap[0] = last;
        let i = 0;
        while (i < this.heap.length) {
            let left = 2 * i + 1;
            let right = 2 * i + 2;
            let max = i;
            if (left < this.heap.length && this.heap[left] > this.heap[max]) {
                max = left;
            }
            if (right < this.heap.length && this.heap[right] > this.heap[max]) {
                max = right;
            }
            if (max !== i) {
                let temp = this.heap[i];
                this.heap[i] = this.heap[max];
                this.heap[max] = temp;
                i = max;
            } else {
                break;
            }
        }
        return first;
    }

    // define size function
    size() {
        return this.heap.length;
    }
}


/** TEST HEAP **/
const minHeap = new MinHeap()
minHeap.add(5).add(4).add(3).add(6).add(2).add(1)
console.log(minHeap.heap)


const maxHeap = new MaxHeap()
maxHeap.add(5).add(4).add(3).add(6).add(2).add(1)
console.log(maxHeap.heap)
