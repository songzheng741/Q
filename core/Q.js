define([], function() {
    var Q = {};
    var DOC = self.document;

    /**
     *
     * @param callback
     */
    Q.domReady = function(callback) {
        /**
         * 兼容老版本FF
         */
        if (typeof callback !== 'function') {
            return;
        }
        if (!DOC.readyState) {
            var readyState = DOC.readyState = DOC.body ? "complete" : "loading";
        }
        /**
         * (1)文档已经加载完毕,直接执行
         * (2)其他
         *   (2-1)支持DOMContentLoaded,绑定DOMContentLoaded
         *   (2-2)IE特殊处理
         */
        if (DOC.readyState === 'complete') {
            setTimeout(callback());
        } else if (DOC.dispatchEvent) {
            DOC.addEventListener('DOMContentLoaded', function(){
                if (readyState) {
                    DOC.readyState = 'complete';
                }
                setTimeout(callback());
            }, false);
        } else {
            ieReady(callback);
        }

        function ieReady(callback) {
            try {
                //处理在iframe中引入的页面无法通过doScroll判断DOM知否加载完毕
                if (self !== top && self.document.readyState !== 'complete') {
                    setTimeout(function(){
                        ieReady.call(window, fn)
                    })
                } else if (self !== top && self.document.readyState === 'complete') {
                    setTimeout(callback());
                } else {
                    document.documentElement.doScroll('left');
                    setTimeout(callback());
                }
            } catch (e) {
                setTimeout(function(){
                    ieReady.call(window, callback)
                })
            }
        };
    }

    Q.query = function(selector, context) {

    }
    return Q;
});