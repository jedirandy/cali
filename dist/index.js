(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.cali = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._List = exports.Nothing = exports._Nothing = exports._Just = exports.Monad = exports.Applicative = exports.Functor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.Just = Just;

var _function = require('./function');

var functions = _interopRequireWildcard(_function);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Functor = exports.Functor = function () {
    function Functor(value) {
        _classCallCheck(this, Functor);

        this._value = value;
    }

    _createClass(Functor, [{
        key: 'fmap',
        value: function fmap(f) {
            if (typeof this._value === 'function') return functions.compose(f, this._value);else return new Functor(f.call(null, this._value));
        }
    }, {
        key: 'value',
        get: function get() {
            return this._value;
        }
    }]);

    return Functor;
}();

var Applicative = exports.Applicative = function (_Functor) {
    _inherits(Applicative, _Functor);

    function Applicative(value) {
        _classCallCheck(this, Applicative);

        if (typeof value === 'function') {
            ;

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Applicative).call(this, functions.curry(value)));
        } else {
            ;

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Applicative).call(this, value));
        }return _possibleConstructorReturn(_this);
    }

    _createClass(Applicative, [{
        key: 'liftA',
        value: function liftA(a) {
            return new Applicative(this._value.call(null, a.value));
        }
    }]);

    return Applicative;
}(Functor);

var Monad = exports.Monad = function (_Applicative) {
    _inherits(Monad, _Applicative);

    function Monad(value) {
        _classCallCheck(this, Monad);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Monad).call(this, value));
    }

    _createClass(Monad, [{
        key: 'bind',
        value: function bind(f) {
            return f(this.value);
        }
    }, {
        key: 'liftM',
        value: function liftM(f) {
            return this.bind(f);
        }
    }]);

    return Monad;
}(Applicative);

// Maybe


var _Just = exports._Just = function (_Monad) {
    _inherits(_Just, _Monad);

    function _Just() {
        _classCallCheck(this, _Just);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_Just).apply(this, arguments));
    }

    _createClass(_Just, [{
        key: 'toString',
        value: function toString() {
            return 'Just(' + this.value + ')';
        }
    }]);

    return _Just;
}(Monad);

function Just(value) {
    return new _Just(value);
}

var _Nothing = exports._Nothing = function (_Monad2) {
    _inherits(_Nothing, _Monad2);

    function _Nothing() {
        _classCallCheck(this, _Nothing);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_Nothing).apply(this, arguments));
    }

    _createClass(_Nothing, [{
        key: 'bind',
        value: function bind() {
            return this;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return 'Nothing';
        }
    }]);

    return _Nothing;
}(Monad);

var Nothing = exports.Nothing = new _Nothing();

var _List = exports._List = function (_Monad3) {
    _inherits(_List, _Monad3);

    function _List() {
        _classCallCheck(this, _List);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_List).apply(this, arguments));
    }

    _createClass(_List, [{
        key: 'bind',
        value: function bind(f) {}
    }]);

    return _List;
}(Monad);

},{"./function":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.identity = identity;
exports.curry = curry;
exports.compose = compose;
exports.map = map;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function identity(arg) {
    return arg;
}

function curry(fn) {
    if (fn.length < 1) return fn;
    var curried = function curried() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        if (fn.length <= args.length) return fn.apply(null, args);else return function () {
            for (var _len2 = arguments.length, _args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                _args[_key2] = arguments[_key2];
            }

            return curried.call.apply(curried, [null].concat(_toConsumableArray(args.concat(_args))));
        };
    };
    return curried;
}

function compose() {
    for (var _len3 = arguments.length, fns = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        fns[_key3] = arguments[_key3];
    }

    return function (arg) {
        return fns.reduceRight(function (acc, fn) {
            return fn.call(null, acc);
        }, arg);
    };
}

function map() {
    return curry(function (f, list) {
        var result = new Array(list.length);
        for (var i = 0; i < list.length; ++i) {
            result[i] = f.call(null, list[i]);
        }
        return result;
    }).apply(undefined, arguments);
}

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.map = exports.compose = exports.curry = exports.identity = exports.Nothing = exports.Just = exports.Monad = exports.Functor = undefined;

var _container = require('./container');

var _function = require('./function');

exports.Functor = _container.Functor;
exports.Monad = _container.Monad;
exports.Just = _container.Just;
exports.Nothing = _container.Nothing;
exports.identity = _function.identity;
exports.curry = _function.curry;
exports.compose = _function.compose;
exports.map = _function.map;

},{"./container":1,"./function":2}]},{},[3])(3)
});
//# sourceMappingURL=index.js.map
