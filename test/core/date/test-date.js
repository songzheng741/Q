/**
 * Created by songzheng01 on 2014/11/22.
 */
require.config({
    baseUrl: '../../../core',
    paths: {
        'Q': 'Q',
        'ajax': 'ajax',
        'utils': 'utils',
        'support': 'support',
        'dom': 'dom',
        'date': 'date'
    }
});

require(['date'], function(dateUtils){

    /* test html2DOM method start*/
    console.log(dateUtils.getFirstDayOfMonth(new Date()));
    /* test html2DOM method end*/
});
