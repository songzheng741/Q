require.config({
    baseUrl: '../../core',
    path: {
        'Q': 'Q',
        'support': 'support'
    }
});

require(['Q', 'support'], function(Q, support){
    Q.console(support);
});

function testHtml2DOM() {

}