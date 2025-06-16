## 🧮 Array Methods in JavaScript

JavaScript provides a rich set of array methods to create, check, and manipulate arrays. Below is a breakdown of essential array methods including constructors and prototype functions.

---

### 📦 1. `Array()` Constructor

✅ Creates a new array instance.

```ts
const empty = new Array();          // []
const fixedLength = new Array(3);   // [ <3 empty items> ]
const filled = new Array(1, 2, 3);  // [1, 2, 3]
```

> 🧠 Tip: Use `[]` or `Array.of()` for safer behavior.

---

### 🧲 2. `Array.from()`

✅ Creates a new array from an **array-like** or **iterable** object.

```ts
Array.from("hello"); // ['h', 'e', 'l', 'l', 'o']

Array.from([1, 2, 3], x => x * 2); // [2, 4, 6]
```

> Useful when converting NodeLists or Sets into true arrays.

---

### ✅ 3. `Array.isArray()`

✅ Checks if a value is an array.

```ts
Array.isArray([1, 2, 3]);  // true
Array.isArray("hello");   // false
Array.isArray({ length: 3 }); // false
```

> Preferred over `typeof` for accurate type checking.

---

### 🆕 4. `Array.of()`

✅ Creates an array with the given arguments.

```ts
Array.of(5);         // [5]
Array.of(1, 2, 3);   // [1, 2, 3]
```

> Unlike `Array(5)`, which creates an empty array with length 5, `Array.of(5)` gives an array with one element: 5.

---

### ➕ 5. `concat()`

✅ Merges arrays (or values) into a new array.

```ts
const a = [1, 2];
const b = [3, 4];

const result = a.concat(b, [5]); // [1, 2, 3, 4, 5]
```

> Does **not mutate** original arrays — returns a new one.

---

### 📤 6. `copyWithin(target, start, end?)`

✅ Copies part of the array to another location **in-place** (modifies the original array).

```ts
const arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3); // [4, 5, 3, 4, 5]
```

**Parameters:**
- `target`: Index to copy to.
- `start`: Index to copy from.
- `end` (optional): Stop copying before this index.

---

### 🧠 Summary Table

| Method             | Purpose                                          | Mutates? |
|--------------------|--------------------------------------------------|----------|
| `Array()`          | Create array                                     | No       |
| `Array.from()`     | Create from iterable                             | No       |
| `Array.isArray()`  | Check if value is array                          | No       |
| `Array.of()`       | Create array from arguments                      | No       |
| `concat()`         | Merge arrays/values                              | No       |
| `copyWithin()`     | Copy part of array in-place                      | ✅ Yes   |

---

### 📇 7. `entries()`

✅ Returns an **iterator** of `[index, value]` pairs for each array element.

```ts
const arr = ['a', 'b', 'c'];
const iterator = arr.entries();

for (const [index, value] of iterator) {
  console.log(index, value);
}
// Output: 0 'a', 1 'b', 2 'c'

// BTW [index, value] -> this referring to call as array destructuring
```

> Useful for `for...of` loops when you need both index and value.

---

### ✅ 8. `every(callback)`

✅ Checks if **every element** passes the provided test. Returns `true` or `false`.

```ts
[2, 4, 6].every(x => x % 2 === 0);  // true
[2, 3, 6].every(x => x % 2 === 0);  // false
```

> Stops as soon as it finds one `false`.

---

### 🧱 9. `fill(value, start?, end?)`

✅ Fills elements in the array with a static value.

```ts
const arr = [1, 2, 3, 4];
arr.fill(0, 1, 3); // [1, 0, 0, 4]
```

> Mutates the original array.

❌ fill() cannot add more items to an array.

It only modifies existing elements in-place.


```ts
const arr = [1, 2, 3];
arr.fill(9, 3, 5); // does NOT add anything — array stays the same length
```

> To add items, you’d need:
	•	push(), unshift() – for adding
	•	concat() – to combine arrays
	•	Or spread operator: [...arr, ...newItems]
---

### 🔍 10. `filter(callback)`

✅ Creates a **new array** with elements that pass the test.

```ts
const nums = [1, 2, 3, 4, 5];
const evens = nums.filter(n => n % 2 === 0); // [2, 4]
```

> Does not modify the original array.

> if you want to use index, array etc below you can see large usage.

🧠 Reminder:
	•	Returning true → keep the item
	•	Returning false → exclude the item

```ts
const nums = [1, 2, 3, 4, 5];

const customFilter = nums.filter((num, index, arr) => {
  if (num % 2 === 0 && index < arr.length - 1) {
    return true; // keep this element
  } else {
    return false; // exclude this one
  }
});

console.log(customFilter); // [2, 4]
```

---

### 🔎 11. `find(callback)`

✅ Returns the **first element** that matches the condition.

```ts
[5, 12, 8, 130].find(x => x > 10); // 12
```

> Returns `undefined` if no match is found.

⚠️ Difference from filter():
	•	find() → returns first matching element
	•	filter() → returns an array of all matching elements

---

### 🔢 12. `findIndex(callback)`

✅ Returns the **index** of the first element that satisfies the condition.

```ts
[5, 12, 8, 130].findIndex(x => x > 10); // 1
```

> Returns `-1` if not found.

---

### 🔚 13. `findLast(callback)`

✅ Returns the **last element** that satisfies the condition.

```ts
[1, 5, 10, 20].findLast(x => x < 15); // 10
```

> Not supported in older environments (introduced in ES2023).

---

### 🧠 Summary Table

| Method         | Purpose                                   | Returns          | Mutates |
|----------------|--------------------------------------------|------------------|---------|
| `entries()`     | Iterator of `[index, value]`              | Iterator         | ❌ No    |
| `every()`       | Test if all elements pass                 | Boolean          | ❌ No    |
| `fill()`        | Fill array with static value              | Modified array   | ✅ Yes   |
| `filter()`      | Filter items that match                   | New array        | ❌ No    |
| `find()`        | First matching element                    | Element / `undefined` | ❌ No |
| `findIndex()`   | Index of first match                      | Number / `-1`    | ❌ No    |
| `findLast()`    | Last matching element (ES2023+)           | Element / `undefined` | ❌ No |

---

### 🔚 14. `findLastIndex(callback)`

✅ Returns the **index of the last element** that satisfies the condition.

```ts
const arr = [1, 5, 10, 20];
const index = arr.findLastIndex(x => x < 15); // 2
```

> Similar to `.findIndex()`, but searches from the end.

---

### 🧩 15. `flat(depth?)`

✅ Flattens nested arrays into a single array. Default depth is `1`.

```ts
const nested = [1, [2, 3], [4, [5]]];
nested.flat();        // [1, 2, 3, 4, [5]]
nested.flat(2);       // [1, 2, 3, 4, 5]
```

> Great for simplifying multi-level arrays.

---

### 🧬 16. `flatMap(callback)`

✅ Maps each element, then flattens **one level** deep.

```ts
const words = ["hello", "world"];
const result = words.flatMap(word => word.split(""));
// ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
```

> Equivalent to `.map().flat(1)`, but more efficient.

---

### 🔁 17. `forEach(callback)`

✅ Executes a function once for each array element.

```ts
const nums = [1, 2, 3];
nums.forEach(num => console.log(num * 2)); // 2, 4, 6
```

> Does not return anything. Use `.map()` if you need a new array.

> If you need if else condition and access its index and array itself you can use it like below.
```ts
array.forEach((value, index, array) => {
  if (condition) {
    // do something
  } else {
    // do something else
  }
});
```

---

### 🔍 18. `includes(value, fromIndex?)`

✅ Checks if the array **contains** a given value.

```ts
const fruits = ["apple", "banana", "orange"];
fruits.includes("banana"); // true
fruits.includes("pear");   // false
```

> Case-sensitive. Works for `NaN`, unlike `indexOf()`.

---

### 🔢 19. `indexOf(value, fromIndex?)`

✅ Returns the **first index** of a value, or `-1` if not found.

```ts
const nums = [1, 2, 3, 2];
nums.indexOf(2);      // 1
nums.indexOf(5);      // -1
```

> Use for searching primitives in arrays.

---

### 🔗 20. `join(separator)`

✅ Joins all array elements into a single string.

```ts
const names = ["Alice", "Bob", "Charlie"];
names.join(", "); // "Alice, Bob, Charlie"
names.join("-");  // "Alice-Bob-Charlie"
```

> Default separator is a comma.

---

### 🧠 Summary Table

| Method             | Purpose                                        | Returns      | Mutates |
|--------------------|------------------------------------------------|--------------|---------|
| `findLastIndex()`  | Index of last matching element                 | Number / -1  | ❌ No    |
| `flat()`           | Flattens nested arrays                        | New array    | ❌ No    |
| `flatMap()`        | Map and flatten one level                     | New array    | ❌ No    |
| `forEach()`        | Loop through each element                     | `undefined`  | ❌ No    |
| `includes()`       | Check if value exists                         | Boolean      | ❌ No    |
| `indexOf()`        | First index of value                          | Number / -1  | ❌ No    |
| `join()`           | Combine array into a string                   | String       | ❌ No    |

---


### 🗝️ 21. `keys()`

✅ Returns an **iterator of keys (indices)** in the array.

```ts
const arr = ["a", "b", "c"];
const keys = arr.keys();

for (const key of keys) {
  console.log(key); // 0, 1, 2
}
```

> Use with `for...of` or spread for index-based logic.

---

### 🔙 22. `lastIndexOf(value, fromIndex?)`

✅ Returns the **last index** of a given value, or `-1` if not found.

```ts
const items = [1, 2, 3, 2, 1];

items.lastIndexOf(2);    // 3
items.lastIndexOf(4);    // -1
```

> Searches backwards from the end of the array.

---

### 🔁 23. `map(callback)`

✅ Creates a new array with the **results of calling a function** on every element.

```ts
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2); // [2, 4, 6]
```

> Does not mutate the original array.

> below you can find large usage of map().

```ts
const numbers = [1, 2, 3, 4, 5];

const modified = numbers.map((num, index,array) => {
  if (num % 2 === 0) {
    return num * index; // multiply even numbers by their index
  } else {
    return num + index; // add index to odd numbers
  }
});

console.log(modified); // [1, 2, 9, 6, 9]
```

---

### ➖ 24. `pop()`

✅ Removes the **last element** from an array and returns it.

```ts
const stack = [1, 2, 3];
const last = stack.pop(); // last = 3
console.log(stack);       // [1, 2]
```

> Mutates the original array.

---

### ➕ 25. `push(...items)`

✅ Adds one or more elements to the **end** of the array. Returns the new length.

```ts
const queue = [1, 2];
queue.push(3); // returns 3
console.log(queue); // [1, 2, 3]
```

> Mutates the original array.

> In real life we mostly prefer to use spread syntax. It doesnt mutate original array.

```ts
const queue = [1, 2];
const newQueue = [...queue, 3]; 
// newQueue: [1, 2, 3]
```

---

### 🧮 26. `reduce(callback, initialValue)`

✅ Reduces the array to a **single value**, applying a function from **left to right**.

```ts
const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, curr) => acc + curr, 0); // 10
```

> Commonly used for summing, flattening, or aggregating.

---

### 🔁 27. `reduceRight(callback, initialValue)`

✅ Like `reduce()`, but processes the array from **right to left**.

```ts
const letters = ["a", "b", "c"];
const reversed = letters.reduceRight((acc, curr) => acc + curr, "");
// "cba"
```

---

### 🔃 28. `reverse()`

✅ Reverses the array **in place** (mutates it).

```ts
const list = [1, 2, 3];
list.reverse(); // [3, 2, 1]
```

> Mutation doesnt like in real life. We can Do it with map. Follow you can see how can we reverse the items without using reverse()

```ts
const list = [1, 2, 3];

const reversed = list.map((_, i, arr) => arr[arr.length - 1 - i]);

console.log(reversed); // [3, 2, 1]
```

---

### 🧠 Summary Table

| Method            | Purpose                                 | Returns       | Mutates |
|-------------------|------------------------------------------|---------------|---------|
| `keys()`          | Get iterator over indexes                | Iterator      | ❌ No    |
| `lastIndexOf()`   | Last index of value                      | Number        | ❌ No    |
| `map()`           | Transform items to new array             | New array     | ❌ No    |
| `pop()`           | Remove last item                         | Value         | ✅ Yes   |
| `push()`          | Add items to end                         | New length    | ✅ Yes   |
| `reduce()`        | Reduce array to a single value (L→R)     | Any           | ❌ No    |
| `reduceRight()`   | Reduce array to single value (R→L)       | Any           | ❌ No    |
| `reverse()`       | Reverse array in place                   | Modified array| ✅ Yes   |

---

### ⏮️ 29. `shift()`

✅ Removes the **first element** of an array and returns it.

```ts
const arr = [1, 2, 3];
const first = arr.shift(); // 1
console.log(arr);          // [2, 3]
```

> Mutates the array.

---

### ✂️ 30. `slice(start, end?)`

✅ Returns a shallow copy of a portion of an array into a new array.

```ts
const arr = [10, 20, 30, 40];
const sliced = arr.slice(1, 3); // [20, 30]
```

> Does **not** modify the original array.  
> Negative indexes count from the end.

---

### 🧪 31. `some(callback)`

✅ Checks if **at least one** element passes the test.

```ts
[1, 2, 3].some(x => x > 2); // true
[1, 2, 3].some(x => x > 5); // false
```

---

### 🔀 32. `sort(compareFn?)`

✅ Sorts the array **in place**.

```ts
const nums = [3, 1, 2];
nums.sort();          // [1, 2, 3] — sorted as strings
nums.sort((a, b) => b - a); // [3, 2, 1] — descending
```

> Mutates the array.  
> Sorts as strings by default (so "10" < "2").

---

### 🪓 33. `splice(start, deleteCount, ...items)`

✅ Adds/removes/replaces elements in an array.

```ts
const arr = [1, 2, 3, 4];
arr.splice(1, 2, 99, 100); // [2, 3] removed
console.log(arr);         // [1, 99, 100, 4]
```

> Powerful but **mutates** the original array.

---

### 🌍 34. `toLocaleString()`

✅ Converts the array to a string using **locale-specific formatting**.

```ts
const prices = [123456.78];
console.log(prices.toLocaleString("en-US")); // "123,456.78"
console.log(prices.toLocaleString("de-DE")); // "123.456,78"
```

> Useful for currency, date, and number formatting.

---

### 🔤 35. `toString()`

✅ Converts the array to a comma-separated string.

```ts
const names = ["Alice", "Bob"];
names.toString(); // "Alice,Bob"
```

---

### ⏩ 36. `unshift(...items)`

✅ Adds elements to the **beginning** of the array. Returns the new length.

```ts
const arr = [3, 4];
arr.unshift(1, 2); // 4
console.log(arr);  // [1, 2, 3, 4]
```

> Mutates the array.

---

### 🧭 37. `values()`

✅ Returns a new **iterator object** with the values of the array.

```ts
const arr = ["a", "b", "c"];
const values = arr.values();

for (const val of values) {
  console.log(val); // "a", "b", "c"
}
```

> Often used in `for...of` loops.

---

### 🧠 Summary Table

| Method              | Purpose                                     | Returns         | Mutates |
|---------------------|---------------------------------------------|------------------|---------|
| `shift()`           | Remove first element                        | Value           | ✅ Yes  |
| `slice()`           | Copy a section of the array                 | New array       | ❌ No   |
| `some()`            | At least one match?                         | Boolean         | ❌ No   |
| `sort()`            | Sort array in place                         | Modified array  | ✅ Yes  |
| `splice()`          | Add/remove/replace elements                 | Removed items   | ✅ Yes  |
| `toLocaleString()`  | Convert to string using locale formatting   | String          | ❌ No   |
| `toString()`        | Convert to comma-separated string           | String          | ❌ No   |
| `unshift()`         | Add elements to beginning                   | New length      | ✅ Yes  |
| `values()`          | Get iterator over values                    | Iterator        | ❌ No   |

---
