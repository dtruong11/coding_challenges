/*
Given an array of integers of size ‘n’.
Our aim is to calculate the maximum sum possible for ‘k’ consecutive elements in the array.
Input  : [100, 200, 300, 400, 100, 100], k = 2
Output : 700
*/

/**
 * BRUTE FORCE
 */
// function maxSum (arr, n, k) {
//   let max = -Infinity
//   for (let l = 0; l < n - k + 1; l++) {
//     let sum = 0
//     for (let i = 0; i < k; i++) {
//       sum += arr[l + i] // forgot this. Did not move i
//     }
//     max = Math.max(max, sum)
//   }
//   return max
// }

/**
 * SLIDING WINDOW
 */
function maxSum(arr, k) {
  let max = -Infinity, cur_sum = 0
  let left = 0
  for (let r = 0; r < arr.length; r++) {
    if (r - left + 1 > k) {
      cur_sum -= arr[left]
      left++
    }
    cur_sum += arr[r]
    max = Math.max(max, cur_sum)
  }
  return max
}

console.log(maxSum([100, 200, 300, 400, 100], 2))

/*
ALGORITHM
- for loop - move right up to string length 
  - if check invalid - number of elements (r - l + 1) > k
    - minus arr[left] from cur_sum
    - increase left
  - add arr[right] to cur_sum
  - update max 
*/
