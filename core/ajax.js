define(['utils'], function(utils){

    var createXhrObject = (function(){
        var fn = 'XMLHttpRequest()';
        try {
            new ActiveXObject('Msxml2.XMLHTTP');
            fn = "ActiveXObject('Msxml2.XMLHTTP')";
        } catch (e) {
            try {
                new ActiveXObject('Microsoft.XMLHTTP');
                fn = "ActiveXObject('Microsoft.XMLHTTP')";
            } catch (e) {
            }
        }
        return new Function('return new ' + fn);
    })();

    var xhr = createXhrObject();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                console.log(xhr.getAllResponseHeaders());
            }
        }
    }
    xhr.open('get', 'core/test.json', true);
    xhr.send(null);

});