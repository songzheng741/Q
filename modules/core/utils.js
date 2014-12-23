/**
 * 基础工具模块
 * @module utils
 */
var Q = require('core/seed');
var utils = Q.utils = {};
/**
 * 迭代对象或数组
 * @method each
 * @param {Object|Array} obj 要迭代的参数
 * @param {Function} callback 每次迭代执行的回调函数
 * @param {Object} context 执行回调函数的上下文
 */
utils.each = function(obj, callback, context) {
    if (!obj) {
        return;
    }
    if (!context) {
        context = self;
    }
    if (obj.length == +obj.length) {// obj.length === +obj.length 判断length是否为数字
        for (var i = 0, len = obj.length; i < len; i++) {
            if (callback.call(context, obj[i], i, obj) === false) {
                return false;
            }
        }
    } else {
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                if (callback.call(context, obj[attr], attr, obj) === false) {
                    return false;
                }
            }
        }
    }
}
/**
 * @lends utils
 * 判断参数是否为字符串
 * @method isString
 * @param  {*} obj
 * @return {boolean}
 */
utils.isString = function(obj){};
/**
 * 判断参数是否为函数
 * @member utils
 * @method isFunction
 * @param  {*} obj
 * @return {boolean}
 */
utils.isFunction = function(obj){};
/**
 * 判断参数是否为数组
 * @method isArray
 * @param  {*} obj
 * @return {boolean}
 */
utils.isArray = function(obj){};
/**
 * 判断参数是否为数字
 * @method isNumber
 * @param  {*} obj
 * @return {boolean}
 */
utils.isArray = function(obj){};
/**
 * 判断参数是否为正则
 * @method isRegExp
 * @param  {*} obj
 * @return {boolean}
 */
utils.isRegExp = function(obj){};
/**
 * 判断参数是否为对象
 * @method isObject
 * @param  {*} obj
 * @return {boolean}
 */
utils.isObject = function(obj){};
/**
 * 判断参数是否为日期
 * @method isDate
 * @param  {*} obj
 * @return {boolean}
 */
utils.each(['String', 'Function', 'Array', 'Number', 'RegExp', 'Object', 'Date'], function(type){
   utils['is'+type] = function(obj) {
       return Object.prototype.toString.apply(obj) === '[object ' + type + ']';
   }
});
/**
 * 判断是否为Window对象
 * @method isWindow
 * @param  {*} obj
 * @return {boolean}
 */
utils.isWindow = function(obj) {
    return obj != null && obj == obj.window;
}

utils.numberify = function(str) {
    var c = '';
    str.replace(/\d/g, function(m){
        c += m;
    })
    return c;
}

utils.keys = function(obj) {
    var ret = [];
    for (var key in obj) {
        ret.push(key);
    }
    return ret;
}

utils.mix = function(to, from) {
    for (var k in from) {
        to[k] = from[k];
    }
    return to
}

utils.getSuffix = function(str) {
    var m = str.match(/\.(\w+)$/);
    if (m) {
        return m[1];
    }
}

var map = Array.prototype.map
utils.map = map ? function(arr, fn, context) {

    return map.call(arr, fn, context || this)

} : function(arr, fn, context) {
    var ret = new Array(arr.length);
    for (var i = 0; i < arr.length; i++) {
        var el = typeof arr === 'string' ? arr.charAt(i) : arr[i];
        if (el || i in arr) {
            ret[i] = fn.call(context || this, el, i, arr);
        }
    }
    return ret;
}

module.exports = utils;
