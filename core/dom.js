define(['Q','utils'], function(Q, utils){
    "use strict";

    /**
     * dom工具模块
     * @module dom
     * @requires Q
     * @requires utils
     */
    var dom = Q.dom = {};

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

    var createSafeFragment = dom.createSafeFragment = function(document) {
        var list = html5NodeNames.split('|'),
            safeFrag = document.createDocumentFragment();

        while (list.length) {
            safeFrag.createElement(list.pop());
        }
        return safeFrag;
    }

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
        }
    }


    return Q;
});
