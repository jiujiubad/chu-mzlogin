* 201804
* 工具+mac



毫不夸张的说，Alfred乃是OS X上最能够提升效率的一款应用，是 Mac 平台上最为传奇的效率作品，誉为神兵利器毫不为过。



# 一、自定义网站搜索

Preferences-Web Search-Add custom search

* 翻译成中文zh：https://translate.google.cn/#en/zh-CN/{query}
* 翻译成英语en：https://translate.google.cn/#zh-CN/en/{query}
* 淘宝tb：http://s.taobao.com/search?oe=utf-8&f=8&q={query}
* 京东：https://search.jd.com/Search?keyword={query}&enc=utf-8
* 微信文章：http://weixin.sogou.com/weixin?type=2&query={query}
* stackoverflow：http://www.stackoverflow.com/search?q={query}
* github：https://github.com/search?utf8=%E2%9C%93&q={query}
* rails guides：https://ruby-china.github.io/rails-guides/index.html
* rails api：http://api.rubyonrails.org/
* ruby api：https://ruby-doc.org/core-2.5.0/



2）可搜索chrome标签

Preferences-Web Bookmarks-勾选Google Chrome Bookmarks。

Preferences-File Search-勾选Bookmarks。



3）关于Preferences-Default Results（默认结果）

* Essentials：可设置搜索“应用程序”、“联系人”、“设置”、“Safari书签”。
* Extras：可设置搜索“文件夹”、“文本文件”、“压缩文件”、“个人文档目录”、“图片”、“AppleScript”等其他文件。
* Unintelligent：`Search all file types`搜索所有文件类型。若勾选此项不但影响巡查速度，还混淆默认搜索结果。**Alfred建议用户使用Find+空格+文件名来查询文件或文件夹；使用Open+空格+文件名也可以。**
* Search Scope：设置Alfred查询时会**搜索的文件夹范围**，可自己添加和删除。
* Fallbacks：若上面的查询搜索不到结果时，就会调用这里设置的网站或搜索引擎来进行进一步的查询。默认反馈结果为Google、Amazon、Wikipedia网页搜索。



4）设置可以搜索md文件

Preferences-Default Results-Extras-勾选Text Files。这样就可以搜索“md 关键词”。 



5）搜索本机文件

调出Alfred，输入以下命令：

* `find`——定位文件，输入文件名找到后选中可以在Finder中打开
* `open`——输入关键词，回车直接打开结果文件，CMD+回车可以在Finder中打开这个文件所在的位置。等价命令有`'`和直接输入一个空格
* `in`——全文检索，可以对文件内容进行匹配



# 二、我的配置图201805

> 注意：Features-Default-Result 里一定要添加文件夹路径，否则会搜索不到

![Snip20180516_5](https://ws4.sinaimg.cn/large/006tNc79gy1frd3q39mm6j312o0n84f9.jpg)

![Snip20180516_6](https://ws4.sinaimg.cn/large/006tNc79gy1frd3q4n2znj312o0n8jyr.jpg)



![Snip20180516_7](https://ws1.sinaimg.cn/large/006tNc79gy1frd3q5nlnej312o0n8dnm.jpg)

![Snip20180516_8](https://ws4.sinaimg.cn/large/006tNc79gy1frd3q6jkf1j312o0n80zf.jpg)

![Snip20180516_10](https://ws3.sinaimg.cn/large/006tNc79gy1frd3q46syij311w0mg7bl.jpg)

![Snip20180516_11](https://ws4.sinaimg.cn/large/006tNc79gy1frd3q1yn5tj312o0n8wjv.jpg)

![Snip20180516_12](https://ws2.sinaimg.cn/large/006tNc79gy1frd3q538yqj30lo0jpdht.jpg)

# 三、问题

## 1、Alfred和spotlight无法跳转到应用程序页面

![](https://ws1.sinaimg.cn/large/006tKfTcgy1frfdkhmphfj30lo0hlwfd.jpg)

![](https://ws4.sinaimg.cn/large/006tKfTcgy1frfdl3gacjj30if06ngln.jpg)



# 四、工作流workflows

http://www.packal.org/workflow/terminalfinder