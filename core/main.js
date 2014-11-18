require.config({
    baseUrl: 'core',
    path: {
        'Q': 'Q',
        'ajax': 'ajax',
        'utils': 'utils',
        'support': 'support'
    }

});


require(['support'], function(Q){
        var div = document.getElementById('aa');
        console.log(div);
})