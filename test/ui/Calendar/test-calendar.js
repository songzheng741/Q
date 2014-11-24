require.config({
    'baseUrl': '../../../core',
    'paths': {
        'Q': 'Q',
        'ajax': 'ajax',
        'utils': 'utils',
        'support': 'support',
        'dom': 'dom',
        'Calendar': '../widget/Calendar/Calendar'
    }
});
require(['Q', 'Calendar'], function(Q, Calendar){
    Q.console(Calendar);
});