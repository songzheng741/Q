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
    var htmlStr = '   <table><tr><td><select><option value="22">111</option><option value="22">111</option></select></td></tr></table>';
    var fragment = domUtils.html2DOM(htmlStr);
    document.body.appendChild(fragment);
    alert(document.getElementsByTagName('table').length);
    /* testHtml2DOM end*/
});

function testHtml2DOM() {

}