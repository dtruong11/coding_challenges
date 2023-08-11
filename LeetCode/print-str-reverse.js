function printStrReverse(str) {
  helper(0, str)
}

function helper(index, str) {
  if (!str || index > str.length) {
    return undefined
  }
  helper(index + 1, str)
  console.log(str[index])
}

console.log(printStrReverse('abcd'))