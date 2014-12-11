var UNFULFILLED = 'unfulfilled',
    FULFULLED = 'fulfilled',
    FAILED = 'failed';
var id = 0;
function Promise() {
    this.status = UNFULFILLED;
    this.successHandler = null;
    this.errorHandler = null;
    this.prev = null;
    this.next = null;
    this.id = id++;
    this.result;
}

Promise.prototype.resolve = function(result) {
    var next = this;
    while(next) {
        this.result = next.successHandler(result || next.prev.result);
        if (result instanceof Promise) {
            console.log(this.id)
            result = next;
            result.prev.status = FULFULLED;
            result.prev = null;
        }
        next = next.next;
    }
}

Promise.prototype.reject = function(reason) {


}

Promise.prototype.then = function(successHandler, errorHandler) {
    this.successHandler = successHandler;
    this.errorHandler = errorHandler;

    var next = new Promise();
    this.next = next;
    next.prev = this;

    return next;
}


module.exports = Promise;