/**
 * 基础工具模块
 * @module utils
 */
define(['Q'], function(Q){
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


    return utils;
});