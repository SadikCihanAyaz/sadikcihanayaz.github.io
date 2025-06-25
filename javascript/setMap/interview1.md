# 🧠 JavaScript Data Structure Challenges – Set, Map, Array, POJO

Real-world JavaScript interview questions that test your understanding of data structure conversion and iteration with `Set`, `Map`, `Array`, and POJO (Plain Old JavaScript Object).

---

### ✅ Question 1: Identify Returning Customers

You are given two arrays:
- `allOrders`: users who placed orders this month
- `previousBuyers`: users who placed orders last month

Return a list of users who are **returning customers** (appeared in both).

```ts
const allOrders = ["u1", "u2", "u3", "u2", "u4", "u5"];
const previousBuyers = ["u2", "u3", "u6"];
```

**Expected Result:**  
["u2", "u3"]

<details>
<summary>✅ Answer</summary>

```ts
const getReturningCustomers = (allOrders, previousBuyers) => {
  const currentSet = new Set(allOrders);
  const previousSet = new Set(previousBuyers);
  return [...currentSet].filter(user => previousSet.has(user));
};
```

</details>


---

### ✅ Question 2: Calculate Total Items Per User

You have a list of orders. Each order contains `userId` and `items` purchased.  
Return a POJO summarizing how many items each user has ordered.

```ts
const orders = [
  { userId: "u1", items: 3 },
  { userId: "u2", items: 2 },
  { userId: "u1", items: 1 },
  { userId: "u3", items: 5 }
];
```

**Expected Result:**  
{ u1: 4, u2: 2, u3: 5 }

<details>
<summary>✅ Answer</summary>


```ts
const totalItemsByUser = (orders) => {
  return orders.reduce((acc, { userId, items }) => {
    acc[userId] = (acc[userId] || 0) + items;
    return acc;
  }, {});
};
```

```ts
const orders = [
  { userId: "u1", items: 3 },
  { userId: "u2", items: 2 },
  { userId: "u1", items: 1 },
  { userId: "u3", items: 5 }
];

const getOrdered = () => {
   const map = new Map();

   orders.forEach((value, index) => {
       map.set(value.userId, (map.get(value.userId) ?? 0 )+ value.items)
   })
   
   return Object.fromEntries(map);
}
```
</details>
---

### ✅ Question 3: Top Favorite Items

You’re given a `Map` of item names to order counts.  
Return an array of the top 2 most ordered items.

```ts
const favoriteItems = new Map([
  ["Pizza", 120],
  ["Burger", 95],
  ["Sushi", 40],
  ["Pasta", 70]
]);
```

**Expected Result:**  
["Pizza", "Burger"]

<details>
<summary>✅ Answer</summary>

```ts
const getTopFavorites = (map) => {
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([key]) => key);
};
```

```ts
const favoriteOrder = () => {
   const sortedArr = [...favoriteItems].sort((a,b) => b[1] -a[1]);
   const slicedArr = sortedArr.slice(0,2);
   const setV = new Set();
   
    for(const[value, value2] of slicedArr)
    {
        setV.add(value);
    }
   
   return [...setV];
}
```

</details>
---

### ✅ Question 4: Flatten Friend Orders by Item

You are given a POJO where each friend’s name maps to an array of food items they ordered.  
Return a flat array of **unique food items** ordered by all friends.

```ts
const friendOrders = {
  Alice: ["Burger", "Fries", "Cola"],
  Bob: ["Pizza", "Fries", "Water"],
  Charlie: ["Cola", "Burger"]
};
```

**Expected Result:**  
["Burger", "Fries", "Cola", "Pizza", "Water"]

<details>
<summary>✅ Answer</summary>


```ts
const getAllUniqueItems = (orders) => {
  const all = Object.values(orders).flat();
  return [...new Set(all)];
};
```

</details>
---

### ✅ Question 5: Build Name Lookup from Array

You have an array of user objects, each with an `id`, `firstName`, and `lastName`.  
Return a `Map` where the key is the user's ID and the value is their full name.

```ts
const users = [
  { id: "u1", firstName: "Alice", lastName: "Brown" },
  { id: "u2", firstName: "Bob", lastName: "Smith" },
  { id: "u3", firstName: "Charlie", lastName: "Davis" }
];
```

**Expected Result:**  
Map { "u1" => "Alice Brown", "u2" => "Bob Smith", "u3" => "Charlie Davis" }

<details>
<summary>✅ Answer</summary>
```ts
const buildUserNameMap = (users) => {
  return new Map(users.map(user => [user.id, `${user.firstName} ${user.lastName}`]));
};
```

```ts
const lookUpForNames = () => {
   const map = new Map();
   
   users.forEach((value, index) => {
       map.set(value.id, value.firstName + ' ' + value.lastName)
   })
   return map;
}
```

</details>
---

---

### ✅ Question 6: Group Products by Category

You have an array of products. Each product has a `name` and a `category`.  
Return a POJO where each key is a category, and its value is an array of product names in that category.

```ts
const products = [
  { name: "Apple", category: "Fruit" },
  { name: "Carrot", category: "Vegetable" },
  { name: "Banana", category: "Fruit" },
  { name: "Cucumber", category: "Vegetable" },
  { name: "Steak", category: "Meat" }
];
```

**Expected Result:**  
{ Fruit: ["Apple", "Banana"], Vegetable: ["Carrot", "Cucumber"], Meat: ["Steak"] }

<details>
<summary>✅ Answer</summary>

```ts
const groupByCategory = (products) => {
  return products.reduce((acc, product) => {
    const { category, name } = product;
    acc[category] = acc[category] || [];
    acc[category].push(name);
    return acc;
  }, {});
};
```

```ts
const groupUsingMap = () => {
  const map = new Map();

  products.forEach(({ name, category }) => {
    if (!map.has(category)) {
      map.set(category, []);
    }
    map.get(category).push(name);
  });

  return Object.fromEntries(map);
};
```
</details>

---

### ✅ Question 7: Extract Unique Technologies Used by All Developers

You are given a POJO where each key is a developer’s name and the value is an array of technologies they use.  
Return a flat array of **unique technologies** used across all developers.

```ts
const developers = {
  Alice: ["React", "Node", "GraphQL"],
  Bob: ["Vue", "Node", "TypeScript"],
  Carol: ["React", "TypeScript", "Node"]
};
```

**Expected Result:**  
["React", "Node", "GraphQL", "Vue", "TypeScript"]

<details>
<summary>✅ Answer</summary>

```ts
const extractTechnologies = (devs) => {
  const all = Object.values(devs).flat();
  return [...new Set(all)];
};
```

```ts
const techFromEach = () => {
  const resultSet = new Set();

  for (const techs of Object.values(developers)) {
    for (const tech of techs) {
      resultSet.add(tech);
    }
  }

  return Array.from(resultSet);
};
```
</details>

---