/**
 * 同源不同页之间通信工具方法
 * 发送方页面:
 * Message.postMessage('http://localhost:63342/my/Q/core/to.html',Math.random()*1000);
 * 接收方页面:
 * Message.receiveMessage('http://localhost:63342/my/Q/test.html', function(msg){
 *      alert(msg);
 * });
 * @author songzheng
 * @version 0.0.1
 */
;(function(w){
    var DOC = self.document;
    var STORENAME = "messageQ";
    var scriptTag = 'script';

    var store = {};
    store.set = function(key, value) {};
    store.get = function(key){};
    store.remove = function(key){};

    if (!w.store) {
        w.store = store;
    }

    var supportLocalStorage = false;
    var supportUserData = false;
    (function(){
        try {
            if (w.localStorage && w['localStorage']) {
                supportLocalStorage = true;
            }
            if(DOC.documentElement.addBehavior) {
                supportUserData = true;
            }
        } catch (e) {
        }
    })();

    var hasOwn = Object.prototype.hasOwnProperty;
    function isJSObject(obj) {
        try {
            if (obj.constructor && hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return true;
            }
        } catch (e) {
            return false;
        }
        return false;
    }

    var storage,
        storageOwner,
        storageContainer;
    if (supportUserData) {
        storage = (function() {
            var storeDIV;
            try {
                //userData可以跨目录的关键
                //@see method aopIEUserData
                storageContainer = new ActiveXObject('htmlfile')
                storageContainer.open();
                storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>');
                storageContainer.close();
                storageOwner = storageContainer.w.frames[0].document;
                storeDIV = storageOwner.createElement('div');
            } catch(e) {
                storeDIV = DOC.createElement('div');
                storageOwner = DOC;
            }
            return storeDIV;
        })();
    } else if (supportLocalStorage) {
        storage = localStorage;
    } else {
        throw new Error('Your browser not support message.');
    }

    /**
     * 提取出setAttrbute,getAttribute,removeAttribute
     * 公共部分作为切面
     * @param func set,get,remove
     * @param args
     */
    function aopIEUserData(func, args) {
        storageOwner.appendChild(storage)
        storage.addBehavior('#default#userData')
        storage.load(STORENAME);

        func.apply(storage, args);

        storageOwner.removeChild(storage);
    }

    function setFunc(key, value) {
        if (!value) {
            return removeFunc(key);
        }
        if (supportUserData) {
            return function(key, value) {
                if (isJSObject(value)) {
                    value = JSON.stringify(value);
                }
                aopIEUserData(function(){
                    storage.setAttribute(key, value);
                    storage.save(STORENAME);
                }, [key, value]);
            }
        } else if (supportLocalStorage) {
            return function(key, value) {
                if (isJSObject(value)) {
                    value = JSON.stringify(value);
                }
                storage.setItem(key, value);
            }
        }
    }

    var objStr = /^\{/;
    function getFunc() {
        if (supportUserData) {
            return function(key) {
                var r;
                aopIEUserData(function(){
                    r = storage.getAttribute(key);
                }, [key]);
                if (objStr.test(r)) {
                    try {
                        r = JSON.parse(r);
                    } catch (e) {};
                }
                return r;
            }
        } else if (supportLocalStorage) {
            return function(key) {
                var r = storage.getItem(key);
                if (objStr.test(r)) {
                    try {
                        r = JSON.parse(r);
                    } catch (e) {};
                }
                return r;
            }
        }
    }
    function removeFunc() {
        if(supportUserData) {
            return function(key) {
                aopIEUserData(function(){
                    storage.removeAttribute(key);
                    storage.save(STORENAME);
                }, [key]);
            }
        } else if (supportLocalStorage) {
            return function(key) {
                storage.removeItem(key);
            }
        }
    }

    store.set = function(key ,value) {
        setFunc(key, value)(key ,value);
    };
    store.get = function(key) {
        return getFunc()(key);
    }
    store.remove = function(key) {
        removeFunc()(key);
    }

    var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
    function fixUrl(key) {
        return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___')
    }

    var Message = {
        last:'',
        postMessage: function(url, msg) {
            var sender = fixUrl(self.location.href);
            if (msg && msg.toString().length < 100) {
                if (store) {
                    var packmsg = {"msg": msg, "to": fixUrl(url), "timeStamp": new Date().getTime()};
                    store.set(sender, packmsg);
                }
            } else {
                throw new Error('send message must be lt 100 character');
            }
        },
        receiveMessage: function(url, callback) {
            if (supportUserData) {
                url = fixUrl(url);
                if (!Message.timer) {
                    Message.timer = setInterval(function(){
                        if (!store.get(url) || store.get(url).to !== fixUrl(self.location.href)) {
                            return;
                        }
                        var msg = store.get(url).msg;
                        if (msg !== Message.last) {
                            callback.call(this, msg);
                        }
                        Message.last = msg;
                    }, 200);
                    self.onunload = function(){
                        clearInterval(Message.timer);
                        Message.timer = '';
                    }
                }
            } else {
                function getMsg(e) {
                    url = fixUrl(url);
                    if (store.get(url).to !== fixUrl(self.location.href)) {
                        return;
                    }
                    callback.call(this, store.get(url).msg);
                }
                if (self.attachEvent) {
                    self.attachEvent("onstorage", getMsg);
                }
                if (self.addEventListener) {
                    self.addEventListener("storage", getMsg, false);
                }
            }
        }
    }
    if (!w.Message) {
        w.Message = Message;
    }



    /**
     * json2 by douglas crockford
     * @link https://github.com/douglascrockford/JSON-js/edit/master/json2.js
     */
    if (typeof JSON !== 'object') {
        JSON = {};
    }

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate())      + 'T' +
                f(this.getUTCHours())     + ':' +
                f(this.getUTCMinutes())   + ':' +
                f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
                Boolean.prototype.toJSON = function () {
                    return this.valueOf();
                };
    }

    var cx,
        escapable,
        gap,
        indent,
        meta,
        rep;


    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {
        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

        if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

        switch (typeof value) {
            case 'string':
                return quote(value);

            case 'number':

                return isFinite(value) ? String(value) : 'null';

            case 'boolean':
            case 'null':

                return String(value);

            case 'object':

                if (!value) {
                    return 'null';
                }

                gap += indent;
                partial = [];

                if (Object.prototype.toString.apply(value) === '[object Array]') {

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }


                    v = partial.length === 0
                        ? '[]'
                        : gap
                        ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                        : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }


                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {


                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }


                v = partial.length === 0
                    ? '{}'
                    : gap
                    ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                    : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }


    if (typeof JSON.stringify !== 'function') {
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        };
        JSON.stringify = function (value, replacer, space) {

            var i;
            gap = '';
            indent = '';

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }


            } else if (typeof space === 'string') {
                indent = space;
            }


            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

            return str('', {'': value});
        };
    }



    if (typeof JSON.parse !== 'function') {
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        JSON.parse = function (text, reviver) {

            var j;

            function walk(holder, key) {

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

            if (/^[\],:{}\s]*$/
                .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                    .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                j = eval('(' + text + ')');

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

            throw new SyntaxError('JSON.parse');
        };
    }

})(self);
