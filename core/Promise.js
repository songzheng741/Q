function Promise() {
    this.callbacks = [];
}

Promise.prototype = {
    resolve: function (result) {
        this.complete("resolve", result);
    },

    reject: function (result) {
        this.complete("reject", result);
    },

    complete: function (type, result) {
        while(this.callbacks.length) {
            this.callbacks.shift()[type](result);
        }
    }
}