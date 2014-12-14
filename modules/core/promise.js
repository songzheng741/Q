var UNFULFILLED = 'unfulfilled',
    FULFULLED = 'fulfilled',
    FAILED = 'failed';
function Promise() {
    this.status = UNFULFILLED;
    this.successHandler = null;
    this.errorHandler = null;
    this.next = null;
    this.prev = null;
    this.result = null;
}

Promise.prototype.resolve = function(result) {
    this.status = FULFULLED;
    try {
        result = this.successHandler(result);
        this._complete(result);
        this.result = result;
    } catch (e) {
        console.error(e);
        this.status = FAILED;
        this.next && this.reject(e);
        this.result = e;
    }
}

Promise.prototype.reject = function(reason) {
    this.status = FAILED;
    if (!this.errorHandler && this.next) {
        this.next.reject(reason);
    } else if (this.next){
        var result = this.errorHandler(reason);
        this.status = FAILED;
        this._complete(result);
    }
}

Promise.prototype._complete = function(result) {
    if (result instanceof Promise) {
        this.status = FULFULLED;
        result.successHandler = this.next.successHandler;
        result.errorHandler = this.next.errorHandler;
        result.next = this.next.next;
    } else if (!this.next || !this.next.successHandler) {
        this.status = FULFULLED;
        this.result;
    } else {
        this.next && this.next.resolve(result);
    }
}

Promise.prototype.then = function(successHandler, errorHandler) {
    if (this.prev) {
        if (this.isRejected()) {
            errorHandler(this.prev.result);
            return;
        }
        if (this.isResolved()) {
            successHandler(this.prev.result);
            return;
        }
    }
    this.successHandler = successHandler;
    this.errorHandler = errorHandler;
    var next = new Promise();
    this.next = next;
    next.prev = this;
    return next;
}

Promise.prototype.isRejected = function() {
    if (this.status !== UNFULFILLED) {
        return this.status === FULFULLED;
    } else {
        this.status = this.prev.status;
        return this.status === FAILED;
    }
}

Promise.prototype.isResolved = function() {
    if (this.status !== UNFULFILLED) {
        return this.status === FULFULLED;
    } else {
        this.status = this.prev.status;
        return this.status === FULFULLED;
    }
}

module.exports = Promise;