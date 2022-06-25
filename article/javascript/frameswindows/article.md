# TESTING...


Redis keeps data in memory. What does it mean? Where did other traditional databases (SQL Server, PostgreSQL, MySql, MongoDB ,etc.) keep their data? If there is something as important obtaining data, it is to keep the data you obtained permanently. You know traditional databases(SQL Server, PostgreSQL, MySql, MongoDB,etc.) provide keeping this data on SSD or HDD for us. Another thing is that it is very important to deliver the data to the user as fast as the permanent storage of the data.

A typical 7200 RPM HDD will deliver a read/write speed of 80–160MB/s. On the other hand, a typical SSD will deliver read/write speed of between 200 MB/s to 550 MB/s. DDR3 SDRAM gives a maximum transfer rate of 6400 MB/s.


Note: This includes average information.
Redis help us to deliver the data to user quickly using its RAM’s incredible speed. But there is a problem here … How to use the incredible speed of Ram while Ram doesn’t hold permanent data? The answer is of course Redis. Redis does not eliminate the need for traditional databases(SQL Server, PostgreSQL, MySql, MongoDB,etc.) and works with them. The pictures below explain this very well.


You suppose the first response time 700 ms. Then there will be the same response time for the same request. So it will be an average of 700 ms.


You suppose the first response time 700 ms. Response times will be much shorter in the next same requests … Because of the next time, Redis will respond to data it holds on RAM without going to the database. This event is also called the cache mechanism. We suppose the next response time 100 ms. The next response times are almost 7 times faster.

If you want to respond quickly to your users, Redis can be one of the best solutions. I hope to come across an example that will embody what we have mentioned theoretically next time.