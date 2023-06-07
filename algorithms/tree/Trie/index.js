/* 
https://leetcode.com/problems/implement-trie-prefix-tree/discuss/613676/JavaScript-simple-solution-92-80
https://leetcode.com/problems/implement-trie-prefix-tree/discuss/422168/JavaScript-Solution
https://github.com/mission-peace/interview/blob/master/src/com/interview/suffixprefix/Trie.java
*/
/*
WHAT I STRUGGLE WITH
- how to handle multiple children. 
*/

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

class TrieNode {
    constructor(char) {
        this.val = char
        this.children = {}
        this.isEnd = false
    }
}

class Trie {
    constructor() {
        this.node = new TrieNode()
    }

    /**
    INSERT
    - get the current root node
    - loop through the word
    - get current node's children => check any similar child exists. 
        - not exist => create & attach the new TrieNode
        - exist => reuse 
    - set current to newly created childNode
    - set current to TRUE => mark word end

    Time: O(m) - m length of key. Either check or create up to m
    Space: O(m) - tree will have a length of O(m)
     */
    insert(word) {
        let curNode = this.node
        for (let i = 0; i < word.length; i++) {
            const char = word[i]
            if (!curNode.children[char]) {
                curNode.children[char] = new TrieNode(char)
            }
            curNode = curNode.children[char]
        }
        curNode.isEnd = true
        return this
    }

    /**
    SEARCH
    - get the current root node
    - loop through word character
        - if not found word char in current's children => FALSE
        - set current to that matching child node to go down the tree 
    - return true if at the end of word

    Time: O(m)
    Space: O(1)
     */
    search(word) {
        let curNode = this.node
        for (let i = 0; i < word.length; i++) {
            const char = word[i]
            if (!curNode.children[char]) {
                return false
            }
            curNode = curNode.children[char]
        }
        return curNode.isEnd

    }

    /**
    STARTSWITH - Prefix Check
    - similar to search. Don't have to check word end 
    Time: O(m)
    Space: O(1)
     */
    startsWith(word) {
        let curNode = this.node
        for (let i = 0; i < word.length; i++) {
            const char = word[i]
            if (!curNode.children[char]) {
                return false
            }
            curNode = curNode.children[char]
        }
        return true
    }

    /**
    DELETE WORD
    - Use Recursion 
    - High level: Go down the trie, once the whole word is found and at the end of the word. 
        - only do more if isEnd: true. skip further action if isEnd: false
            - flip isEnd: false
            - if the word is NOT a prefix to any longer word (no children for the last character) 
                -> should delete that character out of its parent map. Return true recursively upward to remove that char from the children map of its parent. 
            - if the word is a prefix to any longer word, don't remove it from its parent map. 
     */

    _validateCharExist(node, character) {
        const charNode = node.children[character]
        if (!charNode) return false // Word character not found, no need to delete
        return true
    }

    _handleEndOfWord(node) {
        if (!node.isEnd) {
            return false; // Word not found, no need to delete
        }
        node.isEnd = false
        return Object.keys(node.children).length === 0; // Can delete because node has no child
    }

    _shouldDeleteChar(node, idx, word) {
        // base case - traverse down to the end of the word
        if (idx === word.length) {
            return this._handleEndOfWord(node)
        }

        const character = word[idx]
        if (!this._validateCharExist(node, character)) return false

        const shouldDeleteCurNode = this._shouldDeleteChar(node, idx + 1, word)
        if (shouldDeleteCurNode) {
            delete node.children[character] // delete this char from its parent mapping
            return Object.keys(node.children).length === 0 // return true for its parent to be deleted as well, if parent has no child
        }
        return false
    }

    delete(word) {
        return this._shouldDeleteChar(this.root, 0, word)
    }
}dict.insert('hello')
