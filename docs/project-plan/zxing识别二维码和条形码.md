# zxing识别二维码和条形码

好久没写笔记了，最近有点懒，今天需求都写完了，写一篇笔记记录一下昨天写的代码。

需求是这样的：使用的是vue2，需要一个能够调用摄像头之后识别二维码和条形码的组件，获取到条码数据之后传给父组件，父组件其实是一个弹窗里面加一个form，form表单填写好，条码数据也收集到之后就可以提交了。我找了好几个识别库，发现挺多都不能识别条形码的。

测试的时候了解了这几个库：

# 一、了解几个识别库

- 1、@zxing/library

ZXing能识别条形码和二维码，识别率挺高，官网给的示例清晰，支持从图片或者从摄像头中读取，我实际使用的也是这个库，推荐的。 [zxing-js.github.io/library/](https://link.juejin.cn?target=https%3A%2F%2Fzxing-js.github.io%2Flibrary%2F 'https://zxing-js.github.io/library/') 这个是示例，非常有用，示例代码拿来改成vue2能用的版本就行了。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7e729f00eba4d14902958422adb8692~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

- 2、qrcode-reader

这个库用起来比较简单，但是只能识别二维码，也有自带的api可以调用摄像头。

- 3、Quagga

这个库只能识别条形码，不能扫描二维码，chatGPT还跟我说都能扫…害我写了半天。(这个好像没人维护了

还有一些其他的没咋用过。

# 二、封装识别条码组件

子组件：

（第一次用这个码上掘金，如果打不开可以直接建个新的vue文件复制过去，用的是vue2.其实就是官网的例子，然后用gpt改成vue2版本，但是确实改了很久emmm）

父组件中调用：

```js
components: {
    QRCodeScanner
},
………………
<QRCodeScanner ref="scanner" @change="resultText" v-show="showCamera"/>
```

大致就长这样，手机可以通过下面的select切换前置后置，优先选后置（根据设备名进行选择，看设备名是否包括back，否则就默认选第一个）

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c60a43c6413458f9925f12ff58f1903~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

# 三、调用摄像头浏览器的限制

调用摄像头浏览器是有安全限制的，本地开发可以用localhost调试（默认安全的），上线的话就必须是https环境了。

![6b238ead7b2230923cdb01d5e73453c.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5c2c8009c7245b688b0e6deef9008f5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

但是看到一个博客可以解决上线也只能用https的问题。当然这个解决方法只是临时性的，如果真的用不了https，可以看看这个方法。[blog.csdn.net/qq_40905132…](https://link.juejin.cn?target=https%3A%2F%2Fblog.csdn.net%2Fqq_40905132%2Farticle%2Fdetails%2F126520190 'https://blog.csdn.net/qq_40905132/article/details/126520190')
