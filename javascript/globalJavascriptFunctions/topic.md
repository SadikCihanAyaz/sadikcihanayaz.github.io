# 📚 JavaScript Global Functions

JavaScript provides a set of *global functions* that are accessible from anywhere in your code, without needing to import or reference them from an object. These functions are part of the global scope.

---

## 📌 What Are Global Functions?

Global functions in JavaScript are utility functions attached directly to the global object (`window` in browsers, `global` in Node.js). These functions are available without any namespace and can be used across your application.

---

## 🔗 List of Global Functions

### 1. `eval()`

- Evaluates a string of JavaScript code.
- 📦 eval("some code") → behaves like you had just written some code in your script.

```ts
eval(2 + 2) // returns 4
eval(const x = 5) // defines a variable in the current scope
```

```ts
console.log(eval("2 + 2"));          // 4
eval("let y = 10; console.log(y)");  // prints 10
```

⚠️ Use with caution. It can execute arbitrary code and may cause security issues.

---

### 2. `isFinite()`

- Checks if a number is a finite value.

```ts
isFinite(42)        // true
isFinite(Infinity)  // false
isFinite("123")     // true (converted to number)
```

---

### 3. `isNaN()`

- Checks if a value is `NaN` (Not-a-Number).

```ts
isNaN(NaN)        // true
isNaN(42)         // false
isNaN("hello")    // true (cannot be converted to number)
```

---

### 4. `parseFloat()`

- Converts a string to a floating-point number.

```ts
parseFloat("3.14")     // 3.14
parseFloat("314e-2")   // 3.14
parseFloat("abc")      // NaN
```

---

### 5. `parseInt()`

- Converts a string to an integer, optionally using a radix (base).

```ts
parseInt("100")        // 100
parseInt("100", 10)    // 100 (base 10)
parseInt("100", 2)     // 4 (binary)
```

---

### 6. `decodeURI()`

- Decodes a full URI that was previously encoded.

```ts
decodeURI("https%3A%2F%2Fexample.com%2Fhome%3Fid%3D1")
// returns: "https://example.com/home?id=1"
```

---

### 7. `decodeURIComponent()`

- Decodes a URI component (part of a URI).

```ts
decodeURIComponent("id%3D123%26name%3DJohn")
// returns: "id=123&name=John"
```

| You have…                            | Use…               | Why                          |
|--------------------------------------|--------------------|-------------------------------|
| A full URL (`https://...`)           | `decodeURI()`      | Keeps structure safe          |
| Just a parameter (`id=1&name=...`)   | `decodeURIComponent()` | Decodes all values safely |

- To protect structure use decodeURI, if you want to decode all values safely you need to use decodeURIComponent.
- Yes some special characters can be decode with decodeURI but not all of them.

---

### 8. `encodeURI()`

- Encodes a full URI by escaping special characters.

```ts
encodeURI("https://example.com/home?id=1&name=John")
// returns: "https://example.com/home?id=1&name=John"
```

---

### 9. `encodeURIComponent()`

- Encodes a URI component for safe transmission in a URL.

```ts
encodeURIComponent("id=123&name=John")
// returns: "id%3D123%26name%3DJohn"
```

---

## 💡 Summary Table

| Function             | Purpose                             | Safe to use?   |
|----------------------|--------------------------------------|----------------|
| `eval()`             | Executes JS code from a string       | ❌ (Avoid)      |
| `isFinite()`         | Checks if number is finite           | ✅              |
| `isNaN()`            | Checks if value is NaN               | ✅              |
| `parseFloat()`       | Converts to float                    | ✅              |
| `parseInt()`         | Converts to int with radix option    | ✅              |
| `decodeURI()`        | Decodes full URI                     | ✅              |
| `decodeURIComponent()` | Decodes URI part                  | ✅              |
| `encodeURI()`        | Encodes full URI                     | ✅              |
| `encodeURIComponent()` | Encodes URI part                  | ✅              |

---

## 🧠 Interview Tip

- `eval()` may come up as a red flag—mention why it’s dangerous.
- Always clarify the difference between `encodeURI` and `encodeURIComponent` with examples.