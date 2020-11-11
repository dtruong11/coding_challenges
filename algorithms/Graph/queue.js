// QUEUE 
class Queue {
	constructor() {
		this.items = []
	}

	add(val) {
		this.items.push(val)
		return this
	}

	remove() {
		return this.items.unshift()
	}

	peek() {
		return this.items[0]
	}

	isEmpty() {
		return this.items.length === 0
	}
}

module.exports = Queue