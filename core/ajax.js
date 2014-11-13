/**
 * @module ajax ajax模块
 */
define(['utils'], function(utils){

    "use strict";

    var ajax = {};

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
           if (j == 'method' || j == 'timeout' || j == 'async' || i == 'dataType' || i == 'callback') {
               continue;
           }
           if (json[i] == undefined || json[i] == null) {
               continue;
           }

       }

   }

   /**
    * @export 导出ajax模块
    */
   return ajax;
})