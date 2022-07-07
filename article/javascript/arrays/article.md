# Arrays

Our purpose of this section inform to you following topics. You will learn how you can advance work with function.
<br/>
<br/>
### 🔴 QUESTION 1

Create an empty array using for different two way.

```
{
    computer: [{
      name: 'mac',
      price: 3000
    }, {
      phone: 'iphone',
      price: 1600
    }],
  
    meal: {
      vegetable: [{
        name: 'tomato',
        price: 20
      }, {
        name: 'cucumber',
        price: 25
      }],
  
      other: [{
        name: 'olives',
        price: 50
      }]
    }
  };
```



<details>
  <summary>See Answer</summary>
  <br/>

  ```javascript
let product = {
    computer: [{
      name: 'mac',
      price: 3000
    }, {
      phone: 'iphone',
      price: 1600
    }],
  
    meal: {
      vegetable: [{
        name: 'tomato',
        price: 20
      }, {
        name: 'cucumber',
        price: 25
      }],
  
      other: [{
        name: 'olives',
        price: 50
      }]
    }
  };


  function getTotalPrices(obj)
  {
    if(Array.isArray(obj))
    {
      return obj.reduce((sum,val) => sum + val.price , 0);
    }
    else{
      let totalPrice = 0;
      for(element of Object.values(obj))
      {
        totalPrice += getTotalPrices(element);
      }

      return totalPrice;
    }

  }

  console.log(getTotalPrices(product));
  ```

  We need to travel all object for summing all prices under the products. We have two option for performing this cirtumstance: Loop based or recursive based.

</details>




