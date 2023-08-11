/**
 * Take n number of dices, return number permutations of these dices
 * input: n = 2
 * output: [[1,1],[1,2],[1,3]...]
 * @param {*} n
 */

const DICE_MAX_NUM = 6;
function dicePermutations(n) {
  const result = [];
  permute(result, n, []);
  return result;
}

function permute(result, n, curPath) {
  if (curPath.length === n) {
    result.push([...curPath]);
    return;
  }

  for (let num = 1; num <= DICE_MAX_NUM; num++) {
    curPath.push(num);
    permute(result, n, curPath);
    curPath.pop();
  }
}
console.log(dicePermutations(6));
