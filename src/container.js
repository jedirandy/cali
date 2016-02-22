import * as functions from './function';
export class Functor {
    constructor(value) {
        this._value = value;
    }
    fmap(f) {
        if (typeof this._value === 'function')
            return functions.compose(f, this._value);
        else
            return new Functor(f.call(null, this._value));
    }
    get value() {
        return this._value;
    }
}

export class Applicative extends Functor {
    constructor(value) {
        if (typeof value === 'function')
            super(functions.curry(value));
        else
            super(value);
    }
    liftA(a) {
        return new Applicative(this._value.call(null, a.value));
    }
}

export class Monad extends Applicative {
    constructor(value) {
        super(value);
    }
    bind(f) {
        return f(this.value);
    }
    liftM(f) {
        return this.bind(f);
    }
}

// Maybe
export class _Just extends Monad {
    toString() {
        return `Just(${this.value})`;
    }
}

export function Just(value) {
    return new _Just(value);
}

export class _Nothing extends Monad {
    bind() {
        return this;
    }
    toString() {
        return `Nothing`;
    }
}

export const Nothing = new _Nothing();

export class _List extends Monad {
    bind(f) {
    }
}