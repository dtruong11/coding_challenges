/**
 * Merge Sort - Space efficient solution
 * @param {} nums 
 */
const mergeSort = (nums) => {
  if (nums.length <= 1) return nums
  const mid = Math.floor(nums.length / 2)
  const left = mergeSort(nums.slice(0, mid))
  const right = mergeSort(nums.slice(mid))
  return merge(nums, left, right)
}
function merge (arr, leftArr, rightArr) {
  let l = 0, r = 0, k = 0
  while (l < leftArr.length && r < rightArr.length) {
    if (leftArr[l] < rightArr[r]) {
      arr[k] = leftArr[l]
      l++
    } else {
      arr[k] = rightArr[r]
      r++
    }
    k++
  }
  while (l < leftArr.length) {
    arr[k] = leftArr[l]
    k++
    l++
  }
  while (r < rightArr.length) {
    arr[k] = rightArr[r]
    k++
    r++
  }
  return arr
}

console.log(mergeSort([2, 2, 0, 1, 2, 0]))


/**
 * Merge Sort - NOT Space efficient, but easy to code
 * @param {} nums 
 */

// const merge = (arr1, arr2) => {
//   let sorted = [];

//   while (arr1.length && arr2.length) {
//     if (arr1[0] < arr2[0]) sorted.push(arr1.shift());
//     else sorted.push(arr2.shift());
//   };

//   return sorted.concat(arr1.slice().concat(arr2.slice()));
// }

// const mergeSort = arr => {
//   if (arr.length <= 1) return arr;
//   let mid = Math.floor(arr.length / 2)
//   const left = mergeSort(arr.slice(0, mid))
//   const right = mergeSort(arr.slice(mid));

//   return merge(left, right);
// };
