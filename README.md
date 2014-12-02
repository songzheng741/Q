Q
=
造轮子而已
<h4>10/28</h4>
<p>测试require.js</p>
<h4>11/19</h4>
<p>搭建更个项目目录,增加测试目录,使整个工程更完整</p>
<h4>12/02</h4>
<p>改为更工程化的fis-pure来实现模块化</p>
<p>fis-pure是在打包过程中生成一张依赖映射表</p>
<p>前端在模块加载时根据这个依赖表去动态加载模块,减少类似于sea.js和requirejs等在js运行时类似递归的去分析依赖关系导致的性能损耗</p>
<p>在模块化定义时也更加符合nodejs的使用习惯,不需再包裹define</p>
<p>在加载模块时只需</p>
<code>
    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Todo</title>
        <script type="text/javascript" src="lib/mod.js"></script>
        <!--[if lt IE 9]>
        <script src="lib/html5shiv.min.js"></script>
        <![endif]-->
    </head>
    <body>
    <script type="text/javascript">
        var Q = require('core/Q');
        console.log(Q);
    </script>
    </body>
    </html>
</code>