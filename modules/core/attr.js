'use strict';
var Q = require('core/seed');

var attr = Q.attr = {};
var rBoolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
    rFocusable = /^(?:button|input|object|select|textarea)$/i,
    rClickable = /^a(?:rea)?$/i;
var attrHooks = {
    tabindex: {
        get: function(el) {
            var attributeNode = el.getAttributeNode('tabindex');
            return attributeNode && attributeNode.value ?
                    parseInt(attributeNode.value, 10) :
                        rFocusable.test(el.nodeName) || rClickable.test(el.nodeName) && el.href ?
                            0 : undefined;
        }
    }
}

var propFix = {
    hidefocus: 'hideFocus',
    tabindex: 'tabIndex',
    readonly: 'readOnly',
    'for': 'htmlFor',
    'class': 'className',
    maxlength: 'maxLength',
    cellspacing: 'cellSpacing',
    cellpadding: 'cellPadding',
    rowspan: 'rowSpan',
    colspan: 'colSpan',
    usemap: 'useMap',
    frameborder: 'frameBorder',
    contenteditable: 'contentEditable'
};
var boolHook = {
    get: function(el, name) {
        return el[propFix[name] || name] ? name : undefined;
    }
}

module.exports = attr;

