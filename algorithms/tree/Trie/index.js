/* 
https://leetcode.com/problems/implement-trie-prefix-tree/discuss/613676/JavaScript-simple-solution-92-80
https://leetcode.com/problems/implement-trie-prefix-tree/discuss/422168/JavaScript-Solution
https://github.com/mission-peace/interview/blob/master/src/com/interview/suffixprefix/Trie.java
*/

class TrieNode {
	constructor() {
		this.children = {}
		this.isEndOfWord = false
	}
}

class Trie {
	constructor() {
		this.root = new TrieNode()
	}

	/**
	 * Inserts a word into the trie. 
	 * @param {string} word
	 * @return {void}
	 */
	insert(word) {
		let current = this.root
		for (let i = 0; i < word.length; i++) {
			let childNode = current.children[word[i]] || new TrieNode(word[i])
			current.children[word[i]] = childNode
			current = childNode
		}
		current.isEndOfWord = true
		return this
	}

	/**
	 * Returns if the word is in the trie. 
	 * @param {string} word
	 * @return {boolean}
	 */
	search(word) {
		let current = this.root
		for (let i = 0; i < word.length; i++) {
			current = current.children[word[i]]
			if (!current) return false
		}
		return current.isEndOfWord
	}

	/**
	 * Returns if there is any word in the trie that starts with the given prefix. 
	 * @param {string} prefix
	 * @return {boolean}
	*/
	startsWith(prefix) {
		let current = this.root
		for (let i = 0; i < prefix.length; i++) {
			current = current.children[prefix[i]]
			if (!current) return false
		}
		return true
	}

	remove(word) {

	}
}


const dict = new Trie()
dict.insert('hello')
