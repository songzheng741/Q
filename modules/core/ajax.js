/**
 * ajax模块
 * @module ajax
 */

"use strict";
var Q = require('core/seed');
var utils = require('core/utils');

var ajax = Q.ajax = {};

var createXhrObject = (function() {
    var fnStr = 'XMLHttpRequest();';
    try {
        new ActiveXObject("Msxml2.XMLHTTP");
        fnStr = 'ActiveXObject("Msxml2.XMLHTTP");';
    } catch (e) {
        try {
            new ActiveXObject("Microsoft.XMLHTTP");
            fnStr = 'ActiveXObject("Microsoft.XMLHTTP");'
        } catch (e) {
        }
    }
    return new Function('return new ' + fnStr);
})();

function json2str(json) {
   var strArr = [];
   for (var i in json) {
       if (i == 'method' || i == 'timeout' || i == 'async' || i == 'dataType' || i == 'callback') {
           continue;
       }
       if (json[i] == undefined || json[i] == null) {
           continue;
       }

   }

}

module.exports = ajax;
