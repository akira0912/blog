# AI大模型应用调研-Dify部署

最近一直在调研AI应用，也在不断测试各家大厂的产品。下面个人拙见，希望有更懂的大佬可以指点一下。

## 我将市面上的AI应用大致分为三类：

1、**大模型应用**，基于某种大模型搭建的ai问答机器人，可以进行多轮对话、角色设定、上传文件进行分析，甚至联网搜索等。比如Kimi、文心一言、豆包、通义千问、GPT等。

2、**AI Agent应用开发平台**，有知识库搭建、工作流编排等功能，核心服务是为用户提供一个快速开发AI应用的平台，本质是“低代码”构建AI Bot。比如扣子coze、Dify、千帆、钉钉AI助理、BetterYeah AI、天工SkyAgents、智谱清言等。

3、**提供模型精调的平台**，用户可以基于平台基础模型，上传数据集，创建精调任务，比如字节的火山方舟、阿里的百炼等平台。这些平台非常大而全，是一站式的大模型开发及应用构建平台。

这些平台基本都用了个遍，给领导输出了几份调研报告（累），基于个人的使用经验，不甚严谨，有需要的朋友可以私信我。最后领导决定本地化部署Dify。Dify是一个开源的基于大语言模型的AI应用开发平台，可以部署在本地，但是使用的大模型服务还是要在对应模型官网获取API KEY，并且购买API调用额度。已支持主流的模型供应商，例如 OpenAI的GPT 系列、Anthropic的Claude系列等。不同模型的能力表现、参数类型、价格都不一样。构建AI应用的流程和coze基本一致。可以嵌入到网页上，制作拥有业务数据的官网 AI智能客服。

## 接下来是Dify的部署流程：

官网上对部署服务器的要求只有- CPU >= 2 Core、- RAM >= 4 GiB，但是最最最重要的是！服务器能访问外网！这一点导致我找了好久bug，都没有解决，甚至想反复重装系统。一定需要海外服务器。必备。

接下来就是在服务器上安装docker和docker compose（版本要求：Docker 19.03 or later Docker Compose 1.28 or later） 我按照这个教程安装的 [blog.csdn.net/justlpf/art…](https://link.juejin.cn?target=https%3A%2F%2Fblog.csdn.net%2Fjustlpf%2Farticle%2Fdetails%2F132982953 'https://blog.csdn.net/justlpf/article/details/132982953') 过程非常简单，最后检查一下版本就可以。遇到的难解决的bug是关于docker镜像库的，最近有很多docker镜像库都挂了，在找教程的时候需要注意发布时间。

之后就是跟着dify官网进行本地部署（官方文档：[docs.dify.ai/zh-hans/get…](https://link.juejin.cn?target=https%3A%2F%2Fdocs.dify.ai%2Fzh-hans%2Fgetting-started%2Finstall-self-hosted%2Fdocker-compose 'https://docs.dify.ai/zh-hans/getting-started/install-self-hosted/docker-compose') ）如果顺利的话，完全不需要修改.env和docker_compose.yaml的（需要修改域名和数据库配置的另说）

启动成功之后就是进行大模型API KEY的配置，配了一圈豆包是最难整的。

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/086e02ffb7404253a0d4849434fff915~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWtpcmEwOTEy:q75.awebp?rk3s=f64ab15b&x-expires=1743752259&x-signature=FHdr1EFGq00otbcnO4AtKby3xqE%3D)

配置完之后就是对Dify工作流的继续探索了。