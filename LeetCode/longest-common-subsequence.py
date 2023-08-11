# example 1: text1 = 'abcde', text2 = 'ace'. result = 3 => 'ace'  
def longestCommonSubsequence(text1: str, text2: str) -> int:
  text2_len = len(text2)
  text1_len = len(text1)

  matrix = [[0 for i in range(text1_len + 1)] for i in range(text2_len + 1)]
  for r in range(1, text2_len + 1):
    for c in range(1, text1_len + 1):
      matrix[r][c] = max(matrix[r-1][c], matrix[r][c-1])
      if text2[r - 1] == text1[c - 1]:
        matrix[r][c] = 1 + matrix[r - 1][c - 1]
  return matrix[text2_len][text1_len] 

print('ans', longestCommonSubsequence('abcde', 'ace'))
print('ans', longestCommonSubsequence('aabbccfdee', 'ace'))


"""
  a b c d e
a 1 1 1 1 1
c 1 1 2 2 2
e 1 1 2 2 3 
"""
# Note: Discuss optimization O(M). 
