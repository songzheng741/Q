var UNFULFILLED = 'unfulfilled',
    FULFULLED = 'fulfilled',
    FAILED = 'failed';

function Promise() {
    this.status = UNFULFILLED;
    this.called = false;
    this.callbacks = [];
    this.result = null;
}

Promise.prototype.resolve = function(result) {

    while(this.callbacks.length) {
        var callback = this._getHandlerByType('successHandler');
        var _result = callback.call(this, this.result || result);
        if (_result) {
            if (_result instanceof Promise) {
                this._flowToOtherPromise(_result);
            } else {
                this.result = _result;
            }
        } else {
            this.result = result;
        }

    }

    this.status = FULFULLED;
}

Promise.prototype.reject = function(reason) {

    while(this.callbacks.length) {
        var callback = this._getHandlerByType('errorHandler');
        if (callback) {
            var result = callback.call(this, reason);
            if (result instanceof Promise) {
                this._flowToOtherPromise(result);
            } else {
                this.result = result;
            }
        } else {
            continue;
        }
    }

    this.status = FAILED;
}

Promise.prototype._flowToOtherPromise = function(promise){
    for (var i = 0; i < this.callbacks.length; i++) {
        var fn = this.callbacks[i];
        promise.then(fn.successHandler,fn.errorHandler);
    }
    this.callbacks = [];
}

Promise.prototype.then = function(successHandler, errorHandler) {

    this.callbacks.push({
        successHandler: successHandler,
        errorHandler: errorHandler
    });
    if (this.status === FULFULLED) {
        this.resolve(this.result);
    }
    if (this.status === FAILED) {
        this.reject(this.result);
    }
    return this;
}

Promise.prototype._getHandlerByType = function(type) {

    return this.callbacks.shift()[type];

}

module.exports = Promise;