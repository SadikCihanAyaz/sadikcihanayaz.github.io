<h2>Question 1</h2>
<p><i>How does the presence of the <code>src</code> attribute in the <code>&lt;script&gt;</code> tag affect the execution of inline JavaScript code? Can you provide an example to demonstrate the behavior?</i></p>

<h2>Answer 1</h2>
<p>When a <code>&lt;script&gt;</code> tag has the <code>src</code> attribute set to reference an external JavaScript file, any inline JavaScript code inside that specific <code>&lt;script&gt;</code> tag will be ignored. In other words, you cannot have both an external script reference and inline code in the same <code>&lt;script&gt;</code> tag.</p>

<p>For example, consider the following code:</p>
<pre>
&lt;script src="externalFile.js"&gt;
  alert('This will not be executed.');
&lt;/script&gt;
</pre>

<p>In the above example, the <code>alert</code> function won't execute because the <code>src</code> attribute is set, pointing to an external file. If you want to run both the external script and the inline code, you'd have to use separate <code>&lt;script&gt;</code> tags:</p>

<pre>
&lt;script src="externalFile.js"&gt;&lt;/script&gt;
&lt;script&gt;
  alert('This will be executed.');
&lt;/script&gt;
</pre>

<p>In this revised version, the browser will execute both the external script (<code>externalFile.js</code>) and the inline <code>alert</code> function.</p>

<br><br> <br><br>

<h2>Question 2</h2>
<p>What were the old usages of the <code>type</code> and <code>language</code> attributes in the <code>&lt;script&gt;</code> tag, and are they still necessary in modern HTML?</p>

<h2>Answer 2</h2>
<p>In the old HTML standard, HTML4, the <code>type</code> attribute was required for the <code>&lt;script&gt;</code> tag. It was commonly set to <code>text/javascript</code>. However, in modern HTML, this attribute is no longer required for specifying the script type as JavaScript is now the default. The modern HTML standard has repurposed the meaning of the <code>type</code> attribute, especially for JavaScript modules, which is a more advanced topic. As for the <code>language</code> attribute, it was previously used to indicate the language of the script. Since JavaScript has become the default scripting language for browsers, the <code>language</code> attribute is now obsolete and no longer makes sense to use.</p>

<br><br> <br><br>

<h2>Question 3</h2>
<p>Historically, why did some developers wrap their JavaScript code with HTML-style comments (e.g., <code>&lt;!-- --&gt;</code>) inside the <code>&lt;script&gt;</code> tag? Is this approach still prevalent in today's web development?</p>


<h2>Answer 3</h2>
<p>In the early stages of web development, some browsers did not recognize or properly handle the <code>&lt;script&gt;</code> tag. To prevent these browsers from displaying raw JavaScript code to users, developers would wrap their code within HTML comments inside the <code>&lt;script&gt;</code> tag. Here's an example of this practice:</p>

<pre>
&lt;script type="text/javascript"&gt;&lt;!--
    // Actual JavaScript code...
//--&gt;&lt;/script&gt;
</pre>

<p>These comments ensured that older browsers, which didn't understand the <code>&lt;script&gt;</code> tag, would treat the JavaScript code as an HTML comment, thereby hiding it from view. With advancements in browser technology and the wide adoption of modern web standards, this technique has become obsolete. Nowadays, all popular browsers handle the <code>&lt;script&gt;</code> tag correctly, making such commenting unnecessary. Therefore, if you encounter such comments in JavaScript today, it's likely a sign of outdated code practices, and it's no longer a standard approach in contemporary web development.</p>

