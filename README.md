#一、 Babel用法
##1、 配置文件.babelrc
###(1). Babel的配置文件是.babelrc，存放在项目的根目录下。使用Babel的第一步，就是配置这个文件。
>
```json
{
   "presets": [
     "es2015",
     "stage-3"
   ],
   "plugins": []
 }
```

###(2). presets字段设定转码规则，官方提供以下的规则集，可以根据需要安装。
#### ES2015转码规则
>$ npm install --save-dev babel-preset-es2015


#### ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
>$ npm install --save-dev babel-preset-stage-0 
<br/>
>$ npm install --save-dev babel-preset-stage-1
<br/>
>$ npm install --save-dev babel-preset-stage-2
<br/>
>$ npm install --save-dev babel-preset-stage-3

##2、Babel提供babel-cli工具，用于命令行转码.
###(1). 在全局环境中使用babel-cli
>$ npm install --global babel-cli

#### 转码结果输出到标准输出
>$ babel example.js

#### 转码结果写入一个文件
>_--out-file 或 -o 参数指定输出文件_
<br/>
$ babel example.js --out-file compiled.js
<br/>
_或者_
<br/>
$ babel example.js -o compiled.js

#### 整个目录转码
>_--out-dir 或 -d 参数指定输出目录_
<br/>
$ babel src --out-dir lib

>_或者_
<br/>
$ babel src -d lib

>_-s 参数生成source map文件_
>$ babel src -d lib -s

###(2). 在项目目录下使用babel
在全局环境下进行Babel转码,意味着，如果项目要运行，全局环境必须有Babel，也就是说项目产生了对环境的依赖。另一方面，这样做也无法支持不同项目使用不同版本的Babel。
一个解决办法是将babel-cli安装在项目之中。

>_安装_
<br/>
$ npm install --save-dev babel-cli

>_然后，改写package.json。_
```json
{
  // ...
  "devDependencies": {
    "babel-cli": "^6.0.0"
  },
  "scripts": {
    "build": "babel src -d lib"
  }
}
```
>_转码的时候，就执行下面的命令。_
<br/>
$ npm run build

##3、 babel-node
babel-cli工具自带一个babel-node命令，提供一个支持ES6的REPL环境。它支持Node的REPL环境的所有功能，而且可以直接运行ES6代码。
它不用单独安装，而是随babel-cli一起安装。然后，执行babel-node就进入PEPL环境。
>$ babel-node
<br/>
> &gt; (x => x * 2)(1)
<br/>
2

>babel-node命令可以直接运行ES6脚本。将ES6代码放入脚本文件es6.js，然后直接运行。
<br/>
$ babel-node es6.js

##4、 babel-register
babel-register模块改写require命令，为它加上一个钩子。此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码。
>$ npm install --save-dev babel-register

>_使用时，必须首先加载babel-register_
require("babel-register");
<br/>
require("./index.js");

`**需要注意的是，babel-register只会对require命令加载的文件转码，而不会对当前文件转码。
另外，由于它是实时转码，所以只适合在开发环境使用。**`

##5、 babel-core

如果某些代码需要调用Babel的API进行转码，就要使用babel-core模块
<br/>
http://babeljs.io/docs/usage/options/

>**安装**
<br/>
>$ npm install babel-core --save

>**在项目中调用babel-core**
```javascript
var babel = require('babel-core');
// 字符串转码
babel.transform('code();', options);
// => { code, map, ast }
// 文件转码（异步）
babel.transformFile('filename.js', options, function(err, result) {
  result; // => { code, map, ast }
});
// 文件转码（同步）
babel.transformFileSync('filename.js', options);
// => { code, map, ast }
// Babel AST转码
babel.transformFromAst(ast, code, options);
// => { code, map, ast }
```
>**babel-core的例子**
```javascript
var es6Code = 'let x = n => n + 1';
var es5Code = require('babel-core')
  .transform(es6Code, {
    presets: ['es2015']
  }).code;
// '"use strict";\n\nvar x = function x(n) {\n  return n + 1;\n};'
```

##6、 babel-polyfill
Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。

举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。

>**安装**
<br/>
$ npm install --save babel-polyfill

>**脚本头部，加入如下一行代码**
```javascript
import 'babel-polyfill';
// or
require('babel-polyfill');
```

`_**Babel默认不转码的API非常多，详细清单可以查看babel-plugin-transform-runtime模块的
[definitions.js](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/definitions.js)文件。**_`

##7、 gulp-babel
https://www.npmjs.com/package/gulp-babel

====

