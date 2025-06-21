## 📘 Common Regex Tokens with Examples

| Pattern     | Meaning                                      | Example String                  | Example Match          |
|-------------|-----------------------------------------------|----------------------------------|------------------------|
| `.`         | Any character (except newline)                | "a9#_"                          | a, 9, #, _             |
| `\d`        | Digit (0–9)                                   | "Room 5A"                       | 5                      |
| `\D`        | Non-digit                                     | "A1B"                           | A, B                   |
| `\w`        | Word character (a–z, A–Z, 0–9, _)             | "abc_123"                       | a, b, c, _, 1, 2, 3     |
| `\W`        | Non-word character                            | "#@!"                           | #, @, !                |
| `\s`        | Whitespace (space, tab, newline)              | "a b\tc"                        | " " (space), \t        |
| `\S`        | Non-whitespace                                | "abc"                           | a, b, c                |
| `^`         | Start of string                               | "^hello"                        | Matches if string starts with "hello" |
| `$`         | End of string                                 | "end$"                          | Matches if string ends with "end"     |
| `[aeiou]`   | Any vowel (character set)                     | "rain"                          | a, i                   |
| `[^0-9]`    | Not a digit (negated set)                     | "a1b2"                          | a, b                   |
| `a|b`       | Match "a" or "b"                              | "apple or banana"              | a, b                   |
| `a*`        | 0 or more "a"                                 | "aaab"                          | aaa                    |
| `a+`        | 1 or more "a"                                 | "aaab"                          | aaa                    |
| `a?`        | 0 or 1 "a"                                    | "ab"                            | a                      |
| `\d{2}`     | Exactly 2 digits                              | "Age: 21"                       | 21                     |
| `\d{3,}`    | 3 or more digits                              | "Zip: 12345"                    | 12345                  |
| `\d{2,4}`   | 2 to 4 digits                                 | "Code: 1234"                    | 1234                   |
| `(abc)+`    | Group "abc", 1 or more times                  | "abcabc"                        | abc, abc               |


### 🧪 Code Example:
```ts
const str = "         hello   wword";
const result = str.match(/\b\w+\b/g);
console.log(result); // ["hello", "wword"]
```

---

### 🔍 Regex Breakdown: `/\b\w+\b/g`

| Pattern | Meaning                                                       |
|---------|---------------------------------------------------------------|
| `\b`    | Word boundary (marks the start or end of a word)              |
| `\w+`   | One or more word characters (letters, digits, underscore)     |
| `\b`    | Word boundary again (to close the word)                       |
| `g`     | Global flag — match **all** words, not just the first         |

---

### 📌 Notes:
- This pattern **skips extra whitespace**
- It extracts only full, clean words from the input
- Works well for parsing simple word lists from text



## 🧵 JavaScript Regex Interview Questions & Answers

These practical coding interview questions focus on using regular expressions (regex) to process and extract information from strings. Try to solve them first—answers and explanations are provided below!

---

### ✅ Question 1: Extract All Numbers From a String

// ❓ Write a function that returns all numbers from a given string as an array of strings.
// Example:  
// "The car costs 20000 dollars, and the tax is 4500." → ["20000", "4500"]

```ts
const extractNumbers = (input) => {
  // Your code here
};
```

<details>
<summary>✅ Answer</summary>

```ts
const extractNumbers = (input) => {
  return input.match(/\d+/g) || [];
};
```

**Explanation:**  
- `/\d+/g` matches one or more digits, globally, in the string.
- `match()` returns all found numbers or `null` (so use `|| []` for safety).

</details>

---

### ✅ Question 2: Find All Words Starting With a Capital Letter

// ❓ Write a function that returns all words starting with a capital letter from a sentence.
// Example:  
// "Alice and Bob are attending the ReactJS Conference in London."  
// → ["Alice", "Bob", "ReactJS", "Conference", "London"]

```ts
const getCapitalizedWords = (sentence) => {
  // Your code here
};
```

<details>
<summary>✅ Answer</summary>

```ts
const getCapitalizedWords = (sentence) => {
  return sentence.match(/\b[A-Z][a-zA-Z]*\b/g) || [];
};
```

**Explanation:**  
- `/\b[A-Z][a-zA-Z]*\b/g` matches each word boundary followed by a capital letter, then zero or more letters.

</details>