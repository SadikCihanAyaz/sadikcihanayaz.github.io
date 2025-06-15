## 🧵 JavaScript String Methods – Code-Based Interview Questions & Answers

These are practical coding-style interview questions based on common JavaScript string methods. Try solving them first, then reveal the answers!

---

### ✅ Question 1: Mask all but the last 4 characters of a credit card

```ts
// ❓ Write a function that takes a credit card number string
// and returns it masked like "************1234"

const maskCard = (cardNumber: string): string => {
  // Your code here
};
```

<details>
<summary>✅ Answer</summary>

```ts
const maskCard = (cardNumber: string): string => {
  return cardNumber.slice(-4).padStart(cardNumber.length, '*');
};
```
</details>

---

### ✅ Question 2: Count how many times the word "apple" appears (case-insensitive)

```ts
// ❓ Count how many times "apple" (case-insensitive) appears in the string

const sentence = "Apple pie, apple juice, and APPLE sauce are tasty.";

// Your code here
```

<details>
<summary>✅ Answer</summary>

```ts
const countApples = sentence.match(/apple/gi)?.length || 0;
```
</details>

---

### ✅ Question 3: Capitalize the first letter of each word

```ts
// ❓ Given a sentence, capitalize the first letter of every word.
// "hello world" → "Hello World"

const capitalizeWords = (sentence: string): string => {
  // Your code here
};
```

<details>
<summary>✅ Answer</summary>

```ts
const capitalizeWords = (sentence: string): string => {
  return sentence.replace(/\b\w/g, char => char.toUpperCase());
};
```
</details>

---