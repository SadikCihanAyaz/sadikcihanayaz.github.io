# 📦 Object Constructor Functions in JavaScript

JavaScript provides a set of *constructor functions* to create wrapper objects or instantiate core built-in types. These constructors are available globally and help create new instances of objects like `Boolean`, `Error`, or `BigInt`.

---

## 🧱 What Are Constructor Functions?

Constructor functions are used with the `new` keyword to create instances of object wrappers. However, most of these can also be called without `new` to perform type conversion or utility tasks.

---

## 📌 1. `Object()`

- Creates a generic object wrapper.
- Can also convert primitive types to their object equivalents.

```ts
const obj = new Object()
// same as:
const obj2 = {}
const wrapped = Object("hello") // creates a String object
```

✅ Use `{}` instead of `new Object()` for brevity.

---

## 📌 2. `Function()`

- Dynamically creates a new function using a string of code.

```ts
const sum = new Function("a", "b", "return a + b")
sum(2, 3) // returns 5
```

⚠️ Not recommended. Similar to `eval()` and can introduce security risks.

---

## 📌 3. `Boolean()`

- Converts any value to a boolean.

```ts
Boolean(1)       // true
Boolean(0)       // false
Boolean("")      // false
Boolean("text")  // true
```

- With `new`, creates a Boolean object (rarely useful):

```ts
const flag = new Boolean(false)
typeof flag // "object"
```

---

## 📌 4. `Symbol()`

- Creates a unique and immutable symbol value.

```ts
const sym = Symbol("id")
const sym2 = Symbol("id")
sym === sym2 // false
```

- Often used for object property keys to avoid name clashes.

---

## 📌 5. `BigInt()`

- Represents integers with arbitrary precision.

```ts
const big = BigInt(9007199254740991)
const big2 = 9007199254740991n
```

✅ Useful for large numbers beyond the safe integer limit.

---

## 📌 6. `Error()`

- Used to create error objects manually.

```ts
const err = new Error("Something went wrong")
throw err
```

- There are subclasses like `TypeError`, `ReferenceError`, `SyntaxError`, etc.

---

## 🧠 Summary Table

| Constructor   | Purpose                             | Notes                                  |
|---------------|-------------------------------------|----------------------------------------|
| `Object()`     | Wraps primitives or creates objects | Prefer `{}` instead                    |
| `Function()`   | Creates function from string        | Avoid due to security/performance      |
| `Boolean()`    | Converts or wraps boolean values    | Use without `new`                      |
| `Symbol()`     | Creates unique value                | Useful for unique keys                 |
| `BigInt()`     | Creates large integer values        | Supports arbitrary-precision numbers   |
| `Error()`      | Creates error instances             | Throw custom errors                    |

---

## 💡 Interview Tip

- Know the difference between a **primitive** and a **wrapper object**.
- Use `typeof` to demonstrate the difference between `Boolean(true)` and `new Boolean(true)`.
- Be ready to explain when to use `Symbol()` and `BigInt()` in real-world use cases.