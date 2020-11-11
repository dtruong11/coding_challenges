/*
3 pointers: curIdx, low, high
1. Value = 0 => move before low
  swap current value with low 
  move low, curIdx pointer up
2. Value = 1 => move curIdx pointer
3. Value = 2 => move after high
  swap current value with high
  move high down
*/

const dutch_flag_sort = function(arr) {
  let curIdx = 0, low = 0, high = arr.length - 1
  while (curIdx <= high) {
    if (arr[curIdx] === 0) {
      [arr[curIdx], arr[low]] = [arr[low], arr[curIdx]]
      low++
      curIdx++
    } else if (arr[curIdx] === 1) {
      curIdx++
    } else {
      [arr[curIdx], arr[high]] = [arr[high], arr[curIdx]]
      high--
    }
  }
  return arr
};