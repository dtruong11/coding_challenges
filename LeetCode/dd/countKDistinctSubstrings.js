/**
 * Count number of substrings with exactly k distinct characters 
 * k = 3
 * str = 'aabcaabcdefjajj'
 * result: ['abc','bca','bcd', 'cde,'def', 'efj','fja']
 */

function generateSubstringWithKDistinct (str, k) {
  let result = []
  if (str.length === 0) {
    return result
  }

  const distinctCharSet = new Set()
  let l = 0
  let remainingDistinct = k
  for (let r = 0; r < str.length; r++) {

    // current window is invalid, make valid first
    while (distinctCharSet.has(str[r]) || remainingDistinct <= 0) {
      distinctCharSet.delete(str[l])
      l += 1
      remainingDistinct += 1
    }

    distinctCharSet.add(str[r])
    remainingDistinct -= 1

    if (remainingDistinct === 0) {
      result.push(str.slice(l, r + 1))
    }
  }
  return result
}

console.log(`generateSubstringWithKDistinct('aabcade', 3)`, generateSubstringWithKDistinct('aabcade', 3))
console.log(`generateSubstringWithKDistinct('aabcfde', 3)`, generateSubstringWithKDistinct('aabcfde', 3))