Early days: Node.js was mainly a non-blocking web server (web.js)

Ryan Dahl (Creator) realized the potential for the platform and started extending it with tools to enable the creation of any type of server-side application on top of the implementation of distributed systems, made of nodes orchestrating their operations through the network.

Sinlge threaded nature of node meant that it is incapable of exploiting all the resources of a machine.

This means Node.js applications are usually scaled much sooner than traditional web servers, even in the context of a single machine in order to take advantage of all its resources.

Being almost forced to scale has beneficial effects
    * Increasing capacity to handle more requests faster
    * Greater availability and higher tolerance to errors
    * Developers are pushed to take into account scalability from the early stages of an application (resources shared across multiple processes or machines)

# Introducing Clustering!

Take advantage of multi-core systems.

Cluster module allows easy creation of child processes that all share server ports.

#What happens if master node dies?

Worker processes are spawned using the child_process.fork() method, so that they can communicate with the parent via IPC and pass server handles back and forth.

2 methods to distribute incoming connections with the default being the round robin approach where the master process listens on a port, accepts new connections and distributes them across the workers in a round-robin fashion with some build in smarts to avoid overloading a worker process.

Don't rely too heavily on in-memory data objects for things like sessions and login.

Node.js does not automatically manage the number of workers, however. It is the application's responsibility to manage the worker pool based on its own needs.

Problems with Manually Managing Cluster
- Need to account for all the complexity associated with process managements
    - What happens if a worker process exits unexpectedly?
    - What if you need to restart all your workers?

PM2
    - A general Production Runtime and Process Manager with a build in Load Balancer
    - Do not need code related to master/worker processes
    - `pm2 start app.js -i 3`
        - `i` is the number of instances to create
        - can use `-i 0` to let PM2 detect the number of CPU cores on your computer
    - Can see application logs with `pm2 log`
    - Install
    `npm i -g pm2`
    `ln -s /usr/local/Cellar/node/10.9.0/bin/pm2 /usr/local/bin/`

pm2 start app.js -i 0
pm2 describe 0
pm2 list
pm2 monit
pm2 stop all
pm2 delete all