# Object : Basics


<br/>
<br/>


<!---
  QUESTION 1
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 1</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

Look at the following questions.

```html
* What is Hermes in react native?
* What is Webpack in react native?
* What is Babel in react native?
* What is Husky in react native?
* What is Metro in react native?
* What is difference npm and npx?
* What is Fabric in react native?
* What is JSI in react native?
```


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>

* <a href="https://devnot.com/2020/hermes-engine-nedir/ " style="color: white">Read about Hermes</a>
* <a href="https://dev.to/getd/wtf-are-babel-and-webpack-explained-in-2-mins-43be " style="color: white">Read about Babel</a>
* <a href="https://stackoverflow.com/questions/51116811/what-is-metro-bundler-in-react-native" style="color: white">Read About Metro</a>
* <a href="https://medium.com/airbnb-engineering/faster-javascript-builds-with-metro-cfc46d617a1f#" style="color: white">Read About Metro - 2</a>
* <a href="https://www.reactnative.guide/" style="color: white">React Native Guide</a>
* NPM and NPX difference: NPM is a package manager used to install, delete, and update Javascript packages on your machine. NPX is a package executer, and it is used to execute javascript packages directly, without installing them.
* <a href="https://zaferayan.medium.com/react-native-jsi-nedir-yeni-mimari-neler-getiriyor-d055acbc2933" style="color: white">Read about Fabric and JSI </a>
</details>

</div>



<!---
  QUESTION 2
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 2</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

How many way is exist for create react native project?

<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>


```html
npx create-react-native-app try1
```
This will create react native boilerplate

```html
expo
```
Generally, this method cannot be suggested
```html
npx react-native init
```

</details>

</div>




<!---
  QUESTION 3
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 3</summary>
<p style="font-size: 8px; text-align: right;">ORIGINAL</p>

1. Create new react native project
2. if exist Prettier and eslint your boilerplate delete all dependencies
3. setup prettier and eslint in your react native project
4. Setup stylelint in your react native project
5. Setup Husky in your react native project

```html
TİP: use this command for create a project -> react-native init 
```

<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>


* <a href="https://three29.com/set-up-eslint-and-prettier-for-react-native-projects/">Read Set up Eslint and Prettier</a> 

* <a href="https://enlear.academy/eslint-vs-prettier-57882d0fec1d">Read Difference Eslint And Prettier</a> 

* <a href="https://stylelint.io/user-guide/get-started">Read About Stylelint</a>,

* <a href="https://dev.to/botreetechnologies/setting-up-husky-pre-commit-hook-with-eslint-prettier-and-lint-staged-for-react-and-react-native-d05">Read About Husky, Eslint and Prettier</a>,


</details>

</div>




<!---
  QUESTION 4
  -->

<br/>

<div style="background-color: rgb(6, 41, 48 ); color: white; padding: 2.5%; border-radius: 5px;">

<summary style="font-weight: bold;">QUESTION 4</summary>
<p style="font-size: 8px; text-align: right;">this question is taken from https://blog.logrocket.com/using-typescript-with-react-native/</p>

Write following application with typescript 

<img src="https://paper-attachments.dropbox.com/s_5B729611AE3E42F3A9C97D1DA20832973F0ACB94FE96AF127DADD3967B2EB606_1617810063568_ezgif.com-gif-maker.gif" alt="J" width="200"/>


<details>
  
  <summary style="font-weight: bold; cursor: pointer;">See Answer</summary>
  <br/>


Initialize the project and write following command

```html

npm install typescript @types/react @types/react-native @types/react-test-renderer @types/jest

```


* typescript: To install typescript
* @types/react: To install react types for typescript
* @types/react-native: To install React Native types for typescript
* @types/react-test-renderer: To install types for test-renderer for typescript
* @types/jest: To install types for jest testing for typescript


```html
tsc --init
```

* this command will be generate <b>tsconfig.json</b> 

</details>

</div>