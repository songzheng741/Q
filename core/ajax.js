define(function(){
    var ajax = {};

    var xhr = (function() {
        var _xhr = null;
        try {
            _xhr = new XMLHttpRequest();
        } catch (e) {
            var versions = ['MSXML2.XMLHttp.6.0',
                            'MSXML2.XMLHttp.3.0',
                            'MSXML2.XMLHttp'];
            for (var i = 0, len = versions.length; i < len; i++) {
                try {
                    _xhr = new ActiveXObject(versions[i]);
                    return _xhr;
                } catch (e) {
                    continue;
                }
            }
        }
        if(!_xhr) {
            return _xhr;
        } else {
            throw new Error('Browser is not support Ajax!');
        }
        return _xhr;
    })();

    console.log(xhr);

});