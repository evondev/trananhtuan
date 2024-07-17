// 1. Using for loop to get O(n) time complexity
const sum_to_n_a = function (n: number): number {
  if (n >= -1 && n <= 1) return n;
  let sum = 0;
  if (n > 0) {
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
  } else {
    for (let i = 0; i >= n; i--) {
      sum += i;
    }
  }
  return sum;
};
// 2. Using recursion to get O(n) time complexity
const sum_to_n_b = function (n: number): number {
  if (n >= -1 && n <= 1) return n;
  if (n < 0) return n + sum_to_n_b(n + 1);
  return n + sum_to_n_b(n - 1);
};
// 3. Using Arithmetic Formula to get O(1) time complexity
const sum_to_n_c = function (n: number): number {
  if (n >= -1 && n <= 1) return n;
  const absNumber = Math.abs(n);
  const sum = (absNumber * (absNumber + 1)) / 2;
  return n < 0 ? -sum : sum;
};
