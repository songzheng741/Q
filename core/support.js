define(['Q'], function(Q){
    Q.support = (function(){
        var div = document.createElement('div');
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

        /**
         * 一些怪癖检查模块
         * @module support
         */
        var support = {
            /**
             * 是否会保留前导空白
             * @member {boolean} leadingWhitespac
             */
            leadingWhitespac: (div.firstChild.nodeType === 3),
            /**
             * 是否可以正确序列化link、script、style
             */
            htmlSerialize: !!div.getElementsByTagName( "link" ).length
        }
        return support;
    })();

    return Q;
})
