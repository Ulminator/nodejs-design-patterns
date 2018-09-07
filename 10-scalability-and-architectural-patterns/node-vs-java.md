# I/O

Java -

Fundamental paradigm for the servlet spec, Java's de facto standard for writing backend server code, still fully embraces IO blocking.

Meaning - writing to a disk, or writing to a database using JDBC, block the processing thread from doing anything.

Java is capable of working in a non-blocking way, but that is impractical for applications based on servlet technology.

Node - Non blocking IO

# Concurrency

Java - Dedicates a thread per each icoming request that is processed. More concurrent requests -> more threads. 100 simultaneous requests -> 100 threads.

Node - Uses a single thread (instruction stream) to process all incoming requests. Being non blocking allows for plenty of time to do all the computations and transformations for all the requests while it is waiting for any IO operations.

# Computation

Node uses Google's V8 JavaScript engine which achieves impressive results, but still comes up short to Java.

------------

# Web Applications are IO Heavy
- Request received from a client
- Application fetching data from a database
- Sending the data back to the client
- Maintaining application logs

# Web Applications Require High Concurrency
- Eventually as the number of threads gets too high, the operating system becomes so busy time slicing between all the threads that it doesn’t have any CPU time left to do any actual work.
- When Node is running at max load, although the CPU will be very busy, the operating system won’t even break a sweat. All of the CPU time will be spent doing exactly what you want, servicing requests.

The more IO used in your app, the more likely you should use node.js