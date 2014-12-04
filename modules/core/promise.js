function Promise() {
    this.callbacks = [];
}

Promise.prototype.resolve = function() {
    var fn = this.callbacks.shift();
    if (fn) {
        var ret = fn.apply(null, arguments);
        if (ret instanceof Promise) {
            ret.callbacks = this.callbacks;
        }
    }
}
Promise.prototype.then = function(fn) {
    this.callbacks.push(fn);
    return this;
}