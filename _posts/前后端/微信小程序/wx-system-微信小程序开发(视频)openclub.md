---
title: wx-system-微信小程序开发(视频)openclub
date: '2018-01-01 00:10'
categories:
  - 微信小程序
tags:
  - 微信系统
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fng5pmwdonj30cd08u0sx.jpg'
abbrlink: '17e87488'
---

* 201801
* 编程+小程序



### 参考资料

[openclub微信小程序开发视频](https://www.youtube.com/playlist?list=PLXbU-2B80FvA5bNILAS8-zY3_KkE-PVn0)

[微信小程序开发者文档](https://mp.weixin.qq.com/debug/wxadoc/dev/)

[小程序课程-代码](https://github.com/ParryQiu/wxopenclub-wxapp-lessons)

注解方法：js文件用`//xxx`，wxml文件用`<!-- xx -->`，wxss文件用`/* xx */`

> 本课程只讲解微信小程序官方文档的重点内容，细节还需要自己看。

遗留问题

> 注意事项：
>
> 1、admin后台不要做在小程序上，产品和分类的增加、删除、编辑不要集成在同个页面
>
> 2、第一次维护微信登录状态，并接入自己的用户系统会很花时间，搞不定求助
>
> 3、第一次做分类页面不用折腾左右联动

# 一、微信小程序基本概念

重点讲解框架、组建、API。

打包1M大小问题。

没有公司的资格，即没有AppID，可以不填直接做体验开发。



# 二、tabbar的设置与相关

## 1、文章开头给了一个完整的测试案例

## 2、tabbar在框架-配置下。

1）找到`app.json`文件，复制文档代码。预览可以看到底部出现首页、日志两栏。

> 由于屏幕适配问题，官方限制最多只能用5个tab。

```
  "tabBar": {
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页"
    }, {
      "pagePath": "pages/logs/logs",
      "text": "日志"
    }]
  }
```

2）框架-配置-tabbar，找到`iconPath`、`selectedIconPath`，添加到下一段代码中

```
      {
        "pagePath": "pages/logs/logs",
        "text": "日志",
        "iconPath": "images/icon_seo.png",
        "selectedIconPath": "images/icon_seo_HL.png"
      }
```

效果图如下，日志有图标，并且点击时变成高亮绿色

![Snip20171213_5](https://ws3.sinaimg.cn/large/006tNc79gy1fmhaydczjdj307t0dzglt.jpg)

## 3、其他配置

1）网络请求时间networkTimeout模块

2）页头颜色和文字的配置page.json模块





# 三、注册程序及程序生命周期

## 1、讲解

1）开发-框架-逻辑层-注册程序，要了解的是生命周期的概念。onLaunch、onShow、onHide、onError、其他。

2）全局函数getApp()。先定义一个全局函数，然后读取全局共享的函数。

```
// other.js
var appInstance = getApp()
console.log(appInstance.globalData) // I am global data
```

> 文档的东西比较简单，主要看一下对应的代码。

## 2、代码

1）`app.js`文件代码解读：

```
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
```

* `onLaunch`是程序初始化时，调用`API`从本地缓存中获取数据
* 初始化后，在`StorageSync`上做一个`set`
* `getUserInfo`是一个全局函数，会在其他页面被调用。这里通过微信接口获取到我当前登录用户的头像、昵称。
* 设置`globalData`在`onLaunch`的时候，就可以执行对应的动作

2）加入`console.log("app run function: onLaunch")`，然后查看`pages/index/index.js`文件调用`apps.js`文件的`getUserInfo`是怎么调用的？

```
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log("app run function: onLaunch")
```

![Snip20171213_6](https://ws3.sinaimg.cn/large/006tNc79gy1fmhaybic1jj30on0gbadg.jpg)

> 在初始化的时候，你可以做一些基础的动作，比如获取用户信息，比如设置好初始化的本地状态，比如把网络的图片、音频先请求好，都可以在这个生命周期进行。

3）首先，用全局函数`getApp()`的方法，就可以去到app里面的东西。比如这里取到`apps.js`文件的`getUserInfo`。

4）onshow、onhide要退出和重新进入，通过微信开发者工具的`切后台`按钮切换

> 预告：下节讲解页面生命周期，更复杂一点，但是大同小异。



# 四、页面注册及页面生命周期

## 1、讲解

1）框架-逻辑层-注册页面，是页面生命周期的一些函数

## 2、代码

1）删除上一节添加的`console.log("app run function: onLaunch")`

2）打开`pages/logs/logs.js`，这里onload页面加载已经有了。

3）增加代码

```
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    });
    console.log("logs page execute: onLoad.");
  },  
  onReady: function() {
     // 页面已经加载完
    console.log("logs page execute: onReady.");
  },
  onShow: function() {
    // 页面show
    console.log("logs page execute: onShow.");
  },
  onHide: function() {
    // 页面hide
    console.log("logs page execute: onHide.");
  },
  onUnload: function() {
    // 页面关闭时
    console.log("logs page execute: onUnload.");
  },
  onPullDownRefresh: function() {
    // 页面下拉
    console.log("logs page execute: onPullDownRefresh.");
  },
  onReachBottom: function() {
    // 页面触底时（可以往上拉）
    console.log("logs page execute: onReachBottom.");
  },
```

4）先清空console的内容，然后切回首页，当我们点击日志的时候，页面只执行了onshow，为什么没有执行onload、ready呢？

解答：跟微信的设计有关，页面加载完再来加载一次的时候，它有一个catch的机制，即onload和ready的时间就不会再执行了。

因此，点击编译按钮，然后清空console内容，再执行相同操作的时候，因为是第一次打开页面就会执行onload、onshow、onready事件。

![Snip20171213_7](https://ws2.sinaimg.cn/large/006tNc79gy1fmhay85wgsj30iq0ihgnz.jpg)

5）继续下滑出现第四个事件onReachBottom。

6）点击切后台出现onhide，再点击切前台出现onshow。

> 使用场景：用户有个短信、电话进来，或切换到微信，是不是可以保留用户订单状态，再比如游戏进度

7）最后一个时间**下拉刷新onPullDownRefresh，需要加一个配置才能生效**。

![Snip20171213_8](https://ws1.sinaimg.cn/large/006tNc79gy1fmhaygkadrj30ik04vq3h.jpg)

编辑`pages/logs/logs.json`文件，然后下拉会在console出现onPullDownRefresh事件。

```
{
    "navigationBarTitleText": "查看启动日志",
    "enablePullDownRefresh": true
}
```

> 使用场景：看新闻、微博、朋友圈 时下拉刷新。

> 本课程时带领大家了解框架，细节的东西还要各位仔细回去看。

8）`globalData`和`setData()`的使用参考第三课。

9）生命周期图、页面路由可以看看，后面会结合真实的实例讲。



# 五、模块化

## 1、讲解

框架-逻辑层-模块化，涉及到`globalData`的使用（第三课生命周期讲过），另外是模块化的概念，把共用的函数比如js的函数封装成一些模块来开发。

因为这里涉及到一些ES5、ES6的语法问题，还涉及到一些`node_modules`这样一些`node.js`组件的引用。当然现在官方是支持不了node.js的，社区已经有了一些解决方案。

## 2、globalData如何获取？

> 文档还要自己认真去看，包括ES6的说法（比如对平台的支持、为什么会转换）、以及一些promise的东西

1）第四课的console.log代码可删除可以保留，我选择保留。

2）复习：`globalData`在`app.js`做了声明后，所有的页面都可以进行`globalData`的获取。获取的办法首先通过`var app = getApp();`这是一个全局函数，然后通过`app.getUserInfo`就能取到`getUserInfo`等内容。

3）

【问题】`app.js`里的`globalData: { userInfo: null }`，怎么在`index.js`里获取到？

①、index.js在开头var一个函数`var app = getApp();`、

在最后加入

> 注意添加代码时，自己补充结尾的逗号`,`或分号`;`。否则会报错。

```
  onShow: function() {
    app.globalData.userInfo = "wxopen.club"
  }
```

③、在log.js页面，加入`var app = getApp();`，然后在onshow事件加入`console.log(app.globalData.userInfo);`

4）演示：点击首页，这里对globalData做了设置，然后点击日志页面，console里打印出了wxopen.club的值。

> 使用场景：页面见参数的传递、全局共用的隐形参数或属性的获取与设置，都可以通过这种方式来show或者获取。

## 3、模块化的概念？

专案的`utils/util.js`已经给了一个方法。

1）在utils文件夹新建js文件Loger.js

2）定义function

```
function PrintLog(value) {
  console.log("Loger module: " + value);
}
```

3）

【问题】如何把PrintLog这个function给所有的js页面用呢 ？

①、（ES5、ES6中说的）通过`module.exports.导出的名字`，这里用`module.exports.PrintLog = PrintLog`

②、如何在index.js中引用，页头加入`var Loger = require("../../utils/Loger.js");`。这种代码在logs文件夹里有参考模板。

③、在index.js的页尾的onShow事件里直接调用`Loger.PrintLog("execute index onShow");`

> 使用场景：在任何页面调用公共的方法来做一些验证，做一些资源的请求，做一些支付串的处理，做日记的格式化，都可以做成模块，在所有的js页面里使用。 

## 4、自己写并不强大，怎么使用nodejs的一些包呢？

[微信小程序开发三宗罪和解决办法](http://www.wxopen.club/topic/582eaf2915e8801003c8c24b)



# 六、数据绑定与条件渲染

## 1、讲解

框架-视图层-WXML-数据绑定/条件渲染，绑定在一些js的模板里面，通过标签{{xxx}}的形式绑定传过来的值（data里）。

## 2、数据绑定

1）按github上修改index.js

```
//index.js
//获取应用实例
var app = getApp();

Page({
  data: {
    motto: 'Hello World'
  },
  onLoad: function () {

  },
  onShow: function() {
    //app.globalData.userInfo = "wxopen.club";
  }
})
```

2）修改index.wxml，下面要在view上绑定一些东西（比如这里的motto就是绑定）

```
<!--index.wxml-->
<view class="container">
  <view class="usermotto">
    <text class="user-motto">{{motto}}</text>
  </view>
</view>
```

3）比如在index.js的data里新增`userid: 1234,`，然后在index.wxml改成`{{motto}}{{userid}}`，保存后会显示。

![Snip20171214_1](https://ws2.sinaimg.cn/large/006tNc79gy1fmhayflvbqj307v072dfs.jpg)

4）比如文档里的“组件属性”，在text标签里加上`id="user-{{userid}}"`。查看console的Wxml，可以看到已绑定。

![Snip20171214_2](https://ws2.sinaimg.cn/large/006tNc79gy1fmhaxj96mjj30kg04mdgb.jpg)

## 3、条件渲染

1）比如`wx:if`，在index.js的data里加入`show: true,`，然后index.wxml加入

```
<view wx:if="{{show}}">
  TRUE99
</view>
```

当show时true的时候，就会显示`TRUE99`

> 使用场景：前台布局切换、样式切换。

2）比如`wx:else`，当show不是true的时候，就显示为Bad99。

```
  <view wx:else="{{show}}">
    Bad99
  </view>
```

> 使用场景：用户登录时显示一部分，没登录时显示另一部分。

3）`hidden`的使用（类似if控制逻辑是否显示）：看userid是否等于1234，如果是就显示true即隐藏否则false即显示。修改index.wxml

```
  <view class="usermotto" hidden="{{userid==123 ? true: false}}">
    <text class="user-motto" id="user-{{userid}}">{{motto}}</text>
  </view>
```

> `hidden`与`wx:if`的区别？
>
> 解答：`hidden`组件始终会被渲染，有更高的初始渲染消耗。`wx:if`在条件成立时才渲染。
>
> 使用场景：需要频繁切换的情景下，用 `hidden` 更好，如果在运行时条件不大可能改变则 `wx:if` 较好。

4）`block wx:if`，如果同时有很多个view要被控制



# 七、列表渲染与模板

## 1、讲解

1）框架-视图层-WXML-列表渲染/模板，用wx:for绑定一个数组，即可使用数组中的数据。

## 2、`wx:for`列表渲染

1）在index.js的data中加入

```
  data: {
    motto: 'Hello World',
    userid: 1234,
    show: false,
    array: [{
      message: 'hello'
    },
    {
      message: 'world'
    },
    {
      message: '!'
    }],
  },
```

2）index.wxml加入

```
  <view wx:for="{{array}}" wx:for-item="foritem" wx:key="index">
    <text id="messageIndex - {{index}}">{{index}} - {{foritem.message}}</text>
  </view>
```

①、这里的index就跟for循环的下标一样，从0开始；

②、利用`wx:key`加上`id`是一个比较好的习惯和实用的技巧，用于样式的控制。

> wx:key`文档有相关资料，默认建议还是写上

## 3、`wx:key`代码演示讲解

1）用文档提供的示例代码，修改logs.wxml

```
<!--logs.wxml-->
<view class="container log-list">
<switch wx:for="{{objectArray}}" wx:key="unique" style="display: block;"> {{item.id}} </switch>
<button bindtap="switch"> Switch </button>
<button bindtap="addToFront"> Add to the front </button>

<switch wx:for="{{numberArray}}" wx:key="*this" style="display: block;"> {{item}} </switch>
<button bindtap="addNumberToFront"> Add to the front </button>
</view>
```

2）用文档提供的page代码，替换logs.js的page

```
Page({
  data: {
    objectArray: [
      {id: 5, unique: 'unique_5'},
      {id: 4, unique: 'unique_4'},
      {id: 3, unique: 'unique_3'},
      {id: 2, unique: 'unique_2'},
      {id: 1, unique: 'unique_1'},
      {id: 0, unique: 'unique_0'},
    ],
    numberArray: [1, 2, 3, 4]
  },
  switch: function(e) {
    const length = this.data.objectArray.length
    for (let i = 0; i < length; ++i) {
      const x = Math.floor(Math.random() * length)
      const y = Math.floor(Math.random() * length)
      const temp = this.data.objectArray[x]
      this.data.objectArray[x] = this.data.objectArray[y]
      this.data.objectArray[y] = temp
    }
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addToFront: function(e) {
    const length = this.data.objectArray.length
    this.data.objectArray = [{id: length, unique: 'unique_' + length}].concat(this.data.objectArray)
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addNumberToFront: function(e){
    this.data.numberArray = [ this.data.numberArray.length + 1 ].concat(this.data.numberArray)
    this.setData({
      numberArray: this.data.numberArray
    })
  }
})
```

3）切换到日志页面，可以看到显示。

* switch按钮，用来做随机顺序；
* Add to the front按钮，保留刚刚的顺序，在头部加入数字

## 4、模板template

1）index.wxml加入

```
<template is="msgItem" data="{{...item}}"/>
<template is="msgItem" data="{{...itemb}}"/>

<template name="msgItem">
  <view>
    <text> {{index}}: {{msg}} </text>
    <text> Time: {{time}} </text>
  </view>
</template>
```

2）index.js加入（注意另外补充前边逗号，否则报错）

```
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2016-09-15'
    },
    itemb: {
      index: 99,
      msg: 'this is 99',
      time: '2099-99-9'
    }
```

这样就可以把data里不同的item参数值传到同一个template，用`<template is="msgItem" data="..."/>`调用。

![Snip20171214_3](https://ws2.sinaimg.cn/large/006tNc79gy1fmhayetj2hj30sa0533zp.jpg)

> 使用场景：展示一行一行样式一样的新闻。



# 八、事件

框架-视图层-WXML-事件

## 1、代码

1）index.wxml改成

```
<!--index.wxml-->
<view class="container">
  <view class="usermotto">
    <text class="user-motto" id="user-{{userid}}">{{motto}}{{userid}}</text>
  </view>
</view>
```

index.js改成

```
//index.js
//获取应用实例
var app = getApp();

Page({
  data: {
    motto: 'Hello World',
    userid: 1234,
  },
  onLoad: function () {

  },
  onShow: function() {
    //app.globalData.userInfo = "wxopen.club";
  }
})
```

2）用`bindtap="tapName"`绑定手机点击的事件。

比如index.wxml加入`<view class="usermotto" bindtap="tapMessage">`

3）index.js加入

```
  tapMessage: function (event) {
    console.log(event);
  },
```

![Snip20171214_4](https://ws2.sinaimg.cn/large/006tNc79gy1fmhayakcldj30mq0biabf.jpg)

* currentTarget，里面可以传一些参数进来，里面的dataset。id也可以传进来。
* detail坐标
* touches的坐标，获取整个页面大小
* type，当前事件类型

## 2、其他用法

1）前台可以传一些参数进入事件里。

```
。。。。。。代码演示
```



2）大小写的问题

3）事件冒泡问题（点击里层会往外冒出到第一层），如何阻止？

解答：用`catchtap`，比如`<view id="middle" catchtap="handleTap2">`



# 九、引用

框架-视图层-WXML-引用

## 1、新建目录pages/common，新建文件template_item.wxml

```
<template name="item">
<text>template text: {{text}}</text>
</template>
```

## 2、如何在index.wxml里进行定义和传参数呢？

### 2.1、import语法（实现模板的加载拼接，即第七课模板内容的跨文件拼接）

1）在index.wxml加入

```
<import src="../common/template_item.wxml"/>
...
<template is="item" data="{{text: 'index page trans data'}}"/>
```

![Snip20171214_5](https://ws2.sinaimg.cn/large/006tNc79gy1fmhaye14ayj30vq09mgn8.jpg)

### 2.2、include语法（实现navbar、footer的拆分）

1）新建common/header.wxml，加入`<text>HEADER</text>`

2）新建common/footer.wxml，加入`<text>FOOTER</text>`

3）index.wxml加入

```
<include src="../common/header.wxml"/>
...
<include src="../common/footer.wxml"/>
```

> 使用场景：1、页头页脚。2、新闻模块右边栏相关消息或推荐新闻，当不需要传参的时候用include，当需要传参的时候用template。



# 十、样式（和css差不多）

框架-视图层-WXSS，单个页面的定义优先于全局样式app.wxss。

## 1、常规样式

1）文档里提供的选择器.class、id、element（如view组件）、element, element、::after、::before。

2）内联样式

* ```
  <view style="color:{{color}};" />
  ```

  * style 接收动态的样式，在运行时会进行解析，请尽量避免将静态的样式写进 style 中，以免影响渲染速度。

* ```
  <view class="normal_view" />
  ```

  * 类选择器名(样式类名)的集合，样式类名不需要带上`.`，样式类名之间用空格分隔。

3）样式导入比如`@import "common.wxss";`

## 2、wx响应式样式

1）rpx，即响应式px。大小屏幕总宽等分为750rpx。

* 换算方法：在iphone6（屏幕宽度375px）上，1rpx=0.5px

2）rem，大小屏幕宽度等分为为20rem。

* 换算方法：1rem=(750/20)rpx



# 十一、API网络请求与列表绑定

知识点1：API网络请求

知识点2：复习第六章数据绑定{{xxx}}、第七章列表渲染wx:for，把API网络请求绑定到列表

其他知识：button、image组件的使用

## 1、准备工作

1）index.js改为

```
//index.js
//获取应用实例
var app = getApp();
Page({
  data: {

  },
})
```

index.wxml前台页面改为

```
<!--index.wxml-->
<view class="container">

</view>

```

index.wxss改为

```
/**index.wxss**/

```

app.wxss保持

```
/**app.wxss**/
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
} 

```

## 2、网络请求

打开文档-API-发起请求

[课程提供的API接口网址](http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=top&count=10)

### 2.1 讲解

1）发起网络请求如下。比较简单，直接把示例代码拷过来用。

①、url，参数

②、data，请求参数，也可以拼接在url里

③、header，注意不能设置Referer因为只是请求api，Referer没有意义

④、method，基本继承了http的方法如GET、POST、PUT、DELETE等

⑤、success、fail、complete，做回调

2）Bug & Tip，当前版本的问题。

①、上线版本一定要注意转换为TTPS，然后部署TLS的版本要注意一下。

②、url中不能有端口（可能是要做一些域名的备案验证）。

### 2.2 代码

1）index.wxml加入按钮，设置点击loadData

```
<!--index.wxml-->
<view class="container" wx:key="index">
  <view>
    <button type="primary" bindtap="loadData">加载数据</button>
  </view>
</view>

```

2）index.js，加一个function，把API示例代码贴过去。并粘贴api接口网址。

```
  loadData: function () {
    wx.request({
      url: 'http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=top&count=10', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }

```

当点击按钮的时候就会请求，然后在console里把请求的代码打印出来。

![Snip20171214_6](https://ws1.sinaimg.cn/large/006tNc79gy1fmhaya49lxj30kd05ojta.jpg)

## 3、把API请求绑定到列表

调整按钮位置。修改app.wxss，`padding: 0 0rpx;`

1）index.wxml加入如下，用来绑定新闻图片、类型、标题。

```
  <view wx:for="{{newsdata}}">
    <image sytle="width:300px;height:200px;" src="{{item.thumbnail_pic_s}}"></image>
    [{{item.realtype}}]{{item.title}}
  </view>

```

2）index.js的data里定义上边写`newsdata: ''`

3）这里的this肯定会指向不明，所以在`loadData: function(){}`刚开始的时候对this做存储，即`var that = this;`用转移的形式把它变成that

4）在success的function里加入

```
        that.setData({
          newsdata: res.data
        })

```

**最后的index.js代码如下：**

```
//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    newsdata: ''
  },
  loadData: function () {
    var that = this;
    wx.request({
      url: 'http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=top&count=10', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          newsdata: res.data
        })
      }
    })
  }
})

```

点击按钮，会加载出图片

![Snip20171214_7](https://ws1.sinaimg.cn/large/006tNc79gy1fmhaybxew6j307w0dv3zj.jpg)

> 把API请求绑定到列表的思路：
>
> ①、设置data参数newsdata用于调用：在index.js的data里定义数组newsdata
>
> ②、在index.wxml中用wx:for="{{newsdata}}"绑定数组。绑定数组后可以用{{item}}调用数据，所以定义`{{item.thumbnail_pic_s}}`、`{{item.realtype}}`、`{{item.title}}`分别调用API里的图片、类型、标题。
>
> ③、在生命周期success里，定义this.setData({})用于改变页面信息。这里是把newsdata的值由空变为res.data，即传进来的API参数。于是定义的数组便有了值，通过{{item}}显示出来。



# 十二、项目一(1)准备工作

咕咕监控，做它微信小程序的版本（小程序适用于使用频次不太多，但想起来的时候能用的产品）。

1）index.js改成

```
//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
  },
})

```

2）index.wxml改成

```
<!--index.wxml-->
<view class="container">

</view>

```

3）logs目录重命名为usercenter，四个文件名都改成login.xx

login.wxml改成

```
<view class="page">

</view>

```

login.js改成

```
Page({
  data: {
  },
})

```

login.json改成

```
{
  "navigationBarTitleText": "用户中心"
}

```

4）在app.json里首尾的两个`pages/logs/logs`改成`pages/usercenter/login`；

把页头的“WeChat”改成“咕咕监控”

把“日志”改成“用户中心”；

把图标`images/icon_seo.png`改成`images/icon_account.png`；

把图标`images/icon_seo_HL.png`改成`images/icon_account_HL.png`；

图标文件放到images文件夹。

5）app.wxss改成

```
.container {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  justify-content: space-between;
}
.page-header {
  font-size: 32px;
  color: #aaa;
  margin-top: 50rpx;
  flex-direction: column;
  align-items: center;
}
.page-header-text {
  padding: 20rpx 40rpx;
}
.page-header-line {
  width: 150rpx;
  height: 1px;
  border-bottom: 1px solid #ccc;
}

.page-body {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  overflow-x: hidden;
}
.page-body-wrapper {
  margin-top: 100rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.page-body-wrapper form {
  width: 100%;
}
.page-body-wording {
  text-align: center;
  padding: 200rpx 100rpx;
}
.page-body-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  margin-bottom: 50rpx;
  width: 100%;
  padding: 50rpx 0 150rpx 0;
}
.page-body-title {
  margin-bottom: 100rpx;
  font-size: 32rpx;
}
.page-body-text {
  font-size: 30rpx;
  line-height: 26px;
  color: #ccc;
}
.page-body-text-small {
  font-size: 24rpx;
  color: #000;
  margin-bottom: 100rpx;
}
.page-body-form {
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #eee;
}
.page-body-form-item {
  display: flex;
  align-items: center;
  margin-left: 30rpx;
  border-bottom: 1px solid #eee;
  height: 88rpx;
  font-size: 34rpx;
}
.page-body-form-key {
  width: 180rpx;
  color: #000;
}
.page-body-form-value {
  flex-grow: 1;
}
.page-body-form-value .input-placeholder {
  color: #b2b2b2;
}

.page-body-form-picker {
  display: flex;
  justify-content: space-between;
  height: 100rpx;
  align-items: center;
  font-size: 36rpx;
  margin-left: 20rpx;
  padding-right: 20rpx;
  border-bottom: 1px solid #eee;
}
.page-body-form-picker-value {
  color: #ccc;
}

.page-body-buttons {
  width: 100%;
}
.page-body-button {
  margin: 25rpx;
}
.page-body-button image {
  width: 150rpx;
  height: 150rpx;
}
.page-footer {
  text-align: center;
  color: #1aad19;
  font-size: 24rpx;
  margin: 20rpx 0;
}

.green{
    color: #09BB07;
}
.red{
    color: #F76260;
}
.blue{
    color: #10AEFF;
}
.yellow{
    color: #FFBE00;
}
.gray{
    color: #C9C9C9;
}

.strong{
    font-weight: bold;
}

.bc_green{
    background-color: #09BB07;
}
.bc_red{
    background-color: #F76260;
}
.bc_blue{
    background-color: #10AEFF;
}
.bc_yellow{
    background-color: #FFBE00;
}
.bc_gray{
    background-color: #C9C9C9;
}

.tc{
    text-align: center;
}

.page input{
    padding: 20rpx 30rpx;
    background-color: #fff;
    border-bottom: 1px solid #dddddd;
}
checkbox, radio{
    margin-right: 10rpx;
}

.btn-area{
    padding: 0 30px;
}
.btn-area button{
    margin-top: 20rpx;
    margin-bottom: 20rpx;
}

.page {
    min-height: 100%;
    flex: 1;
    font-size: 32rpx;
    font-family: -apple-system-font,Helvetica Neue,Helvetica,sans-serif;
    overflow: hidden;
}
.page__hd{
    padding: 50rpx 50rpx 50rpx 50rpx;
    text-align: center;
}
.page__title{
    display: inline-block;
    padding: 20rpx 40rpx;
    font-size: 32rpx;
    color: #AAAAAA;
    border-bottom: 1px solid #CCCCCC;
}
.page__desc{
    display: none;
    margin-top: 20rpx;
    font-size: 26rpx;
    color: #BBBBBB;
}

.section{
    margin-bottom: 30rpx;
}
.section_gap{
    padding: 0 30rpx;
}
.section__title{
    margin-bottom: 16rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
}
.section_gap .section__title{
    padding-left: 0;
    padding-right: 0;
}

```



# 十三、项目一(2)对用户中心做布局

1）login.wxml改为

```
<!--logs.wxml-->
<view class="page">
    <view class="page__hd">
        <view class="section__ctn">
            <Image style="width:100px; height:100px;" src="https://o97mkvfjm.qnssl.com/logo.png"></Image>
        </view>
    </view>
    <view class="page__bd">
      <view class="section">
        <input type="text" placeholder="邮箱" auto-focus />
      </view>
      <view class="section">
        <input type="text" placeholder="密码" />
      </view>
      <view class="section">
        <view class="btn-area">
           <button type="primary" >登录</button>
        </view>
      </view>

      <view class="section">
      <view class="btn-area">
        <button type="default" bindtap="gotoregister">新用户注册</button>
      </view>
    </view>
    <view class="section">
      <view class="btn-area">
        <button type="default" bindtap="forgotpassword">忘记密码</button>
      </view>
    </view>

    </view>
</view>

```



# 十四、项目一(3)登录按钮功能

本章涉及文档-API-界面-交互反馈-wx.showModal（显示模态弹窗）、wx.showToast（显示消息提示框）

## 1、界面

1）在index.wxml加入文字“首页”（用来识别这一页是首页）

2）在login.wxml，登录部分改成`<button type="primary" ontap="login">登录</button>`

3）在login.js，加入

```
  login: function (e) {
    wx.showToast({ 
      title: '登录请求中', 
      icon: 'loading', 
      duration: 10000 
  });
  }

```

## 2、网络请求

> 注意：在Q&A里说，发布的时候要求是https请求，tls仅支持1.2及以上版本。
>
> 要用chrome浏览器-检查-Security，查看你真实部署的API后台的https版本。

![Snip20171214_10](https://ws3.sinaimg.cn/large/006tNc79gy1fmhayfa61xj30r70eb76f.jpg)

1）login.js加入

```
Page({
  data: {
    email: '',
    password: ''
  },
  login: function (e) {
    wx.showToast({
      title: '登录请求中',
      icon: 'loading',
      duration: 10000
    });
    //网络请求开始
    wx.request({
      url: 'https://api.gugujiankong.com/account/Login?email=' + this.data.email + '&password=' + this.data.password
    )};
  }
})

```

2）表单输入值的获取`bindinput=""`（用来获取前台用户输入的账号、密码）

修改login.xwml如下：

`<input type="text" bindinput="bindEmailInput" placeholder="邮箱" auto-focus />`

`<input type="password" bindinput="bindPasswordInput" placeholder="密码" />`

3）login.js后台定义上边的两个方法

```
  bindEmailInput: function (e) {
    this.setData({ email: e.detail.value })
  },
  bindPasswordInput: function (e) {
    this.setData({ password: e.detail.value })
  },

```

> xx.detail.value的用法案例可以查看官方文档-组件-表单组件-input

4）login.js的api部分加header和success

```
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.hideToast();
        if (res.data.LoginStatus == 1) {
          //进行一些用户状态的存储
        } else {
          wx.showModal({
            title: '登录失败', content: '请检查您填写的用户信息！', showCancel: false, success: function (res) {
              //回调函数
            }
          });
        }
      }

```

## 3、课程回顾

1）如何获取表单的值？

通过回调的形式，在后台用`.detail.value`方法获得值，然后在前台调用。

> 当某个函数（更确切的说是函数的指针）被作为参数，被另一个函数调用时，它才是回调函数。

2）登录的时候

①、组件wx.showToast的使用

②、https的注意事项

③、header如何配置

④、在回调的时候做一些状态的处理，比如wx.showModal（显示模态弹窗）、wx.showToast（显示消息提示框）



# 十五、项目一(4)导航-页面跳转

本章涉及文档-API-界面-导航

wx.navigateTo，保留当前页面，跳转到应用内的某个页面；

wx.redirectTo，关闭当前页面，跳转到应用内的某个页面。

wx.switchTab，跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。（用于没有登录时看不到底部tarbar）

## 1、进行tab的切换

1）login.js页面，

```
          wx.switchTab({
            url: '../../pages/index/index',
            success: function () {
              console.log("called switchtab.");
            }
          });

```

## 2、【问题】

1）测试用来登录的账号密码，在哪里设置，尝试login.js和index.js的data位置都失败了？



# 十六、项目一(5)自己写的API如何让微信接受

1.tls 仅支持 1.2 及以上版本；

2.部分 Android 机型需要 tls1.0 或者 tls1.1，所以请确保服务器的 tls 版本为 1.0、1.1、1.2；

即需要tls是1.2版本并向下兼容。

## 1、检测工具

1）[OnlineDomainTools](http://ssl-checker.online-domain-tools.com/)，用于检测网站tls版本支持等情况。

Domain name，填的是不带https的域名，注意不是填api接口的网址。比如`api.gugujiankong.com`；

Port，端口默认443；

Ip，可以不填；

![Snip20171214_15](https://ws1.sinaimg.cn/large/006tNc79gy1fmhay91i6qj30ki0c175s.jpg)

2）[ipv6 test](ipv6-test.com)，做ios开发时，或api不仅仅给微信小程序用还给ios用。

> 尽量让自己的API接口支持https，不管是从安全性，还是从apple的ios、微信小程序的支持，都是必备的。

## 2、【问题】

1）如何快速配置ipv6？



# 十七、项目一(6)地图

文档-组件-地图-map，地图不是逻辑和代码困难，主要是一些基础的概念。

## 1、几个重要的概念

1）longitude经度，

2）latitude纬度，

> 注意：如果用高德地图，当你要给定一个经纬度做标记时，必须用[高德地图API](https://lbs.amap.com/api)的地图工具-坐标拾取器。

3）scale，放大的级别

4）controltap事件

5）markers事件，就是可以在上边标一些点

6）show-location，显示当前位置

## 2、代码

1）index.wxml改成

```
<!--index.wxml-->
<view class="container">
  <map id="map" longitude="116.397428" latitude="39.907913" scale="14" markers="{{markers}}" style="width:100%;height:300px;"></map>
</view>

```

刷新可以看到首页出现地图：

![Snip20171214_16](https://ws4.sinaimg.cn/large/006tNc79gy1fmhaxihv7ij307q0dtjrv.jpg)

2）为了在地图上标点，定义上边引用的markers。

index.js改为

```
Page({
  data: {
   markers: [{
     iconPath: "http://webapi.amap.com/theme/v1.3/markers/b/mark_bs.png",
     id: 0,
     latitude: 39.907354,
     longitude: 116.397557,
     width: 19,
     height: 33
   }]}
})

```

## 3、四个Tip

1）`map` 组件是由客户端创建的原生组件，它的层级是最高的，不能通过 z-index 控制层级。

2）`tip`: 请勿在 `scroll-view`、`swiper`、`picker-view`、`movable-view` 中使用 `map` 组件。

3）`tip`: `css` 动画对 `map` 组件无效。

4）`tip`: `map` 组件使用的经纬度是火星坐标系，调用 `wx.getLocation` 接口需要指定 `type`为 `gcj02`



# 十八、flex的布局

文档-组件-视图容器-view，官方文档讲的太简单了比较让人迷惑。

1）[css-reference](http://cssreference.parryqiu.com)，在github上的项目已翻译成中文文档。大家可以看flexbox章节。



# 十九、项目一(7)微信登录

文档-API-用户信息-wx.getUserInfo

## 1、wx.getUserInfo

1）获取用户信息，withCredentials 为 true 时需要先调用 [wx.login](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html#wxloginobject) 接口。

2）需要[用户授权](https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize-index.html) scope.userInfo

## 2、代码（官方新建专案就有）

1）app.js

```
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

```

2）index.js如下。在页面onload的时候，可以把userInfo从globalData里取出来，给前台index.wxml调用	

```
onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

```

3）index.wxml，调用昵称等信息

```
<text class="userinfo-nickname">{{userInfo.nickName}}</text>

```

## 3、unionID（比较重要）

1）用来做统一的登录识别。

比如在京东web可以用微信登录、京东公众号用微信登录、京东还有微信小程序，三个平台的用户都是扫二维码登录，用unionID就能识别成一个用户，比如用户信息、订单可以通用。

2）一个app对应一个openID，所以不能通过openID。

4、【问题】如何通过后端API，换取openID？