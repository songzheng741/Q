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

    /* test html2DOM method start*/
    var htmlStr = '   <table><tr><td><select><option value="22">111</option><option value="22">111</option></select></td></tr></table>';
    var fragment = domUtils.html2DOM(htmlStr);
    document.body.appendChild(fragment);
    /* test html2DOM method end*/

    /* test index method start */
    var index = domUtils.index(document.getElementById('a'), true);
    console.log('在父类位置:'+index);
    /* test index method end */

    /* test hasClass method start */
    var div = document.createElement('div');
    div.className = 'a b c';
    var hasClass = domUtils.hasClass(div, 'a');
    console.log(hasClass);
    hasClass = domUtils.hasClass(div, 'd');
    console.log(hasClass);
    /* test hasClass method end */

    /* test addClass method start */
    domUtils.addClass(div, 'a');
    console.log(div.className );
    hasClass = domUtils.addClass(div, 'd');
    console.log(div.className );
    /* test hasClass method end */

    /* test removeClass method start */
    domUtils.removeClass(div, 'e');
    console.log(div.className );
    hasClass = domUtils.removeClass(div, 'a');
    console.log(div.className );
    /* test removeClass method end */

});

function testHtml2DOM() {

}