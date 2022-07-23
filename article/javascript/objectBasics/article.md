# Object : Basics


<br/>
<br/>



<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 1</summary>

1. Create an empty object of litiral style and add an item to this object.
2. Delete this item from the object.

<details>
  
  <summary style="font-weight: bold;  cursor: pointer;">See Answer</summary>
  <br/>

```js
const obj = {}

obj.name = 'cihan'
console.log(obj);
delete obj.name;
console.log(obj);

```


</details>

</div>

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold; ">QUESTION 2</summary>

Look at the code sample what will be written on the console?

```js

function test(key, value) {
  return {
    [key]: value,
  }
}


const obj = test( 'cihan', 30);
console.log(obj);
```

<details>
  
  <summary style="font-weight: bold;  cursor: pointer;">See Answer</summary>
  <br/>

<p>{ cihan: 30 }</p>
<p>is written key of an object dynamicly is called computed properties.</p>

</details>

</div>





<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 3</summary>
<p style="font-size: 8px; text-align: right;">This question is taken from javascript.info</p>


Write the code, one line for each action:

1. Create an empty object user.
2. Add the property name with the value John.
3. Add the property surname with the value Smith.
4. Change the value of the name to Pete.
5. Remove the property name from the object.

<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```js

const user = {}

user.name = 'John';
user.surname = 'Smith';
user.name = 'Pete';
delete user.name;

console.log(user);
```

</details>

</div>




<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 4</summary>
<p style="font-size: 8px; text-align: right;">This question is taken from javascript.info</p>


Write the function <b>isEmpty(obj)</b> which returns <b>true</b> if the object has no properties, <b>false</b> otherwise.

Should work like that:

```js

let schedule = {};

alert( isEmpty(schedule) ); // true

schedule["8:30"] = "get up";

alert( isEmpty(schedule) ); // false
```

<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```js

const isEmpty = (obj) => {

  for(let key in obj)
  {
    return false;
  }

  return true;
}

const test1 = {};
const test2 = {name: 'cihan'};
console.log(isEmpty(test1));
console.log(isEmpty(test2));
```

</details>

</div>



<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 5</summary>
<p style="font-size: 8px; text-align: right;">This question is taken from javascript.info</p>


We have an object storing salaries of our team:

```js

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
}
```

Write the code to sum all salaries and store in the variable <b>sum</b>. Should be <b>390</b> in the example above.

If <b>salaries</b> is empty, then the result must be <b>0</b>.


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```js

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
}

let sum = 0;

for(let key in salaries)
{
  sum += salaries[key];
}

console.log(sum);

```

</details>

</div>
