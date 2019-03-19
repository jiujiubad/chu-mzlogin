* 201804
* 工具+mac




### spotlight可以通过添加库文件，来扩展搜索功能。



## 一、扩展检索epub

> ### 参考文档：
>
> 1、知乎-Mac Os 如何全文检索epub格式文件？，https://www.zhihu.com/question/39231113
>
> 2、李笑来微信-如何在 MacOS Spotlight 里全文检索 epub 书库，https://mp.weixin.qq.com/s?__biz=MzAxNzI4MTMwMw==&mid=402187523&idx=1&sn=8bbd09c456dc921224863befa85c2d95#rd
>
> 3、测试用epub来源于-知笔墨网站，http://zhibimo.com/explore/books



### 步骤1 

下载文件，https://github.com/jaketmp/ePub-quicklook/releases/tag/v1.7

<img src="https://ws3.sinaimg.cn/large/006tNbRwgy1fpkxay1bytj30nb038t8k.jpg" width="600">

### 步骤2

分别解压得到以下两文件

<img src="https://ws2.sinaimg.cn/large/006tNbRwgy1fpkxbv0yc8j305x01e742.jpg" width="250">

### 步骤3

用spotlight打开terminal.app，在terminal中输入`open /Library/Spotlight`，把epub.mdimporter拖进去。

<img src="https://ws2.sinaimg.cn/large/006tNbRwgy1fpkxefgrt6j30d108t0st.jpg" width="350">

### 步骤4

在terminal中输入`open /Library/QuickLook`，把epub.qlgenerator拖进去。

<img src="https://ws2.sinaimg.cn/large/006tNbRwgy1fpkxfvh16hj30ch08uaa5.jpg" width="350">

### 步骤5

在terminal中输入`mdimport -r /Library/Spotlight/epub.mdimporter`，会重新加载索引。



## 二、扩展检索markdown

> ### 参考文档：
>
> 1、在 macOS 下为 Markdown 文件开启全文检索，http://www.zlovezl.cn/articles/macos-spotlight-markdow/?utm_source=tuicool&utm_medium=referral



### 步骤1

下载这份[Markdown.mdimporter.zip](http://www.zlovezl.cn/static/uploaded/2017/10/Markdown.mdimporter.zip) ，解压得到 **『Spotlight 使用的 importer 文件』**

### 步骤2

在terminal输入 `open /Library/Spotlight/` ，把**『Markdown.mdimporter』**拖入目录中。

### 步骤3

执行 `mdimport -r /Library/Spotlight/Markdown.mdimporter` 来让 Spotlight 手动加载 importer 文件

### 步骤4

因为 Spotlight 并不会实时更新索引，所以你需要触发强制更新：

* 打开 `System Preferences` -> `Spotlight`
* 点击 `Privacy` Tab 页面
* 将你的文档所在目录添加到列表中（大约5分钟生成索引），随后删除

之后 Spotlight 便会重建索引。等一会后，你就可以用 Spotlight 搜到你的 Markdown 文件了。



### 限制目录进行全文检索

Spotlight 默认会搜索所有目录的所有文档，如果你只想搜索某个特定的文件夹，可以使用 Spotlight 的命令行工具：`mdfind`

```
$ mdfind "django postgresql ORM" -onlyin ~/Dropbox/Documents/MDDocuments
~/Dropbox/Documents/MDDocuments/技术笔记/数据库/PostgreSQL Sharding 方案研究.md
```

如果你是 Alfred 用户，那你可以基于这个命令做一个 Workflow，专门用来检索你的 Markdown 目录，就像这样：

￼￼![img](http://www.zlovezl.cn/static//uploaded/2017/10/2017-10-31-07-56-52_thumb.jpg)

*我配置的 Alfred Workflow*

配置完这些后，终于可以安逸的安逸的快速搜索文档了。感谢 Spotlight，让我又少造了一个轮子。（擦汗）



## 三、关于Alfred工具

https://www.cnblogs.com/chijianqiang/p/alfred.html

