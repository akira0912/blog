# 前端文件的预览和打印/HTML打印/HTML转pdf

总结了一下前端预览和打印的几个场景

1、PDF文件流直接预览打印
--------------

不直接下载文件，而是调用浏览器的打印功能。这里用的是iframe实现的，iframe的src可以直接接收blob转url之后的数据，进行在线的预览。

js

```javascript
//获取文件流
const res = await exportOQCCard({ ...values });
    const disposition = res?.response?.headers.get('Content-Disposition'); //获取请求头
    if (disposition) {
      const arr = disposition?.split('filename=') || ['1', 'OQC合格产品标识牌.docx'];
      if (arr.length === 2) {
        const filename = decodeURIComponent(arr[1]);
        const blob = new Blob([res.data], { type: 'application/pdf' });
        //blob转url地址，这个url可以直接打开（就是下载文件），也可以传给iframe的src
        const url = window.URL.createObjectURL(blob);
        const exportPdf = () => {
          saveAs(res.data, filename);
          message.success('打印出错，请下载文件手动打印！');
        };
        const iframe = document.getElementById('myiframe') as HTMLIFrameElement;
        try {
          iframe.src = url;
          document.body.appendChild(iframe);
          // 将 iframe 添加到文档中
          // 写入初始内容到 iframe
          iframe.onload = () => {
            setTimeout(() => {
              if (iframe.contentWindow) {
                iframe.contentWindow?.print(); // 只打印 iframe 的内容
              } else {
                exportPdf();
              }
            }, 500); // 确保文档加载完成
          };
          return true;
        } catch (err) {
          exportPdf();
        }
      }
    }
```

html iframe展示pdf文件流如果出现乱码的问题，一定是编码有问题，可以加上meta设置编码格式（但是这样后台其实会有个错，说head不能嵌入在iframe中?）

```html
    <iframe src={''} width="500" id="myiframe" style={{ display: 'none' }}>
       <head>
         <meta httpEquiv="Content-Type" content="text/html; charset=gbk" />
       </head>
     </iframe>
```

结果：调出浏览器打印页面。chrome浏览器的打印不能调整页面方向（edge可以）这是默认css样式的问题，网上也有解决方案。

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/cb543c32d13a437b9fed778c95477d9a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWtpcmEwOTEy:q75.awebp?rk3s=f64ab15b&x-expires=1743740394&x-signature=O93D%2BHoxyuU08s8k1NMPlJy2pPo%3D) 如果需要预览可以把iframe的display放开，或者使用object进行预览

```html
       <div className={styles.modal_pdf_container}>
           <object
             data={item.fileUrl}
             className={styles.pdf_iframe}
             type="application/pdf"
           >
              <div>此浏览器不支持预览PDF</div>
           </object>
      </div>
```

![1729132210197.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e21dfbf1741f45cd927e6fd331b32659~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWtpcmEwOTEy:q75.awebp?rk3s=f64ab15b&x-expires=1743740394&x-signature=lgSEQF13zTKb8AWqD9%2FuTIjArow%3D)

2、html直接打印
----------

用了一个插件react-to-print，可以去官网看一下用法

```html
        <Modal
          title="报告预览"
          width={screen.width < 1280 ? 1280 : 1600}
          open={previewModalVisible}
          onCancel={() => handlePreviewModalVisible(false)}
          footer={null}
        >
          <ReactToPrint
            trigger={() => <Button type="primary">打印</Button>}
            content={() => ref.current}
          />

          <div ref={ref}>
            <OverviewChart
              title={getTitle()}
              repairData={repairData}
              last12repairData={last12repairData}
              troubleData={troubleData}
              refundData={refundData}
              reportDate={reportDate}
              customerCode={customerCode}
              reportType={reportType}
            />
          </div>
        </Modal>

```

![a208a1a6b8e5476f747dfd9552b01a8.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/cff1e42a11c043d9b939054f813dfb72~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWtpcmEwOTEy:q75.awebp?rk3s=f64ab15b&x-expires=1743740394&x-signature=Hoo5QIW%2FIN4iZ0h3L0iPuzcBvHU%3D)

3、html转pdf下载
------------

我需要指定一个html元素进行下载，网上这种案例也挺多，很多样式也可以自己调。

```javascript
// 页面导出为pdf格式  
import html2Canvas from 'html2canvas'  
import jsPDF from 'jspdf'  
  
const htmlToPdf = {  
getPdf (title, url) {  
// 指定一个html元素  
let target = document.querySelector('#pdfPrint')  
html2Canvas(target, {  
allowTaint: false,  
taintTest: false,  
logging: false,  
useCORS: true,  
dpi: window.devicePixelRatio * 4, // 将分辨率提高到特定的DPI 提高四倍  
scale: 4 // 按比例增加分辨率  
}).then(canvas => {  
const pdf = new jsPDF('p', 'mm', 'a4') // A4纸，纵向  
const ctx = canvas.getContext('2d')  
const a4w = 190  
const a4h = 277 // A4大小，210mm x 297mm，四边各保留10mm的边距，显示区域190x277  
const imgHeight = Math.floor(a4h * canvas.width / a4w) // 按A4显示比例换算一页图像的像素高度  
let renderedHeight = 0  
  
while (renderedHeight < canvas.height) {  
const page = document.createElement('canvas')  
page.width = canvas.width  
page.height = Math.min(imgHeight, canvas.height - renderedHeight)// 可能内容不足一页  
  
// 用getImageData剪裁指定区域，并画到前面创建的canvas对象中  
page.getContext('2d').putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0)  
pdf.addImage(page.toDataURL('image/jpeg', 1.0), 'JPEG', 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width)) // 添加图像到页面，保留10mm边距  
  
renderedHeight += imgHeight  
if (renderedHeight < canvas.height) {  
pdf.addPage()// 如果后面还有内容，添加一个空页  
}  
// delete page;  
}  
// 保存文件  
pdf.save(title + '.pdf')  
})  
}  
}  
  
export default htmlToPdf

```