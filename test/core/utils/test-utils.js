require.config({
    baseUrl: '../../core',
    path: {
        'Q': 'Q',
        'ajax': 'ajax',
        'utils': 'utils',
        'support': 'support',
        'dom': 'dom'
    }
});

require(['utils'], function(utils){
    console.log(utils.isString('abc'));
});

function testHtml2DOM() {

}