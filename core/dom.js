define(['utils'], function(utils){
    var dom = {};

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


});
