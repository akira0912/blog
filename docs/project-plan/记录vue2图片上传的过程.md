# 记录vue2图片上传的过程

**之前**写react的项目时，上传图片是这样的：用户点击上传选择图片之后调用接口，将图片上传至服务器，接口返回一个图片的url，之后确认保存之后会把图片的url传给后端进行保存。

（这样的坏处好像就是如果图片取消上传了但是图片还是在服务器上。好处是可以避免存储大量图片，避免数据库变大变得缓慢，而且还可以提高数据的读写速度。）

**现在**维护一个vue2的项目，里面上传图片的接口是直接传二进制文件给后端的，js的几个类型搞得我有点晕，整理了一下记录下来。

*   **blob**：Binary Large Object的缩写，代表二进制类型的对象。Blob对象表示一个不可变、原始数据的类文件对象，其实就是类似文件对象的二进制数据。
    
*   **File类型**：继承自blob对象，是 JavaScript 中用来表示文件数据的一种对象类型，它通常用于在前端页面中操作文件，例如上传文件、读取文件等。
    
*   **base64**：二进制数据（如文件）表示为文本字符串的方法，使用一组特定的字符。网络中存储和传输的二进制数据的普遍用法。
    

一、使用element的上传文件的组件。
--------------------

```js
        <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :limit="1"
                accept="image/*"
              >
                <img v-if="form.avatar" :src="form.avatar" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3421f77bbfd647b6ae96888fc9a21486~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?) beforeAvatarUpload 传入的参数是file类型 ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3be862c9e61447e4afb8270a3371b7e4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

如果将传入的file直接赋值给对应接收的参数，是显示不出来的。 ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4cefdd063949439bb4753eba72bb4975~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

> **这里是因为我没有用`upload`的`file-list`，而是通过`img`的`scr`去给这个组件赋值的。** **`<img>` 标签的 `src` 属性必须是一个可以直接加载的图片地址，而 `File` 对象并不是一个图片地址，它只是一个指向本地文件的引用。**

> 也就是说如果用的是`img`的`src`，那必须是一个可以直接加载的图片地址（url、base64都可以），如果用的是ele的`upload`的`file-list`，`Blob` 或 `File` 对象可以，但是base64不可以。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fe0c9d6d85d46689ac528fa764bdb4d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

二、这时候需要将类型转换成base64类型
---------------------

下面代码使用了JavaScript内置的 FileReader 对象，将文件内容读取为 Data URL 格式的字符串，从而实现了将 File 类型的文件转换成 base64 编码字符串的功能。

```js
//上传头像
    beforeAvatarUpload(file) {
      console.log(file);
      const isImag = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (isImag && isLt2M) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.form.avatar = reader.result;
        };
        return true;
      } else {
        if (!isImag) {
          this.$message.error("上传头像图片只能是JPG或PNG格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return false;
      }
    },
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c279d32b4b0242a6b711b98f801720c8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) 这样图片就可以正确显示了。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d0439e414564a7c81b502e4e11094a6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

base64类型非常长，只截了部分。转换成base64类型，通常会增加文件的大小，因为它使用了一定程度的数据冗余来保证数据能够正确地转换和传输。base64 编码会将每3个字节的二进制数据编码成4个字符，编码后的数据量会比原始数据量增加约33%。

三、接下来需要把base64转换成二进制文件，因为后端需要的是二进制文件，其实也就是需要一个blob对象。
-----------------------------------------------------

调用 this.dataURItoBlob() 函数，将 this.form.avatar 中的 base64 编码的图片数据转换成二进制格式的 Blob 对象。

```js
 //  二进制格式
    dataURItoBlob(dataURI) {
      // base64 解码
      let byteString = window.atob(dataURI.split(",")[1]);
      let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
      let ab = new ArrayBuffer(byteString.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    },
    /**修改提交图片 */
    uploadImg: function () {
      const data = this.dataURItoBlob(this.form.avatar);
      let formData = new FormData();
      formData.append("avatarfile", data);
      
      //调用图片上传接口……
      
      });
    },
```

四、最后传给后端的是这样的
-------------

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3163440f594c4a5f81b698c2827182f6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

代码是到处cv的，修改出了能用不报错的，也不知道我的理解有没有问题，有错误请各位大佬指正。
