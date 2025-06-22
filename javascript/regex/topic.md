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

 ❓ Write a function that returns all numbers from a given string as an array of strings.
- Example:  
* "The car costs 20000 dollars, and the tax is 4500." → ["20000", "4500"]

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

 ❓ Write a function that returns all words starting with a capital letter from a sentence.
- Example:  
* "Alice and Bob are attending the ReactJS Conference in London."  
* → ["Alice", "Bob", "ReactJS", "Conference", "London"]

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


---

### ✅ Question 3: Validate an Email Address

 ❓ Write a function that checks if a string is a valid email address (basic validation).
- Example:  
* "test.user@example.com" → true  
* "not-an-email" → false

```ts
const isValidEmail = (email) => {
  // Your code here
};
```

<details>
<summary>✅ Answer</summary>

```ts
const isValidEmail = (email) => {
  return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);
};
```

**Explanation:**  

| Pattern      | Matches Letters | Matches Digits | Matches Underscore | Matches Hyphen | Matches Dot |
|--------------|:--------------:|:--------------:|:------------------:|:--------------:|:-----------:|
| `[a-zA-Z]`   |      ✔️        |      ❌       |        ❌         |      ❌       |     ❌     |
| `[a-zA-Z]*`  |      ✔️        |      ❌       |        ❌         |      ❌       |     ❌     |
| `\w`         |      ✔️        |      ✔️       |        ✔️         |      ❌       |     ❌     |
| `[\w.-]`     |      ✔️        |      ✔️       |        ✔️         |      ✔️       |     ✔️     |

| Part             | Meaning                                        | Example Match   |
|------------------|------------------------------------------------|-----------------|
| `[a-zA-Z]`       | Any uppercase or lowercase letter               | "A", "z"        |
| `\d`             | Any digit (0–9)                                | "3", "7"        |
| `.`              | A literal dot (period)                         | "."             |
| `-`              | A literal hyphen                               | "-"             |
| `[a-zA-Z\d.-]`   | Any letter, digit, dot, or hyphen              | "A", "5", ".", "-" |
| `[a-zA-Z\d.-]+`  | One or more of the above (letters, digits, dot, hyphen) | "domain-name.23" |

| Part             | Meaning                                                        | Example Match  |
|------------------|----------------------------------------------------------------|---------------|
| `+`              | One or more of the previous character set (applies to what comes before) | (from previous part, e.g., "domain" or "site.co") |
| `\.`             | A literal dot (period)                                         | "."           |
| `[a-zA-Z]`       | Any uppercase or lowercase letter                              | "c", "O"      |
| `{2,}`           | At least 2 (two or more) of the preceding element (`[a-zA-Z]`) | "com", "org"  |
| `\.[a-zA-Z]{2,}` | A dot followed by at least two letters (typical domain ending) | ".com", ".ro" |

- `/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/` checks:
  - At least one valid character before "@"
  - An "@" symbol
  - At least one valid character for the domain
  - A dot and at least two letters for the extension

</details>

---

### ✅ Question 4: Replace All Numbers With "#"

 ❓ Write a function that replaces every number in a string with "#".
- Example:  
* "My PIN is 1234 and my code is 5678." → "My PIN is #### and my code is ####."

```ts
const maskNumbers = (input) => {
  // Your code here
};
```

<details>
<summary>✅ Answer</summary>

```ts
const maskNumbers = (input) => {
  return input.replace(/\d/g, "#");
};
```

**Explanation:**  
- `/\d/g` matches every digit.  
- `replace()` swaps each with "#".

</details>

---

### ✅ Question 5: Extract All Words With Exactly 5 Letters

❓ Write a function that returns all words with exactly 5 letters from a sentence.
- Example:  
* "These apple trees grow sweet pears." → ["These", "apple", "sweet", "pears"]

```ts
const getFiveLetterWords = (sentence) => {
  // Your code here
};
```

<details>
<summary>✅ Answer</summary>

```ts
const getFiveLetterWords = (sentence) => {
  return sentence.match(/\b\w{5}\b/g) || [];
};
```

**Explanation:**  
- `/\b\w{5}\b/g` matches whole words with exactly 5 word characters.

</details>

---

### ✅ Question 6: Remove All Non-Alphanumeric Characters

 ❓ Write a function that removes all characters from a string except letters and digits.
- Example:  
* "Hello, World! 123." → "HelloWorld123"

```ts
const removeNonAlphanumeric = (input) => {
  // Your code here
};
```

<details>
<summary>✅ Answer</summary>

```ts
const removeNonAlphanumeric = (input) => {
  return input.replace(/[^a-zA-Z0-9]/g, "");
};
```

**Explanation:**  
- `/[^a-zA-Z0-9]/g` matches any character that is NOT a letter or a digit, and removes it.

</details>