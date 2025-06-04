# 后台管理，用select组件获取antd全部icon并进行选择，该怎么做？

最近在写后台管理系统，其中有一个选择菜单icon的功能，需要加载出antd的所有icon然后进行选择，效果如下：

![image.png](/./antd-design/739b53fe19cc472d876670cb574b4752~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.webp)

加上模糊查询：

![image.png](/./antd-design/ca397fb117a640fcae88b87a8334b777~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.webp)

在掘金找到一位小伙伴的实现方法，不过他是用select，他的文章链接如下： [juejin.cn/post/712314…](https://juejin.cn/post/7123142130243108900 'https://juejin.cn/post/7123142130243108900')

我用的是ProFormSelect，没有采取jsx写option的方式。 代码如下：

```ini
//引入antd design所有的icon
import Icon from '@ant-design/icons';
import * as icons from '@ant-design/icons';

//在useEffect里面加载option，不然容易报错，有更好的方法的话请各位大佬指出。
const [iconOptions, setIconOptions] = useState<DefaultOptionType[]>([]);
  useEffect(() => {
    const iconList = Object.keys(icons).filter((item) => typeof icons[item] === 'object');
    const tempOptions: DefaultOptionType[] = [];
    iconList.map((item) => {
      tempOptions.push({
        label: (
          <span>
            <Icon component={icons[item]} style={{ marginRight: '8px' }} />
            {item}
          </span>
        ),
        value: item,
      });
    });
    setIconOptions(tempOptions);
  }, []);

  //return的时候
  <ProFormSelect
            placeholder="请选择图标"
            showSearch
            allowClear
            style={{ width: '100%' }}
            options={iconOptions}
            label={'图标icon'}
            fieldProps={{
              //模糊查找
              filterOption: (input, option) => {
                //console.log(option?.value);
                return (option?.value?.toString() ?? '')
                  .toLowerCase()
                  .includes(input.toLocaleLowerCase());
              },
            }}
          />
```

使用ProFormSelect代替Select组件不仅仅是因为有label更方便，而且还有，在使用上面那位小伙伴的代码

```vbnet
const { Option } = Select
```

这个对proformselect不起作用，所以我就放弃了jsx的写法，直接再遍历一遍iconList生成option，这样应该效率也更高一点。

![image.png](/./antd-design/ec69768759d749a5a73f07e5e376e012~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.webp)

总结：带脑子的进行cv操作，多看文档，多看其他大佬的代码，很多问题都能迎刃而解，over。
