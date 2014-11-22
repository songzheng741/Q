define(['Q'], function(Q) {


    var dateUtils = Q.dateUtils = {

        /**
         * 获得某个月的第一天是星期几
         * @mthod getFirstDayOfMonth
         */
        getFirstDayOfMonth: function(date) {
            date.setDate(1);
            return date.getDay();
        }
    }

    return dateUtils;

});
