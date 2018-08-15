### 注 意

>
一般来说，调用<b>resolve</b>或<b>reject</b>以后，Promise 的使命就完成了，后继操作应该放到<b>then</b>方法里面，而不应该直接写在<b>resolve</b>或<b>reject</b>的后面。
所以，最好在它们前面加上return语句，这样就不会有意外。
>
```javascript
function loadImageAsync(url) {
    return new Promise(function(resolve,reject) {
        const image = new Image();
        image.onload = function() {
            return resolve(image);
        };

        image.onerror = function() {
            return reject(new Error('Could not load image at ' + url));
        };

        image.src = url;
    })
}
```

### Promise.prototype.then()

>
采用链式的then，可以指定一组按照次序调用的回调函数。<b>这时，前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。
</b>
>
```javascript
getJSON("/post/1.json").then(function(post) {
    return getJSON(post.commentURL);
}).then(function funcA(comments) {
    console.log("resolved: ", comments);
}, function funcB(err){
    console.log("rejected: ", err);
});
```
>上面代码中，第一个then方法指定的回调函数，返回的是另一个Promise对象。这时，第二个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。
如果变为resolved，就调用funcA，如果状态变为rejected，就调用funcB。
>

### Promise.prototype.catch()

```javascript
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});
```
>
上面代码中，getJSON方法返回一个 Promise 对象，如果该对象状态变为resolved，则会调用then方法指定的回调函数；如果异步操作抛出错误，
状态就会变为rejected，就会调用catch方法指定的回调函数，处理这个错误。
<b>另外，then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获。</b>
>

Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。

```javascript
getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});
```
>
上面代码中，一共有三个 Promise 对象：一个由getJSON产生，两个由then产生。它们之中任何一个抛出的错误，都会被最后一个catch捕获。
>

一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。因为catch方法不仅能捕获reject方法，也可以捕获前面then方法执行中的错误。
<b>因此，建议总是使用catch方法，而不使用then方法的第二个参数。</b>

>
跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。
这就是说，Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。
>

### Promise.prototype.finally() 

finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
```javascript
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```
>
上面代码中，不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数。
>
finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

### Promise.all()

Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
const p = Promise.all([p1, p2, p3]);
```

>
上面代码中，Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。
<b>（Promise.all方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。）</b>

p的状态由p1、p2、p3决定，分成两种情况。

（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
>

#### 注 意

如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。
```javascript
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// ["hello", Error: 报错了]
```
>
上面代码中，p1会resolved，p2首先会rejected，但是p2有自己的catch方法，该方法返回的是一个新的 Promise 实例，p2指向的实际上是这个实例。
该实例执行完catch方法后，也会变成resolved，导致Promise.all()方法参数里面的两个实例都会resolved，因此会调用then方法指定的回调函数，而不会调用catch方法指定的回调函数。

如果p2没有自己的catch方法，就会调用Promise.all()的catch方法。
>

### Promise.race()

Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
const p = Promise.race([p1, p2, p3]);
```

>
上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
>