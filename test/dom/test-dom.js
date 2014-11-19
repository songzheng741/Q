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

require(['dom'], function(Q){
    var domUtils = Q.dom;
    /* testHtml2DOM start*/
    var htmlStr = [ '<option></option>',
                    '<script>alert(1);</script>'
                  ].join('');
    domUtils.html2DOM(htmlStr);
    /* testHtml2DOM end*/
});

function testHtml2DOM() {

}