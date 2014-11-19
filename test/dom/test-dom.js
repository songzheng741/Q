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

require(['dom'], function(domUtils){
    /* testHtml2DOM start*/
    var htmlStr = [ '<div><span></span></div>'
                  ].join('');
    var option = domUtils.html2DOM(htmlStr);
    /* testHtml2DOM end*/
});

function testHtml2DOM() {

}