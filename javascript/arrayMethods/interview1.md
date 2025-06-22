# 🧮 JavaScript Array Methods – Realistic Interview Challenges

Here are practical interview questions involving arrays, each modeling a real-world data problem. Solve the problem using JavaScript array methods before revealing the answer!

---

---

### ✅ Question 1: Return Emails of Verified Users

You have an array of user objects. Each user has an `email` and a boolean `isVerified` property.  
Return a new array containing only the emails of users who are verified.

Example:  

```ts
const users = [
  { email: "alice@example.com", isVerified: true },
  { email: "bob@example.com", isVerified: false },
  { email: "charlie@example.com", isVerified: true }
];  
```
- Result: ["alice@example.com", "charlie@example.com"]

```ts
const getVerifiedEmails = (users) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const getVerifiedEmails = (users) => {
  return users.filter(u => u.isVerified).map(u => u.email);
}
```

</details>

---

### ✅ Question 2: Find the First Product Below a Price

You have an array of product objects, each with a `name` and `price`.  
Return the name of the first product with a price less than 20. If there is none, return `null`.

Example:  
const products = [
  { name: "Book", price: 25 },
  { name: "Pen", price: 5 },
  { name: "Notebook", price: 15 }
];  
Result: "Pen"

```ts
const findFirstCheapProduct = (products) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const findFirstCheapProduct = (products) => {
  const item = products.find(p => p.price < 20);
  return item ? item.name : null;
}
```

</details>


---

### ✅ Question 3: Group Students by Grade

You have an array of student objects. Each student has a `name` and a `grade` property (e.g., "A", "B", "C").  
Write a function that returns an object where each key is a grade and its value is an array of student names with that grade.

Example:  
const students = [
  { name: "Alice", grade: "A" },
  { name: "Bob", grade: "B" },
  { name: "Charlie", grade: "A" },
  { name: "Dana", grade: "C" }
];  
Result: { A: ["Alice", "Charlie"], B: ["Bob"], C: ["Dana"] }

```ts
const groupStudentsByGrade = (students) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const groupStudentsByGrade = (students) => {
  return students.reduce((acc, curr) => {
    acc[curr.grade] = acc[curr.grade] || [];
    acc[curr.grade].push(curr.name);
    return acc;
  }, {});
}
```

</details>

---

### ✅ Question 4: Find Users With All Required Permissions

You have an array of user objects, each with a `name` and a `permissions` array.  
Given a list of required permissions, return an array of user names who have **all** the required permissions.

Example:  
const users = [
  { name: "Alice", permissions: ["read", "write", "delete"] },
  { name: "Bob", permissions: ["read"] },
  { name: "Charlie", permissions: ["read", "write"] }
];
const required = ["read", "write"];
Result: ["Alice", "Charlie"]

```ts
const getUsersWithAllPermissions = (users, required) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const getUsersWithAllPermissions = (users, required) => {
  return users
    .filter(user => required.every(p => user.permissions.includes(p)))
    .map(user => user.name);
}
```

</details>


---

### ✅ Question 5: Flatten a Deeply Nested Array

You are given an array that may contain nested arrays of arbitrary depth.  
Write a function that returns a flat array with all the values.

Example:  
const nested = [1, [2, [3, 4], 5], 6];
// Result: [1, 2, 3, 4, 5, 6]

```ts
const flattenArray = (arr) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const flattenArray = (arr) => {
  return arr.flat(Infinity);
}
```

</details>

---

### ✅ Question 6: Find the Most Frequent Word

You are given an array of strings (words).  
Write a function that returns the word that appears most frequently. If there is a tie, return any one of the most frequent words.

Example:  
const words = ["apple", "banana", "apple", "orange", "banana", "apple"];
// Result: "apple"

```ts
const findMostFrequentWord = (words) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const findMostFrequentWord = (words) => {
  const freq = {};
  for (const word of words) {
    freq[word] = (freq[word] || 0) + 1;
  }
  let maxCount = 0;
  let result = null;
  for (const word in freq) {
    if (freq[word] > maxCount) {
      maxCount = freq[word];
      result = word;
    }
  }
  return result;
}
```

</details>

---

### ✅ Question 7: Create a Lookup Map from an Array

You are given an array of product objects, each with an `id` and a `name`.  
Write a function that returns an object (map) where the keys are product IDs and the values are product names.

Example:  
const products = [
  { id: 101, name: "Laptop" },
  { id: 102, name: "Phone" },
  { id: 103, name: "Tablet" }
];
// Result: { "101": "Laptop", "102": "Phone", "103": "Tablet" }

```ts
const createProductMap = (products) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const createProductMap = (products) => {
  return products.reduce((map, product) => {
    map[product.id] = product.name;
    return map;
  }, {});
}
```

</details>

---

### ✅ Question 8: Get All Unique Values from Multiple Arrays

You have an array of arrays of numbers.  
Write a function that returns a single array of all unique numbers across the arrays (no duplicates, order does not matter).

Example:  
const numbers = [
  [1, 2, 3],
  [2, 3, 4],
  [4, 5, 6]
];
// Result: [1, 2, 3, 4, 5, 6]

```ts
const getUniqueNumbers = (arrays) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const getUniqueNumbers = (arrays) => {
  return [...new Set(arrays.flat())];
}
```

</details>


---

### ✅ Question 9: Remove Duplicate Objects by Property

You are given an array of objects where each object has an `id` and a `value`.  
Write a function that returns a new array where each `id` appears only once (keep the first occurrence).

Example:  
const items = [
  { id: 1, value: "a" },
  { id: 2, value: "b" },
  { id: 1, value: "c" },
  { id: 3, value: "d" },
  { id: 2, value: "e" }
];
// Result: [
//   { id: 1, value: "a" },
//   { id: 2, value: "b" },
//   { id: 3, value: "d" }
// ]

```ts
const removeDuplicateIds = (items) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const removeDuplicateIds = (items) => {
  const seen = new Set();
  return items.filter(item => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}
```

</details>

---

### ✅ Question 10: Partition Array by Condition

You are given an array of numbers and a threshold.  
Write a function that returns an object with two properties: `above` (numbers >= threshold) and `below` (numbers < threshold).

Example:  
const arr = [3, 8, 1, 6, 9, 2];
const threshold = 5;
// Result: { above: [8, 6, 9], below: [3, 1, 2] }

```ts
const partitionByThreshold = (arr, threshold) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const partitionByThreshold = (arr, threshold) => {
  return {
    above: arr.filter(x => x >= threshold),
    below: arr.filter(x => x < threshold)
  };
}
```

</details>


---

### ✅ Question 11: Get the Intersection of Two Arrays

You are given two arrays of numbers.  
Write a function that returns a new array containing only the numbers that appear in **both** arrays (no duplicates).

Example:  
const arr1 = [1, 2, 2, 3, 4];
const arr2 = [2, 4, 6, 2];
// Result: [2, 4]

```ts
const intersection = (arr1, arr2) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const intersection = (arr1, arr2) => {
  return [...new Set(arr1)].filter(x => arr2.includes(x));
}
```

</details>

---

### ✅ Question 12: Chunk an Array Into Smaller Arrays

You are given an array and a chunk size.  
Write a function that splits the array into multiple sub-arrays (chunks) of the given size.

Example:  
const arr = [1, 2, 3, 4, 5, 6, 7];
const size = 3;
// Result: [[1, 2, 3], [4, 5, 6], [7]]

```ts
const chunkArray = (arr, size) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
```

</details>

---

### ✅ Question 13: Count the Occurrences of Each Value

You are given an array of values (numbers or strings).  
Write a function that returns an object where the keys are the values from the array and the values are their respective counts.

Example:  
const data = ["a", "b", "a", "c", "b", "a"];
// Result: { a: 3, b: 2, c: 1 }

```ts
const countOccurrences = (arr) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const countOccurrences = (arr) => {
  return arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
}
```

</details>

---

### ✅ Question 14: Find the Longest String in an Array

You are given an array of strings.  
Write a function that returns the longest string in the array. If there are multiple, return the first one.

Example:  
const arr = ["cat", "elephant", "dog", "giraffe"];
// Result: "elephant"

```ts
const findLongestString = (arr) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const findLongestString = (arr) => {
  return arr.reduce((longest, str) => str.length > longest.length ? str : longest, "");
}
```

</details>

---

### ✅ Question 15: Rotate an Array to the Right

You are given an array and a number `k`.  
Write a function that rotates the array to the right by `k` steps.

Example:  
const arr = [1, 2, 3, 4, 5];
const k = 2;
// Result: [4, 5, 1, 2, 3]

```ts
const rotateRight = (arr, k) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const rotateRight = (arr, k) => {
  const n = arr.length;
  k = k % n;
  return arr.slice(-k).concat(arr.slice(0, n - k));
}
```

</details>

---

### ✅ Question 16: Remove Falsy Values From an Array

You are given an array that may contain falsy values (`false`, `0`, `""`, `null`, `undefined`, `NaN`).  
Write a function that returns a new array with all falsy values removed.

Example:  
const arr = [0, "apple", false, "", 42, null, "banana", undefined, NaN];
// Result: ["apple", 42, "banana"]

```ts
const removeFalsy = (arr) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const removeFalsy = (arr) => {
  return arr.filter(Boolean);
}
```

</details>


---

### ✅ Question 17: Find the Earliest and Latest Dates

You are given an array of ISO date strings (e.g., "2023-07-12T10:00:00Z").  
Write a function that returns an object with the earliest and latest date strings.

Example:  
const dates = [
  "2023-07-12T10:00:00Z",
  "2021-01-01T09:30:00Z",
  "2022-05-17T15:45:00Z"
];
// Result: { earliest: "2021-01-01T09:30:00Z", latest: "2023-07-12T10:00:00Z" }

```ts
const findEarliestAndLatest = (dates) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const findEarliestAndLatest = (dates) => {
  if (dates.length === 0) return { earliest: null, latest: null };
  let earliest = dates[0];
  let latest = dates[0];
  for (const date of dates) {
    if (date < earliest) earliest = date;
    if (date > latest) latest = date;
  }
  return { earliest, latest };
}
```

</details>

---

### ✅ Question 18: Merge Two Arrays Without Duplicates

You are given two arrays of strings.  
Write a function that merges them into a single array containing only unique values.

Example:  
const arr1 = ["apple", "banana", "cherry"];
const arr2 = ["banana", "date", "apple"];
// Result: ["apple", "banana", "cherry", "date"]

```ts
const mergeUnique = (arr1, arr2) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const mergeUnique = (arr1, arr2) => {
  return [...new Set([...arr1, ...arr2])];
}
```

</details>

---

### ✅ Question 19: Remove the Nth Element From an Array

You are given an array and an index `n`.  
Write a function that returns a new array with the element at index `n` removed.

Example:  
const arr = ["a", "b", "c", "d"];
const n = 2;
// Result: ["a", "b", "d"]

```ts
const removeAtIndex = (arr, n) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const removeAtIndex = (arr, n) => {
  return arr.slice(0, n).concat(arr.slice(n + 1));
}
```

</details>

---

### ✅ Question 20: Sort an Array of Objects by a Property

You are given an array of objects, each with a `name` and a `score` property.  
Write a function that returns a new array sorted in descending order by score.

Example:  
const players = [
  { name: "Alice", score: 80 },
  { name: "Bob", score: 95 },
  { name: "Charlie", score: 70 }
];
// Result: [
//   { name: "Bob", score: 95 },
//   { name: "Alice", score: 80 },
//   { name: "Charlie", score: 70 }
// ]

```ts
const sortByScoreDesc = (players) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const sortByScoreDesc = (players) => {
  return [...players].sort((a, b) => b.score - a.score);
}
```

</details>