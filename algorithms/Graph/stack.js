// STACK 
class Stack {
	constructor() {
		this.data = []
		this.length = 0
	}

	push(val) {
		this.data.push(val)
		this.length++
		return this
	}

	pop() {
		if (this.isEmpty()) return undefined
		let removed = this.data.pop()
		this.length--
		return removed
	}

	peek() {
		return this.data[this.data.length - 1]
	}

	isEmpty() {
		return this.length === 0
	}
}

module.exports = Stack