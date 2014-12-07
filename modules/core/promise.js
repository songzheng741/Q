var UNFULFILLED = 'unfulfilled',
    FULFULLED = 'fulfilled',
    FAILED = 'failed';

function Promise() {
    this.status = UNFULFILLED;
    this.called = false;
    this.callbacks = [];
}

Promise.prototype.resolve = function(result) {

    while(this.callbacks.length) {
        var callback = this._getHandlerByType('successHandler');
        result = callback.call(this, result);
        if (result instanceof Promise) {
           for (var i = 0; i < this.callbacks.length; i++) {
               var fn = this.callbacks[i];
               result.then(fn.successHandler,fn.errorHandler);
               this.callbacks = [];
           }
        }
    }

    this.status = FULFULLED;
}
Promise.prototype.reject = function(reason) {


    this.status = FAILED;
}
Promise.prototype.then = function(successHandler, errorHandler) {

    this.callbacks.push({
        successHandler: successHandler,
        errorHandler: errorHandler
    });
    return this;
}
Promise.prototype._getHandlerByType = function(type) {

    return this.callbacks.shift()[type];

}

module.exports = Promise;