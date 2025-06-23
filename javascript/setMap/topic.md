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