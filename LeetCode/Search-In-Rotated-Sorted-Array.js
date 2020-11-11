const nums = [4, 5, 6, 7, 8, 0, 1, 2]

function searchRotated (arr, target) {
  if (arr.length === 0) return -1

  let low = 0, hi = arr.length - 1, mid
  while (low <= hi) {
    mid = low + Math.floor((hi - low) / 2)
    if (arr[mid] === target) return mid

    if (arr[mid] >= arr[low]) {  // already sorted
      if (target >= arr[low] && target < arr[mid]) {
        hi = mid - 1
      } else {
        low = mid + 1
      }
    } else { // non sorted array
      if (target <= arr[hi] && target > arr[mid]) {
        low = mid + 1
      } else {
        hi = mid - 1
      }
    }
  }
  return -1
}


console.log('searchRotated: ', searchRotated(nums, 1))
