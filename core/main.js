require.config({
    baseUrl: 'core',
    path: {
        'Q': 'Q',
        'ajax': 'ajax',
        'utils': 'utils',
        'support': 'support',
        'dom': 'dom',
        'Promise': 'Promise'
    }

});


require(['Promise'], function(Q){
    var Promise = Q.Promise;
    function step1() {
        var promise = new Promise();
        setTimeout(function(){
            console.log('执行步骤一');
            promise.result = 1;
            promise.resolve(promise);
        }, 1000);
        return promise;
    }
    function step2(promise) {
        setTimeout(function(){
            console.log('执行步骤二');
            promise.result = promise.result++;
            promise.resolve(promise);
        }, 1000)
        return promise;
    }
    function step3(promise) {
        setTimeout(function(){
            console.log('执行步骤三');
            promise.result = promise.result++;
            promise.resolve(promise);
        }, 1000);
        return promise;
    }
    function step4(promise) {
        setTimeout(function(){
            console.log('执行步骤四');
            promise.result = promise.result++;
        }, 1000)
        return promise;
    }

    step1().then(step2).then(step3).then(step4);
})