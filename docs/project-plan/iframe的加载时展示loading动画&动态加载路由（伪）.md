# iframe的加载时展示loading动画&动态加载路由（伪）

最近有一个需求需要在页面内嵌一个iframe，用来加载其他网站，第一次使用iframe，研究了一下。 在网上看到了形形色色的判断iframe是否加载的方式，用了最简单的一种，直接加一个onload函数判断，onload 事件在frame或者iframe载入完成后被触发。

ps：感觉iframe的坑好多，有很多的网站是不支持被iframe内嵌的，比如百度、知乎等…1. 添加一个`X-Frame-Options`响应头就行了

```ini
 const [loading, setLoading] = useState<boolean>(true);
 const [url, setUrl] = useState<string>('');
 
 //useEffect加载数据……
 
 return (
    <ProCard style={{ width: '100%', height: '100%' }} ghost>
      {loading && (
        <div className={styles.spin}>
          <Spin spinning={loading} tip={'加载中…'} delay={100} />
        </div>
      )}
      {url && (
        <iframe
          src={url}
          width={'100%'}
          height={'100%'}
          frameBorder={'false'}
          onLoad={() => {
            setLoading(false);
          }}
        />
      )}
      {/* </Spin> */}
    </ProCard>
  );
 
 
 //index.less spin加个遮罩层 直接问chatGPT
 .spin {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 208px;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
}

```

效果 ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f18d8431e02a4c0394e31d3873a4326c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

如图 需求还有一点是外链的地址需要动态加载出来的，但是我们路由是静态的配置路由（umi）。看了文档之后发现可以在layout那边用 `menuDataRender`来动态修改路由，但是如果要异步加载的话需要用到`menu.request`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/abdd1dae2cb74cccb02649106aaa16b1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

最后发现components是动态挂载不上去的，所以只能增加了path之后，把所有的path都映射到已有的页面组件。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/efe1f22c300f410f95451d3716eff7cf~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31132d593c33491881ddc68ea858ed7b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

还在研究若依的动态路由、约定式路由，有些地方实在看不懂orz。。。