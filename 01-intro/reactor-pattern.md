# Blocking I/O
--------------

In traditional blocking I/O programming, the function call corresponding to an I/O request will block the execution of the thread until the operation completes. This can go from a few milliseconds, in the case of disk access, to minutes or even more, in case the data is generated from user actions, such as pressing a key.

//blocks the thread until the data is available
data = socket.read();
//data is available
print(data);

The traditional approach to handling concurrency in web servers is to kick off a thread or a process (or to reuse one taken from a pool) for each concurrent connection that needs to be handled. This way, when a thread gets blocked for an I/O operation it will not impact the availablility of the other requests, because they are handled in separate threads.

Threads are not cheap. It consumes memory and causes context switches, so having a long running thread for each connection and not using it for most of the time is not the best compromise in terms of efficiency.

# Non-Blocking I/O
------------------

Most operating systems support this.
In this mode, the system call always returns immediately without waiting for the data to be read or written. If no results are available at the moment of the call, the function will simply return a predefined constant, indicating that there is no data available to return at that moment.

The most basic pattern for accessing this kind of non-blocking I/O is to actively poll the resource within a loop until some actual data is returned (busy-waiting). This typically results in a huge amount of wasted CPU tie due to iterating over resources that are unavailable most of the time.

# Event Demultiplexing
----------------------
Synchronous event demultiplexer or event notification interface
1. Resources are added to a data structure, assocaiting each one of them with a specific operation (read, etc).
2. The event notifier is set up with the group of resources to be watched. This call is synchronous and blocks until any of the watched resources are ready for read. When this occurs, the event demultiplexer returns from the call and a new set of events is available to be processed.
3. Each event returned is processed. At this point the resource associated with each event is guaranteed to be ready to read and to not block during the operation. When all the events are processed, the flow will block again on the event demultiplexer until new events are again available to be processed. This is called the event loop.

This allows handling several I/O operations inside a single thread without using a busy-waiting technique.

The is an absense of in-process race conditions and multiple threads to synchronize allows us to use much simpler concurrency strategies.

# Reactor Pattern
-----------------

This builds off the previous algorithms. Here we have a handler (which in Node.js is represented by a callback function) associated with each I/O operation, which will be invoked as soon as an event is produced and processed by the event loop.

1. Application generates a new I/O operation by submitting a request to the Event Demultiplexer. The application also specifies a handler, which will be invoked when the operation completes. This is a non-blocking call and immediately returns control to the application.
2. When a set of I/O operations completes, the Event Demultiplexer pushed the new events into the Event Queue.
3. At this point, the Event Loop iterates over the items of the Event Queue.
4. For each event, the assocaited handler is invoked.
5. The handler, which is part of the application code, will give back control to the Event Loop when its execution completes. However, new asynchronous operations might be requested during the execution of the handler, causing new operations to be inserted in the Event Demultiplexer, before control is given back to the Event Loop.
6. When all the items in the Event Queue are processed, the loop will block again on the Event Demultiplexer which will then trigger another cycle when a new event is available.

Pattern (reactor) handles I/O by blocking until new events are available from a set of observed resource, and then reacts by dispatching each event to an associated handler.

# Non-blocking I/O engine of Node.js-libuv
------------------------------------------

Each OS has its own interface for Event Demultiplexer
    - Linux: epoll
    - Mac OS X: kqueue
    - Windows: I/O Completion Port (IOCP) API

Additionally, each I/O operation can behave quite differently depending on the type of the resource, even within the same OS. For example, in Unix, regular filesystem files do not support non-blocking operations, so, in order to simulate non-blocking behavior, it is necessary to use a separate thread outside the Event Loop.

These inconsistencies accross and within the different OS systems required a higher-level abstraction to be built for the Event Demultiplexer. This is why the Node.js core team created the C library `libuv`, with the objective to make Node.js compatible with all the major platforms and normalize the non-blocking behavior of the different types of resource. Libuv also implements the reactor pattern, providing an API for creating event loops, managing the event queue, running asynchronous I/O operations, and queuing other types of tasks.

http://nikhilm.github.io/uvbook

# Recipe for Node
-----------------
* Set of bindings responsible for wrapping and exposing `libuv` and other low-level functionality to Javascript.
* V8, the JavaScript engine originally created by Google for the Chrome browser. This makes node fast and gives it efficient memory management.
* A core JS library (node-core) that implements high-level Node.js API.