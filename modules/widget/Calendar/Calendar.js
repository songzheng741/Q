"use strict";

var Q = require('seed');
function Calendar(opt) {
    if (!opt || !opt.el) {
        Q.console('no selected container element');
        return;
    }
    var tmpl = [
        '<div class="q-ui-calendar">',
            '<div class="q-ui-calendar-header">',
            '</div>',
            '<div class="q-ui-calendar-body">',
            '</div>',
            '<div class="q-ui-calendar-footer">',
            '</div>',
        '</div>'
    ]
    this.init(opt);
}

Calendar.prototype.init = function(opt) {
    var input = document.document.getElementById(opt.el);
}

module.exports = Calendar;