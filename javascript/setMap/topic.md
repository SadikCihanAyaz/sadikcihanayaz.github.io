# 🔗 JavaScript Set and Map Explained

JavaScript provides powerful built-in collection types: **Set** for unique values and **Map** for key-value pairs. Here’s everything you need to know:

---

## 🟢 Set

A **Set** is a collection that stores only **unique values** (no duplicates allowed). You can add any type of value (numbers, strings, objects, etc.).

### Key Features
- Stores only unique values (duplicates are ignored).
- Keeps values in insertion order.
- Can hold any value type (primitive or object).

### Example Usage

```ts
const fruits = new Set();
fruits.add("apple");
fruits.add("banana");
fruits.add("apple"); // "apple" is already in the set

console.log(fruits.has("banana")); // true
console.log(fruits.size); // 2

// Iterate over the set
for (const fruit of fruits) {
  console.log(fruit); // apple, banana
}
```

### Common Methods

| Method           | Description                           |
|------------------|---------------------------------------|
| `.add(value)`    | Adds a value to the set               |
| `.delete(value)` | Removes a value from the set          |
| `.has(value)`    | Checks if a value is in the set       |
| `.clear()`       | Removes all values                    |
| `.size`          | Returns the number of unique values   |

---

## 🟣 Map

A **Map** stores **key-value pairs**, where keys can be any type (not just strings or symbols like objects).

### Key Features
- Keys can be any type (including objects, arrays, functions).
- Preserves the order of insertion.
- Useful for dynamic key-value associations.

### Example Usage

```ts
const scores = new Map();
scores.set("Alice", 95);
scores.set("Bob", 82);
scores.set({ id: 1 }, "Custom Object Key");

console.log(scores.get("Alice")); // 95
console.log(scores.has("Bob")); // true

// Iterate over entries
for (const [key, value] of scores) {
  console.log(key, value);
}
```

### Common Methods

| Method           | Description                           |
|------------------|---------------------------------------|
| `.set(key, value)`   | Adds/updates a value by key            |
| `.get(key)`          | Retrieves the value for a given key     |
| `.has(key)`          | Checks if a key exists                  |
| `.delete(key)`       | Removes a key-value pair                |
| `.clear()`           | Removes all key-value pairs             |
| `.size`              | Returns the number of entries           |

---

## 🚩 When Should You Use Each?

- **Set**: When you want a collection of unique values (e.g., removing duplicates).
- **Map**: When you need to associate values with keys, and the keys might not be strings.

---

**Tip:** Both `Set` and `Map` support `for...of` loops and `.forEach()` for easy iteration!


# 🔄 Converting Between Array and Set in JavaScript

## 1. Array ➡️ Set

You can create a Set from an array using the `Set` constructor.  
This is useful for removing duplicates!

```ts
const arr = [1, 2, 3, 2, 4, 1];
const set = new Set(arr); // Set { 1, 2, 3, 4 }
```

---

## 2. Set ➡️ Array

You can convert a Set back to an array using the spread operator `...` or `Array.from()`.

```ts
const set = new Set([1, 2, 3]);
const arr1 = [...set];        // [1, 2, 3]
const arr2 = Array.from(set); // [1, 2, 3]
```

---

## 🔥 Bonus: Remove Duplicates From Array

Using Set and spread, you can quickly deduplicate an array:

```ts
const arr = [1, 2, 2, 3, 4, 4];
const unique = [...new Set(arr)]; // [1, 2, 3, 4]
```

---

# 🔄 Converting Between Map and Array in JavaScript

## 1. Array ➡️ Map

You can create a Map from an array of key-value pairs using the `Map` constructor.

```ts
const entries = [
  ["name", "Alice"],
  ["age", 30]
];
const map = new Map(entries);
// Map { "name" => "Alice", "age" => 30 }
```

---

## 2. Map ➡️ Array

You can convert a Map to an array using the spread operator (`...`) or `Array.from()`.  
This gives you an array of `[key, value]` pairs.

```ts
const map = new Map([
  ["color", "blue"],
  ["size", "large"]
]);

const arr1 = [...map];         // [ ["color", "blue"], ["size", "large"] ]
const arr2 = Array.from(map);  // [ ["color", "blue"], ["size", "large"] ]
```

---

## 🔥 Bonus: Get Only Keys or Only Values from a Map

To get just the keys or just the values as arrays:

```ts
const map = new Map([
  ["x", 10],
  ["y", 20]
]);

const keys = [...map.keys()];     // ["x", "y"]
const values = [...map.values()]; // [10, 20]
```

---

# 🔄 Understanding `Object.fromEntries()` in JavaScript

JavaScript’s `Object.fromEntries()` is a powerful method for converting arrays (or any iterable) of key-value pairs into a **plain object**. It is especially useful for transforming Maps or processing data for key-based lookups.

---

## 🚩 What Does `Object.fromEntries()` Do?

- Takes an **iterable** (like an array or a Map) of `[key, value]` pairs.
- Returns a **plain JavaScript object** where each key-value pair becomes a property on the object.

---

## 🏗️ How Does It Work?

### From Map to Object

```ts
const map = new Map();
map.set("A", ["Alice", "Charlie"]);
map.set("B", ["Bob"]);

const obj = Object.fromEntries(map.entries());
// Result: { A: [ 'Alice', 'Charlie' ], B: [ 'Bob' ] }
```

### From Array of Pairs to Object

```ts
const pairs = [
  ["name", "Alice"],
  ["age", 30]
];

const obj = Object.fromEntries(pairs);
// Result: { name: "Alice", age: 30 }
```

---

## 🗂️ What Is a Plain Object?

A **plain object** is the most basic JavaScript object:
- Created with `{}` or `new Object()`
- Keys are strings or symbols
- Used for flexible, key-based data storage

Example:
```ts
const person = { name: "Bob", age: 25 };
// Access:
console.log(person.name); // "Bob"
```

---

## ⚡ Does `Object.fromEntries()` Create an Array?

**No.**  
It creates a plain object (not an array).  
- **Array:** `[1, 2, 3]`
- **Object:** `{ a: 1, b: 2 }`

---

## 📊 Extended Summary Table

| Function / Constructor             | Example Input                                     | Output Example                            | Output Type         |
|------------------------------------|---------------------------------------------------|-------------------------------------------|---------------------|
| `Object.fromEntries()`             | `[["a", 1], ["b", 2]]`                            | `{ a: 1, b: 2 }`                          | Object              |
| `Object.entries()`                 | `{ a: 1, b: 2 }`                                  | `[["a", 1], ["b", 2]]`                    | Array of pairs      |
| `Array.from()`                     | `[1, 2, 3]`                                       | `[1, 2, 3]`                               | Array               |
| `new Map([["x", 10], ["y", 20]])`  | `[["x", 10], ["y", 20]]`                          | `Map { "x" => 10, "y" => 20 }`            | Map                 |
| `map.entries()`                    | `Map { "x" => 10, "y" => 20 }`                    | `[["x", 10], ["y", 20]]` (iterator/array) | Iterator / Array    |
| `Object.keys()`                    | `{ a: 1, b: 2 }`                                  | `["a", "b"]`                              | Array               |
| `Object.values()`                  | `{ a: 1, b: 2 }`                                  | `[1, 2]`                                  | Array               |

---

## 🔥 When Is This Useful?

- Convert a Map to a regular object for serialization (e.g., `JSON.stringify` only works on plain objects, not Maps).
- Transform data after using `Object.entries()` (do data manipulation, then turn it back into an object).
- Cleanly aggregate or group data.

---

## 💡 Pro Tip

If you ever use `.reduce()` to build an array of pairs, you can immediately transform it into an object:

```ts
const arr = [ ["cat", 4], ["dog", 4] ];
const obj = Object.fromEntries(arr);
// { cat: 4, dog: 4 }
```

---

**Summary:**  
- `Object.fromEntries()` is a bridge between arrays, Maps, and regular JavaScript objects.
- Perfect for building key-based lookups and working with iterable data.

Let me know if you want practical scenarios, or a visual chart for these conversions!