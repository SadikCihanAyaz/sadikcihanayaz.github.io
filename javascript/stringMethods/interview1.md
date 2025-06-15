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

- without using regex

```ts
const sentence = “Apple pie, apple juice, and APPLE sauce are tasty.”;

const lower = sentence.toLowerCase();
const words = lower.split(” “);
let count = 0;

for (let word of words) {
// Remove common punctuation from the word
word = word.replace(”,”, “”).replace(”.”, “”);

if (word === “apple”) {
count++;
}
}

console.log(“Apple count:”, count); // Output: 3
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
- without using regex

```ts
const capitalizeWords = (sentence: string): string => {
return sentence
.split(” “)
.map(word =>
word.charAt(0).toUpperCase() + word.slice(1)
)
.join(” “);
};

// Example usage
console.log(capitalizeWords(“hello world”)); // “Hello World”
```
</details>

---

### ✅ Question 4: Trim and normalize spacing in a sentence

```ts
// ❓ Write a function that trims a sentence and replaces multiple spaces with a single space.
// "   Hello    world   " → "Hello world"

const normalizeSpace = (input: string): string => {
  // Your code here
};
```

<details>
<summary>✅ Answer</summary>

```ts
const normalizeSpace = (input: string): string => {
  return input.trim().split(" ").filter(Boolean).join(" ");
};
```
</details>

---

### ✅ Question 5: Repeat a pattern and pad the result

```ts
// ❓ Repeat the string "Hi" 3 times and pad the result to be exactly 10 characters long with "." at the end
// Expected: "HiHiHi...."

const repeatAndPad = (): string => {
  // Your code here
};
```

<details>
<summary>✅ Answer</summary>

```ts
const repeatAndPad = (): string => {
  return "Hi".repeat(3).padEnd(10, ".");
};
```
</details>

---

### ✅ Question 6: Get the last word of a sentence

```ts
// ❓ Extract the last word from the sentence: "Learning JavaScript is fun."
// Should return: "fun"

const getLastWord = (sentence: string): string => {
  // Your code here
};
```

<details>
<summary>✅ Answer</summary>

```ts
const getLastWord = (sentence: string): string => {
  const clean = sentence.trim().replace(/[.,!?]$/, "");
  const words = clean.split(" ");
  return words[words.length - 1];
};
```
</details>

---
