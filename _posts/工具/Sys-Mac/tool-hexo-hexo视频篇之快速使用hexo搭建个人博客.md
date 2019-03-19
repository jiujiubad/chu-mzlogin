---
title: tool-hexo-hexo视频篇之快速使用hexo搭建个人博客
date: '2018-01-11 00:10'
categories:
  - 工具
tags:
  - 工具
  - hexo
img: 'https://ws3.sinaimg.cn/large/006tNc79gy1fng9zj56ukj30d909st8n.jpg'
abbrlink: eea95795
---

* 201712
* 工具+其他



### 参考资料

[快速使用 Hexo 搭建个人博客](https://www.youtube.com/watch?v=Ud1xAhu7t2Y&t=5s)

[Hexo官网中文站点](https://hexo.io/zh-cn/)

[模板博客-好记性不如烂键盘](http://blog.parryqiu.com/)

# 序

开始之前，先强调几点：

* hexo几篇文章看的顺序：有基础的直接按**『主题篇Asnippet』**做；没有基础的可以先快速浏览一遍**『hexo视频篇』**然后按**『主题篇Asnippet』**做；遇到问题可以在**『主题篇Next』**搜索（因为第一次是折腾Next主题所以很多问题写在这一篇）。
* 关于博客如何分类、md格式文章怎么写，可以看**『hexo常用篇』**。


* hexo博客搭建到能用的程度，非常简单。但是主题等细节配置会有各种坑，如果纠结其中，可能三五天才能配置完。因此推荐用Asnippet主题，简单搭建能用就好，以免浪费太多注意力。一、Hexo 框架介绍

# 二、框架的本地安装与运行

## 1、安装命令

```
npm install hexo-cli -g  //安装hexo框架
hexo init blog  //注意：这里的blog是示例文件夹，可以改成自己想要的名称和位置
cd blog  //进入文件夹
npm install
hexo server
```

## 2、效果图

<img src="https://ws4.sinaimg.cn/large/006tNbRwgy1fnce67pf6fj30xw0ij0tr.jpg" width="500">

# 三、框架的基本结构与打包后的文件介绍

## 1、框架的基本结构如下图

<img src="https://ws4.sinaimg.cn/large/006tNbRwgy1fncdeyqo6aj30ka0k674z.jpg" width="500">

## 2、常用命令

1）最最常用的如下，详见官方文档hexo-文档-命令https://hexo.io/zh-cn/docs/commands.html

```
hexo clean //删除网站，即删除public文件夹
hexo g //生成网站，即生成public文件夹
hexo s //运行hexo，打开网址http://localhost:4000/查看博客
ctrl+c //停止hexo s
hexo d //部署到github，要先站点配置添加github地址
```

2）特别注意

* **『站点配置文件』**（见上图）更改后，一定要重启hexo（先ctrl+c停止hexo s，再重新hexo s）才能生效。
* **『主题配置文件』**（见上图）更改后，直接刷新http://localhost:4000/即可。

# 四、4 - Hexo 博客主题的安装与推荐

## 1、官网主题见https://hexo.io/themes/

1）点击主题图片可以预览，如http://haojen.github.io/

2）点击标题进入主题的github，如https://github.com/haojen/hexo-theme-Anisina

## 2、主题的安装

进入主题github，里边有详细的安装教程，主题安装基本都是下边两步：

### Step1、克隆主题

```
git clone https://github.com/Haojen/hexo-theme-Anisina.git themes/Anisina
```

### Step2、修改站点配置

1）打开**『站点配置文件』**`_config.yml`，然后修改主题`theme: Anisina`。

2）重启hexo（ctrl+c，再hexo s），打开http://localhost:4000/，可以看到主题已更改。

<img src="https://ws3.sinaimg.cn/large/006tNbRwgy1fnce5feaftj30wl0gi3yl.jpg" width="500">

# 五、如何自定义你的博客结构

1）推荐白色背景主题，最好手机自适应：[Light](https://hexo.io/hexo-theme-light/)、[Anisina](https://github.com/haojen/hexo-theme-Anisina)

2）比如这个Light博客。分类、标签云、统计http://blog.parryqiu.com/

<img src="https://ws4.sinaimg.cn/large/006tNbRwgy1fncetb97h4j30zp0jgwfw.jpg" width="500">



# 六、如何开始写博客文章以及文章的分类与标签

## 1、文章开头标签写法

1）hexo官方文档hexo-文档-Front-matter，https://hexo.io/zh-cn/docs/front-matter.html

<img src="https://ws4.sinaimg.cn/large/006tNbRwgy1fnck6zwnz9j30c709raaa.jpg" width="500">

2）示例（标题、日期、分类、标签）

```
---
title: hexo视频教程
date: 2018-01-11 09:00
categories:
- 博客
tags:
- 视频教程
- hexo
- 博客
---
```

## 2、小技巧：

1）用markdown写时要定义h1、h2、h3多级标题，主题会帮我们生成目录，提高阅读体验。

# 七、如何让代码在 Hexo 下显示的更加美观

## 1、代码高亮如何写

hexo官方文档hexo-文档-标签插件Tag Plugins，https://hexo.io/zh-cn/docs/tag-plugins.html

### Step1、在markdown文档里加入代码，如下

<img src="https://ws4.sinaimg.cn/large/006tNbRwgy1fncfgpgweej30qd0dngo6.jpg" width="500">

### Step2、修改主题

1）打开themes/主题文件夹/layout/_partial/head.ejs，引入css代码。

# 八、本地写作时图床的最佳解决方案

## 1、七牛云 

1）效果跟ipic类似，复制图片或截图后，直接在typora粘贴会自动上传成图床网址。

2）但是，感觉七牛云需要管理麻烦。

## 2、ipic（99现用）

1）截图，或复制网站上的图片后，`shift+command+u`上传

2）本地图片，点击后`command+u`上传

3）typora设置粘贴图片自动上传（编辑-图片工具-当插入本地图片时-使用ipic上传）。

>  如果需要备份本地图片，可以这样修改：
>
>  ①、编辑-图片工具-当插入本地图片时-拷贝到文件夹
>
>  ②、当文章写好后，编辑-图片工具-使用ipic上传本地图片

4）图片用img标签，可以改大小`<img src="" width="500">`

# 九、插件的安装与必备插件介绍

## 1、统计字数/阅读数

1）使用**『不蒜子 不如』**脚本http://ibruce.info/2015/04/04/busuanzi/

2）修改themes/主题文件夹/layout/_partial/after-footer.ejs

## 2、更多插件

1）hexo官方文档hexo-Plugins插件，https://hexo.io/plugins/

2）比如：

* hexo-all-minifier，做全局html、css、js的压缩
* hexo-cdnify，本地剪切板图片url上传到图床
* hexo-disqus-prxoy，解决Disuqs国内不能访问时的代理
* hexo-helper-qrcode，二维码

> 建议简洁，插件太多会影响博客加载。应该把主要精力放在提高文章质量上。

# 十、如何让你的博客接入评论系统

## 1、Disqus

国内被墙，国内用户看不到。

## 2、来必力

支持微信、微信登录。

## 3、畅言

需要博客备案。

## **『总结』**：

1）如果要用，推荐来必力。针对国外用户可用Disqus。

2）或干脆不用，打注意力用在写博客，交流放在微信、QQ。

# 十一、如何给你的博客增加搜索功能

静态网站没有数据库，不能再后端写搜索功能。只能变相实现搜索：

## 1、标签云

类似于分类的效果，不能做全文关键词检索。

## 2、swifttype

收费。原理是把我们的文章上传到它的数据库，然后提供接口网址给我们使用。

## 3、百度/google的site语法

比如搜索`site: blog.parryqiu.com/`。搜索结果取决于百度/google收录了多少你的文章。

## 4、本地站内搜索

## **『总结推荐』**

1）加入标签云

2）用本地搜索

# 十二、多个博客统计系统的接入方案分析

接入方案主要是js的部署，只要把统计平台的js部署到页脚就可以。

统计的重要性：流量来源、搜索关键字、阅读量。

## 1、友盟u-web

热点图，用户点击最多的位置。

## 2、百度统计

## 3、google统计

# 十三、部署博客到 GitHub 的技巧

## 1、Github pages是什么？

1）每个github的项目，提供一个页面用来展示你的项目。

> 注意：github pages做个人主页只能用`<username>.github.io`，做项目主页是用`<usernmae>.github.io/<projectname>`。
>
> 详见**『单个GitHub帐号下添加多个GitHub Pages的相关问题』**http://chitanda.me/2015/11/03/multiple-git-pages-in-one-github-account/

2）Github pages网址都是`项目名.github.io`。有自己的域名可以绑定，并配置CNAME。配置方法见**『Github Page 绑定域名』**http://justcoding.iteye.com/blog/1959736

## 2、也可以部署到自己的服务器

# 十四、Hexo 其他资源的介绍与分享

## 1、99文字版教程

## 2、知乎关于hexo主题的帖子，99喜欢snippet 