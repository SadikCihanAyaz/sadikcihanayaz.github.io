# Data Types


<br/>
<br/>


<!---
  QUESTION 1
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 1</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

How many primitive data type exist in Javascript and what is these?

<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```html
string, number, bigint, boolean, symbol, null and undefined.
```
7 primitive types exist in javascript

</details>

</div>



<!---
  QUESTION 2
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 2</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

What is wrapper object? Which primitive types have not corresponding wrapper object?

<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```html
String, Number, Boolean, Symbol and BigInt is Object Wrapper
```
```html
undefined and null has no Object Wrapper
```

for explaining object wrapper look at the following code

```js
let test = 'cihan';
test.toUpperCase()
```
test is primitive type so how can we use a method? Magic is Object Wrapper. Wrapper Object is created for performing this action after than destroyed. undefined and null has no  Object Wrapper that means this primitive types has no methods.

</details>

</div>




<!---
  QUESTION 3
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 3</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

Look at the following code. What will be output log?

```js

let test1 = Number("152");
let test2 = new Number("152");

console.log(typeof test1);
console.log(typeof test2);

if(test2)
{
    console.log('if work')
}
else{
    console.log('else work')
}

```

<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```html
number
object
if work
```

if you call Wrapper Object it will be convert correct type.
but if you use <b>new</b> keyword you can generate an object.

dont forget object values <b>truthy</b>. 

</details>

</div>