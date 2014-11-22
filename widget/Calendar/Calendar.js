define(['Q'], function(Q){

    function Calendar(opt) {
        if (!opt || !opt.el) {
            Q.console('no selected element');
            return;
        }
        this.init(opt);
    }

    Calendar.prototype.init = function(opt) {

    }

    return Calendar;
});