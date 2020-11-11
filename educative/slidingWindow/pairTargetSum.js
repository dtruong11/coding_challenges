/*
Given an array of sorted numbers and a target sum, find a pair in the array whose sum is equal to the given target.
Write a function to return the indices of the two numbers (i.e. the pair) such that they add up to the given target.
Example 1:

Input: [1, 2, 3, 4, 6], target=6
Output: [1, 3]
Explanation: The numbers at index 1 and 3 add up to 6: 2+4=6
*/

const pair_with_targetsum = function(arr, target_sum) {
  let left = 0, right = arr.length - 1
  while (left <= right) {
    const curSum = arr[left] + arr[right]
    if (curSum === target_sum) {
      return [left, right]
    }
    else if (curSum > target_sum) {
      right--
    }
    else if (curSum < target_sum) {
      left++
    }
  }
  return []
}

console.log('pair_with_targetsum([1,2,3,4,6], 6)', pair_with_targetsum([1,2,3,4,6], 6))