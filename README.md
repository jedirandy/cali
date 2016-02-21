# Gali

JS utilities with FP flavor

### Functions

#### Curry

takes a function and returns a function that's automatically curried
```js
let curriedSum = curry((a,b,c) => a + b + c);
curriedSum(1)(2)(3) === 6; // true
```

#### Identity

takes a value and returns it
```js
let obj = {};
identity(obj) === obj; // true
```

#### Compose

composes functions, executes each sequentially starting from the right most function

```js
compose(a => a * 2, a => a + 1)(5) === 12
```

#### Map

maps over a collection, automatically curried

```js
map(a => a * 2)([1,2,3]) // [2,4,6]
```

### Functors, Monads

#### Maybe

a container may have a value or nothing
```js
Just(2).bind(x => Just(2 * x)) // Just(4)
Just(2).bind(x => Nothing).bind(x => Just(x)) // Nothing
```

