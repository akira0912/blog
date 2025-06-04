# 使用antd的一些小问题

好久没写笔记，记录一下最近项目遇到的小知识点，有的是问chatGPT的，挺好用，有时候比自己翻文档快一点。

# 1、table为空时的empty组件可以自己修改样式，需要用到的api是table的locale

```jsx
// table上的
locale={{emptyText: <Empty {...emptyProps} className={styles.height} />,}}

// 另外定义的emptyProps 
  const emptyProps = {
    description: '暂无数据',
    image: <img src={emptyImg} alt="暂无数据" style={{ display: 'block', margin: '0 auto' }} />,
    style: { minHeight: '446px' },
  };
  
  // 自定义empty组件的高度 less
  .height {
  :global {
    .ant-empty-image {
      height: 200px;
    }
  }
}
```

# 2、一个页面上有20个表格，对表格的pageSize，pageNumber，total等进行管理

定义变量的时候需要确定其长度并且初始化

```ini
const [total, setTotal] = useState<number[]>(Array(20).fill(0));
  const [page, setPage] = useState<number[]>(Array(20).fill(1));
  const [limit, setLimit] = useState<number[]>(Array(20).fill(10));

  table组件
          <Table
                  loading={loading}
                  columns={item}
                  dataSource={data}
                  rowKey="id"
                  bordered
                  size="middle"
                  pagination={{
                    showTotal: (t) => `共${t}条`,
                    current: page[index],
                    total: total[index],
                    onShowSizeChange: (_, size) => {
                      setLimit((pre) => {             //修改其中一个表格的size
                        const newState = [...pre];
                        newState[index] = size;
                        return newState;
                      });
                      //setLimit(size);
                    },
                    onChange: (pageNumber) => {
                      setPage((pre) => {
                        const newState = [...pre];
                        newState[index] = pageNumber;   //修改其中一个表格的pageNumber
                        return newState;
                      });
                      // setPage(pageNumber);
                    },
                  }}
                />
```

# 3、table第一列是checkbox，选中一页的key之后再翻页，之前选的key不会丢失

需要用到`preserveSelectedRowKeys: true,`。这个属性在官方文档上的解释是当数据被删除时仍然保留选项的 `key`，源码里其实有这样的解释`/** Keep the selection keys in list even the key not exist in dataSource anymore */` 意思应该就是我们page的值变了->会调一次接口->dataSource的data值会变化，之前选的key已经不在新的dataSource里面了，preserveSelectedRowKeys为true时可以保存住以前选了但是不在现在dataSource的key值

```ini
        <Table
                loading={loading[0]}
                columns={columns}
                dataSource={data}
                rowKey="id"
                bordered
                size="middle"
                rowSelection={{
                  columnWidth: '5%',   //这样可以指定第一行checkbox的宽度
                  type: 'checkbox',
                  selectedRowKeys: selectedRowKeys1,
                  onChange: onSelectChange1,
                  preserveSelectedRowKeys: true,    //翻页不丢失key
                }}
              />
```

# 4、一个需求，点击开始按钮，加载数据的时候，显示一个圆形进度条用来展示加载数据的进度。

![image.png](/./antd-design/7dfcea75b7d24e559e484859394dd59b~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.webp)

![image.png](/./antd-design/0057a2d24f4b4d58b842cc4faff5d99d~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.webp) （截图只截了一点，所以看起来progress没有居中）

分析这个需求，感觉应该用一个modal里面加一个progress组件就可以完成的，但是最重要的是修改modal的样式，使modal能够遮罩住整个页面。

```ini
    <Modal
        closable={false}   //把modal的小叉和确定取消按钮都关掉。
        footer={null}
        width="100%"
        style={{ marginTop: 100 }}
        visible={transparent}
        className={styles.transparent}  //在less文件里去修改modal的样式
      >
        <Progress
          type="circle"
          className={styles.progress}
          percent={percent}
          style={{ marginLeft: '40%' }}
          width={200}
        />
      </Modal>
```

```css
//index.less
.transparent {
  :global {
    .ant-modal-content {
      background-color: transparent !important;   //把modal的背景设置成透明的，因为modal某人的遮罩是打开的，mask是true，所以背景为透明，就单纯是遮罩的颜色，就能满足需求了
      box-shadow: none;      //modal边框的阴影样式，去掉 其实就是隐藏modal的存在。
    }
  }
}
```

其实样式看着没多少，但是我调了好久，浪费了很多时间，害。

# 6、一个页面有一个table，每列都需要跳转，render要写很多遍，封装一个函数解决

![image.png](/./antd-design/4f332d8cedc24be195f2ca6ca18374cc~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.webp)

![image.png](/./antd-design/c3b7d99502634199b4f13cda1fc74409~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.webp)

# 8、浏览器空格

浏览器会将文字前后的空格省略，文字中连续的空格会合并成一个空格。 导致的问题：直接复制做查询条件时查询不到表格数据。 解决1:重新render渲染一遍，将其包裹在`<pre>`标签中，该标签会保持字符串原样输出，不会对空格进行修正，但是自带的样式也会消失，且不能换行。 解决2:style中设置whiteSPace的值为pre-wrap，可以正常换行且保留样式。

```css
 <div
     style={{ wordWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
  >{`${typeCode}`}</div>
```

以上都是自己的摸索，不知道有没有更好的解决办法，

# 9、最后还有一个待解决的问题。

两个列表并列，一个五条数据一个十条数据，看着页面不好看，不知道该怎么调整比较好呢？

![image.png](/./antd-design/520d775bac9a4d6d918ba817e215bede~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.webp)
