# 📚 JavaScript Concepts: Hoisting & Temporal Dead Zone (TDZ)

Understanding **Hoisting** and the **Temporal Dead Zone (TDZ)** is crucial for mastering JavaScript behavior during execution. These concepts explain **why some variables behave unexpectedly** if accessed before their declarations.

---

## 🔁 1. What is Hoisting?

**Hoisting** is JavaScript's default behavior of **moving declarations to the top** of the current scope (script or function) during the compilation phase.

Only **declarations** are hoisted — not initializations.

---

### 📌 Example 1: Function Hoisting

```ts
sayHello(); // ✅ Works

function sayHello() {
  console.log("Hello from hoisted function!");
}
```

**Why?** Function declarations are hoisted with both name and body.

---

### 📌 Example 2: `var` Hoisting

```ts
console.log(x); // undefined (not ReferenceError)
var x = 5;
```

**Why?** `var x` is hoisted as:
```ts
var x;
console.log(x); // undefined
x = 5;
```

---

### ❗ Problem with `var` Hoisting

```ts
if (!user) {
  var user = "admin";
}
console.log(user); // "admin"
```

**Even though `var user` is inside an `if` block, it is hoisted to the top of the function or script scope.**

---

## 🕳️ 2. What is Temporal Dead Zone (TDZ)?

The **Temporal Dead Zone (TDZ)** is the time between entering a scope and when a `let` or `const` variable is declared.  
**Accessing the variable in this window throws a `ReferenceError`.**

---

### 📌 Example 1: `let` in TDZ

```ts
console.log(a); // ❌ ReferenceError
let a = 10;
```

**Why?** `a` exists in memory but cannot be accessed before its declaration.

---

### 📌 Example 2: `const` behaves the same

```ts
function showValue() {
  console.log(value); // ❌ ReferenceError
  const value = "Hello";
}
showValue();
```

---

### ✅ Comparison: `var` vs `let`

```ts
console.log(x); // undefined
var x = 5;

console.log(y); // ❌ ReferenceError
let y = 5;
```

---

## 🧠 Summary Table

| Keyword  | Hoisted? | Accessible Before Declaration? | In TDZ? | Initialized to `undefined`? |
|----------|----------|--------------------------------|---------|------------------------------|
| `var`    | ✅ Yes    | ✅ Yes (returns `undefined`)     | ❌ No   | ✅ Yes                       |
| `let`    | ✅ Yes    | ❌ No (throws `ReferenceError`) | ✅ Yes  | ❌ No                        |
| `const`  | ✅ Yes    | ❌ No (throws `ReferenceError`) | ✅ Yes  | ❌ No                        |

---

## 🚀 Best Practices

- Prefer `let` and `const` over `var` to avoid unexpected hoisting bugs.
- Declare variables **at the top of their scope** to make hoisting irrelevant.
- Never use a variable before it is declared, even if hoisting technically allows it.

---


# 📚 JavaScript Concepts: Closures & Destructuring

These two powerful JavaScript features — **Closures** and **Destructuring** — are core to writing clean, maintainable, and expressive code. Let’s explore both with examples.

---

## 🔒 1. Closures

A **closure** is formed when a function "remembers" the variables from its **outer lexical scope**, even after that outer function has finished executing.

Closures give functions **persistent access** to their surrounding context.

---

### 📌 Example: Basic Closure

```ts
function outer() {
  let counter = 0;

  function increment() {
    counter++;
    console.log(counter);
  }

  return increment;
}

const count = outer();

count(); // 1
count(); // 2
count(); // 3
```

**Why it works:**  
Even though `outer()` has finished executing, `count` (which is `increment`) still remembers `counter` — that's closure in action.

---

### 🔐 Use Cases of Closures

- Data encapsulation
- Function factories
- Memoization/caching
- Event handler state retention

---

### ⚠️ Common Trap

```ts
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output: 3, 3, 3
```

**Fix with closure:**

```ts
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000); // Output: 0, 1, 2
}
```

---

## 🧩 2. Destructuring

**Destructuring** is a concise way to extract values from **arrays** or **objects** into variables.

---

### 📌 Example: Array Destructuring

```ts
const coords = [10, 20, 30];

const [x, y, z] = coords;

console.log(x); // 10
console.log(z); // 30
```

---

### 📌 Example: Object Destructuring

```ts
const user = {
  name: "Alice",
  age: 28,
  country: "RO"
};

const { name, country } = user;

console.log(name);    // Alice
console.log(country); // RO
```

---

### 🛠 Use Destructuring in Function Parameters

```ts
function greet({ name, age }) {
  console.log(`Hello ${name}, you are ${age} years old.`);
}

greet({ name: "John", age: 25 });
```

---

### ⚙️ Default Values

```ts
const [a = 1, b = 2] = [];
console.log(a, b); // 1 2

const { title = "Untitled" } = {};
console.log(title); // "Untitled"
```

---

## 🧠 Summary

| Feature       | Purpose                            | Benefit                             |
|---------------|-------------------------------------|--------------------------------------|
| Closures      | Preserve scope/state across calls   | Encapsulation and memory retention   |
| Destructuring | Unpack values from arrays/objects   | Cleaner and more readable code       |

---

## ✅ Best Practices

- Use closures to maintain private state or encapsulate logic.
- Use destructuring to reduce repetitive access and simplify code, especially in function parameters or component props.

---

# 📚 JavaScript Concepts: Spread & Rest, Callbacks vs Promises vs Async/Await

These concepts empower you to write modern, efficient, and readable JavaScript. Let's break them down with practical examples.

---

## 🌪️ 1. Spread & Rest Operators (`...`)

The **spread** and **rest** operators share the same syntax (`...`), but their behavior depends on **context**:

---

### 🔹 Spread Operator

**Used to "spread out" elements from an iterable (like array or object).**

#### 📌 Spread in Arrays

```ts
const numbers = [1, 2, 3];
const moreNumbers = [...numbers, 4, 5];

console.log(moreNumbers); // [1, 2, 3, 4, 5]
```

#### 📌 Spread in Objects

```ts
const user = { name: "Alice", age: 30 };
const updated = { ...user, age: 31 };

console.log(updated); // { name: "Alice", age: 31 }
```

---

### 🔹 Rest Operator

**Used to "collect" multiple elements into a single array or object.**

#### 📌 Rest in Function Parameters

```ts
function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
```

#### 📌 Rest in Destructuring

```ts
const [first, ...others] = [10, 20, 30, 40];

console.log(first);  // 10
console.log(others); // [20, 30, 40]
```

---

## 🔄 2. Callbacks vs Promises vs Async/Await

These are approaches to handle **asynchronous operations** like API calls, timers, etc.

---

### ⏳ Callback Functions

A function passed into another function to run later.

#### 📌 Example:

```ts
function fetchData(callback) {
  setTimeout(() => {
    callback("Data received");
  }, 1000);
}

fetchData(data => {
  console.log(data); // "Data received"
});
```

❗ **Problems:**
- Nested callbacks → **Callback hell**
- Difficult to handle errors

---

### 📦 Promises

Represents a **future value** (resolved or rejected).

#### 📌 Example:

```ts
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data from promise");
    }, 1000);
  });
}

fetchData().then(data => console.log(data));
```

✅ Easier to chain  
❌ Still not perfect for complex control flow

---

### 🧘 Async/Await

**Syntactic sugar over Promises**, making async code look synchronous.

#### 📌 Example:

```ts
async function getData() {
  const data = await fetchData();
  console.log(data);
}

getData();
```

✅ Cleanest way to write asynchronous logic  
✅ Use `try/catch` for error handling

---

## 🧠 Summary

### Spread vs Rest

| Feature | Used For                  | Example Syntax       |
|---------|---------------------------|----------------------|
| Spread  | Expanding items           | `...array`           |
| Rest    | Collecting items          | `(...args)`          |

### Async Techniques

| Method      | Pros                          | Cons                      |
|-------------|-------------------------------|---------------------------|
| Callbacks   | Simple cases                  | Callback hell, error-prone|
| Promises    | Chainable, better structure   | Still nesting possible    |
| Async/Await | Cleaner, readable, debuggable | Needs `try/catch`         |

---

## ✅ Best Practices

- Use **spread** to merge/clone arrays or objects.
- Use **rest** to capture extra parameters or unpack leftovers.
- Prefer **async/await** over raw Promises or callbacks in modern codebases.

---


# 🧠 JavaScript Concepts: Microtasks vs Macrotasks & The Event Loop

Understanding how JavaScript handles asynchronous behavior is critical for writing predictable, high-performance applications. Let's explore the **event loop**, the **call stack**, and the distinction between **microtasks** and **macrotasks**.

---

## 🔁 The Event Loop

JavaScript is single-threaded, which means it can run **one piece of code at a time**. But thanks to the **event loop**, it can still handle asynchronous operations without blocking.

The event loop continuously:
1. Executes all **synchronous code**
2. Clears the **microtask queue**
3. Executes **one macrotask**
4. Repeats the cycle

---

## 🧱 1. Call Stack

The **call stack** keeps track of function execution. Whenever a function is called, it’s **pushed** onto the stack. When the function finishes, it’s **popped** off.

```ts
function greet() {
  console.log("Hello");
}
greet();
```

---

## 🧳 2. Task Queues

JavaScript uses two primary queues to manage asynchronous tasks:

### 🟦 Macrotasks (Task Queue)
Tasks that are scheduled to run **later**, including:
- `setTimeout`
- `setInterval`
- DOM events (click, input)
- `setImmediate` (Node.js)

These are placed in the **macrotask queue**.

### 🟨 Microtasks (Microtask Queue)
Tasks that are scheduled to run **as soon as the current call stack is empty**, including:
- `Promise.then`, `Promise.catch`, `Promise.finally`
- `queueMicrotask`
- `MutationObserver`

These are placed in the **microtask queue**, and are executed **before any macrotask**.

---

## 🕰️ Execution Order Example

```ts
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");
```

### 🔍 Output:

1
4
3
2

**Why?**
- `"1"` and `"4"` are synchronous and run immediately
- `"3"` is a **microtask**, so it runs after the call stack is clear
- `"2"` is a **macrotask**, so it runs after all microtasks are complete

---

## 🔄 Visual Flow

CALL STACK
↓
MICROTASK QUEUE (Promises, queueMicrotask)
↓
MACROTASK QUEUE (Timers, Events)

---

- Lets say microtask queue look like

[task1, task2, task3, task4, task5]
The Event Loop will:
	1.	Move task1 → Call stack → Execute
	2.	Move task2 → Call stack → Execute
	3.	…
	4.	Continue until task5 is executed

👉 Only after all 5 microtasks are executed, the Event Loop moves on to the next macrotask.

## 🧠 Summary Table

| Concept        | Description                                    | Examples                                 |
|----------------|------------------------------------------------|-------------------------------------------|
| Call Stack     | Tracks active function calls                   | `function foo() {}`                       |
| Microtasks     | Run after current stack, before any macrotask  | `Promise.then`, `queueMicrotask`          |
| Macrotasks     | Run after microtasks, one per event loop cycle | `setTimeout`, `setInterval`, DOM events   |
| Event Loop     | Coordinates execution of all the above         | Built-in mechanism                        |

---

## ✅ Best Practices

- Prefer **Promises** or `queueMicrotask` for immediate async logic
- Don't rely on `setTimeout(..., 0)` as a way to defer — it's slower than microtasks
- Master this model to debug async issues, race conditions, and performance lags

---


# 🧠 JavaScript Concepts: Memory Management (GC) & Unit Testing with Jest

Understanding how JavaScript handles memory and how to properly test your code is essential for building robust, performant applications.

---

## 🧹 1. Memory Management Basics (Garbage Collection)

JavaScript manages memory **automatically** using **Garbage Collection (GC)**. As a developer, you don’t need to manually free memory — but you **do** need to write code that avoids leaks.

### 🔸 Key Concepts

- **Memory is allocated** when:
  - Variables are declared
  - Objects/arrays are created
  - Functions are defined

- **Memory is freed** when:
  - Values are no longer **reachable**

---

### 🗂️ Example of Reachability

```ts
let user = { name: "Alice" }; // memory allocated for object

user = null; // now it's unreachable → eligible for GC
```

---

### 🔍 Common Memory Leaks

1. **Global variables** (accidentally not scoped)
2. **Forgotten timers or intervals**

```ts
setInterval(() => {
  // This runs forever if not cleared!
}, 1000);
```

3. **Detached DOM elements still referenced**
4. **Closures keeping unused data alive**

---

### ✅ Best Practices

- Always `clearInterval` / `clearTimeout`
- Avoid unnecessary global variables
- Watch for lingering references in closures
- Use browser DevTools → Memory tab to find leaks

---

## 🧪 2. Writing Unit Tests with Jest (or similar)

**Unit testing** means testing **individual functions or components** in isolation.

Jest is one of the most popular testing frameworks for JavaScript.

---

### 📦 Example: Testing a Utility Function

```ts
// sum.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

```ts
// sum.test.js
const sum = require("./sum");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

---

### 🛠️ Common Jest Matchers

| Matcher         | Checks For                           |
|----------------|----------------------------------------|
| `toBe(value)`   | exact equality (primitive values)      |
| `toEqual(obj)`  | deep equality (objects/arrays)         |
| `toBeTruthy()`  | truthy value                           |
| `toBeFalsy()`   | falsy value                            |
| `toContain()`   | item inside array/string               |
| `toThrow()`     | if a function throws an error          |

---

### 📈 Testing Best Practices

- ✅ Test **one unit** of logic at a time
- ✅ Mock external dependencies (e.g., APIs, DB calls)
- ✅ Use `describe()` to group related tests
- ✅ Run tests often during development
- ✅ Use `--coverage` to ensure code is fully tested

---

## ✅ Summary

| Topic                  | Why It Matters                        |
|------------------------|----------------------------------------|
| Memory Management (GC) | Prevent performance leaks & crashes    |
| Jest Unit Testing      | Validate code correctness automatically|

With both of these mastered, you're not just writing JavaScript — you're building **reliable, maintainable software**.

---

# 🛡️ JavaScript Security Basics: XSS and CSRF Explained

As a JavaScript developer, especially in front-end or full-stack roles, you must understand basic web security threats like **XSS (Cross-Site Scripting)** and **CSRF (Cross-Site Request Forgery)**. These vulnerabilities can compromise user data and system integrity if left unmitigated.

---

## 🦠 1. XSS – Cross-Site Scripting

**XSS** is a security vulnerability that allows attackers to inject **malicious JavaScript code** into webpages viewed by other users.

### 💥 What it can do:
- Steal cookies, localStorage tokens
- Redirect users to fake sites
- Log keystrokes or user input
- Modify page content

---

### 📌 Example of XSS Vulnerability

```ts
const search = "<script>alert('hacked')</script>";
document.body.innerHTML = `Results: ${search}`; // ❌ vulnerable
```

**What happens:** The script runs immediately in the user's browser.

---

### ✅ How to Prevent XSS

- **Never inject untrusted input** directly into the DOM
- Use **`textContent`** instead of `innerHTML` for user content

```ts
element.textContent = userInput; // ✅ safe
element.innerHTML = userInput;   // ❌ dangerous
```

- Escape special characters in backend-rendered HTML
- Use frameworks (React, Angular) that handle escaping automatically
- Use Content Security Policy (CSP)

---

## 🎭 2. CSRF – Cross-Site Request Forgery

**CSRF** tricks a logged-in user into **submitting a request** to a site they’re authenticated on — without their consent.

### 💥 What it can do:
- Change passwords
- Make purchases
- Post unwanted content

---

### 📌 Example Scenario

1. User is logged into `bank.com`
2. Malicious site loads:
   ```html
   <img src="https://bank.com/transfer?amount=1000&to=hacker" />
   ```
3. Browser includes user’s cookies with the request
4. Bank executes the transfer unless protection is in place

---

### ✅ How to Prevent CSRF

- Use **SameSite** cookies (modern browsers)
- Implement **CSRF tokens** on state-changing requests (POST/PUT/DELETE)
- Require **re-authentication** for sensitive actions

---

## 🔐 Summary Table

| Threat | Stands For                  | Main Danger                        | Mitigation                                  |
|--------|-----------------------------|------------------------------------|---------------------------------------------|
| XSS    | Cross-Site Scripting        | Injects & runs malicious JS        | Escape input, use `textContent`, CSP        |
| CSRF   | Cross-Site Request Forgery  | Tricks browser into sending request | Use CSRF tokens, SameSite cookies, re-auth  |

---

## 🚨 Final Note

Security is **not optional** — even if you're "just a front-end dev."  
Understand the basics and collaborate with backend teams to build secure apps.

---