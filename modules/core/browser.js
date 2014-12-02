'use strict';
var Q = require('core/seed');
var browser = Q.browser = (function(){
    var agent = navigator.userAgent.toLowerCase(),
        opera = window.opera;
    /**
     * 检测当前游览器
     * @memberof Q#
     * @module browser
     * @requires Q
     */
    var browser = {
        /**
         * 检测当前游览器是否为IE
         * @member {boolean} ie
         * @example
         * if (Q.browser.ie) {
         *     alert('IE');
         * }
         */
        ie: /(msie\s|trident.*rv:)([\w.]+)/.test(agent),
        /**
         * 检测当前游览器是否为opera
         * @member {boolean} opera
         * @example
         * if (Q.browser.opera) {
         *     alert('opera');
         * }
         */
        opera: (!!opera && opera.version),
        /**
         * 检测当前游览器内核是否是否为webkit
         * @member {boolean} webkit
         * @example
         * if (Q.browser.webkit) {
         *     alert('webkit');
         * }
         */
        webkit: (agent.indexOf(' applewebkit/') > -1),
        /**
         * 检测当前浏览器是否是运行在mac平台下
         * @property {boolean} mac
         * @example
         * if ( UE.browser.mac ) {
         *     console.log( '当前浏览器运行在mac平台下' );
         * }
         * ```
         */
        mac: (agent.indexOf('macintosh') > -1),
        /**
         * @property {boolean} quirks 检测当前浏览器是否处于“怪异模式”下
         * @example
         * ```javascript
         * if ( UE.browser.quirks ) {
         *     console.log( '当前浏览器运行处于“怪异模式”' );
         * }
         * ```
         */
        quirks: (document.compatMode == 'BackCompat')
    }

    return browser;
})();

/**
 * @exports Q.browser
 */
module.exports = browser;
