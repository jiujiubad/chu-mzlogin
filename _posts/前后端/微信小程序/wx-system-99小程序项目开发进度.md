---
title: wx-system-99小程序项目开发进度
date: '2018-01-01 00:10'
categories:
  - 微信小程序
tags:
  - 微信系统
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fng5pmwdonj30cd08u0sx.jpg'
abbrlink: '6926316'
---

* 201801
* 编程+小程序



保证搜索css命名的唯一性，只要确保外层不同，外层一用product-Box，外层二用p_show-head，外层三用p_show-head-input。里层一般不加class，直接用image、button、icon等。——搜索的时候直接搜索外层，再稍微找找就能找到具体的css。

css的class命名：！！目的是好搜、好找

1）web端，box表示所有product页面都可以共用。最外层"product-Box"共用，其他页面如show写"product-Box product-show-Box"。每个页面的大模块用"buy-box"、"detail-box"或"product-image"、"product-detail"。

2）小程序端，不能跟web一样把每个模块css全部包裹在最外层css里面。

方案一：app.wxss里"product-Box"、"welcome-Box"共用，其他页面如show写"product-Box p_show-Box"。每个页面的大模块用"p_index-image"、"p_show-detail"、"p_search-input"。

方案二：app.wxss设置共用基础内容"container{}"、"container .input{}"、"container text{}"。

```
/**app.wxss**/
.container {
  box-sizing: border-box;
  background-color: #f4f4f4;
  font-family: PingFangSC-Light,helvetica,'Heiti SC';
} 
view,image,text,navigator{
  box-sizing: border-box;
  padding:0;
  margin:0;
}
view,text{
  font-family: PingFangSC-Light,helvetica,'Heiti SC';
  font-size: 29rpx;
  color: #333;
}
```

方案三：新建common文件夹，放product.wxss、welcome.wxss、category.wxss共用。app.wxss清空，改用对common的引用。或直接在每个页面用page。

> 最好的方式是先把页面做出来，然后再去重构，然后再总结套路，而不是一开始就在纠结wxss。

```
var API_URL = 'https://luccake.top/api/v1/products/search'
Page({
  data: {
    cakes: []
  },
  search: function (e) {
    var aaa = API_URL + "?utf8=✓&q=" + e.detail.value
    console.log(aaa)
    if (!e.detail.value) {
      return;
    }
    wx.showToast({ //加载中的动画效果
      title: "加载中..",
      icon: "loading",
      duration: 10000
    });
    var that = this; //保存this的数据
    wx.request({
      url: API_URL + "?utf8=✓&q=" + e.detail.value,
      header: {
        'content-type': 'json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        wx.hideToast();
        that.setData({
          cakes: res.data.data
        })
      }
    })
  }
})
```



# 一、【问题】

## 1、未解决

5）小程序的https怎么弄？

7）小程序怎么打包发布？

8）部署在阿里云？https证书购买服务器可免费一年？



## 2、已解决

### 1）api接口的图片、api网址都是本地地址？

已经接好七牛云。

先部署到heroku，明天早上10点强阿里云。

### 2）是要拿jdstroe直接来改？还是应该重新建一个项目来做？

直接拿jdstore，因为api和web端不冲突。

### 3）api怎么生成一个网址？

一样是在config/routes定义

### 4）api的代码要怎么写比较简洁？

用自带的`gem 'jbuilder'`

### 5）每个action对应一个api接口，即一个网址，是不是要在写程序里引入这么多个API的URL？

不是的。可以用index的api，就会包含更多的信息，供小程序调用。

### 6）查看schema.rb，总共有carts/cart_items/orders/product_lists/users/products六个表单。哪些需要生成api controller？

商品展示用途，应该只要products就可以。

### 7）product#index的api本地测试成功

### 8）product#index的api部署成功。此时api网址、image网址都由本地路径变成正常网址。

### 9）api接口放在小程序上测试，看能否调用？（找资料折腾了3小时）

①、测试成功的代码。

> 注意，以下代码只能在没有appID的项目用，如果是有appID的项目会提示https或ssl验证的问题，因为这里用的api网址不支持ssl。

index.js文件

```
var app = getApp();
Page({
  data: {
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://wx-luccake.herokuapp.com/api/v1/products',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          newsdata: res.data.data
        })
      }
    })
  }
})
```

index.wxml文件

```
<view class="Box-welcome">
  <view wx:for="{{newsdata}}" wx:key="">
    <image src='{{item.image.url}}'></image>
    <view class=''>{{item.title}}</view>
    <view class=''>{{item.description}}</view>
  </view>
</view>
```

②、遇到的问题：在success: function里用`res.data`调用数据，没有报错，但也没有显示内容？？

解决办法：参考网站http://www.henkuai.com/thread-18784-2-1.html。

改用`res.data.最外层栏位名称`调用数据。因为[我的api最外边](https://wx-luccake.herokuapp.com/api/v1/products)是"data":，所以这里写成`res.data.data`。

③、什么时候用`res.data`？什么时候用`res.data.data`？

简单的说，api文件打开有以下两种情况：

```
[{"Id": xxx}, {"Id": xxxx}, {"Id": xxx}]
{"data": [{xxxxx}, {xxxxx}, {xxxxx}]}
```

继续往下看。。

[如果打开的api文件如下](http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=top&count=10)，这种比较少见，最外层是`[]`，就用`res.data`

```
[
{
"title": "赵丽颖现身机场，疲惫过度助理忙搀扶，仍不忘为粉丝签名后离开",
"author_name": "海哥聊娱乐",
"thumbnail_pic_s": "http://00.imgmini.eastday.com/mobile/20161028/20161028202106_9f5968897abf2882af89f1193529bdfb_1_mwpm_03200403.jpeg"
},
{
"title": "赵丽颖现身机场，疲惫过度助理忙搀扶，仍不忘为粉丝签名后离开",
"author_name": "海哥聊娱乐",
"thumbnail_pic_s": "http://00.imgmini.eastday.com/mobile/20161028/20161028202106_9f5968897abf2882af89f1193529bdfb_1_mwpm_03200403.jpeg"
}
]
```

[如果打开的api文件如下](https://wx-luccake.herokuapp.com/api/v1/products)，常见的是这种，最外层是`{}`，就用`res.data.employees`。

```
{
    "employees": [
        {
            "firstName": "Bill",
            "lastName": "Gates"
        },
        {
            "firstName": "George",
            "lastName": "Bush"
        }
    ]
}
```

④、其他注意事项。

json格式只允许双引号，所以api的栏位和值都要有双引号。

微信小程序的res已经是个json形式，data里面直接放键和值。（看的晕晕的，不太理解）

### 10）小程序的AppID是什么？是要从新建项目的时候就开始弄吗，还是可以等项目测试完成后再加入？

①、都可以，如果在新建时没有添加AppID，可以在开发完成后，

新建一个项目，appid 项目目录选择之前的项目路径即可（在开发者工具里，删除项目这个行为不会删除代码）。

②、git大法好。

### 11）微信小程序一个AppId能同时绑定多个小程序吗？

一个AppID只能绑定一个微信小程序。

### 12）补充小程序的名称、图标（头像）、小程序介绍和服务类目。

需要注意的是，在发布前，你有 3 次确定小程序名称的机会（包括首次填写）；发布之后，小程序暂不支持改名。

### 13）atom打开wxml文件代码高亮显示？

atom-wxml插件，让wxml文件、wxss文件代码高亮。

### 14）小程序的布局，大概要做多少页面，涉及到多少功能？（用ps排一整版，照做）

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmlb3glgauj31kw0iz7wi.jpg)

[1]、首页

```
微信授权，获取公开信息（头像、昵称等）
获取地理位置
下拉刷新
上拉加载更多产品

大图轮播
搜索框
logo、位置(可不要)
推荐类别(可不要)
产品展示（小图片、名称、价格）
tabbar
```

[2]、详情页

```
大图片
名称
价格
磅数选择(直接放到介绍里)
评价(可不要)
介绍
详情图片
```

[3]、分类页

```
搜索框
左边或上边导航栏
图片
名称
价格
```

[4]、搜索页

```
搜索框
按综合、销量、价格、筛选排序

```

[5]、购物车

[6]、订单页

[7]、我的后台页

### 15）[微信文档简读，了解全貌](https://v.qq.com/x/page/b0395dq6vr6.html)。

打开[微信小程序官方文档-开发模块](https://mp.weixin.qq.com/debug/wxadoc/dev/quickstart/basic/getting-started.html)

**任务：框架、组件、API、工具、Q&A全部看一遍，把每一行文字，不管你懂不懂，先把它过一遍。然后再看相关教程去编码，就能很快上手。**

①、简易教程

> 基础。怎么创建项目？
>
> 体验小程序。可以把代码下载后，加载到官方工具里，可以查看所有组件的效果。
>
> 更新日志。

②、框架

> 一、目录结果。
>
> 主体部分有三个文件app.js（逻辑）、app.json（配置）、app.wxss（公共样式），小程序主要做前端MVC中的V和C，MVC中的M给后端做。
>
> 二、配置。
>
> 页面开发时配置。
>
> 三、逻辑层。MVC中的C。
>
> 1、注册程序，主要做一些onLaunch初始化；2、注册页面，接受onLaunch的参数渲染一个页面；3、模块化，公共代码抽离成单独的js文件被引用，涉及“文件作用域”的概念；4、API，很丰富常用的都有。
>
> 四、视图层。MVC中的V。
>
> WXML：
>
> 1、数据绑定，js定义的变量复制到wxml页面调用；2、条件渲染，用条件if判断显示不显示、什么时候显示；3、列表渲染，新闻、文章等循环列表；4、模板，重复调用的东西封装到模板；5、事件，比如页面点击一个东西如bindtap怎么传给后端，js怎么处理；6、引用，把文件引用进来；
>
> WXSS：相当于css的东西。
>
> 自定义组件。
>
> 基础库。
>
> 兼容。
>
> 运行机制。
>
> 性能。

③、组件

微信小程序已经做好的一些东西，可以直接引用。所有功能可以在简易教程里的体验小程序上体验。

④、API

很丰富常用的都有。

⑤、工具

下载最新工具。

⑥、Q&A

### 16）官方体验demo有哪些可用模块？

①、组件。

视图容器，页面排版应该会用；

导航；

媒体image；

地图；

②、接口。

开放接口：微信登录、获取用户信息、分享；

界面：界面标题、标题栏加载动画、下拉刷新、上拉加载更多、模态弹窗（本店只提供演示，购买请微信资讯）；

设备：打电话；

媒体：图片；

位置：获取当前位置、使用原生地图查看位置；

### 17）准备工作做好了，怎么开始？

用AppID开始项目，加入git

找商城demo测试

## 最大的问题：发呆半天，还是不知道怎么开始做。。

18）

[从0到1：初学者入门Demo欢迎页](http://www.wxappclub.com/topic/734)

使用到 view、image、text、button 组件

请记得两句话：**先骨架（wxml），再穿衣服（wxss），最后搞个小动作（js）**；**布局时，先整体，再局部**。

数据绑定

按钮模板示范

[从1到2：初学者入门Demo内容列表页-文与字简介内容列表的实现](http://www.wxappclub.com/topic/931)

什么时候用view？什么时候用scroll-view？

模板调用时，template中的data参数一定要写吗？如果有多个参数要怎么写？——data="aaa, bbb, ccc"

19）还是很慌，先从最基本的首页开始做原则如下：

### 先骨架（wxml），再穿衣服（wxss），最后搞个小动作（js）**；**布局时，先整体，再局部。

> 如果过程中遇到什么问题，再逐一找解决办法。否则，一天过去了还什么都没做，到底还是前端的东西不怕该来该去的。

<img src="https://ws2.sinaimg.cn/large/006tNc79gy1fmiooxci1lj30x40ip40a.jpg" width="350";>

<img src="https://ws3.sinaimg.cn/large/006tNc79gy1fmioovxej6j30q40kawhf.jpg" width="350";>

20）首页想做的功能是：

```
微信授权，获取公开信息（头像、昵称等）
获取地理位置
下拉刷新
上拉加载更多产品

大图轮播
搜索框
logo、位置(可不要)
推荐类别(可不要)
产品展示（小图片、名称、价格）
tabbar
```

按照19）的原则，先不管js部分，即微信授权、获取地理位置、上拉加载更多、下拉更新。

现在做骨架wxml，先做整体，再做局部

21）！！！问题！！！用appID的项目，测试发现api接口不能用，需要ssl验证才可以，延伸出来的问题一是需要购买证书？二是需要在ubuntu或centos上重新部署服务端项目，heroku应该是用不了的？

22）虚拟主机支持SSL部署吗？vps支持SSL部署吗？paas平台如heroku支持SSL部署吗？

SSL证书支持独享型云虚拟主机和云服务器等，IP为独立IP。不支持共享型云虚拟主机，所以heroku也不行。

23）SSL动不动几千块/年，免费1年的用完怎么办？

淘宝

24）vps上的项目如何debug？

25）云部署项目（用时12h各种bug）

26）现在最大的问题：

①、SSL证书申请要多久？安装难不难？——用来绑定域名，用小程序appID做项目

②、vps上的项目还不能上传图片，怎么传递七牛云的key？——用来做接口

参考鸿亮项目；

不能自动就先用手动的方法一个个密钥导入；

27）如何备份vultr主机？

### 28）16号通宵17号到两点，分别云部署成功、SSL证书安装失败（官网Certbot工具）

29）18号重新部署项目，SSL证书安装成功（用acme.sh脚本），购买阿里云199套餐，阿里云提交ICP备案，阿里云部署项目

30）19号阿里云安装SSL证书。

31）19好分类页。

category的model，api接的是categories，栏位name、good_count、current_name

定义currentcategory，栏位name、front_name

参考思路：category、count、current_category，每一个做一个接口网址。需要改路径、controller文件。

32）api里怎么加入if判断，比如没有图片时显示自定义图片？

33）20号无从下手的时候，看不懂代码的时候，找实战案例、或看视频是最好的解决办法。

问题1、api做出来都是最外层{}即哈希，怎么做成数组？

问题2、api怎么把index和show写在一起？

```
  def index
    @products = Product.all
    render :json => {
      :data => @products.map{ |product|
        { :id => product.id,
          :title => product.title,
          :imageeee => product.image,
          :nodes => {:id => product.id}
        }
      }
    }
  end
```

`respond_to`可以用來回應不同的資料格式

```
respond_to do |format|
  format.html
  format.xml { render :xml => @event.to_xml }
  format.any { render :text => "WTF" }
end
```

34）20号api地址拼接写法？

```
url: app.globalData.domain + '/products/' + id + '/add_product_image',
```

35）面试
36）22号，状态2。动态id设置和调用？wxml设置`data-categoryid=“{{item.id}}”`，在js调用
`e.target.dataset.categoryid`
37）23号，游戏和手机要停，保护注意力！！！！
菜单左右联动视频（比较难，要多练）
38）Jbuilder重构api代码
39）菜单页面左右布局css问题？如图，左边的菜单明细怎么才能显示成一列？
<img src="https://ws4.sinaimg.cn/large/006tNc79gy1fmqrwh6t1tj31kw0sn0wg.jpg" width=“250”>

```/*初步的解决办法*/
.box {
  display:flex;
  flex-flow:row wrap;
  justify-content: space-between;
}
.category{
  width: 400rpx;
  background: green;
}
```

40）24号，左右联动花了整整一天时间。api用jbuilder重构花了6h。

状态大减，重新缕一缕思路。

现在最重要的事情：

①、分类页搭建，在左右联动部分计算高度、部分跳转仍有问题。要找个正确的demo看看

②、产品页搭建

③、搜索页搭建

④、搜索功能

⑤、微信登录、获取地址、加载中等js。

41)[请问微信小程序let和var以及const有什么区别](http://www.cnblogs.com/youli222/p/6068947.html)

var：声明全局变量，换句话理解就是，声明在for循环中的变量，跳出for循环同样可以使用。 let：声明块级变量，即局部变量。注意：必须声明'use strict'后才能使用let声明变量否则浏览并不能显示结果 。const：用于声明常量，也具有块级作用域 const PI=3.14。

42）已解决的问题：

①、产生假资料

```
10.times{ |i| Category.create!( :name => "#{i} Category" ) }
100.times{ |i| Group.create!( :name => "No.1 #{i} Group") } 
```

②、分类功能改进

new

```
<%= select_tag(:category_id, options_for_select(@categories), :prompt => "Category") %>
```

edit

```
<%= f.select :category_id, @categories %>
或者
<%= f.association :category %>
```

结论：戴建林的分类教程可以改进https://forum.qzy.camp/t/topic/720。controller里只要设置白名单就好，new和edit表单如果有simple_form，就用多选盒子`<%= f.association :groups, :as => :check_boxes %>`，也可以用下拉单选`<%= f.association :category %>`。

③、check_box不能保存数据的问题？——可以整合到分类功能中

原因：因为只设置了一对多has_many、belongs_to，即分类有很多商品、商品属于分类，所有没有办法给一个商品设置多个分类。

解决办法：改成多对多的关系。

[1]新建model如categoryship，加入两个category_id、product_id，设置多对多关系；

[2]如果要给商品设置多个分类，就在product的controller白名单设置`:category_ids => []`。

> 注意：这里的id一定要用复数加s。

[3]edit.html.erb里，加入check_box多选框的代码`<%= f.association :categories, :as => :check_boxes %>`

> 注意：这段代码要改的只有中间的categories，一定要用复数s。

④、服务器报错？新增的栏位，在服务器里报错，除了在改用try(:栏位)，还能怎么处理？

cd到current目录，`cd /home/deploy/rails-recipes/current`；

查看log，`tail -f log/production.log`；

查看nginx的log（有时会是nginx的错），`vi /var/log/nginx/error.log`。

办法一：停止nginx，删掉之前那些nil的栏位

```
Order.where(token: nil).destroy_all 
```

办法二：停止nginx，修改之前那些nil的栏位

```
product = Product.find(3)
product.category_id = 2
product.save
```

办法三：停止nginx，清空数据库

办法四：尝试清空本地数据库再试，因为一般本地也会报错，不报错是因为你本地有数据存在。所以最好清空掉再试。

⑤、linux/ubuntu服务器，怎么reset database清空数据库、导入seed？

先把nginx停掉，`sudo service nginx stop`；

cd到current目录，`cd /home/deploy/rails-recipes/current`；

执行reset，`RAILS_ENV=production DISABLE_DATABASE_ENVIRONMENT_CHECK=1 bin/rails db:reset`；

(因为reset所有省略)执行保存migrate，`RAILS_ENV=production bundle exec rake db:migrate`；

(因为reset所有省略)导入seed，`RAILS_ENV=production bundle exec rake db:seed`；

重开nginx，`sudo service nginx start`。OK了！

> 进入rails c的命令`bundle exec rails c production`
>
> 删除指定model用`Product.destroy_all`（Product替换类）
>
> single seed用`RAILS_ENV=production bundle exec rake db:seed:single SEED=product_seed`（product_seed替换具体的single seed名称）

问题：

mysql怎么drop清空数据库，试过用drop整个数据库被删掉，重新新建数据还在。

Product.destroy_all——测试发现在mysql删除后再用seed数据还在。。

解决办法：

专案拆分seed到seeds文件夹里，原seed档清空。服务器停止nginx，再执行db:reset（清空并执行seed档即相当于清空），然后执行每个single seed，最后重启nginx。

⑥、accepts_nested_attributes_for是什么？

参考资料http://blog.csdn.net/kunshan_shenbin/article/details/7249713。

在一对多的模型关系中通过 accepts_nested_attributes_for来简化关联对象的创建。

⑦、多图上传功能（用在商品详情页）

!!!自己的改进方法，photo仅用来放详情页小图、image用来放大图和index等页面展示，uploader用两种。这样改可以确保分类api把index和show写在一起，同时调用产品和图片。

参考资料

http://nn70-blog.logdown.com/posts/1843556-multi-pics

http://yy4ever.logdown.com/posts/1069287

> 注意：如果图片不是正方形，要先在uploader里设置不同比例的，然后再上传资料。

遗留问题：小图并排显示的样式，动态hover效果，第一张小图片不是大图，好像不能用col-md-3如果上传图片有时多有时少怎么保证图片大小，小图片在小屏幕怎么自适应

```
.list-image-active {
  box-shadow: 1.5px 1.5px 1.5px #666;
}

img {
  max-width: 100%; }

  .square {
  // margin-bottom: 2em;
  padding-top: 2em;
  padding-bottom: 1.3em;
  padding-left: 0.05em;
  padding-right: 0.05em;

  img {
    color: #fff;
    opacity: 0.87;
  }
}
```

43）要解决的功能：

【分类页】

OK。加入分类图片intro_image、及描述intro_description，

OK。一个商品可以属于多个分类（百宝箱第8章），见上边②

OK。check_boxes能更新不报错但是没有更新不生效？（见上边③）

OK。check_boxes的UI优化，用 Select multiple 加上 Select2 Plugin

OK。N+1 query修改index代码

OK。tim产品详情页多图上传功能（见上边⑦）

OK。tim的seed写入详情页图片教程，看github代码http://nn70-blog.logdown.com/posts/1843706-seeds-pics

OK。anndo的seed拆分教程http://anndo-blog.logdown.com/posts/1930065配合rails c的`Product.destroy_all`，先清空某个类的所有数据，然后重新导入这个类的seed。_

微信登录接入网站

微信二维码分享

用小标题只限5个字wx_title以及各种validate和权限设置，  validates :title, length: {minimum:1, maximum:10, message:"中文字最多填5个，英文最多填10个"}

库存量没有设置会报错，

按吉米的文章整理md文档

手机验证码

搜索功能

国内客服

网址token

选择数量自动更新

省市县级联

改用admin controller优化代码

参考吉米优化代码

多图上传预览

多出来的废弃栏位要怎么删除

详情页小图位置可以上传视频

carrierwave上传图片的时候能出现预览https://ruby-china.org/topics/25542



小程序产品详情页

小程序搜索功能

随机商品功能及做成api

小程序随机商品

详情页排版怎么做？包括商品图、详情图、详情图动画、评论http://xbearx1987-blog.logdown.com/posts/1880307



43）26号，想在过年前，把所有收藏整理、所有md文档整理发布。加````ruby/html`实现markdown代码高亮。

44）完整的带图片的seed档搞定。

45）域名审核通过，小程序服务器配置。

46）

```
  getGoodsInfo: function () {
    let that = this;
    util.request(api.GoodsRelated, { id: that.data.id }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          gallery: res.data.gallery,
        });
      }
    });
  },
```

①、用bindtap点击事件，点击后跳转。

wx.navigateTo，保留当前页并跳转到非Tabbar页面。可以返回到原页面。用?传值，&传多个值。

wx.redirectTo，关闭当前页并跳转到非Tabbar页面。用?传值，&传多个值。

wx.switchTab，关闭所有非Tabbar页面并跳转到Tabbar页面。不能带参数。

wx.navigateBack，关闭当前页并后退x个页面。

②、用navigator标签，属性open-type，相当于链接跳转。

open-type指定navigate对应于wx.navigateTo、redirect对应于wx.redirectTo、switchTab对应于wx.switchTab

`<navigator url="../cart/cart" open-type="switchTab">跳转到购物车页面</navigator>`，

或`<navigator url="../goods/goods?id={{item.id}}" wx:for="{{xx}}"></navigator>`不写好像相当于navigateTo。

> 注意：这里的`item.id`的item是wx:for调用的数组

47）27号遇到很多坑：半天测试跳转navigaTo、半天在api写数组还是散列和wx:for列表调用时各种写错。

> 特别注意，wx:for="{{xxx}}"里的数据必须是数组。
>
> 散列无法做wx:for循环，但是可以单个调用，调用方法是先在js的setData里用一个变量如`tt: res.data`，然后在wxml里用如`<view>{{tt.title}}</view>`调用。

①、Api部分，show在jbuilder写出来都是散列，不知道怎么写成数组。——暂时先放在controller

②、wx:for="{{xxx}}"，两个括号经常忘记

③、js里的api request，经常漏了写setData({xxx})

wxml

```
<view wx:for="{{newsdata}}" wx:key="">
  <view>{{item.title}}</view>
  <image src="{{item.avatar.medium.url}}"></image>
</view>

<view>{{tt.title}}</view>

```

js

```
// pages/goods/goods.js
Page({

  data: {
  
  },

  onLoad: function (options) {
    console.log(options.id)
    var p_id = options.id
    var that = this
    wx.request({
      url: 'https://luccake.top/api/v1/products/'+p_id, 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          newsdata: res.data.photo,
          tt: res.data
        })
      }
    })
  },

})
```

48）28号，重要的事：

* OK。考虑是用单图、多图还是Rich Editor之ckeditor图文编辑器（优先测试能不能多图）
  * 比韵儿爸爸的好用，借用耙耙的css。https://forum.qzy.camp/t/css/1753
  * 电脑端很好用，但是小程序端调用带图片的text数据会怎样？
* OK。测试详情页大图用photo[0]调用
* OK。看百宝箱有什么可用
* OK。8点搬砖直播

# 49）Jbuilder写api的几种写法

结论1：对于嵌套数组，index页面最外层可用[]可用{}，而show页面实测要用{}。因为如果用[]，比如调用分类id=1的所有照片photos，要写res.data[index].photos但在小程序里这样写会报错。

/*结论2：show页面干脆别重构partial了容易引发问题。用`_item.json.jbuilder`写partial表示同model调用，用`_share.json.jbuilder`写partial表示跨model调用。*/

结论3：干脆所有的页面都不要写partial了，在几个文件之间写多重嵌套写出来很也乱。

app/views/api/v1/categories/index.json.jbuilder

```
json.data @categories do |c|
  json.id c.id
  json.name c.name
  json.category_title c.category_title
  json.category_image c.category_image
  json.products c.products do |p|
    json.title p.title
    json.photos p.photos
  end
end
```

上面index已包含所有信息，show不写也可以了，想写的话如下

app/views/api/v1/categories/show.json.jbuilder

```
json.id @category.id
json.name @category.name
json.title @category.category_title
json.image @category.category_image
json.photos @products do |p|
  json.photos p.photos
end
json.products @products
```

结论4：一般写一个index足够写全信息。因为信息量会越来越多，所以里边的数组比如上边的photos、products写完要在api网页上搜索名字，确保容易定位到。

## 1、api输出[]

`json.array!`，相当于map循环，输出散列；[{id:1, title:1}, {id:2, title:2}]

> 用于partial跨model调用，见下面代码。

## 2、api输出{}

1）`json.arr!`，输出{arr!:[{id:1, title:1}, {id:2, title:2s}]}

2）`json.data @products do |product|`，输出{data:[{id:1, title:1}, {id:2, title:2}]}

如下，app/views/api/v1/categories/show.json.jbuilder，其中photo是一个model，与product是多对一关系，已设置@prodcuts=@category.products

```
json.photo @products do |product|
  json.number product.title
  json.photos product.photos
end
```

3）`json.data @products.each{}`可缩写为`json.data @products`，输出{data:[{id:1, title:1}, {id:2, title:2}]}

> 用于index.json.jbuilder页面，用在show会报错。

4）`json.title @product.title`，输出{title:1}

> 用语show.json.jbuilder页面。

## 3、partial用法（不好用）

### 3.1 结论：

实测发现partial只会让嵌套数组看起来更复杂，不如不写partial。不同model的数据也可以在同个文件里调用，如下。

```
json.data @categories do |category|
  json.number category.name
  json.products category.products do |product|
    json.photos product.photos
  end
end
```

### 3.2 以下不想用，供参考

1）用于同个model

`json.partial! 'item', product: @products`，常用于同个model。

2）跨model调用

app/views/api/v1/categories/index.json.jbuilder

```
json.data do
  json.array! @categories, :partial => "item", :as => "category"
end
```

app/views/api/v1/categories/_item.json.jbuilder

```
json.id category.id
json.name category.name
json.partial! 'api/v1/products/share', product: category.products

```

50）小程序调用api，经常写错

```
        <navigator wx:for="{{navRightList[curIndex].products}}" wx:key="">
          <image src="{{item.photos[0].avatar.url}}"></image>
          <text>{{item.title}}</text>
        </navigator>

```

以上代码解读：拿数组navRightList的当前下标curIdex下的产品数组products做循环。

①、每次循环取数组products里的第一张photo即photos[0].avatar.url。

②、每次循环取数组products里的标题title。api网址是https://luccake.top/api/v1/categories

51）29号要做的事

* 百宝箱13Rich Editor之ckeditor，10嵌套表单+19多图(还是yy助教的教程好，百宝箱的需结合百宝箱10否则报错)
* OK。整理api去掉partial，相应的小程序api修改，
* OK。把image改名category_id删掉，修改seed。image改成wx详情图detail_image。
* OK。创客贴做一版详情图。
* OK。做一个完整wx详情页
* wx搜索功能

52）carrierwave怎么裁剪让宽度固定高度按比例？

不设置resize_to_fit或设置后按@product.image.url调用的是原图，高度用css定义也可以。

> 上传图片选定区域裁剪JCrop。

53）[微信小程序 Image 图片实现宽度100%，高度自适应](http://www.cnblogs.com/luleixia/p/6935301.html)

在image标签里加上`mode="widthFix"`。

54）【29号迷失】做上拉加载更多、下拉刷新功能失败，做搜索功能失败只写了一篇简单的原理。还有很多功能不会做，还有各种页面需要做，凌乱了，为什么别人学新东西都那么强？我怎么goole、淘宝就是找不到路子？是不是因为没有去过一遍官方文档？

55）新大陆[ITDragon龙](http://my.csdn.net/qq_19558705)的[微信小程序入门系列课](http://blog.csdn.net/qq_19558705/article/category/6768711)，[ITDragongithtb](https://github.com/ITDragonBlog/wxapp)。

第二课提到，用[weui-wxss套模板](https://github.com/Tencent/weui-wxss)，用微信demo套模板。一开始有想过，但是烦于不知道如何找到文件位置。现在才发现可以在console里看到。

结论：可能要结合官方文档、特别结合官方demo、官方推荐的weui-wxss组件，结合有做的页面和功能过一遍会用到哪些，以及相应功能的逻辑，有一个全盘总体的认识。然后再具体到每一个功能去做。否则做完一个功能，又失去目的性，或折腾些不重要的功能，或折腾些太难实现的功能。

> 另外，还有一个小程序api高级教程，可能有用

56）30蓝鸥视频

57）31蓝鸥视频，跨年创业谷聚会

58）1号，蓝鸥视频，ransack搜索功能

59）搜索api

`https://luccake.top/products/search?utf8=%E2%9C%93&q=%E7%BF%BB%E7%B3%96`

60）box-sizing: border-box;

border-box,含义是将盒子的border和padding计算到设置的width中，而不是实际宽度中。所以，如果你设置width为100px，而border为1px的时候，盒子的实际大小仍旧是100px而不是102px。用这个属性，我们就可以完美地解决上面遇到的难题了：只需要在给两个div的css上写下box-sizing:border-box就可以了，保证两个div等宽，拥有1px长度，至于它们的框度是不是50%，你可以喊设计师自己量。除了以上两个值外，box-sizing还有一个padding-box值，顾名思义，就是把内边距计算在设置的框度内，而border是不计算的。

## 61）【bug】手机测试搜索，出现invalid URL，不能拿到数据（开发工具测试却是正常）

<img src="https://ws1.sinaimg.cn/large/006tNc79gy1fn2m2j5l0xj30w80g1ac8.jpg" width="4000">

## 1、问题描述：

1）已配置：域名已备案、服务器已安装SSL证书即https认证。在小程序开发工具里测试，首页、分类页在开发工具、手机端测试均正常。

2）测试搜索功能：开发工具里测试正常，可以拿数据、显示画面。但是在手机端不能拿到数据，刚刚开始请求api_url就报错"invalid url"。

## 2、解决办法：

问题出在api的url上，要把`"?utf8=✓&q=" + e.detail.value`  ，

改成``"?utf8=%E2%9C%93&q=" + encodeURI(e.detail.value)``，如下。

```
var API_URL = 'https://luccake.top/v2/products/search'

wx.request({
  url: API_URL + "?utf8=%E2%9C%93&q=" + encodeURI(e.detail.value), 

```

> 解说：
>
> %E2%9C%93，这种九位数编码是url的utf-8编码，每一个中文字都会转化成一个九位数的编码。可以用[URL编码/解码工具转换](http://tool.chinaz.com/tools/urlencode.aspx)。
>
> 在小程序里，要用javascript的[encodeURI(URLstring)语法，详见w3school](http://www.w3school.com.cn/jsref/jsref_encodeuri.asp)

* 拓展，[javascript/微信小程序中将String进行Base64编码并UTF-8格式输出](http://blog.csdn.net/huangmeimao/article/details/74905749)，测试成功，不过转化出来的编码是八位数如"6YeR6Imy"。

62）排序

```
  def index
    @products = case params[:order]
    when 'by_price'
      Product.order('price DESC')
    when 'by_created_at'
      Product.order('created_at DESC')
    else
      Product.all
    end
  end

```

```
  <ul class="dropdown-menu">
    <li>
      <%= link_to("所有商品", products_path) %>
    </li>
    <li>
      <%= link_to("按价格排序", products_path(:order => "by_price")) %>
    </li>
    <li>
      <%= link_to("按时间排序", products_path(:order => "by_created_at")) %>
    </li>
  </ul>

```

http://localhost:3000/products?utf8=%E2%9C%93&q%5Btitle_cont%5D=%E7%BF%BB%E7%B3%96&commit=Search

http://localhost:3000/products?commit=Search&q%5Bs%5D=price+asc&q%5Btitle_cont%5D=%E7%BF%BB%E7%B3%96&utf8=%E2%9C%93

localhost:3000/products?utf8=✓&q%5Btitle_cont%5D=翻糖&commit=Search

localhost:3000/products?commit=Search&q%5Bs%5D=price+sac&q%5Btitle_cont%5D=翻糖&utf8=✓



https://luccake.top/api/v1/products?utf8=%E2%9C%93&q%5Btitle_or_description_cont%5D=%E7%BF%BB%E7%B3%96&commit=Search

https://luccake.top/products?commit=Search&q%5Bs%5D=price+asc&q%5Btitle_or_description_cont%5D=%E7%BF%BB%E7%B3%96&utf8=%E2%9C%93

63）搜索功能一、在navbar，参考戴建林教程，复杂。二、在index，参考毛尧吉及ransack官方，简单。

64）回头再改：search页面的代码像是高级搜索功能，可以拿掉或保留。api的product#search的paginate要拿掉。

65）

```
var searchData = wx.getStorageSync('searchData') || []
searchData.push(this.data.inputValue)
wx.setStorageSync('searchData', searchData)
console.log("fff", searchData)

```

```
onShow:function(){
  var getSearch = wx.getStorageSync('searchData');
  this.setData({
    getSearch:getSearch,
    inputValue:''
  })
  console.log('search is onshow')
  console.log(this.data.getSearch)
},

```

66）细度文档类的视频虽然很详细，也好像了解了全盘，但是真正要做什么功能的时候，一点卵用都没有，还是要一点点去搜索摸索，做的出来一回事，很多时候做不出来，比如今天折腾的存取缓存。恐慌、焦虑。——还是实战管用。

var API_URL = 'https://luccake.top/api/v1/products?utf8=%E2%9C%93&q%5Btitle_or_description_cont%5D='

url: API_URL + utf + "&commit=Search"

