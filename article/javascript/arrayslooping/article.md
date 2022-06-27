# ITERATIVE OF ARRAYS

Generally we need to write iterative when we are write a program. forEach, for, map etc.. for all all this provide to create iterative. Of course there is a difference each others of this iterative methods and you choose one which is more suitable for your structure.


### REDUCE

Look at the follow 5 examples and find the output. 

``` 

console.log(' 🔴 EXAMPLE 1');
let arr = [1];
let result = arr.reduce((sum, current) => sum - current);
console.log(result);

console.log(' 🔴 EXAMPLE 2');
arr = [1,2,3,4,5];
result = arr.reduce((sum, current) => sum - current);
console.log(result);

console.log(' 🔴 EXAMPLE 3');
arr = [1,2,3,4,5];
result = arr.reduce((sum, current) => sum - current, 0);
console.log(result);

console.log(' 🔴 EXAMPLE 4');
arr = [];
result = arr.reduce((sum, current) => sum - current, 0);
console.log(result);

console.log(' 🔴 EXAMPLE 5');
arr = [];
result = arr.reduce((sum, current) => sum - current);
console.log(result);
``` 


<details>
  <summary>SEE THE OUTPUT</summary>
  
🔴 EXAMPLE 1<br />
Result: 1<br />
sum value -> 1 <br />
current value -> undefined<br />
1 - undefined <br />
result will be 1 <br />

🔴 EXAMPLE 2<br />
Result: -13<br />

🔴 EXAMPLE 3<br />
Result: -15<br />

🔴 EXAMPLE 4<br />
Result: 0<br />

🔴 EXAMPLE 5<br />
Result: ERROR<br />

</details>
