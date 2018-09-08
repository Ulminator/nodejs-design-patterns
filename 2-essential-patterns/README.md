Callback Pattern
    - Materialization of the handlers of the reactor pattern.
    - Closures are also ideal constructs for implementing callbacks. (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)

Resolving Algorithm
    - Issue arises when dependencies in turn depend on a shared dependency, but require different versions.
    - Node loads a different version of the module depending on where the module is loaded.

Module Cache
    - Each module is only loaded and evaluated the first time it is required and returns the cached version afterwards.
        - It makes it possible to have cycles within module dependencies.
        - Gurantees to some extent that the same instance is always returned when requiring the same module in a given package.

Monkey Patching - Using a module to modify other modules or objects in the global scope.

Observer Pattern
    - Observer defines an object (called subject), which can notify a set of observers (or listeners), when a change in its state happens.
    - Difference between Callback Pattern
        - Subject can actually notify multiple observers
    - EventEmitter Class vs. Callbacks
        - When a result must be returned in an synchronous way -> Callback
        - When there is a need to communicate that something has happened -> EventEmitter