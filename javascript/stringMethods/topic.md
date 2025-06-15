## 🧵 String Methods in JavaScript

JavaScript provides a wide variety of methods to manipulate and work with string values. Here's a guide to some of the most commonly used string methods.

---

### 🏗️ 1. `String()` Constructor

✅ Converts a given value to a string.

```ts
String(123);         // "123"
String(true);        // "true"
String(null);        // "null"
String(undefined);   // "undefined"
```

It can also be used to wrap a string primitive into a String object:

```ts
const strObj = new String("hello"); // [String: 'hello']
typeof strObj; // "object"
```

---

### 🔠 2. `charAt(index)`

✅ Returns the **character** at the specified index in a string.

```ts
const str = "JavaScript";
str.charAt(0);   // "J"
str.charAt(4);   // "S"
str.charAt(99);  // "" (empty string)
```

---

### 🔢 3. `charCodeAt(index)`

✅ Returns the **UTF-16 code unit** of the character at the specified index.

```ts
const str = "ABC";
str.charCodeAt(0); // 65
str.charCodeAt(1); // 66
```

Useful when you want to analyze character codes or compare alphabetically.

---

### 🔡 4. `codePointAt(index)`

✅ Returns the **Unicode code point** at the given index, supporting characters beyond UTF-16.

```ts
const emoji = "💙";
emoji.codePointAt(0); // 128153
```

Safer for emoji, special characters, and non-BMP Unicode.

---

### ➕ 5. `concat(...strings)`

✅ Joins one or more strings to the original string and returns a new one.

```ts
const first = "Hello, ";
const second = "world!";
first.concat(second); // "Hello, world!"
```

Note: You can also just use `+` or template literals.

---

### 🔍 6. `includes(searchString, position?)`

✅ Checks if a string **contains** a given substring.

```ts
const text = "The quick brown fox";
text.includes("quick");   // true
text.includes("Quick");   // false (case-sensitive)
```

Optional second argument sets the starting position.

---

### 📍 7. `endsWith(searchString, length?)`

✅ Checks if a string **ends** with the specified characters.

```ts
const phrase = "OpenAI rocks!";
phrase.endsWith("rocks!");      // true
phrase.endsWith("OpenAI");      // false
phrase.endsWith("OpenAI", 6);   // true
```

The optional second parameter sets the length to treat as the string's end.

---

### 🧠 Summary Table

| Method              | Purpose                                 | Returns     |
|---------------------|------------------------------------------|-------------|
| `String()`          | Converts any value to string             | String      |
| `charAt()`          | Gets character at index                  | String      |
| `charCodeAt()`      | UTF-16 code unit at index                | Number      |
| `codePointAt()`     | Unicode code point at index              | Number      |
| `concat()`          | Concatenates multiple strings            | String      |
| `includes()`        | Checks if string contains a substring    | Boolean     |
| `endsWith()`        | Checks if string ends with a value       | Boolean     |

---

## 🧵 More String Methods in JavaScript (Part 2)

These string methods are essential for searching, formatting, and processing text efficiently.

---

### 8️⃣ `indexOf(searchValue, fromIndex?)`

✅ Returns the **index of the first occurrence** of a specified substring. Returns `-1` if not found.

```ts
const str = "banana";

str.indexOf("a");       // 1
str.indexOf("a", 2);    // 3 (starts searching from index 2)
str.indexOf("z");       // -1 (not found)
```

---

### 9️⃣ `lastIndexOf(searchValue, fromIndex?)`

✅ Returns the **last index** where a substring is found, searching backward from the end (or a specified index).

```ts
const str = "banana";

str.lastIndexOf("a");       // 5
str.lastIndexOf("a", 4);    // 3
```

---

### 🔠 `localeCompare(compareString)`

✅ Compares two strings **based on locale-specific sort order**.

```ts
"a".localeCompare("b");     // -1
"b".localeCompare("a");     // 1
"a".localeCompare("a");     // 0
```

Useful for locale-aware alphabetical sorting.

---

### 🎯 `match(regex)`

✅ Searches for a match using a **regular expression**. Returns an array or `null`.

```ts
const sentence = "There are 2 cats and 3 dogs.";

sentence.match(/\d/);      // ["2"]
sentence.match(/\d/g);     // ["2", "3"]
sentence.match(/z/);       // null
```

---

### 🧵 `matchAll(regex)`

✅ Returns an **iterator** with all matches (including capture groups). Requires a `g` (global) flag.

```ts
const text = "test1 test2";
const regex = /test(\d)/g;

const matches = [...text.matchAll(regex)];

matches[0][0]; // "test1"
matches[0][1]; // "1"
matches[1][0]; // "test2"
matches[1][1]; // "2"
```

---

### 🧹 `normalize(form?)`

✅ Returns the **Unicode normalized** form of a string (important for international characters).

```ts
"\u0041\u030A".normalize(); // "Å"
"Å" === "\u0041\u030A".normalize(); // true
```

Useful for comparing Unicode strings consistently.

---

### 🔚 `padEnd(targetLength, padString)`

✅ Pads the **end** of a string until it reaches the target length.

```ts
"7".padEnd(3, "0");       // "700"
"abc".padEnd(6, "!");     // "abc!!!"
```

---

### 🔙 `padStart(targetLength, padString)`

✅ Pads the **beginning** of a string until it reaches the target length.

```ts
"7".padStart(3, "0");     // "007"
"abc".padStart(6, "-");   // "---abc"
```

---

### 🔁 `repeat(count)`

✅ Returns a new string with the original one **repeated** `count` times.

```ts
"ha".repeat(3);       // "hahaha"
"0".repeat(5);        // "00000"
"".repeat(0);         // ""
```

---

### 🧠 Summary Table

| Method              | Purpose                                         | Returns     |
|---------------------|--------------------------------------------------|-------------|
| `indexOf()`         | First index of a substring                       | Number      |
| `lastIndexOf()`     | Last index of a substring                        | Number      |
| `localeCompare()`   | Compares strings by locale                       | Number (-1/0/1) |
| `match()`           | Finds regex matches                              | Array / null|
| `matchAll()`        | Returns all regex matches with groups            | Iterator    |
| `normalize()`       | Unicode normalization                           | String      |
| `padEnd()`          | Adds padding at end of string                    | String      |
| `padStart()`        | Adds padding at start of string                  | String      |
| `repeat()`          | Repeats string `n` times                         | String      |

---

## 🧵 More String Methods in JavaScript (Part 3)

In this part, we'll explore string methods used for replacing, slicing, splitting, and transforming case.

---

### 🔁 `replace(searchValue, newValue)`

✅ Replaces the **first occurrence** of a substring or pattern with another string.

```ts
const msg = "I love cats. Cats are great!";
msg.replace("Cats", "dogs");        // "I love cats. dogs are great!"
msg.replace(/cats/i, "dogs");       // "I love dogs. Cats are great!"
```

- If you pass a string, only the **first match** is replaced.
- For multiple, use `replaceAll()` or a global regex (`/pattern/g`).

---

### 🔁 `replaceAll(searchValue, newValue)`

✅ Replaces **all occurrences** of a substring or regex match (requires global flag for regex).

```ts
const msg = "hello world, hello again";
msg.replaceAll("hello", "hi");       // "hi world, hi again"
msg.replaceAll(/o/g, "O");           // "hellO wOrld, hellO again"
```

⚠️ Not supported in very old browsers. Use `.replace(/.../g)` if needed.

---

### 🔍 `search(regexp)`

✅ Searches for a match against a **regular expression** and returns the index of the first match.

```ts
const txt = "Find the needle in the haystack";

txt.search(/needle/);     // 9
txt.search(/dog/);        // -1
```

---

### ✂️ `slice(startIndex, endIndex?)`

✅ Extracts a **portion of a string** and returns it as a new string.

```ts
const str = "JavaScript";

str.slice(0, 4);      // "Java"
str.slice(-6);        // "Script"
```

- Negative values count from the end.
- Does **not** modify the original string.

---

### 🔪 `split(separator, limit?)`

✅ Splits a string into an array of substrings.

```ts
const phrase = "red,green,blue";

phrase.split(",");       // ["red", "green", "blue"]
"hello".split("");       // ["h", "e", "l", "l", "o"]
```

You can also limit the number of parts returned:

```ts
"one-two-three".split("-", 2); // ["one", "two"]
```

---

### 🔼 `startsWith(searchString, position?)`

✅ Checks if the string **starts with** a given substring.

```ts
"JavaScript".startsWith("Java");     // true
"JavaScript".startsWith("Script");   // false
"JavaScript".startsWith("Script", 4); // true
```

---

### 📏 `substring(startIndex, endIndex?)`

✅ Returns a **substring between two indices** (excluding endIndex).

```ts
const text = "TypeScript";

text.substring(0, 4);      // "Type"
text.substring(4);         // "Script"
```

🔄 Note: Unlike `slice()`, negative values are treated as `0`.

---

### 🔡 `toLocaleLowerCase(locale?)`

✅ Converts a string to lowercase based on locale (e.g., Turkish "İ" to "i").

```ts
"HELLO".toLocaleLowerCase();         // "hello"
"İSTANBUL".toLocaleLowerCase("tr");  // "istanbul"
```

---

### 🔠 `toLocaleUpperCase(locale?)`

✅ Converts a string to uppercase based on locale-specific rules.

```ts
"istanbul".toLocaleUpperCase();        // "ISTANBUL"
"i".toLocaleUpperCase("tr");           // "İ"
```

---

### 🧠 Summary Table

| Method                  | Purpose                                          | Returns     |
|--------------------------|--------------------------------------------------|-------------|
| `replace()`             | Replace first match                              | String      |
| `replaceAll()`          | Replace all matches                              | String      |
| `search()`              | Search with regex, return index                  | Number      |
| `slice()`               | Get substring (supports negatives)               | String      |
| `split()`               | Split string into array                          | Array       |
| `startsWith()`          | Check if string starts with value                | Boolean     |
| `substring()`           | Substring between two indices                    | String      |
| `toLocaleLowerCase()`   | Locale-aware lowercase conversion                | String      |
| `toLocaleUpperCase()`   | Locale-aware uppercase conversion                | String      |

---

## 🧵 Final String Methods in JavaScript (Part 4)

In this part, we’ll cover string case conversion, whitespace trimming, and primitive value extraction.

---

### 🔡 `toLowerCase()`

✅ Converts **all characters** in a string to lowercase.

```ts
"HELLO WORLD".toLowerCase();     // "hello world"
"JavaScript".toLowerCase();      // "javascript"
```

⚠️ Locale-insensitive — use `toLocaleLowerCase()` for language-specific rules.

---

### 🔠 `toUpperCase()`

✅ Converts **all characters** in a string to uppercase.

```ts
"hello world".toUpperCase();     // "HELLO WORLD"
"js".toUpperCase();              // "JS"
```

---

### ✂️ `trim()`

✅ Removes **whitespace** from both ends of a string.

```ts
"   clean me   ".trim();    // "clean me"
" \n test \t ".trim();      // "test"
```

Whitespace includes spaces, tabs, and newline characters.

---

### ⏪ `trimStart()` (or `trimLeft()`)

✅ Removes **whitespace from the start** of a string.

```ts
"   hello".trimStart();    // "hello"
```

Note: `trimLeft()` is an alias, but `trimStart()` is preferred.

---

### ⏩ `trimEnd()` (or `trimRight()`)

✅ Removes **whitespace from the end** of a string.

```ts
"hello   ".trimEnd();      // "hello"
```

Note: `trimRight()` is an alias, but `trimEnd()` is the modern version.

---

### 💎 `valueOf()`

✅ Returns the **primitive string value** of a String object.

```ts
const strObj = new String("abc");

strObj.valueOf();     // "abc"
typeof strObj;        // "object"
typeof strObj.valueOf(); // "string"
```

Mostly used when dealing with wrapped strings (e.g., `new String()` or `Object("abc")`).

---

### 🧠 Summary Table

| Method          | Purpose                                      | Returns     |
|------------------|----------------------------------------------|-------------|
| `toLowerCase()`  | Convert string to lowercase                  | String      |
| `toUpperCase()`  | Convert string to uppercase                  | String      |
| `trim()`         | Trim whitespace from both ends               | String      |
| `trimStart()`    | Trim whitespace from start                   | String      |
| `trimEnd()`      | Trim whitespace from end                     | String      |
| `valueOf()`      | Get primitive value of String object         | Primitive string |

---

🎉 You've now covered **over 40 string methods** in JavaScript!