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



<!---
  QUESTION 6
  -->


<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 6</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

What will be console output following code snippet?

```js

let test = (val) =>
{
    val.name = 'cihan'
    console.log(val);
}

let item2 = {name: 'kerim'};

test(item2);
console.log(item2);


```


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```html
{ name: 'cihan' }
{ name: 'cihan' }
```

</details>

</div>


<!---
  QUESTION 7
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 7</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

What will be console output following code snippet?

```js


let a = {name: 'cihan'};
let b = a;
let c = {name: 'cihan'};

console.log(a == b);
console.log(a === b);
console.log(a == c);
console.log(a === c);


```


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```html
true
true
false
false
```

</details>

</div>



<!---
  QUESTION 8
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 8</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

Change the value of <b>brand</b> property following object.

1. copy car object to car2 obj. (use for..in)
2. copy car object to car3 obj. (use JSON methods)
3. copy car object to car4 obj. (use spread syntax)
4. copy car object to car5 obj. (use assign method)

```js

let car = {
    brand: "mercedes",
    model: 30
  };

```


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```js
let car = {
    brand: "mercedes",
    model: 30
  };

let car2 = {};


for(let key in car)
{
    car2[key] = car[key];
}
car2.brand = 'bmw'

let car3 = JSON.parse(JSON.stringify(car));
car3.brand = 'renault';

let car4 = {...car};
car4.brand = 'volvo'

let car5 = Object.assign({}, car);
car5.brand = 'range';

console.log(car)
console.log(car2);
console.log(car3);
console.log(car4);
console.log(car5);


```

</details>

</div>


<!---
  QUESTION 9
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 9</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

Look at the following question. What will be the console output when the code snippet work?

```js

let car = {
    brand: "bmw"
  };
  
let car2 = car;
car2 = null;

console.log(car.brand);

```


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```html
bmw

```
When we assign the value of car2 to <b>null</b> only car2 reference will be removed. That means garbage collector don't will remove the object because of object is still reacable.

</details>

</div>


<!---
  QUESTION 10
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 10</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

Look at the following code snippet. What will be the output of this?

```js

let brand = 'mercedes'
let model = '2016'

let cars= {
    brand: 'bmw',
    model: 2014,
    getBrand() {
        return brand;
    },
    getModel(){
        return this.model;
    }
}
  

console.log(cars.getBrand());
console.log(cars.getModel());

```


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```html
mercedes
2014
```
if you use this keyword, it will show current object.

</details>

</div>