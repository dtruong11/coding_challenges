/*
Problem Statement: 
On a positive integer, you can perform any one of the following 3 steps. 
1.) Subtract 1 from it. ( n = n - 1 )  , 
2.) If its divisible by 2, divide by 2. ( if n % 2 == 0 , then n = n / 2  )  , 
3.) If its divisible by 3, divide by 3. ( if n % 3 == 0 , then n = n / 3  ). 
Now the question is, given a positive integer n, find the minimum number of steps that takes n to 1
eg: 
1.)For n = 1 , output: 0       
2.) For n = 4 , output: 2  ( 4  /2 = 2  /2 = 1 )    
3.)  For n = 7 , output: 3  (  7  -1 = 6   /3 = 2   /2 = 1 )
*/



// DP Bottom Up
const minimumStepsToOneDP = (num) => {
  let dp = new Array(num + 1).fill(0)
  for (let i = 2; i <= num; i++) {
    dp[i] = dp[i - 1] + 1
    if (i % 2 === 0) dp[i] = Math.min(dp[i], dp[i / 2] + 1)
    else if (i % 3 === 0) dp[i] = Math.min(dp[i], dp[i / 3] + 1)
  }
  return dp[num]
}

// Topdown Recursion 
const minimumStepsToOneTD = (num) => {
  let memo = []
  return helper(num, memo)
}

const helper = (num, memo) => {
  if (num <= 1) return 0
  else if (memo[num] !== undefined) return memo[num]

  let numSteps = helper(num - 1, memo) + 1
  if (num % 2 === 0) numSteps = Math.min(numSteps, helper(num / 2, memo) + 1)
  else if (num % 3 === 0) numSteps = Math.min(numSteps, helper(num / 3, memo) + 1)

  memo[num] = numSteps
  return memo[num]
}


console.log(minimumStepsToOneTD(7))
console.log(minimumStepsToOneTD(4))



/* MY CODE */
// function minimumStepsToOne(num) {
//   if (num === 1) return num
//   let dp = new Array(num + 1).fill(0)

//   for (let i = 2; i <= num; i++) {
//     let rem = i // forget to set rem inside loop
//     if (i % 3 === 0) rem /= 3
//     else if (i % 2 === 0) rem /= 2
//     else {
//       rem -= 1
//     }
//     dp[i] = Math.min(dp[i - 1] + 1, dp[rem] + 1)
//   }
//   return dp[num]
// }

// const helper = (num, memo) => {
//   if (num <= 1) return 0
//   else if (memo[num] !== undefined) return memo[num]

//   let numSteps
//   if (num % 2 === 0) numSteps = helper(num / 2, memo) + 1 // forget to check min
//   else if (num % 3 === 0) numSteps = helper(num / 3, memo) + 1
//   else numSteps = helper(num - 1, memo) + 1

//   memo[num] = numSteps
//   return memo[num]
// }
