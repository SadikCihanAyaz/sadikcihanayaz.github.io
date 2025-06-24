# 🔄 Set, Map, Array, and POJO Conversion Guide in JavaScript

This guide explains how to convert between `Set`, `Map`, `Array`, and `POJO` (Plain Old JavaScript Object), including how to iterate over each structure.

---

## 📌 Set → Array

### ✅ Convert a `Set` to an `Array`
```ts
const mySet = new Set([1, 2, 3]);
const arrayFromSet = Array.from(mySet);
// or
const arrayFromSet2 = [...mySet];
```

### 🔁 Iterate over a `Set`
```ts
for (const item of mySet) {
  console.log(item);
}
```

---

## 📌 Map → Array

### ✅ Convert a `Map` to an `Array`
```ts
const myMap = new Map([
  ["a", 1],
  ["b", 2],
]);

const arrayFromMap = Array.from(myMap);
// or
const arrayFromMap2 = [...myMap];
```

### 🔁 Iterate over a `Map`
```ts
for (const [key, value] of myMap) {
  console.log(`${key} = ${value}`);
}
```

---

## 📌 POJO → Array

### ✅ Convert a POJO to key-value pair `Array`
```ts
const pojo = { name: "Alice", age: 30 };

const entriesArray = Object.entries(pojo);
const keysArray = Object.keys(pojo);
const valuesArray = Object.values(pojo);
```

### 🔁 Iterate over a POJO
```ts
for (const [key, value] of Object.entries(pojo)) {
  console.log(`${key} = ${value}`);
}
```

---

## 📌 Array → POJO

### ✅ Convert `Array` of key-value pairs to `POJO`
```ts
const array = [["name", "Bob"], ["age", 25]];

const pojo = Object.fromEntries(array);
```

---

## 📌 Map → POJO

### ✅ Convert a `Map` to `POJO`
```ts
const myMap = new Map([
  ["name", "John"],
  ["age", 40],
]);

const pojo = Object.fromEntries(myMap);
```

---

## 📌 Array → Map

### ✅ Convert `Array` of key-value pairs to a `Map`
```ts
const array = [["x", 10], ["y", 20]];

const myMap = new Map(array);
```

---

## 📌 POJO → Map

### ✅ Convert POJO to `Map`
```ts
const pojo = { a: 1, b: 2 };

const myMap = new Map(Object.entries(pojo));
```

---