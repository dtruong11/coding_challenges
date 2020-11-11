const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const binarySearch = (nums, target) => {
  let left = 0, right = nums.length - 1
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2)
    if (nums[mid] === target) return mid
    if (nums[mid] < target) left = mid + 1
    else right = mid - 1
  }
  return -1
}

console.log('Find target 8 at idx', binarySearch(arr, 8))
console.log('Find target 4 at idx', binarySearch(arr, 4))
console.log('Find target 11 at idx', binarySearch(arr, 4))

/*
Usage of Binary Search:
* Finding the smallest solution: An important use for binary search is to find the position where the value of a function changes.  x >= k
* Finding the maximum value: find the maximum value for a function that is first increasing and then decreasing.
*/

/**
 * LOWER BOUND - O(LogN)
 * @description Find the first value >= target. 
 * @returns the index of the search item or  
 */
const lowerBound = (nums, target) => {
  
} 


/**
 * UPPER BOUND
 * @description Find the first value > target
 */
const upperBound = (nums, target) => {

}


