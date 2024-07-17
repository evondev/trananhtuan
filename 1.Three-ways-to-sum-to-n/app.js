// For loop
const sum_to_n_a = function (n) {
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
// Recursion
const sum_to_n_b = function (n) {
  if (n >= -1 && n <= 1) return n;
  if (n < 0) return n + sum_to_n_b(n + 1);
  return n + sum_to_n_b(n - 1);
};
// Arithmetic Formula
const sum_to_n_c = function (n) {
  if (n >= -1 && n <= 1) return n;
  const absNumber = Math.abs(n);
  const sum = (absNumber * (absNumber + 1)) / 2;
  return n < 0 ? -sum : sum;
};
