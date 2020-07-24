/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
  let l = 0, counter = 0
  let minLen = Infinity
  let ans = ''
  const frequency = {}
  
  // fill frequency map
  for (let i = 0; i < t.length; i++) {
      frequency[t[i]] = ++frequency[t[i]] || 1 // post increment death. frequency[t[i]]++ => count off by 1
  }
  
  counter = Object.keys(frequency).length
  
  for (let r = 0; r < s.length; r++) {
      // extend window until valid
      if (frequency[s[r]] !== undefined) {
          frequency[s[r]]--
          if (frequency[s[r]] === 0) counter--
      }
      // start trimming from left
      while (counter === 0) {
          if (r - l < minLen) {
              minLen = r - l
              ans = s.slice(l, r + 1)
          }
          
          if (frequency[s[l]] !== undefined) { // died because of 0 val
              frequency[s[l]]++ // forgot to check if it exists in frequency map
              if (frequency[s[l]] > 0) counter++
          }
          l++
      }
  }
  return ans
};

/*
ALGORITHMS
1. Create frequency map - count all letters in t
2. Set counter to number of keys in frequency 
3. loop right counter up to string length
  - extend window => slide right 
      - decrease count in frequency if found
      - if frequency count for a char == 0 => decrease counter 
  - trim from left as long as the window is valid => while counter == 0 
      - update minLeng substring 
      - found left char in frequency
          - increase frequency count
          - if frequency per char > 0 => increase counter
          
SUMMARY
1. Move right until valid
2. Once valid, counter = 0 => trim from left

STRUGGLES:
1. Create frequency map => post increment leads to off count
2. Set counter to num of keys in obj. Not when initializing obj. 
3. When do if (frequency[s[r]]) => died because of 0 value
*/