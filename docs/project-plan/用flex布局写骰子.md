# 用flex布局写骰子

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .title {
        background-color: bisque;
        display: flex;
        justify-content: center;
      }
      .container {
        background-color: black;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 10px;
      }
      .item1 {
        background-color: white;
        width: 150px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px;
      }
      .item2 {
        background-color: white;
        width: 150px;
        height: 150px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 20px;
        flex-direction: column;
      }
      .item3 {
        background-color: white;
        width: 150px;
        height: 150px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 20px;
        flex-direction: column;
      }
      .one {
        background-color: black;
        border-radius: 40px;
        width: 40px;
        height: 40px;
      }
      .six {
        background-color: black;
        border-radius: 30px;
        width: 30px;
        height: 30px;
      }
      .item4 {
        background-color: white;
        width: 150px;
        height: 150px;
        display: flex;
        align-content: space-between;
        margin: 20px;
        flex-direction: column;
      }
      .item4_column {
        flex: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    </style>
  </head>
  <body>
    <div class="title">flex布局写骰子</div>
    <div class="container">
      <div class="item1">
        <div class="one"></div>
      </div>
      <div class="item2">
        <div class="one"></div>
        <div class="one"></div>
      </div>
      <div class="item3">
        <div class="one" style="align-self: flex-start"></div>
        <div class="one"></div>
        <div class="one" style="align-self: flex-end"></div>
      </div>
      <div class="item4">
        <div class="item4_column">
          <div class="one"></div>
          <div class="one"></div>
        </div>
        <div class="item4_column">
          <div class="one"></div>
          <div class="one"></div>
        </div>
      </div>
      <div class="item">
        <div class="item4">
          <div class="item4_column">
            <div class="six"></div>
            <div class="six"></div>
          </div>
          <div class="item4_column">
            <div class="six"></div>
          </div>
          <div class="item4_column">
            <div class="six"></div>
            <div class="six"></div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item4">
          <div class="item4_column">
            <div class="six"></div>
            <div class="six"></div>
          </div>
          <div class="item4_column">
            <div class="six"></div>
            <div class="six"></div>
          </div>
          <div class="item4_column">
            <div class="six"></div>
            <div class="six"></div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de862f7633864996b32f39b5a312cb39~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?) （用:html5在vscode可以快速生成h5代码片段）

