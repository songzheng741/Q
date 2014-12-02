"use strict";
var Q = require('core/seed');

var support = Q.support = (function(){

    var div = document.createElement('div');
    div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    var div1 = document.createElement('div');
    div1.appendChild(document.createComment(''));

    /**
     * 一些怪癖检查模块
     * @module support
     */
    var support = {
        /* 怪癖检查 */
        /**
         * 是否会保留前导空白
         * @member {boolean} leadingWhitespac
         */
        leadingWhitespac: (div.firstChild.nodeType === 3),
        /**
         * 是否可以正确序列化link、script、style和html5标签
         * @member {boolean} htmlSerialize
         */
        htmlSerialize: !!div.getElementsByTagName( "link" ).length,
        /**
         * IE<=7会为空table添加tbody
         * @member {boolean} autoAddtbodys
         */
        autoAddtbody: !!div.getElementsByTagName( "tbody" ).length,
        /* 怪癖检查 */

        /* 功能检查 */
        /**
         * IE>=10 or 其他现代游览器
         * @member {boolean} classList
         */
        classList: !!div.classList,
        /**
         * getElementsByTagName时
         * 会把comment也放进结果集里
         * @member {boolean} getCommentNodes
         */
        getCommentNodes: !!div1.getElementsByTagName('*')
        /* 功能检查 */
    }
    return support;
})();

module.exports = support;
