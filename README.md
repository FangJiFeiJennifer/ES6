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
>_**--out-file 或 -o 参数指定输出文件**_
<br/>
$ babel example.js --out-file compiled.js
<br/>
_**或者**_
<br/>
$ babel example.js -o compiled.js

#### 整个目录转码
>_**--out-dir 或 -d 参数指定输出目录**_
<br/>
$ babel src --out-dir lib
<br/>
_**或者**_
<br/>
$ babel src -d lib

#### -s 参数生成source map文件
>$ babel src -d lib -s

###(2). 在项目目录下使用babel
  在全局环境下进行Babel转码,意味着，如果项目要运行，全局环境必须有Babel，也就是说项目产生了对环境的依赖。另一方面，这样做也无法支持不同项目使用不同版本的Babel。
一个解决办法是将babel-cli安装在项目之中。

>
#### 安装
$ npm install --save-dev babel-cli

然后，改写package.json。
>
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
转码的时候，就执行下面的命令。
>$ npm run build


====

