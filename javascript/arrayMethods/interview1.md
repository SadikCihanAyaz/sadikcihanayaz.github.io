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