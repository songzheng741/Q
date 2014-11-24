define(['Q'], function(Q) {

    var rLeftWhite = /^\s+/;
    var rRightWhite = /\s+$/;
    var rSimpleSelector = //;

    Q.query = function(selector, context) {
        if (!context) {
            context = document;
        }
        if (context && context.querySelectorAll) {
            return context.querySelectorAll(selector);
        }
    }

});