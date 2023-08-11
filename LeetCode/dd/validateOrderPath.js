/**
 * Given a set list of pickups and deliveries for order, figure out if the given list is valid or not.
 * A delivery cannot happen for an order before pickup.
 *
 * Examples below:
 * ['P1', 'P2', 'D1', 'D2'] //valid
 * ['P1', 'D1', 'P2', 'D2'] //valid
 * [P1, D2, D1, P2]==>invalid
 * [P1, D2]==>invalid
 * [P1, P2]==>invalid
 * [P1, D1, D1]==>invalid
 * []==>valid
 * [P1, P1, D1]==>invalid
 * [P1, P1, D1, D1]==>invalid
 * [P1, D1, P1]==>invalid
 * [P1, D1, P1, D1]==>invalid
 */

// Improved version
function validateOrderPath (pickupDropoffs) {
  if (pickupDropoffs.length === 0) return true;
  if (pickupDropoffs.length % 2 === 1) return false;

  const pickupSet = new Set(); //
  const dropoffSet = new Set(); // D1

  for (const el of pickupDropoffs) {
    if (el.startsWith("P")) {
      const dropoffVal = `D${el.slice(1)}`;

      if (pickupSet.has(el) || dropoffSet.has(dropoffVal)) return false;
      pickupSet.add(el);
    } else if (el.startsWith("D")) {
      const pickupValue = `P${el.slice(1)}`;
      if (!pickupSet.has(pickupValue) || dropoffSet.has(el)) return false;
      pickupSet.delete(pickupValue); // processed both pickup and dropoff
      dropoffSet.add(el);
    } else {
      return false; // Invalid element in the array
    }
  }

  return pickupSet.size === 0;
}

const arr1 = ["P1", "P2", "D1", "D2"];
const arr2 = ["P1", "D1", "P2", "D2"];
const arr3 = ["P1", "D2", "D1", "P2"];
const arr4 = ["P1", "D2"];
const arr5 = ["P1", "P2"];
const arr6 = ["P1", "D1", "D1"];
const arr7 = [];
const arr8 = ["P1", "P1", "D1"];
const arr9 = ["P1", "P1", "D1", "D1"];
const arr10 = ["P1", "D1", "P1"];
const arr11 = ["P1", "D1", "P1", "D1"];

// console.log("arr1", arr1, validateOrderPath(arr1), "valid");
// console.log("arr2", arr2, validateOrderPath(arr2), "valid");
// console.log("arr3", arr3, validateOrderPath(arr3), "invalid");
// console.log("arr4", arr4, validateOrderPath(arr4), "invalid");
// console.log("arr5", arr5, validateOrderPath(arr5), "invalid");
// console.log("arr6", arr6, validateOrderPath(arr6), "invalid");
// console.log("arr7", arr7, validateOrderPath(arr7), "valid");
// console.log("arr8", arr8, validateOrderPath(arr8), "invalid");
// console.log("arr9", arr9, validateOrderPath(arr9), "invalid");
// console.log("arr10", arr10, validateOrderPath(arr10), "invalid");
// console.log("arr11", arr11, validateOrderPath(arr11), "invalid");

/**
 * FOLLOW UP QUESTION
 * Find longest valid subarray for valid order path
 * Ex 1: orders = ['P1', 'P1', 'D1'], return ['P1', 'D1']
 * Ex 2: orders = ['P1', 'P1', 'D1', 'D1'], return ['P1', 'D1']
 */
function findLongestValidSubarray (pickupDropoffs) {
  let result = [];

  for (let i = 0; i < pickupDropoffs.length; i++) {
    for (let j = i; j <= pickupDropoffs.length; j += 2) {
      const subArr = pickupDropoffs.slice(i, j);
      if (validateOrderPath(subArr)) {
        if (j - i > result.length) {
          result = subArr;
        }
      }
    }
  }
  return result;
}

console.log(findLongestValidSubarray(["P1", "P3", "P2", "D1", "D3", "D2"]));
console.log(findLongestValidSubarray(["P1", "P1", "D1", "D1"]));
console.log(findLongestValidSubarray(["P1", "P2", "D2", "D3"]));

/**
 * FOLLOW UP QUESTION
 * Pick & Delivery Permutations
 * 
 * Given number of order return all teh possible valid orders
 * n = 2 orders = [P1, P2, D1, D2] , [P1, P2, D2, D1] , [P1, D1, P2, D2]
 */

function generateValidOrders (nums) {
  const result = [];
  const pickupSet = new Set();
  const dropoffSet = new Set();
  dfsGenerate(nums, result, [], pickupSet, dropoffSet);
  return result;
}

function dfsGenerate (nums, result, curPath, pickupSet, dropoffSet) {
  if (curPath.length === nums * 2) {
    result.push([...curPath]);
    return;
  }

  for (let num = 1; num <= nums; num++) {
    if (!pickupSet.has(num)) {
      pickupSet.add(num);
      curPath.push(`P${num}`);

      dfsGenerate(nums, result, curPath, pickupSet, dropoffSet);

      curPath.pop();
      pickupSet.delete(num);
    }
    if (dropoffSet.has(num)) continue;

    if (pickupSet.has(num)) {
      //drop off
      dropoffSet.add(num);
      curPath.push(`D${num}`);
      dfsGenerate(nums, result, curPath, pickupSet, dropoffSet);
      curPath.pop();
      dropoffSet.delete(num);
    }
  }
}

console.log("generateValidOrders(2)", generateValidOrders(2), "\n");
console.log("generateValidOrders(3)", generateValidOrders(3));
