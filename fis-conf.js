fis.config.set('roadmap.path',([{
    reg: /^\/modules\/(.*)\/(.*)/i,
    release: '/static/js/$1/$2'
}]));
fis.config.get('roadmap.path').push({
    reg: /^\/modules\/pages\/(.*)/i,
    release: '/static/pages/$1'
});
fis.config.get('roadmap.path').push({
    reg: /^\/lib\/(.*)/i,
    release: '/static/$1'
});
fis.config.get('roadmap.path').push({
    reg: /^\/modules\/style\/(.*\.css)/i,
    release: '/static/style/$1'
});
fis.config.set('pack', {
    'Q.js': [
        '/modules/core/**.js'
    ],
    'QUI.js': [
        '/modules/widget/**.js'
    ]
});

