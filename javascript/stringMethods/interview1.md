## 🧵 JavaScript String Methods – Code-Based Interview Questions & Answers

These are practical coding-style interview questions based on common JavaScript string methods. Try solving them first, then reveal the answers!

---

### ✅ Question 1: Mask all but the last 4 characters of a credit card

```ts
// ❓ Write a function that takes a credit card number string
// and returns it masked like "************1234"

const cardNumber = '376070620590827';

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

* Alternative Solution
```ts
const maskCard = (cardNumber) => {
  return cardNumber.split('').map((value,index,array) => {
      if(cardNumber.length-4 > index) return '*';
      return value;
  }).join('')
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

```ts
const normalizeSpace = (input) => {
  return input.match(/[a-zA-Z]+/gi).join(" ");
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

```ts
const getLastWord = (sentence) => {
  return sentence.split(" ").map((value, index, array) => {
      if(index === array.length -1)
      {
          return value.match(/\b[a-zA-Z]+\b/gi).join("")
      }
      return '';
  }).join("")
};
```
</details>

---

### ✅ Question 7: Check if a sentence ends with a period

```ts
// ❓ Write a function that checks whether a given sentence ends with a period.
// "This is a sentence." → true
// "No punctuation" → false

const endsWithPeriod = (sentence: string): boolean => {
  // Your code here
};
```

<details>
<summary>✅ Answer</summary>

```ts
const endsWithPeriod = (sentence: string): boolean => {
  return sentence.trim().endsWith(".");
};
```
</details>

---

### ✅ Question 8: Compare two strings alphabetically (locale-aware)

```ts
// ❓ Write a function that compares two strings alphabetically using locale rules.
// Return -1 if a < b, 1 if a > b, 0 if equal

const compareStrings = (a: string, b: string): number => {
  // Your code here
};
```

<details>
<summary>✅ Answer</summary>

```ts
const compareStrings = (a: string, b: string): number => {
  return a.localeCompare(b);
};
```
</details>

---

### ✅ Question 9: Extract the domain from an email address

```ts
// ❓ Given an email like "user@example.com", extract and return "example.com"

const getDomain = (email: string): string => {
  // Your code here
};
```

<details>
<summary>✅ Answer</summary>

```ts
const getDomain = (email: string): string => {
  return email.slice(email.indexOf("@") + 1);
};
```
</details>

---

### ✅ Question 10: Mask Middle of Email Address

You are given a valid email address.  
Mask everything between the first character and the `@` symbol with `"***"` and return the masked email.

**Example Input:**  
`"john.doe@example.com"`

**Expected Output:**  
`"j***@example.com"`

```ts
const maskEmail = (email) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const maskEmail = (email) => {
  return email.replace(/^(.).*?(@.+)$/, '$1***$2');
};
```

**Explanation:**  
- `^(.).*?(@.+)$`  
  - `(. )` → captures the first character  
  - `.*?` → lazily matches everything until the `@`  
  - `(@.+)` → captures the `@` and domain part  
- `$1***$2` → rebuilds the string as: first character + `***` + domain

</details>

---

### ✅ Question 11: Check for Strong Password

A password is considered strong if:
- It has at least **8 characters**
- Contains at least one **lowercase** letter
- Contains at least one **uppercase** letter
- Contains at least one **digit**
- Contains at least one **special character** (`!@#$%^&*`)

Return `true` if the password meets all criteria, otherwise `false`.

**Examples:**
- `"Aa1!aaaa"` → ✅ true  
- `"weakpass"` → ❌ false  

```ts
const isStrongPassword = (password) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const isStrongPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  return regex.test(password);
};
```

**Explanation:**
- `(?=.*[a-z])` → must contain at least one lowercase
- `(?=.*[A-Z])` → must contain at least one uppercase
- `(?=.*\d)` → must contain at least one digit
- `(?=.*[!@#$%^&*])` → must contain one special character
- `.{8,}` → total length must be 8 or more

</details>

---

### ✅ Question 12: Capitalize Each Word in a Title

You are given a string representing a title. Return a new string where the **first letter of each word is capitalized**, and the rest of the letters are lowercase.

**Example Input:**  
`"the great gatsby"`

**Expected Output:**  
`"The Great Gatsby"`

```ts
const capitalizeTitle = (title) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const capitalizeTitle = (title) => {
  return title
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
```
</details>

---

### ✅ Question 13: Compare Two Strings Alphabetically

Write a function that takes two strings and returns:
- `"equal"` if both are equal
- `"before"` if the first string comes before the second alphabetically
- `"after"` if the first string comes after the second

Use the `.localeCompare()` method.

**Example Inputs:**
- `"apple"`, `"banana"` → `"before"`  
- `"grape"`, `"grape"` → `"equal"`  
- `"zebra"`, `"ant"` → `"after"`  

```ts
const compareStrings = (a, b) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const compareStrings = (a, b) => {
  const result = a.localeCompare(b);
  if (result === 0) return "equal";
  return result < 0 ? "before" : "after";
};
```
</details>

---


### ✅ Question 14: Compress Consecutive Characters

Write a function that compresses a string by replacing consecutive repeating characters with the character followed by the count.

**Example Input:**  
`"aaabbccccd"`

**Expected Output:**  
`"a3b2c4d1"`

```ts
const compressString = (input) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const compressString = (input) => {
  if (!input) return "";

  let result = "";
  let count = 1;

  for (let i = 1; i <= input.length; i++) {
    if (input[i] === input[i - 1]) {
      count++;
    } else {
      result += input[i - 1] + count;
      count = 1;
    }
  }

  return result;
};
```
</details>

---

### ✅ Question 15: Smart Trimming – Keep Start and End

Given a long string, trim it so that:
- The **first 10 characters** are kept,
- The **last 10 characters** are kept,
- The middle is replaced with `"..."`

Only trim if the string is **longer than 25 characters**.

**Example Input:**  
`"This is a very long sentence that needs trimming."`

**Expected Output:**  
`"This is a ...ds trimming."`

```ts
const smartTrim = (str) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const smartTrim = (str) => {
  if (str.length <= 25) return str;
  const start = str.slice(0, 10);
  const end = str.slice(-10);
  return `${start}...${end}`;
};
```
</details>

---

### ✅ Question 16: Rotate a String to the Right

Write a function that **rotates** a string to the right by `k` positions.

**Rules:**
- If `k` is greater than the string length, use modulo
- You must not use array methods (like `.reverse()` or `.splice()`)

**Example Input:**  
`("rotation", 2)`

**Expected Output:**  
`"onrotati"`

```ts
const rotateRight = (str, k) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const rotateRight = (str, k) => {
  const len = str.length;
  if (len === 0) return str;
  k = k % len;
  return str.slice(-k) + str.slice(0, len - k);
};
```
</details>

---

### ✅ Question 17: Generate URL Slug

Create a function that converts a sentence to a URL slug:
- Trim spaces at both ends
- Lowercase all characters
- Replace **all spaces** with hyphens (`-`)
- Remove extra spaces between words (normalize)

**Example Input:**  
`"   JavaScript   String   Methods  "`

**Expected Output:**  
`"javascript-string-methods"`

```ts
const slugify = (str) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const slugify = (str) => {
  return str.trim().toLowerCase().split(/\s+/).join("-");
};
```
</details>

---

### ✅ Question 18: Find the Longest Word in a Sentence

Write a function that returns the **longest word** in a sentence. If multiple words have the same length, return the first one.

**Example Input:**  
`"Mastering string manipulation is essential"`

**Expected Output:**  
`"manipulation"`

```ts
const findLongestWord = (sentence) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const findLongestWord = (sentence) => {
  const words = sentence.trim().split(" ");
  let longest = "";

  for (const word of words) {
    if (word.length > longest.length) {
      longest = word;
    }
  }

  return longest;
};
```
</details>

---

### ✅ Question 19: Reverse Words in a Sentence (Preserve Order)

Write a function that **reverses each word** in a sentence individually, but keeps their original order and spacing intact.

**Example Input:**  
`"JavaScript is fun"`

**Expected Output:**  
`"tpircSavaJ si nuf"`

```ts
const reverseWords = (sentence) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const reverseWords = (sentence) => {
  return sentence
    .split(" ")
    .map(word => word.split("").reverse().join(""))
    .join(" ");
};
```
</details>

---

### ✅ Question 20: Extract Initials from a Full Name

Write a function that takes a full name and returns the **initials in uppercase**, separated by dots.

**Rules:**
- Ignore extra spaces
- Always return uppercase initials
- Works for 2 or more words

**Example Input:**  
`"   ada    lovelace   "`  
**Expected Output:**  
`"A.L"`

**Example Input:**  
`"grace brewster murray hopper"`  
**Expected Output:**  
`"G.B.M.H"`

```ts
const getInitials = (fullName) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const getInitials = (fullName) => {
  return fullName
    .trim()
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase())
    .join(".");
};
```
</details>

---

### ✅ Question 21: Find Common Prefix of Two Strings

Write a function that returns the **longest common prefix** between two strings.

**Example Input:**  
`"international"` and `"internet"`  
**Expected Output:**  
`"inter"`

**Example Input:**  
`"flight"` and `"flow"`  
**Expected Output:**  
`"fl"`

```ts
const longestCommonPrefix = (a, b) => {
  // Your code here
}
```

<details>
<summary>✅ Answer</summary>

```ts
const longestCommonPrefix = (a, b) => {
  const minLength = Math.min(a.length, b.length);
  let prefix = "";

  for (let i = 0; i < minLength; i++) {
    if (a[i] === b[i]) {
      prefix += a[i];
    } else {
      break;
    }
  }

  return prefix;
};
```
</details>

---