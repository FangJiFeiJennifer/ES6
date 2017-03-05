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
>

###(2). presets字段设定转码规则，官方提供以下的规则集，可以根据需要安装。
#### ES2015转码规则
>
$ npm install --save-dev babel-preset-es2015
>

#### ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
>

 $ npm install --save-dev babel-preset-stage-0
 
 $ npm install --save-dev babel-preset-stage-1
 
 $ npm install --save-dev babel-preset-stage-2
 
 $ npm install --save-dev babel-preset-stage-3
 
>

##2、Babel提供babel-cli工具，用于命令行转码.
###(1). 在全局环境中使用babel-cli
>
$ npm install --global babel-cli
>

#### 转码结果输出到标准输出
>
$ babel example.js
>

#### 转码结果写入一个文件
 _**    --out-file 或 -o 参数指定输出文件**_
>
$ babel example.js --out-file compiled.js
>

_** 或者**_

>
$ babel example.js -o compiled.js
>

#### 整个目录转码
    _**--out-dir 或 -d 参数指定输出目录**_
>
$ babel src --out-dir lib
>

    _**或者**_

>
$ babel src -d lib
>

---

#### -s 参数生成source map文件
>
$ babel src -d lib -s
>
