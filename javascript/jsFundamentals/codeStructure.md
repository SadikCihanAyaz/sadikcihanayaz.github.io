<h2>Question 1</h2>
<p>Consider the following code snippet:</p>

<pre><code>alert("Hello")
[1, 2, 3].forEach(alert);</code></pre>

<p>The code is intended to display four alerts: "Hello", followed by the numbers 1, 2, and 3. However, there's an issue in the code which causes an unexpected behavior.</p>

<p>Can you identify the problem with the code? And explain why this problem arises?</p>

<h2>Answer 1</h2>

<p>The code, as presented, will raise an error after the first alert of "Hello". This is because JavaScript does not automatically insert a semicolon before square brackets <code>[...]</code>. Due to the missing semicolon, the JavaScript engine treats the two lines as a single statement:</p>

<pre><code>alert("Hello")[1, 2, 3].forEach(alert);</code></pre>

<p>This results in an error, as <code>alert("Hello")[1, 2, 3]</code> is not valid syntax.</p>

<p>To correct this, a semicolon should be inserted at the end of the first line, like so:</p>

<pre><code>alert("Hello");
[1, 2, 3].forEach(alert);</code></pre>

<p>With this change, the code will correctly show four alerts: "Hello", 1, 2, and 3.</p>



<br><br> <br><br>




<h2>Question 2</h2>

<p>Examine the following JavaScript comment styles:</p>

<pre><code>// This is a single-line comment

/* This is 
a multi-line 
comment */
</code></pre>

<p>Which of the two comment styles would be appropriate to use for commenting out large blocks of code, and why? Furthermore, is it possible to nest one style of comment within the other? Explain.</p>

<h2>Answer 2</h2>


<p>For commenting out large blocks of code, the multi-line comment style, denoted by <code>/* ... */</code>, would be more appropriate. This is because it allows multiple lines to be commented out with a single opening and closing tag, whereas the single-line comment style <code>//</code> only comments out the remainder of the line on which it appears.</p>

<p>Regarding nesting, one style of comment cannot be nested within the other in the way that <code>/* ... /* ... */ ... */</code> is used, as it will result in errors. However, you can place single-line comments within multi-line comments:</p>

<pre><code>/* 
This is a multi-line comment
// This is a single-line comment inside the multi-line comment
Another line of the multi-line comment 
*/
</code></pre>

<p>But note that the single-line comment indicators <code>//</code> inside the multi-line comment are redundant, as the multi-line comment already comments out everything within its bounds.</p>


<br><br> <br><br>

<h2>Question 3</h2>


<p>Review the JavaScript code below:</p>

<pre><code>alert(3 +
1
+ 2);
</code></pre>

<p>Despite the appearance of the code and the line breaks, what would be the output of this script? Explain the behavior of JavaScript regarding newlines and its impact on this particular code snippet.</p>


<h2>Answer 3</h2>


<p>The output of the provided script will be <code>6</code>.</p>

<p>In JavaScript, a newline is usually treated as an “implicit” semicolon, implying the end of a statement. This behavior is referred to as automatic semicolon insertion. However, in the case of the given code, JavaScript recognizes that the line ends with a plus sign <code>+</code>, indicating an “incomplete expression”. Consequently, it does not insert a semicolon based on the line break. The engine reads the code across multiple lines as a continuous expression, effectively interpreting it as:</p>

<pre><code>alert(3 + 1 + 2);</code></pre>

<p>This results in the addition of the numbers and produces the output <code>6</code>.</p>


<br><br> <br><br>

<h2>Question 4</h2>

<p>Consider the following code:</p>

<pre><code>/* Commenting out the code
alert('Hello');
*/
alert('World');
</code></pre>

<p>Which messages will be displayed when executing this code? Explain the significance of the placement and structure of comments in JavaScript.</p>


<h2>Answer 4</h2>


<p>When executing the code, only the message <code>'World'</code> will be displayed.</p>

<p>In JavaScript, comments are intended for developers to provide explanations or annotations within the code without affecting the actual execution. The multi-line comment style is represented by <code>/* ... */</code>. Everything between these delimiters is ignored by the JavaScript engine, effectively "commenting out" any code within them.</p>

<p>In the given code snippet, the <code>alert('Hello');</code> statement is enclosed within a multi-line comment, rendering it non-executable. Therefore, it won't produce any alert. On the other hand, the <code>alert('World');</code> statement is outside of the comment delimiters and will execute, displaying the message <code>'World'</code>.</p>

<p>It's crucial to be mindful of the placement and structure of comments, as incorrect usage can inadvertently comment out essential parts of the code, leading to unexpected behaviors.</p>
