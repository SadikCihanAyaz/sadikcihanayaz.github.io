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
if you use <b>this</b> keyword, it will show current object.

</details>

</div>



<!---
  QUESTION 11
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 11</summary>
<p style="font-size: 8px; text-align: right;">This question is taken from javascript.info</p>

Look at the following code snippet. What will be the output of this?

```js

let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  console.log(this.name)
}

user.f = sayHi;
admin.f = sayHi;

user.f(); 
admin.f();

admin['f']();

```


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```html
John
Admin
Admin
```

</details>

</div>




<!---
  QUESTION 12
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 12</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

Look at the following code snippet. Insert a method to car object. (method name will be <b>sayBrand</b>) This methods must be return brand of following object.

```js

let car = {
  brand: "bmw",
  model: 2017
};

```


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```js
let car = {
  brand: "bmw",
  model: 2017
};

car.sayBrand = function () {
  return this.brand;
}

console.log(car.sayBrand());
```

Above we insert a method that's the called the name sayBrand. After we call car.sayBrand() method.

</details>

</div>



<!---
  QUESTION 13
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 13</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

Look at the following code snippet. What will be the output when the code run?

```js

let car = {
  brand: "Mercedes",
  arrowFunction : () => {
    console.log('arrow function');
    console.log(this);
  },
  normalFunction: function (){
    console.log('normal function');
    console.log(this);
    arrowFunction2 = () => {
      console.log('arrow function 2');
      console.log(this);
    }

    arrowFunction2();

    return this;
  }
  
};

car.arrowFunction();
car.normalFunction();
car.normalFunction().arrowFunction();


```


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```html
arrow function
{}
normal function
{
  brand: 'Mercedes',
  arrowFunction: [Function: arrowFunction],
  normalFunction: [Function: normalFunction]
}
arrow function 2
{
  brand: 'Mercedes',
  arrowFunction: [Function: arrowFunction],
  normalFunction: [Function: normalFunction]
}
normal function
{
  brand: 'Mercedes',
  arrowFunction: [Function: arrowFunction],
  normalFunction: [Function: normalFunction]
}
arrow function 2
{
  brand: 'Mercedes',
  arrowFunction: [Function: arrowFunction],
  normalFunction: [Function: normalFunction]
}
arrow function
{}

```

At the first look above code can be a little complicated. But we need yo forward step by step.

1. car.arrowFunction();

arrow functions cannot access <b>this</b> keyword. So you can see only empty object when you are attempt to access this.

2. car.normalFunction();

normal function can access own object properties by using <b>this</b>. But there is some important point it there. We declare a arrow function inside a normal function. And inside the arrow function we attempt to <b> this </b> keyword as a result we see normal function this already passing to arrow function.

3. car.normalFunction().arrowFunction();

normalFunction will be return to us <b>this</b> keyword. That mean gives to us object itself. And you can access this object arrowFunction using 

this.arrowFunction();


</details>

</div>








<!---
  QUESTION 14
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 14</summary>
<p style="font-size: 8px; text-align: right;">This question is taken from javascript.info</p>

Create an object calculator with three methods:

<b>read()</b> writes for two values and saves them as object properties with names a (value will be 5) and b (value will be 4) respectively.
<b>sum()</b> returns the sum of saved values.
<b>mul()</b> multiplies saved values and returns the result.

```js

let calculator = {
  // ... your code ...
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );

```


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```js

let calculator = {
  a: 0,
  b: 0,
  read: function(){
    this.a = 5;
    this.b = 4;
  },
  sum: function(){
    return this.a + this.b;
  },
  mul: function(){
    return this.a * this.b;
  }
}

calculator.read();
console.log(calculator.sum());
console.log(calculator.mul());

```


</details>

</div>