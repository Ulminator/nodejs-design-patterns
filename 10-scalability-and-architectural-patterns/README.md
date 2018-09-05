Scaling Node.js Applications

JavaScript is a tool to be used with caution, the lack of type checking and its many gotchas can be an obstacle to the growth of the application, but with discipline and an accurate design, we can turn this into an advantage.

What the scale cube is?

Proposed in The Art of Scalability by Martin L. Abbott and Michael T. Fisher

x - Cloning
    First step typically. Inexpensive (in terms of development cost)
    Cloning the application n times and letting each instance handle 1/n of the workload.

y - Decomposing by service/functionality
    Creating different standalone applications, each with its own codebase, sometimes with its own dedicated database, or even with a separate UI.
    Has the biggest repercussions, not only on the architecture of an application, but also on the way it is managed from a development perspective.

z - Splitting by data partition
    Each instance is responsible for only a portion of the whole data.

How to scale by running multiple instances of the same application

How to leverage a load balancer when scaling an application

What a service registry is and how it can be used

How to design a microservice architecture out of a monolithic application

How to integrate a large number of services through the use of some simple architectural patterns