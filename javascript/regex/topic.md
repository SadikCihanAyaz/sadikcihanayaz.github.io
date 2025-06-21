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



## 🧪 Regex Interview Questions (Write the Regex)

---

### ❓ Question 1

**🧵 String:**
```
"The price is $45 and the discount is $5"
```

**🎯 Expected Match:**
```
["$45", "$5"]
```

**❓ Task:** Write a regex that extracts all dollar amounts from the string.

```ts
const str = "The price is $45 and the discount is $5";
const result = str.match(/\$\d+/g);
console.log(result); // ["$45", "$5"]
```

---

### ❓ Question 2

**🧵 String:**
```
"Usernames: user_01, admin99, guest123"
```

**🎯 Expected Match:**
```
["user_01", "admin99", "guest123"]
```

**❓ Task:** Write a regex that matches all usernames (letters, numbers, underscore).

```ts
const str = "Usernames: user_01, admin99, guest123";
const result = str.match(/\b\w+\b/g);
console.log(result); // ["Usernames", "user_01", "admin99", "guest123"]
// optionally filter out "Usernames" if needed
```

---

### ❓ Question 3

**🧵 String:**
```
"Emails: test.mail@example.com, hello.world@site.co"
```

**🎯 Expected Match:**
```
["test.mail@example.com", "hello.world@site.co"]
```

**❓ Task:** Write a regex to extract all valid email addresses.

```ts
const str = "Emails: test.mail@example.com, hello.world@site.co";
const result = str.match(/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/g);
console.log(result); // ["test.mail@example.com", "hello.world@site.co"]
```


### ❓ Question 4

**🧵 String:**
```
"The meeting is at 09:30, and the next one is at 14:45."
```

**🎯 Expected Match:**
```
["09:30", "14:45"]
```

**❓ Task:** Write a regex to match times in **HH:MM** 24-hour format.

```ts
const str = "The meeting is at 09:30, and the next one is at 14:45.";
const result = str.match(/\b\d{2}:\d{2}\b/g);
console.log(result); // ["09:30", "14:45"]
```

---

### ❓ Question 5

**🧵 String:**
```
"Here are the hex colors: #ff5733, #BADA55, #123abc"
```

**🎯 Expected Match:**
```
["#ff5733", "#BADA55", "#123abc"]
```

**❓ Task:** Write a regex to match **hex color codes** (with `#` and 6 hex digits).

```ts
const str = "Here are the hex colors: #ff5733, #BADA55, #123abc";
const result = str.match(/#[a-fA-F0-9]{6}\b/g);
console.log(result); // ["#ff5733", "#BADA55", "#123abc"]
```

---

### ❓ Question 6

**🧵 String:**
```
"Chapter 1: Getting Started, Chapter 2: Advanced Techniques"
```

**🎯 Expected Match:**
```
["Chapter 1", "Chapter 2"]
```

**❓ Task:** Write a regex to match the word **"Chapter"** followed by a **number**.

```ts
const str = "Chapter 1: Getting Started, Chapter 2: Advanced Techniques";
const result = str.match(/Chapter \d+/g);
console.log(result); // ["Chapter 1", "Chapter 2"]
```