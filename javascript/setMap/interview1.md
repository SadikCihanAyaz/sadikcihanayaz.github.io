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

```ts
const getReturningCustomers = (allOrders, previousBuyers) => {
  const currentSet = new Set(allOrders);
  const previousSet = new Set(previousBuyers);
  return [...currentSet].filter(user => previousSet.has(user));
};
```

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

```ts
const getAllUniqueItems = (orders) => {
  const all = Object.values(orders).flat();
  return [...new Set(all)];
};
```

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

```ts
const buildUserNameMap = (users) => {
  return new Map(users.map(user => [user.id, `${user.firstName} ${user.lastName}`]));
};
```

---