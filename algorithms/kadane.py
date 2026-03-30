from typing import List, Tuple;

# Max
class Solution:
  def max_sub_array(nums: List[int]) -> int:
    max_sum = nums[0]
    cur_sum = nums[0]

    for num in nums:
      if cur_sum < 0:
        cur_sum = max(cur_sum, 0)
      cur_sum += num
      max_sum = max(cur_sum, max_sum)
    return max_sum
    

# Sliding Window returns the indicies of the sub array that has the largest sum
  def max_sub_array_indices(nums: List[int]) -> int, Tuple(int, int):
    max_sum = float(-inf)
    cur_sum = 0
    max_left, max_right = 0, 0
    left = 0

    for right in range(len(nums)):
      if cur_sum < 0:
        cur_sum = max(cur_sum, 0)
        left = right
      cur_sum += nums[right]
      if cur_sum > max_sum:
        max_sum = cur_sum
        max_left = left
        max_right = right
    return max_sum, (max_left, max_right)
