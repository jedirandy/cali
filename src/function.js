export function identity(arg) {
    return arg;
}

export function curry(fn) {
    if (fn.length < 1)
        return fn;
    let curried = (...args) => {
        if (fn.length <= args.length)
            return fn.apply(null, args);
        else
            return curried.bind(null, ...args);
    }
    return curried;
}

export function compose(...fns) {
    return arg => {
        return fns.reduceRight((acc,fn) => fn.call(null, acc), arg);
    }
}

export function map(...args) {
    return curry((f, list) => {
        let result = new Array(list.length);
        for (let i = 0; i < list.length; ++i) {
            result[i] = f.call(null, list[i]);
        }
        return result;
    })(...args);
}