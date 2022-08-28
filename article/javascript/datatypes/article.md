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




<!---
  QUESTION 4
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 4</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

Look at the following code. What will be output log?

```js

let test1 = 1.5e3;
let test2 = 1.8e-2;
let test3 = 4822.12e-3;
let test4 = 1_002_522;
let test5 = 0xF8F;
let test6 = 0b111;
let test7 = 0o7123;

console.log(test1);
console.log(test2);
console.log(test3);
console.log(test4);
console.log(test5);
console.log(test6);
console.log(test7);
console.log(test6 === 7);

```

<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```html
1500
0.018
4.82212
1002522
3983
7
3667
true
```

0x -> is used for hex
0b -> is used for binary
0o -> is used for octa

</details>

</div>






<!---
  QUESTION 5
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 5</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

Look at the following code. What will be output log?

```js

let test1 = Math.ceil(2.2);
let test2 = Math.ceil(-5.7);

let test3 = Math.floor(2.8);
let test4 = Math.floor(-5.7);

let test5 = Math.round(2.8);
let test6 = Math.round(-5.7);

let test7 = 15.44.toFixed(1);
let test8 = 15.44.toFixed(4);
let test9 = 15.49.toFixed(1);

console.log(test1);
console.log(test2);
console.log(test3);
console.log(test4);
console.log(test5);
console.log(test6);
console.log(test7);
console.log(test8);
console.log(test9);



```

<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```html
3
-5
2
-6
3
-6
15.4
15.4400
15.5
```


</details>

</div>





<!---
  QUESTION 6
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 6</summary>
<p style="font-size: 8px; text-align: right;">javascript.info</p>

Look at the following code. What will be output log?

```js
console.log( 0.4 + 0.2 ); //0.6
console.log( 0.1 + 0.2 ); //0.3
console.log(+(0.1 + 0.2).toFixed(2));
console.log( 0.1.toFixed(30));

console.log((0.1 * 10 + 0.2 * 10) / 10 );
console.log(( (0.28 * 100 + 0.14 * 100) / 100))
console.log( 999999999999999999 );

```

<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```html
0.6000000000000001
0.30000000000000004
0.3
0.100000000000000005551115123126
0.3
0.4200000000000001
1000000000000000000
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

Look at the following code. What will be output log?

```js
console.log(isNaN(NaN));
console.log(isNaN("str"));
console.log(NaN === NaN);
console.log(6.35.toFixed(1));
console.log(1.35.toFixed(1));
```

<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

```html
true
true
false
6.3
1.4
```

if you write toFixed(20)

console.log(6.35.toFixed(20));
console.log(1.35.toFixed(20));

```html
6.34999999999999964473
1.35000000000000008882
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

Create a string variable and output will be following.

```html
Guests:
 * John
 * Pete
 * Mary
```

Tips: 
```js
let variable = ...;
console.log(variable);
```

<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

You can write your js file two different way
First way:

```js
let guestList = "Guests:\n * John\n * Pete\n * Mary";

```

Second way: 
```js
let guestList = `Guests:
 * John
 * Pete
 * Mary
`

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

write a code for following text 'cihan' to convert to 'c-i-h-a-n'

```js
let test = 'cihan';

.....

console.log(copy);

```

Output will be: 
```html
c-i-h-a-n
```

<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>


```js
let test = 'cihan';
let copy = '';
for(let c of test)
{   
    if(copy)
    {
        copy += '-';
    }
    copy += c ;
}

console.log(copy);

```

</details>

</div>


<!---
  QUESTION 10
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 10</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

1. How you can access an array character? Give an example
2. Why we are use string.length instead of string.length()
3. Is it possible to change a string character?  (Look at the following ; is it possible?)

```js
let test = 'cihan';
test[1] = 'a';

```

<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

1. If you want to access a string character you have two option. Square brackets and charAt can be used.

```js
let test = `Cihan`;

console.log( test[0] );
console.log( test.charAt(0) ); 
```

2. This is a numeric property so not a function
3. This occurs an error. Because strings are immutable.

</details>

</div>



<!---
  QUESTION 11
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 11</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

You have a following text and What is the <b>second</b> position of <b>trying</b> 



```js
let test = 'Trying is good thing, dont trying is nothing';
```

<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

We have two option for perform this

```js
let test = 'Trying is good thing, dont trying is nothing';

console.log(test.indexOf('trying', 1));
console.log(test.lastIndexOf('trying'));
```

Second parameter of indexOf indicates the start of a search from the specified position.
</details>

</div>