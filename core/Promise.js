define(['Q'], function(Q){
    function Promise() {
        this.callbacks = [];
    }

    Promise.prototype.then = function(successHandler, errorHandler) {
        this.callbacks.push({
            success: successHandler,
            error: errorHandler
        });
        return this;
    }
    Promise.prototype.resolve = function() {
        var error = this.result.error;
        if (error === true) {
            this.callbacks.shift().error(this);
        } else {
            this.callbacks.shift().success(this);
        }
    }

    Q.Promise = Promise;
    return Q;
})


