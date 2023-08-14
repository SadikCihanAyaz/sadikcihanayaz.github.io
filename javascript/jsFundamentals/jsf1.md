<h2>JavaScript Fundamentals 1</h2>
<p><i>How does the presence of the <code>src</code> attribute in the <code>&lt;script&gt;</code> tag affect the execution of inline JavaScript code? Can you provide an example to demonstrate the behavior?</i></p>

<h2>JavaScript Fundamentals 1</h2>
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
