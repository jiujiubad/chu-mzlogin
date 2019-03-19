---
title: tool-hexo-hexo主题篇之Next
date: '2017-12-01 00:10'
categories:
  - 工具
tags:
  - 工具
  - hexo
img: 'https://ws3.sinaimg.cn/large/006tNc79gy1fng9zj56ukj30d909st8n.jpg'
abbrlink: 3b27e0ef
---

* 201712
* 工具+其他



# 序

开始之前，先强调几点：

* hexo几篇文章看的顺序：有基础的直接按**『主题篇Asnippet』**做；没有基础的可以先快速浏览一遍**『hexo视频篇』**然后按**『主题篇Asnippet』**做；遇到问题可以在**『主题篇Next』**搜索（因为第一次是折腾Next主题所以很多问题写在这一篇）。
* 关于博客如何分类、md格式文章怎么写，可以看**『hexo常用篇』**。


* hexo博客搭建到能用的程度，非常简单。但是主题等细节配置会有各种坑，如果纠结其中，可能三五天才能配置完。因此推荐用Asnippet主题，简单搭建能用就好，以免浪费太多注意力。



## 为什么选择hexo而不用vps搭建博客？

比起wp来说，hexo轻量级的多，而且易部署（指速度优化方面），也不需要一个专门的服务器来放置（这个其实是我选择hexo的最终原因。手里虽然有vps，但是因为跑着ss加上国内ping值太高，最终肯定影响国内速度，所以就一直没用来放blog）当然没有后台也就意味着不能随时随地写了就发，这个相对WP来说是弱势，但我感觉还好，毕竟不会常常在外面跑，而且写博客基本都是在电脑前，再不济也可以先把MD文件写完后拷回去发布。



## css

1）两种在文字前加红竖线：`box-shadow: -20px 0px 0px -10px red;`，或`border-left: 3px solid #FF1700;`

2）

```
![](./pic/pic1_50.png =100x100)
```



## 标签用哪些

ruby on rails、markdown、typora、vps、atom、bug、iterm





## 【问题】域名实名认证是不是就是已经备案？

不是的。实名认证是在网站如阿里云里认证，而备案是国家备案局的。

[ChinaZ域名备案批量查询](http://icp.chinaz.com/searchs)

[ICP备案查询](http://www.beianbeian.com/)

## 【问题】如果没有域名解析会怎样？

99初步理解，访问jiujiubad.github.io.时会解析成购买的jiujiuba.top。

## 【问题】域名解析要额外的钱吗？

不用，购买阿里云域名的域名就可以配置解析。

## 【问题】用vps从头搭建博客好，还是用hexo？

用hexo好，因为搭建很容易，博客能用就行没必要占用太多注意力。另外，hexo部署可以选在在gihub，也可以选在部署在vps服务器上。

## 【问题】博客文件开头除了title、categories，还要添加什么信息？

别搞那么复杂，写几个常用的就好，包括四个：title、date、categories、tags，指定文章再加上top。

其他诸如版权、评论、密码，还是算了，太占用注意力。

```
---
title: '20171014 搭建hexo博客'
date: 2017-12-08 12:06
categories:      #分类
tags:            #标签 
- 方法
- 但是

top:        #置顶，需要先配置

comments: true   #评论
copyright: true  #版权信息，需要先配置
password:   #密码，需要先配置
---
```







# Mac上搭建Hexo博客：入门篇

### 参考链接：

[【转发】Mac上搭建基于GitHub的Hexo博客](http://gonghonglou.com/2016/02/03/firstblog/)

[Hexo官网](https://hexo.io/)

[hexo下的next主题配置官方文档](http://theme-next.iissnan.com/getting-started.html)

[【转发】Mac上搭建基于GitHub的Hexo博客](jiujiubad.top)

[Hexo官网](https://hexo.io/)

# 序

第一到第四步，是hexo博客及next主题的安装。剩下的步骤是主题细节配置，按自己的使用习惯选择。

# 一、环境配置

## 1.Node.js

用来生成静态页面。移步[Node.js官网](https://nodejs.org/en/)，下载v5.5.0 Stable 一路安装即可。

## 2.Git

用来将本地Hexo内容提交到Github上。Xcode自带Git，这里不再赘述。如果没有Xcode可以参考[Hexo官网](https://hexo.io/docs)上的安装方法。



# 二、安装Hexo

当Node.js和Git都安装好后就可以正式安装Hexo了，终端执行如下命令：

```
$ sudo npm install -g hexo

```

输入管理员密码（Mac登录密码）即开始安装 (`sudo`:linux系统管理指令 `-g`:全局安装)

> 注意坑一：[Hexo官网](https://hexo.io/docs)上的安装命令是`$ npm install -g hexo-cli`，安装时不要忘记前面加上`sudo`，否则会因为权限问题报错。

## 初始化

终端cd到一个你选定的目录，执行`hexo init`命令：

```
$ hexo init blog

```

`blog`是你建立的文件夹名称。cd到`blog`文件夹下，执行如下命令，安装npm：

```
$ npm install

```

执行如下命令，开启hexo服务器：

```
$ hexo s

```

此时，浏览器中打开网址[http://localhost:4000](http://0.0.0.0:4000/)，能看到如下页面：

[![http://localhost:4000](http://image.gonghonglou.com/firstblog/hexo4000.png)](http://image.gonghonglou.com/firstblog/hexo4000.png)

本地设置好后，接下来开始关联Github。



# 三、关联Github

## 1、部署github

### Step1 新建仓库

1）登录你的Github帐号，新建仓库，名为`用户名.github.io`固定写法，如下图中`1`所示：

![](http://image.gonghonglou.com/firstblog/githubName.png)

2）PS：本地的`blog`文件夹下内容为：

```
_config.yml	
db.json 
node_modules 
package.json
scaffolds
source
themes
```

### Step2 修改站点配置

终端cd到`blog`文件夹下，`vim`打开站点配置文件`_config.yml`，用atom编辑或用linux命令`vim _config.yml`。

打开下滑到最后，修改成下边的样子：

```
deploy:
  type: git
  repository: https://github.com/jiujiubad/jiujiubad.github.io.git
  branch: master
```

你需要将`repository`后`gonghonglou`换成你自己的用户名，地址在上图`2`位置获取。

> 注意坑二：在配置所有的`_config.yml`文件时（包括theme中的），在所有的冒号`:`后边都要加一个空格，否则执行hexo命令会报错，切记 切记

### Step3 生成静网站并部署

1）

```
hexo g //生成静态网站，对应专案下的public文件夹
```

> 此时若出现如下报错：
> ERROR Local hexo not found in ~/blog
> ERROR Try runing: 'npm install hexo --save'
>
> 则执行命令：
> npm install hexo --save
>
> 若无报错，自行忽略此步骤。

2）执行配置命令：

```
hexo d //部署到github
```

> 注意坑三：若执行命令`hexo d`仍然报错：无法连接git或找不到git，则执行如下命令来安装[hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)
>
> ```
> npm install hexo-deployer-git --save  
> ```
>
> 再次执行`hexo g`和`hexo d`命令。

若你未添加Github的SSH key，则执行`hexo d`命令时终端会提示你输入Github的用户名和密码，即

```
Username for 'https://github.com': 输入github用户名
Password for 'https://github.com': 输入github密码
```

`hexo d`命令执行成功后，浏览器中打开网址[http://gonghonglou.github.io](http://gonghonglou.github.io/)（将`gonghonglou`换成你的用户名）能看到和打开`http://localhost:4000`时一样的页面。

## 2、添加公钥ssh key（部署github不用输入账号密码）

### Step1 检查SSH keys是否存在Github

执行如下命令，检查SSH keys是否存在。如果有文件`id_rsa.pub`或`id_dsa.pub`，则直接进入步骤1.3将SSH key添加到Github中，否则进入下一步生成SSH key。

```
$ ls -al ~/.ssh

```

### Step2 生成新的ssh key

执行如下命令生成public/private rsa key pair，注意将`your_email@example.com`换成你自己注册Github的邮箱地址。

```
$ ssh-keygen -t rsa -C "your_email@example.com"

```

默认会在相应路径下（`~/.ssh/id_rsa.pub`）生成`id_rsa`和`id_rsa.pub`两个文件。

### Step3 将ssh key添加到Github中

* Find前往文件夹`~/.ssh/id_rsa.pub`打开id_rsa.pub文件，里面的信息即为SSH key，将这些信息复制到Github的Add SSH key页面即可。

  * mac显示隐藏文件夹和文件

  ```
  defaults write com.apple.finder AppleShowAllFiles -boolean true ; killall Finder
  ```

  * 再次隐藏输入

  ```
  defaults write com.apple.finder AppleShowAllFiles -boolean false ; killall Finder
  ```

  * id_rsa.pub这种pub结尾的文件怎么打开？
  * 用atom等编辑器，打开后全部复制粘贴到github的ssh设置中

* 进入Github –> Settings –> SSH keys –> add SSH key:

* Title里任意添一个标题（或不添加），将复制的内容粘贴到Key里，点击下方`Add key`绿色按钮即可。

## 3、发布文章

终端cd到`blog`文件夹下，执行如下命令新建文章：

```
$ hexo new "postName"
```

名为`postName.md`的文件会建在目录`/blog/source/_posts`下，`postName`是文件名，为方便链接不建议掺杂汉字。你当然可以用vim来编辑文章。我在用Mou编辑器，支持预览，虽然其预览主题并非我喜欢，如果你有好用的markdown编辑器请推荐给我，感激不尽！

文章编辑完成后，终端cd到`blog`文件夹下，执行如下命令来发布：

```
hexo generate			//生成静态页面

hexo deploy			//将文章部署到Github

```

**至此，Mac上搭建基于Github的Hexo博客就完成了。下面的内容是介绍安装theme和绑定个人域名，如果有兴趣且还有耐心的话，请继续吧。**







# Mac搭建Hexo博客：进阶篇

# 一、安装主题

你可以到[Hexo官网主题页](https://hexo.io/themes/)去搜寻自己喜欢的theme。最常用最多人用的是[hexo-theme-next](https://github.com/iissnan/hexo-theme-next)，以此为例。

### Step1

终端cd到 `blog` 目录下执行如下命令：

```
$ git clone https://github.com/iissnan/hexo-theme-next themes/next
```

### Step2

将`blog`目录下`_config.yml`里`theme`的名称`landscape`修改为`next`

### Step3

终端cd到`blog`目录下执行如下命令(每次部署文章的步骤)：

```
hexo clean //删除网站，即删除public文件夹
hexo g //生成网站，即生成public文件夹
hexo d //部署到github，要先站点配置添加github地址

hexo s //运行hexo，打开网址http://localhost:4000/查看博客
ctrl+c //停止hexo s
```

> 至于更改theme内容比如名称、描述、头像等去修改`blog/_config.yml`文件和`blog/themes/next/_config.yml`文件中对应的属性名称即可， 不要忘记冒号`:`后加空格。 [NexT 使用文档](http://theme-next.iissnan.com/)里有极详细的介绍。



## 【bug】、解决 deploy 后博客空白问题

昨晚更新了一下 blog 做了个部署，结果blog就挂了，打开 `gonghonglou.com` 页面显示一片空白。然而 `hexo s`开启本地服务器 `localhost:4000` 访问是没问题的。
上网查了一下，原来是 GitHub Pages 禁止了 `source/vendors` 目录的访问。Github 在 11 月 3 日更新了版本。其中包括升级了 Jekyll 到 3.3。Jekyll 为了加快构建速度，忽略 `vendor` 和 `node_modules` 文件夹。所以部署到 GitHub 后，识别不到本地下的的这个文件夹 `blog/themes/next/source/vendor`，你只需要给这个文件夹换个名字再重新部署一次就 OK 了。`nexT` 在 GitHub 上的 isusses 已经给出了解决方案：[#1214](https://github.com/iissnan/hexo-theme-next/issues/1214)

[![#1214](http://image.gonghonglou.com/firstblog/update-hexo-folder.png)](http://image.gonghonglou.com/firstblog/update-hexo-folder.png)

还有另一种解决方案就是升级 `nexT` 主题，cd 到 `blog/themes/next/` 下执行命令 `git pull` 更新。
然而，有可能升级后多说评论等第三方工具会失效，慎用。



# 进阶前、需要知道的命令：

### ①、修改本地配置后要ctrl+c关闭hexo s的窗口，再重新hexo s才会在localhost:4000/上生效。

### ②、如果是继续上传更多文件，把文件放入`专案/source/_posts文件夹`中，然后hexo g，重新hexo s在localhost:4000上可以查看本地效果。最后hexo d 上传到github。

### ③、如果想清空文章重新上传，先hexo clean，把文件放入`专案/source/_posts文件夹`中，然后hexo g，重新hexo s在localhost:4000上可以查看本地效果。最后hexo d 上传到github。



# 进阶一、绑定个人域名

现在使用的域名是Github提供的二级域名，也可以绑定为自己的个性域名。购买域名，可以到[GoDaddy官网](https://sg.godaddy.com/zh/)，网友亲切称呼为：狗爹，也可以到[阿里万网](http://wanwang.aliyun.com/)购买。我是在万网买的，可直接在其网站做域名解析。

## 1.Github端

### Step1 新建CNAME

1）`touch source/CNAME`，最好用touch新建，试过在atom用右键新建文件类型不一样。

2）CNAME写入你的域名，如`jiujiubad.top`。

3）重新部署。注意三个命令都要执行，否则CNAME不会部署到github。

```
hexo clean
hexo g
hexo d
```

> 注意坑四：网上许多都是说在Github上直接新建`CNAME`文件，如果这样的话，在你下一次执行`hexo d`部署命令后`CNAME`文件就消失了，因为本地没有此文件嘛。

## 2.域名解析

如果将域名指向一个域名，实现与被指向域名相同的访问效果，需要增加CNAME记录。登录万网，在你购买的域名后边点击：解析 –> 添加解析

<img src="https://ws1.sinaimg.cn/large/006tNbRwgy1fncpwtssw7j30jk0ajmxb.jpg" width="500">

记录类型：CNAME

主机记录：将域名解析为[example.com](http://example.com/)（不带www），填写@或者不填写

记录值：gonghonglou.github.io. (不要忘记最后的`.`，`gonghonglou`改为你自己的用户名)，点击保存即可，如下图：

[![域名解析](http://localhost:4000](http://image.gonghonglou.com/firstblog/yumingjiexi.png)](http://image.gonghonglou.com/firstblog/yumingjiexi.png)

此时，点击访问[http://gonghonglou.com](http://gonghonglou.com/)和访问[http://gonghonglou.github.io](http://gonghonglou.github.io/)效果一致。

大功告成！



## 进阶二、将个人博客同时部署到 GitHub 和 Coding

## ！！！不要折腾了，Coding有广告不好用

1、首先到 [Coding](https://coding.net/) 上注册并开一个项目，项目名称和用户个性后缀相同（方便二级域名访问博客），拿到项目的 https 地址

2、打开本地 `blog` 目录下的 `_config.yml` 文件，修改如下

```
deploy:
  type: git
  repository: 
            github: https://github.com/gonghonglou/gonghonglou.github.io.git
            coding: https://git.coding.net/gonghonglou/gonghonglou.git
  branch: master

```

3、cd 到本地 `blog/source` 目录下执行如下命令新建 `Staticfile` 文件

```
$ touch Staticfile  #名字必须是Staticfile

```

原因是 coding.net 需要以这个文件来作为静态文件部署的标志，就是说看到这个 Staticfile 就知道按照静态文件来发布。

4、执行发布命令 `hexo g` 、 `hexo d`

5、个人域名添加两条 `CNAME` 解析。将 `gonghonglou.github.io.` 解析为 [海外] ，将 `gonghonglou.coding.me.` 解析为 [默认]
[![img](http://image.gonghonglou.com/firstblog/two-cname.png)](http://image.gonghonglou.com/firstblog/two-cname.png)

这样就是为了从国内访问 `gonghonglou.com` 就是访问 Coding 上的博客项目，从国外访问 `gonghonglou.com`就是访问 GitHub 上的博客项目。

6、到 Coding 上的博客项目主页，点击 `Pages服务` 输入部署分支 `master` 立即开启

[![img](http://image.gonghonglou.com/firstblog/coding-pages.png)](http://image.gonghonglou.com/firstblog/coding-pages.png)

这样就可以访问自己在 Coding 上的个人博客了 [gonghonglou.coding.me/gonghonglou](http://gonghonglou.coding.me/gonghonglou) 如果像这样你的用户后缀名与博客项目名称相同你还可以省略项目名称直接访问 [gonghonglou.coding.me](http://gonghonglou.coding.me/)

* 【bug】显示仓库尚未初始化，不能选择部署分支？

* 解决办法：原因是代码还没上传，回到终端或item看看，发现没有登录。

  ![](https://ws1.sinaimg.cn/large/006tKfTcgy1fm9ebys8yxj318w0r0aef.jpg)

7、添加域名绑定，输入个人域名就 OK 了，可能需要耐心等待几分钟，这样在国内访问自己的博客就快得多了。

试了一下在国内访问 [gonghonglou.com](http://gonghonglou.com/) 拦不住 要飞起来了😂

* 【bug】这一步没做，直接输入网址出现404

* 解决办法：升级银牌会员（补充个人资料即可）注意别漏填了最上方的手机号，然后绑定域名。

  ![](https://ws2.sinaimg.cn/large/006tKfTcgy1fm9eoy727gj31am0gc77a.jpg)

8、可以为coding.net上的设置，也添加SSH公钥，方法跟上面github的操作一样，因为一台电脑用一个公钥所以不用重复生成，直接复制代码即可。







# 搭建后的美化（只选参考链接中自己需要的功能）

## 参考链接：

[hexo博客的背景设置](http://blog.csdn.net/com_ma/article/details/76039859)



## 5. 修改文章内链接文本样式

### **实现效果图**

![img](http://upload-images.jianshu.io/upload_images/5308475-8cc4fc18c399af7e.gif?imageMogr2/auto-orient/strip)

### **具体实现方法**

修改文件 `themes\next\source\css\_common\components\post\post.styl`，在末尾添加如下css样式，：

```
// 文章内链接文本样式
.post-body p a{
  color: #0593d3;
  border-bottom: none;
  &:hover {
    color: #fc6423;
    border-bottom: none;
    border-bottom: 1px solid #fc6423;
  }
}
```

其中选择`.post-body` 是为了不影响标题，选择 `p` 是为了不影响首页“阅读全文”的显示样式,颜色可以自己定义。

`border-bottom: 1px solid #fc6423;`这一行是下划线。

注意：这样设置后是不能在链接前加* 的，加*后颜色不能改变。



# 9. 博文压缩

## ！！不要折腾了，没卵用感觉更慢

作用是去掉多余代码，加速网站。在站点的根目录下执行以下命令：

```
$ npm install gulp -g
$ npm install gulp-minify-css gulp-uglify gulp-htmlmin gulp-htmlclean gulp --save
```

在如下图所示，新建 `gulpfile.js` ，并填入以下内容：

![img](http://upload-images.jianshu.io/upload_images/5308475-bb959c3fb610e69c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
// 压缩 public 目录 css
gulp.task('minify-css', function() {
    return gulp.src('./public/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./public'));
});
// 压缩 public 目录 html
gulp.task('minify-html', function() {
  return gulp.src('./public/**/*.html')
    .pipe(htmlclean())
    .pipe(htmlmin({
         removeComments: true,
         minifyJS: true,
         minifyCSS: true,
         minifyURLs: true,
    }))
    .pipe(gulp.dest('./public'))
});
// 压缩 public/js 目录 js
gulp.task('minify-js', function() {
    return gulp.src('./public/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});
// 执行 gulp 命令时执行的任务
gulp.task('default', [
    'minify-html','minify-css','minify-js'
]);
```

生成博文是执行 `hexo g && gulp` 就会根据 `gulpfile.js` 中的配置，对 public 目录中的静态资源文件进行压缩（以后使用hexo g可以看到每个文件在压缩的进度百分之多少）。



# 10. 修改“代码块自定义样式

**实现效果图**

![img](http://upload-images.jianshu.io/upload_images/5308475-e83a6ac00d4d1db3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**具体实现方法**

打开`\themes\next\source\css\_custom\custom.styl`,向里面加入：(颜色可以自己定义)

```
// 小代码块的样式
code {
    color: #ff7600;
    background-color: rgba(255,255,255,0.1);
    font-size: 16px;
}
// 大代码块的自定义样式
.highlight, pre {
    margin: 5px 0;
    padding: 5px;
    border-radius: 3px;
}
.highlight, code, pre {
    border: 1px solid #d6d6d6;
}
```







# 16. 添加 README.md 文件

每个项目下一般都有一个 `README.md` 文件，但是使用 hexo 部署到仓库后，项目下是没有 `README.md`文件的。

在 Hexo 目录下的 `source` 根目录下添加一个 `README.md` 文件，修改站点配置文件 _`config.yml`，将`skip_render` 参数的值设置为

```
skip_render: README.md
```

保存退出即可。再次使用 `hexo d` 命令部署博客的时候就不会在渲染 README.md 这个文件了。



# 18. 实现统计功能

**实现效果图** 
![img](http://upload-images.jianshu.io/upload_images/5308475-11cf11fe888748a9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**具体实现方法**

在根目录下安装 `hexo-wordcount`,运行：

```
$ npm install hexo-wordcount --save
```

然后在主题的配置文件中，配置如下：

```
# Post wordcount display settings
# Dependencies: https://github.com/willin/hexo-wordcount
post_wordcount:
  item_text: true
  wordcount: true
  min2read: true
```



# 20. 在文章底部增加版权信息

![img](http://upload-images.jianshu.io/upload_images/5635196-dbef3367dcfacf67.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700)

1、主题默认的版权声明配置在`themes\next\_config.yml`文件中，设置如下：

```
# Declare license on posts
post_copyright:
  enable: false
  license: CC BY-NC-SA 3.0
  license_url: https://creativecommons.org/licenses/by-nc-sa/3.0/

```

2、打开`next\layout/_macro/`，新建`my-copyright.swig`：

```
{% if page.copyright %}
<div class="my_post_copyright">
  <script src="//cdn.bootcss.com/clipboard.js/1.5.10/clipboard.min.js"></script>

  <!-- JS库 sweetalert 可修改路径 -->
  <script type="text/javascript" src="http://jslibs.wuxubj.cn/sweetalert_mini/jquery-1.7.1.min.js"></script>
  <script src="http://jslibs.wuxubj.cn/sweetalert_mini/sweetalert.min.js"></script>
  <link rel="stylesheet" type="text/css" href="http://jslibs.wuxubj.cn/sweetalert_mini/sweetalert.mini.css">
  <p><span>文章作者:</span><a href="/" title="访问 {{ theme.author }} 的个人博客">{{ theme.author }}</a></p>
  <p><span>最后更新:</span>{{ page.updated.format("YYYY年MM月DD日 HH:MM:ss") }}</p>
  <p><span>原始链接:</span><a href="{{ url_for(page.path) }}" title="{{ page.title }}">{{ page.permalink }}</a></p>
  <p><span>版权声明:</span>本博客所有文章除特别声明外，均采用 <i class="fa fa-creative-commons"></i> <a rel="license" href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank" title="Attribution-NonCommercial-ShareAlike 3.0 Unported (CC BY-NC-SA 3.0)"> BY-NC-SA 3.0 许可协议</a>，转载请注明出处！</p>  
</div>
{% endif %}


```

3、打开`/next/source/css/_common/components/post/`， 添加`my-post-copyright.styl`：

```
.my_post_copyright {
  width: 96%;
  max-width: 65em;
  margin: 2.8em auto 0;
  padding: 0.5em 1.0em;
  border-left: 3px solid #FF0000;
  font-size: 0.85rem;
  line-height: 1.6em;
  word-break: break-all;
  background: rgba(255,255,255,0.4);
}
.my_post_copyright p{margin:0;}
.my_post_copyright span {
  display: inline-block;
  width: 5.2em;
  color: #000000;
  font-weight: normal;
}
.my_post_copyright .raw {
  margin-left: 1em;
  width: 5em;
}
.my_post_copyright a {
  color: #808080;
  border-bottom:0;
}
.my_post_copyright a:hover {
  color: #a3d2a3;
  text-decoration: underline;
}
.my_post_copyright:hover .fa-clipboard {
  color: #000;
}
.my_post_copyright .post-url:hover {
  font-weight: normal;
}
.my_post_copyright .copy-path {
  margin-left: 1em;
  width: 1em;
  +mobile(){display:none;}
}
.my_post_copyright .copy-path:hover {
  color: #808080;
  cursor: pointer;
}

```

如果想要更改版权模块的红条颜色、背景颜色、透明度等，可以在`.my_post_copyright`标签里更改。

4、修改`next/layout/_macro/post.swig`，在代码

```
{% if theme.wechat_subscriber.enabled and not is_index %}
      <div>
        {% include 'wechat-subscriber.swig' %}
      </div>
{% endif %}


```

之前添加增加如下代码：

```
<div>
      {% if not is_index %}
        {% include 'my-copyright.swig' %}
      {% endif %}
</div>


```

5、修改  `next/source/css/_common/components/post/post.styl`文件，在最后一行增加代码：

```
@import "my-post-copyright"

```

6、PS：如果要在该博文下面增加版权信息的显示，需要在文章头部中增加`copyright: true`的设置，类似：

```
---
title: 
date: 
tags: 
categories: 
copyright: true
---


```

如果你感觉每次新建文章都要添加比较麻烦，可以直接更改文章的模板文件，这样新建文章时就会自动添加`copyright: true`。 打开`根目录/scaffolds/post.md`， 做类似设置：

```
title: {{ title }}
date: {{ date }}
tags:
categories:
comments: 
password: 
copyright: true

```



# 22. 隐藏网页底部powered By Hexo / 强力驱动

打开`themes/next/layout/_partials/footer.swig`,使用””隐藏之间的代码即可，或者直接删除。位置如图：

![img](http://upload-images.jianshu.io/upload_images/5308475-8e8340c7a0489bce.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

用谷歌检查和command+shift+f全局搜索，替换成自己喜欢的文字。



# 24. 文章加密访问

**实现效果图**

![img](http://upload-images.jianshu.io/upload_images/5308475-0c7e5e61b78dc937.gif?imageMogr2/auto-orient/strip)

**具体实现方法**

打开`themes->next->layout->_partials->head.swig`文件,在以下位置插入这样一段代码：

![img](http://upload-images.jianshu.io/upload_images/5308475-446793cd6d740b19.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

代码如下：

```
<script>
    (function(){
        if('{{ page.password }}'){
            if (prompt('请输入文章密码') !== '{{ page.password }}'){
                alert('密码错误！');
                history.back();
            }
        }
    })();
</script>

```

然后在文章上写成类似这样：

![img](http://upload-images.jianshu.io/upload_images/5308475-e6c726a0152cb8ee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



# 25. 添加jiathis分享

在**主题配置文件**中，jiathis为true，就行了，如下图

![img](http://upload-images.jianshu.io/upload_images/5308475-f381bc9e7c73b1e6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

默认是这样子的： 
![img](http://upload-images.jianshu.io/upload_images/5308475-a88228b9ea43ab2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
如果你想自定义话，打开`themes/next/layout/_partials/share/jiathis.swig`修改画红线部分就可以了 
![img](http://upload-images.jianshu.io/upload_images/5308475-68c51498744e1636.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



# 26. 博文置顶

修改 `hero-generator-index` 插件，把文件：`node_modules/hexo-generator-index/lib/generator.js` 内的代码替换为：

```
'use strict';
var pagination = require('hexo-pagination');
module.exports = function(locals){
  var config = this.config;
  var posts = locals.posts;
    posts.data = posts.data.sort(function(a, b) {
        if(a.top && b.top) { // 两篇文章top都有定义
            if(a.top == b.top) return b.date - a.date; // 若top值一样则按照文章日期降序排
            else return b.top - a.top; // 否则按照top值降序排
        }
        else if(a.top && !b.top) { // 以下是只有一篇文章top有定义，那么将有top的排在前面（这里用异或操作居然不行233）
            return -1;
        }
        else if(!a.top && b.top) {
            return 1;
        }
        else return b.date - a.date; // 都没定义按照文章日期降序排
    });
  var paginationDir = config.pagination_dir || 'page';
  return pagination('', posts, {
    perPage: config.index_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
};

```

在文章中添加 `top` 值，数值越大文章越靠前，如

```
---
title: 解决Charles乱码问题
date: 2017-05-22 22:45:48
tags: 技巧
categories: 技巧
copyright: true
top: 100
---

```







# Hexo NexT Disqus 评论插件

# 注册Disqus账号

  登陆`disqus.com`注册账号。注册过程，不多做说明。

# 进行邮箱确认

  注册了disqus账号之后，一定要去邮箱点击一下确认。我当时就是没有点击确认，好像就没有进行下去，还是区点击一下确认吧。

# 进入 Disqus Home 页

### 应该在`disqus.com/home`

[![Disqus home 页](http://www.lmnsyunhao.cn/images/hexo-disqus-comments/disqusHome.png)](http://www.lmnsyunhao.cn/images/hexo-disqus-comments/disqusHome.png)

### 之后点击右上角的齿轮，再点击 Add Disqus To Site。找到页面最下边的 Get Started 按钮。

[![GET STARTED](http://www.lmnsyunhao.cn/images/hexo-disqus-comments/getStarted.png)](http://www.lmnsyunhao.cn/images/hexo-disqus-comments/getStarted.png)

### 之后点击下面的install Disqus。

[![I want to install Disqus on my site](http://www.lmnsyunhao.cn/images/hexo-disqus-comments/disqusHome.png)](http://www.lmnsyunhao.cn/images/hexo-disqus-comments/disqusHome.png)

### 注意WebsiteName，这个名字要用到配置文件中的。起一个你喜欢的。

[![Website Name](http://www.lmnsyunhao.cn/images/hexo-disqus-comments/websiteName.png)](http://www.lmnsyunhao.cn/images/hexo-disqus-comments/websiteName.png)

# 设置主题配置文件

  打开主题配置文件。找到如下的位置：

```
# Disqus
disqus:
  enable: true
  shortname: ******
  count: true

```

  shortname的位置就填写刚刚的 WebSite Name 的名字。这样就配置好了。

# 重新部署

```
hexo clean
hexo g
hexo d

```

# PS

  不过，Disqus墙没墙掉我也不太清楚，让我很是无奈。



# 【】参考链接

http://www.cnblogs.com/MuYunyun/p/6919600.html#_label1

# 1）文章链接唯一化

也许你会数次更改文章题目或者变更文章发布时间，在默认设置下，文章链接都会改变，不利于搜索引擎收录，也不利于分享。唯一永久链接才是更好的选择。

安装

`npm install hexo-abbrlink --save`

在`站点配置文件`中查找代码`permalink`，将其更改为:

`permalink: posts/:abbrlink/  # “posts/” 可自行更换`

这里有个知识点：

> 百度蜘蛛抓取网页的规则: 对于蜘蛛说网页权重越高、信用度越高抓取越频繁，例如网站的首页和内页。蜘蛛先抓取网站的首页，因为首页权重更高，并且大部分的链接都是指向首页。然后通过首页抓取网站的内页，并不是所有内页蜘蛛都会去抓取。

搜索引擎认为对于一般的中小型站点，3层足够承受所有的内容了，所以蜘蛛经常抓取的内容是前三层，而超过三层的内容蜘蛛认为那些内容并不重要，所以不经常爬取。出于这个原因所以permalink后面跟着的最好不要超过2个斜杠。

然后在`站点配置文件`中添加如下代码:

```
# abbrlink config
abbrlink:
  alg: crc32  # 算法：crc16(default) and crc32
  rep: hex    # 进制：dec(default) and hex

```

可选择模式：

* crc16 & hex
* crc16 & dec
* crc32 & hex
* crc32 & dec

# 2）新建文件时，怎么在md即markdown文件的开头加入标题等信息

打开`scaffolds/post.md`，修改如下：

```
---
title: {{ title }}
date: {{ date }}
categories: 未分类 #分类，设为未分类，以后找到统一更改
tags:             #标签
copyright: true   #版权信息，转发的文章再手动去掉true
password:         #密码，需要就加数字
top:              #置顶，需要就加数字，越大越靠前
---

```



# 3）添加酷炫的打赏二维码

看了好些博客，支付宝的收款码和微信的收款码都是分开的，且是没有美化过的二维码，让人打赏的欲望自然就下降了。来看一下我的赞赏二维码(支持微信和支付宝支付哟)

实现这个酷炫二维码的流程如下：

* 首先，分别获得支付宝和微信的收款码
* 接着到[芝麻二维码](https://www.hotapp.cn/shouqian)里将两张二维码合并
* 最后到[第九工场](http://www.9thws.com/)生成自己喜欢的造型

讲生成的图片pay.png放到根目录的source文件中，并在主题配置文件中加上

`alipay: /pay.png`

##### 打赏字体不闪动

修改文件`next/source/css/_common/components/post/post-reward.styl`，然后注释其中的函数`wechat:hover`和`alipay:hover`，如下：

```
/* 注释文字闪动函数
 #wechat:hover p{
    animation: roll 0.1s infinite linear;
    -webkit-animation: roll 0.1s infinite linear;
    -moz-animation: roll 0.1s infinite linear;
}
 #alipay:hover p{
   animation: roll 0.1s infinite linear;
    -webkit-animation: roll 0.1s infinite linear;
    -moz-animation: roll 0.1s infinite linear;
}
*/

```







[在不同电脑上进行Hexo写作与同步](https://leroyli.github.io/2016/11/07/hexo-more-PC/)

## 【问题4】hexo next怎么做文章管理，如果电脑坏掉的话？私人文章会不会泄露?

* ①、本地**文件夹做分类**，一是断网的时候可以查找。

* ②、保证电脑坏了posts也不会丢失，**定期打包放到google**。如果google也坏了，那就没有源文件了，但起码hexo上还有文章可以慢慢复制。

* ③、1）github干脆不要放posts了，有些私人文章。2）或是把所有私人文章都加一个统一前缀和密码，在push到github前把它们从post文件夹移到其他位置，push后再移动回post文件夹执行hexo g和hexo d。3）私人文章加统一前缀，自己在电脑和google放着，不发布。——偏向第2种，因为公开的文章在github和hexo都能被复制走，隐藏的文章加密码在手机或其他设备还能查看，又不会在github上直接泄露密码。但是，**如果频繁更改hexo配置，就先用第3种，等到配置完成了再用回第2种方法**。

* ②、github备份专案，方便换电脑写文章。把post文件夹里的私人文件移开（留几篇公开文章）、然后git push到github（最好先检查_config.yml里有没有密钥，有就先移开），push后再把私人文件移回去执行hexo g和hexo d。如果没有更改配置，就不要随便git push了，每次都要移动私人文件太麻烦。

  ```
  .gitignore

  .DS_Store
  Thumbs.db
  db.json
  *.log
  node_modules/
  public/
  .deploy*/
  _config.yml

  ```



## 【问题1】图片二维码插入？



## 【问题4】背景白色改成用图片？

1. 首先找到一个背景图片放到 hexo（hexo工程文件）-> themes -> next -> source -> images 的路径下；
2. hexo（hexo工程文件）-> themes -> next -> source -> css -> _custom ，打开`\themes\next\source\css\_custom\custom.styl`，加上一代码 `body { background:url(/images/backGround.jpg（背景图片的名字）);}` 

效果图： 
![](https://ws3.sinaimg.cn/large/006tNc79gy1fmapcueipuj31i80tydon.jpg)

## 【问题3】背景色修改

在 `source/css/_variables/base.styl` 中：

```
// Background color for <body>
$body-bg-color                = white

```

修改themes/next/source/css/_schemes/Mist/_header.styl文件中头部的背景色为base.styl定义的背景色

```
.header { background: $whitesmoke; } #在这里改颜色
.header-inner {
  padding: 40px 0 40px; #这里改header的大小
  clearfix();

  +mobile() {
    width: auto;
    margin-bottom: 50px;
    padding: 10px;
  }
}

```

修改themes/next/source/css/_schemes/Mist/index.styl中footer相关定义，可以修改footer颜色值

```
.footer {
  margin-top: 80px;
  padding: 10px 0;
  background: $whitesmoke; #这里改颜色
  color: $grey-dim;
}
.footer-inner {
  margin: 0 auto;
  text-align: left;

  +mobile() {
    width: auto;
    text-align: center;
  }
}

```





## 【问题5】header里的文字改成英文？

修改`themes/next/languages/zh-Hans.yml`，把对应的首页、标签、关于、分类等改成英文。



# 27. 修改文章正文字体大小

打开`\themes\next\source\css\ _variables\base.styl`文件，将`$font-size-base`改成`16px`，如下所示：

```
$font-size-base            =16px

```

## 【问题8】文章题目、标题h1/h2/h3加横线/色块/大小/颜色/字体等？

### 1.1、改标题h1/h2/h3字体

打开`themes/next/source/css/_schemes/Mist/_base.styl`，原来的样式是`h1, h2, h3, h4, h5, h6 { margin: 20px 0 10px; }  `，修改样式为：

```
h4, h5, h6 { margin: 10px 0 0; }

h1 { margin: 60px 0 10px; font-size: 2em; background-color: rgba(211,211,211,0.2); }

h2 { margin: 20px 0 10px; font-size: 1.8em; border-bottom: 1px #d8d8d8 solid; }

h3 { margin: 20px 0 0; font-size: 1.4em; box-shadow: -20px 0px 0px -10px red;}

h4 { margin: 10px 0 0; font-size: 1.1em;}

p { margin: 0; padding: 17px 0 1px; letter-spacing: 0.08em;}

ul li { letter-spacing: 0.08em;}

a { border-bottom-color: $grey-light; }

hr {
  margin: 20px 0;
  height: 2px;
}

```

> 小技巧：不知道文件位置，可以用chrome的查找，用css代码在atom里全文搜索shift+command+f

### 1.2、改文章题目字体

还是在`themes/next/source/css/_schemes/Mist/_base.styl`加入：

```
//文章题目/大标题样式
.posts-expand .post-title {
    position: relative;
    font-size: 36px;
    font-weight: 400;
    background-color: rgba(255,255,255,0);
}

```



## 【问题10】字体font-family怎么改？——只能改标题

打开`themes/next/source/css/_variables/custom.styl`，输入

```
$font-family-headings = KaiTi,"Microsoft YaHei",Georgia, sans // 标题，修改成你期望的字体族
$font-family-base = KaiTi // 修改成你期望的字体族

```

但是，只有标题字体改变了，正文的字体还是不变。。。

Lato,"PingFang SC","Microsoft YaHei",sans-serif

font-sans = "Helvetica Neue", "Helvetica", "Hiragino Sans GB", "Microsoft YaHei", "Source Han Sans CN", "WenQuanYi Micro Hei", Arial, sans-serif



# 参考资料

https://maoao530.github.io/2017/01/25/hexo-blog-seo/

## 1、内容宽度

themes/next/source/css/_variables/custom.styl

```
// 修改成你期望的宽度
$content-desktop = 900px
// 当视窗超过 1600px 后的宽度
$content-desktop-large = 1100px

```



## 2、无序列表ul显示为实心，li显示为空心

打开`themes/next/source/css/_common/components/post/post-expand.styl`，删除`ul li { list-style: circle; }`。

如果想要ul、li全都改为实心，用`ul li { list-style: disc; }`





## 【问题7】打赏直接在固定位置插入图片，怎么做？——先不搞

## 【问题9】侧边栏文章目录栏大字体左对齐？

### 左对齐

打开`themes/next/source/css/_common/components/sidebar/sidebar.styl`，搜索`.sidebar-inner`，删除`text-align: center;`

### 去掉自动序列号数字

编辑主题下的 `_config.yml` 文件，把 `number` 的 `true` 改成 `false`。

```
# TOC in the Sidebar
toc:
  enable: true

  # Automatically add list number to toc.
  number: true

```



## 【问题11】大代码块样式？

hugo 好用多了！



## 【问题12】国内访问速度优化？

转 GitHub Pages 吧，非裸域 CNAME 的话有 Fastly CDN 加成，速度也不差，无数的开源项目都在用，可用性高。



## 【问题13】seo搜索引擎访问优化？

【问题14】数据统计？

【问题15】图标优化成网站风格的？

【问题16】首页显示的文章数量，首页显示的文章字数？

1）修改站点配置文件的`per_page: 10`，数字就是文章数量。

2）修改主题配置文件`auto_excerpt`下的`length: 250`，数字就是文章字数。







## 【问题17】什么时候hexo clean、hexo g、hexo s、hexo d的？

1）更改目录层文件，如站点配置文件_config.yml时，需要用`ctrl+c`关闭`hexo s`再重启；

2）更改themes/next里的文件，如主题配置文件、html、css等，直接刷新页面就能看到结果；

3）继续发布新文章、或更改旧文章（先放到source/_posts文件夹里），直接`hexo g`可以在`http://localhost:4000/`看到结果；

4）删除博客上的文章，用`hexo clean`

5）在本地调试好后，上传到github用`hexo d`



【问题18】如何注解代码？

1）styl文件用`//`

2）yml文件用`#`

## 参考李安、anndo、巧玉、韵儿爸爸的博客，修改后可以上传一次分支





# 【bug】站内搜索第二次失效！！

pubilc是有生成search.xml文件，也有写入文章内容，但是在网页上一直显示加载中，吐血！！！！！

方法一：搜索引导到site:jiujiubad.top

方法二：站内地图sitemap

方法三：重新做一个hexo——草草草！！！这个折腾根本就不想去搞什么备份，如果电脑坏了不如直接重新搭一个，太多东西搞来搞去会搞坏，相当不自由。很有用vps自己搭一个的想法。



ps：按照anndo的博客，看下有哪些还要测试的比如font-family、js载入优化的帖子，然后重新搭一个。



# 【bug】站内搜索第三次失败！！

从头开始重新做了一个专案，简单3个post文件测试成功后。

1）又加入10个平时写的md文件，`hexo g`上传后搜索又炸了。。。。

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmexum6kaej31eo0yct9x.jpg)

2）把新加入的全部文档移走，搜索又能正常使用。确定是文章的问题。

3）问题出在多行代码块中的html代码上，多出了一个会隐藏的点`*`。很有可能是typora编辑器对代码的处理问题。

![](https://ws1.sinaimg.cn/large/006tNc79gy1fmeyqaxrv9j319q0aot9u.jpg)