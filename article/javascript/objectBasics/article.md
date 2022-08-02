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



<!---
  QUESTION 15
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 15</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

What will be the output of the following code?

```js

let car = function () {
    this.name = 'bmw',
    this.model = 2013
}

console.log(car());
console.log(new car());

```


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```html

undefined
car { name: 'bmw', model: 2013 }

```

if you use a function as a constructor style the code will executed following 

```js
let car = function () {
    this = {};
    this.name = 'bmw',
    this.model = 2013
    return this;
}

```


</details>

</div>




<!---
  QUESTION 16
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 16</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

What will be the output of the following code?

```js

let car = function () {
    return;
}

let car2 = function () {
    return 'test';
}

let car3 = function () {
    return 5;
}

let car4 = function () {
    return { car: 'bmw'};
}

console.log(new car())
console.log(new car2())
console.log(new car3())
console.log(new car4())

```


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```html

car {}
car2 {}
car3 {}
{ car: 'bmw' }

```

you can use return statement in a constructor primitive values will be ignored.

</details>

</div>



<!---
  QUESTION 17
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 17</summary>
<p style="font-size: 8px; text-align: right;">javascript.info</p>

Create a constructor function <b>Calculator</b> that creates objects with 3 methods:

<b>read()</b> asks for two values using prompt and remembers them in object properties.
<b>sum()</b> returns the sum of these properties.
<b>mul()</b> returns the multiplication product of these properties.
For instance:


```js

let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );

```


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```js

function Calculator(){
    this.read = function (){
        this.a = 3;
        this.b = 5;
    };
    this.sum = function () {
        return this.a + this.b;
    };
    this.mul = function () {
        return this.a * this.b;
    }
}

let calculator = new Calculator();
calculator.read();

console.log( "Sum=" + calculator.sum() );
console.log( "Mul=" + calculator.mul() );

```


</details>

</div>



<!---
  QUESTION 18
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 18</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

Create a constructor function <b>SumValues(initVal)</b> 

* Store values in propert of <b>value</b>
* Write <b>add</b> method for summarize values

Usage of the SumValues contructor function:

```js

let sumValues = new SumValues(1); // initial value 1

sumValues.add(5); 
sumValues.read(4); 

console.log(sumValues.value); // 10

```


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```js
function SumValues(initVal){
    this.value = initVal;

    this.add = function(val){
        this.value = this.value + val; 
    }
}

let sumValues = new SumValues(1);
sumValues.add(2);
sumValues.add(4);
sumValues.add(6);
console.log(sumValues.value);

```


</details>

</div>



<!---
  QUESTION 19
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 19</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

What will be the output of the following code?

```js

let value = null;
let value2 = undefined;
let value3 = {test : 'cihan'}

console.log(value?.test);
console.log(value2?.test);
console.log(value3?.test);



```


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```html
undefined
undefined
cihan
```
if we use optional chain <b>null</b> and <b>undefined</b> values will be return <b>undefined</b>. Above <b>null</b> is return as a <b>undefined</b>.

</details>

</div>




<!---
  QUESTION 20
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 20</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

Look at the following code which number can cause an error?

```js

let user = null;
let user2 = {};
let x = 0;
user?.increment(x++); // 1
user.increment?.(x++); // 2
user2?.increment(x++); // 3
user2.increment?.(x++) // 4

user?.increment?.(x++);

console.log(x);
console.log(y);

```


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```html
2
3
```

Number 2 and Number 3 will be caused an error. 
* Number 2 Cannot read properties of null (reading 'increment')
* Number 3 user2?.increment is not a function

</details>

</div>



<!---
  QUESTION 21
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 21</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

Look at the following code what will be output?

```js
  runEngine = {
    bmw(){
        console.log('bmw engine is run ')
    }
  }

  console.log(runEngine.bmw?.());
  console.log(runEngine.mercedes?.())

```


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```html
bmw's engine is run 
undefined
undefined
```

* ?.() cheks the left side.

</details>

</div>



<!---
  QUESTION 22
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 22</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

Look at the following code what will be output?

```js
let test1 = Symbol('car');
let test2 = Symbol('car');

console.log(test1 == test2);
console.log(test1.toString());
console.log(test1.description);
console.log(test1.description == test2.description);

```


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```html
false
Symbol(car)
car
true
```

* every symbol is generate uniqe values
* primitive types is converted suitable type in javascript but symbols cannot be converted. So you must use toString()

</details>

</div>



<!---
  QUESTION 23
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 23</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

Look at the following code what will be output?

```js
let carId = Symbol("carId");
let car = {
  brand: "BMW",
  model: 2020,
  [carId]: 123456
};

for (let item in car) console.log(car[item]); 

```


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```html
BMW
2020
```

* symbol will be ignored at for..in. You can only access symbol value in directly.

car[carId]

</details>

</div>




<!---
  QUESTION 24
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 24</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

Look at the following code what will be output?

```js
let carid= Symbol('carID');

let car = {
    [carid] : 'bmw',
}

let car2 = Object.assign({}, car);

console.log(car2[carid]);
```


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```html
bmw
```

* if you copy an object symbol properties will be protected.

</details>

</div>