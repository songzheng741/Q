define(['Q','utils','support'], function(Q, utils, support){
    "use strict";

    /**
     * dom工具模块
     * @module dom
     * @requires Q
     * @requires utils
     */
    var dom = Q.dom = {};

    dom.getDocument = function(ele) {
        return ele.ownerDocument || ele;
    }

    /**
     * 返回两个节点的位置关系
     * @method position
     * @param node1
     * @param node2
     * @returns {number}
     */
    dom.position = function(node1, node2){
        // 如果两个节点是同一个节点
        if (node1 === node2) {
            return 0;
        }
        var node,
            parents1 = [node1],
            parents2 = [node2];
        node = node1;
        while (node = node.parentNode) {
            // 如果nodeB是nodeA的祖先节点
            if (node === node2) {
                return 10;
            }
            parents1.push(node);
        }
        node = node2;
        while (node = node.parentNode) {
            // 如果nodeA是nodeB的祖先节点
            if (node === node1) {
                return 20;
            }
            parents2.push(node);
        }
        /**
         * 反转路径，让其从html开始
         * @example parents1 [html,body,div#container,div#node1,div#node11]
         *          parents2 [html,body,div#container,div#node2,div#node21]
         */
        parents1.reverse();
        parents2.reverse();
        if (parents1[0] !== parents2[0]) {
            return 1;
        }
        var i = -1;
        /**
         * 找出包含node1,node2最近的共同祖先的兄弟节点
         */
        while (i++, parents1[i] === parents2[i]) {
        }
        node1 = parents1[i];
        node2 = parents2[i];
        /**
         * 判断包含node1,node2兄弟节点的位置关系
         */
        while (node1 = node1.nextSibling) {
            if (node1 === node2) {
                return 4
            }
        }
        return  2;
    }

    var html5NodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer" +
           "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video";
    var rhtml = /<|&#?\w+;/;

    /**
     * @method createSafeFragment
     * 创建一个可以正确渲染html标签的DocumentFragment
     * @return {DocumentFragment}
     */
    var createSafeFragment = dom.createSafeFragment = function() {
        var list = html5NodeNames.split('|'),
            safeFrag = document.createDocumentFragment();
        /**
         * IE <= 8 DocumentFragment才有createElement方法
         */
        if (safeFrag.createElement) {//通过创建Html标签,教会IE<8的游览器学会渲染html5元素
            while ( list.length ) {
                safeFrag.createElement(list.pop());
            }
        }
        return safeFrag;
    }

    var wrapMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>","</object>"],
        thead: [1, "<table>","</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        /**
         * 包裹一个字符紧挨着的div(X<div>{script|style|link|htmlTags})可以让IE6-8可以正确序列化script、style、link或者任何html5标签
         */
        _default: support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    }
    wrapMap["optgroup"] = wrapMap.option;;
    wrapMap["tbody"] = wrapMap["tfoot"] = wrapMap["colgroup"] = wrapMap["caption"] = wrapMap.thead;
    wrapMap["th"] = wrapMap.td;

    var rtagName = /<([\w:]+)>/;
    /**
     * 将html字符串转换为DOM节点
     * @method html2DOM
     * @param {string} htmlStr html字符串
     * @returns {Node}
     */
    dom.html2DOM = function(htmlStr) {
        var DOC = self.document;
        if (typeof htmlStr !== 'string') {
            return null;
        } else if (!rhtml.test(htmlStr)){ //没有标签或特征直接生成textNode
            return DOC.createTextNode(htmlStr);
        /**
         * 转化html字符串为dom节点
         * (1)对有父类的元素进行包裹
         * (2)对自关闭标签进行修复
         * (3)用innerHTML将html字符串转化为DOM节点
         * (4)去除包括的父元素
         * (5)修复IE的bug
         */
        } else {
            var fragment = createSafeFragment();
            var tagName = (rtagName.exec(htmlStr) || ['', ''])[1],
                wrapper = wrapMap[tagName] || wrapMap._default;

        }
    }


    return Q;
});
