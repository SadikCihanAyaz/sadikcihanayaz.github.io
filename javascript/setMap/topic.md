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

Let me know if you want deep dives, gotchas, or performance comparisons!