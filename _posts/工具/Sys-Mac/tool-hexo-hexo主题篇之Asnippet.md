---
title: tool-hexo-hexo主题篇之Asnippet
date: '2018-01-13 00:10'
categories:
  - 工具
tags:
  - 工具
  - hexo
img: 'https://ws3.sinaimg.cn/large/006tNc79gy1fng9zj56ukj30d909st8n.jpg'
abbrlink: 8d89ee75
top: 1
---

* 201712
* 工具+其他



# 序

一、开始之前，先强调几点：

* hexo几篇文章看的顺序：有基础的直接按**『主题篇Asnippet』**做；没有基础的可以先快速浏览一遍**『hexo视频篇』**然后按**『主题篇Asnippet』**做；遇到问题可以在**『主题篇Next』**搜索（因为第一次是折腾Next主题所以很多问题写在这一篇）。
* 关于博客如何分类、md格式文章怎么写，可以看**『hexo常用篇』**。


* hexo博客搭建到能用的程度，非常简单。但是主题等细节配置会有各种坑，如果纠结其中，可能三五天才能配置完。因此推荐用Asnippet主题，简单搭建能用就好，以免浪费太多注意力。


二、一再遇到的坑：

* ！！不要想着用git，项目直接错乱掉。遇到两次。
* ！！不要想着从github上面clone下来，包括自己的博客，clone下来不能用的。
* ！！不要想着拷贝别人的项目，重定向到原作者页面，一直改不了。遇到一次。——当然这是最快最快的方式，但一定要跟靠谱的人要，否则一大堆链接修改起来也相当麻烦。
* ！！以上每一个问题，都足够折腾一天而没有结果，心中早已千万只草泥马奔腾。hexo的路上，最讨厌的就是有时同样的操作，现在能生效，等下又不能生效，非常反人类。

三、如何备份？？

综上，用git项目容易坏掉，再加上github上clone的代码会出问题，那要怎么备份？？怎么保证换了电脑后能快速用上已经搭建好的项目？？

——blog搭建差不多时，压缩后放在百度网盘、或google网盘。以后定期备份，才能保证blog能用，且文章不丢失。





# 遇到的bug

1）hexo g时报错，因为md文章内出现不支持的字符，比如大小括号最好放在多行代码内，放在文字中可能会报错。在做小程序的笔记时，经常会遇到这个问题。比如

```
{{index}}
```



# 序

1、hexo三篇教程怎么用？

* 先快速过一遍视频篇，然后按Snippet篇做，遇到问题在Next篇查。

2、主题怎么选？

* 选手机电脑自适应的，因为手机绝逼主流。
* Next是最多人用的，但99坚决不选Next，在Next篇踩了无数坑，最终还做不出来什么效果。受够了这个主题。
* 进去github看看，选那些一年内还有在更新的。选这类主题更有可能挑到配置简单粗暴的，而且坑会少因为有些插件已经被淘汰。


# 一、从头开始用Asnippet主题

## 1、安装hexo及主题

1）按hexo视频篇安装hexo及主题

```
npm install hexo-cli -g
hexo init blog
cd blog
npm install
hexo server
```

2）**『Asnippet主题』**必须安装的组件，也可详见https://github.com/shenliyang/hexo-theme-snippet

````
npm install hexo-renderer-ejs --save
npm install hexo-renderer-less --save
npm install hexo-deployer-git --save
````

## 2、绑定github，改站点配置，然后hexo三兄弟

```
hexo clean
hexo g
hexo d
```

## 3、绑定域名

`touch source/CNAME`，填上域名`jiujiubad.top`。然后hexo三兄弟。

## 4、安装git

## ！！测试发现只会追踪配置文件，所以没卵用，还不如用md文档记录

```
git init
git remote add origin https://github.com/jiujiubad/jiujiubad.github.io
git checkout -b test //因为master要用来放静态网站，新建分支来放站点配置和主题配置文件。
git add .
git commit -m "git init"
git push origin test //部署到github。
```

# 二、主题功能（主）

开始前，一定要想清楚（前端套路深，不要瞎折腾）：

1、搭博客的目的是什么？**『集合文档，写过的东西在博客里都能搜索到。极少机会可能分享一两篇给小伙伴』**。

2、目的主要是让自己放文章、能搜索。那么最最必要的功能是：**『搜索、代码高亮、置顶、文章链接唯一化』**。

3、其他功能特别是只关乎前端显示的，不要碰！！等到把文章整理完成，有时间再做。

## 1、本地站内搜索

1）安装插件

```
npm i hexo-generator-json-content@2.2.0 -S
```

2）**『主题配置』**，把jsonContent下`searchLocal: true`

## 2、文章链接唯一化

默认用时间/标题来做链接，如果时间/标题修改了，分享出去的链接就失效。

> 启用插件要求文章必须写开头标签title等，否则会因为abbrlink:0而导入失败。

1）安装插件

```
npm install hexo-abbrlink --save
```

2）站点配置，修改permalink并增加abbrlink。配置完记得重启`hexo s`

```
permalink: posts/:abbrlink/  #原设置 :year/:month/:day/:title/
permalink_defaults:
# abbrlink config
abbrlink:
  alg: crc32  # 算法：crc16(default) and crc32
  rep: hex    # 进制：dec(default) and hex
```

查看sources/_posts文件夹内文章开头标签里，会多一个abbrlink: xxxxxxx。

## 3、代码高亮

### 3.1 修改css的步骤

1）themes/snippet/source/css/style.css，要修改的css基本都在这个文件里。

2）先用chrome检查所要修改的css名称，然后在style.css文件里搜索。

比如，字的样式太暗，用google检查找到样式。atom搜索比如.post-content pre，然后修改。

```
/*代码块字体颜色*/
.post-content pre {
  margin: 1.64em 0;
  border: none;
  border-left: 3px solid #dadada;
  padding-left: 10px;
  overflow: auto;
  line-height: 1.6;
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  color: #777;
  background-color: #f9f9f9;
}
/*代码块背景颜色*/
pre,
.highlight {
  overflow: auto;
  margin: 20px 0;
  padding: 0;
  color: #c5c8c6;
  font-size: 13px;
  background: #FFFECE;
  line-height: 1.6;
}
.highlight .code pre {
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #FFFECE;
}
.highlight .gutter pre {
  padding-left: 10px;
  padding-right: 10px;
  color: #777;
  text-align: right;
  background-color: #f7f6a5;
}
```

### 3.2 ！！不实用！！在md文档添加代码实现高亮

这是另外一种办法，但是操作太麻烦，已被我弃用。

该主题已自带，在markdown文件里的代码加在codeblock中间

```
{% codeblock lang:objc %}
lang是指要代码的种类，比如htom、css、jd。
这里写想要高亮的代码
{% endcodeblock %}
```

## 4、置顶文章

### Step1 安装hexo-generator-index

进入github，https://github.com/netcan/hexo-generator-index-pin-top，找到安装代码如下

```
npm uninstall hexo-generator-index --save
npm install hexo-generator-index-pin-top --save
```

> Asnippet主题已安装，但是版本比较老，所以要重新安装实现功能。

### Step2 配置站点文件

blog/_config.yml，加入代码

```
index_generator:
  path: ''
  per_page: 10
  order_by: -date
```

### Step3 md文档front-matter标签里加入代码

```
top: true
```

或者是

```
top: 数字 #数字越大越靠前
```

## 5、本站配色，与白色搭配

橙色#e67e22，用于主题。

粉红#D23C83，用于h1。

红色#C94D25，用于h2。

蓝色#3891D2，用于h3。

绿色#85991D，用于加粗。

土黄#B4881D

蓝绿#33A197

深蓝#2E8CD0



# 三、重要css

修改后注意对比手机自适应

1）主页左右空白间距。themes/snippet/layout/layout.ejs

```
<body>
  <div class="container-fluid">
    <div class="row">
      <%- partial('_partial/header') %>
      <%- partial('_partial/nav') %>
      <section class="content-wra aa99">
        <div class="row">
            <main class="col-md-9 main-content <%if(is_post()){%>m-post<%}%>">
                <%- body %>
            </main>
            <%- partial('_partial/sidebar', null, {cache: !config.relative_link}) %>
        </div>
      </section>
    </div>
  </div>
```

用媒体监听控制大小屏幕两边距。themes/snippet/source/css/style.css

```
@media (min-width: 600px) {
  .aa99 {
    padding: 0 30px;
  }
}
```

2）文章左右空白间距。themes/snippet/layout/post.ejs的`<article class="post">`

```
<article class="post pp99">
```

用媒体监听控制大小屏幕左边距。themes/snippet/source/css/style.css

```
@media (min-width: 600px) {
  .pp99 {
    padding-left: 35px;
  }
}
```

3）裁剪x方向多出的页面。themes/snippet/source/css/style.css

```
body {
  overflow-x: hidden; 
}
```

4）改首页文章图片大小。themes/snippet/source/css/style.css



# 四、主题功能（次）

不蒜子 比如，统计字数和阅读量

来必力评论

标签云

google分析或百度统计

导航

readme

设计文章命名规则：英文开头+xxx+要不要加时间

打赏二维码

修改完成后，打包到google硬盘

## 1、评论来必力

1）官网注册https://livere.com/

2）头像-管理页面-City版安装-填写网站链接、名称、类型-在一般代码一栏找到`data-uid="*********"`

3）**『主题配置』**，`livere_uid: **********`


