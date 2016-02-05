# Gali

JS utilities with FP flavor

### functions

#### Curry

takes a function and returns a function that's automatically curried
```
let curriedSum = curry((a,b,c) => a + b + c);
curriedSum(1)(2)(3) === 6; // true
```

#### Identity

takes a value and returns it
```
let obj = {};
identity(obj) === obj; // true
```

#### Compose

composes functions, executes each sequentially starting from the right most function

```
compose(a => a * 2, a => a + 1)(5) === 12
```

#### Map

maps over a collection, automatically curried

```
map(a => a * 2)([1,2,3]) // [2,4,6]
```

