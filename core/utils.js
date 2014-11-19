/**
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

    utils.each(['String', 'Function', 'Array', 'Number', 'RegExp', 'Object', 'Date'], function(type){
       utils['is'+type] = function(obj) {
           return Object.prototype.toString.apply(obj) === '[object ' + type + ']';
       }
    });
    return utils;
});