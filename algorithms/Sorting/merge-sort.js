/*
- split in half => mid

[1,9,3,4,7] [5,8,6,2]
[1,9]  [3,4,7]   [5,8]  [6,2]
[1][9] [3][4][7] [5][8] [6][2]
[1,3,4,7,9] [2,5,6,8]
[1,2,3,4,5,6,7,8,9]

2 components
- mergeSort()
  get midIdx
  mergeSort left, mergeSort right
  merge left and right halves

- merge()


*/

const mergeSort = (nums) => {
  if (!nums || nums.length <= 1) return nums
  const start = 0
  const midIdx = Math.floor(start + (end - start)/2)
  const left = mergeSort(nums.slice(start, midIdx))
  const right = mergeSort(nums.slice(midIdx))
  return merge(left, right)
}

const merge = (left, right) => {
  const sorted = []
  if (left[0] < right[0]) {
    sorted.push(left[0])

  } else {
    sorted.push(right[0])

  }
}





console.log(mergeSort([1,9,3,4,7,5,8,6,2]))