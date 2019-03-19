---
title: wx-system-蓝鸥系列《微信小程序全方位深度解析》基础知识补充
date: '2018-01-03 00:10'
categories:
  - 微信小程序
tags:
  - 微信系统
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fng5pmwdonj30cd08u0sx.jpg'
abbrlink: e81fc078
top: 3
---

* 201801
* 编程+小程序



# 取名字是最蛋疼的，连做视频的老师都这么说，所以更要想好每个模块class和变量命名套路。

常用关键词：（定义模块）、拿到数据、显示数据

# 参考资料

蛮牛教育、网易云课堂、百度传课，搜《微信小程序全方位深度解析》、《高级api视频教程》

蛮牛教育免费在线视频http://edu.manew.com/course/193/learn#lesson/2559，可1.5倍速。

网易云课堂免费在线视频，http://study.163.com/course/courseLearn.htm?courseId=1003283028#/learn/video?lessonId=1003973293&courseId=1003283028，只有1倍速，含《高级api视频教程》。



# 一、视频目录

组件部分从比较简单，从16课开始只记录重点。

## 1、小程序windows版本环境搭建

## 2、小程序mac os版本环境搭建

## 3、小程序入门

## 4、目录结构及配置

1）配置-debug，开发可以开着，在app.json加入`"debug": true`

## 5、逻辑层注册程序、注册页面

1）setData，用的非常多，把数据从逻辑层发送到视图层，同时改变this.data的值。

2）页面路由，navigator标签，或wx.navigateTo。

## 6、js作用域和模块化

1）文件作用域。

2）js模块化，用的非常多，**『用法见问题3』**。

## 7、视图层

## 8、数据绑定

```
1）wx:if，利用true和false的值做”显示“和”隐藏“的效果。**『用法见问题4』**。

如果有多个用wx:if、wx:elsif、wx:else，或wx:if、wx:if、wx:if。

2）hidden，利用true和false的值做”显示“和”隐藏“的效果。**『用法见问题4』**。

3）this是指Page，常用的this.data就是Page里的data散列。

4）三元运算`<view hidden="{{bol? "正":"反"}}"> Hidden </view>`，如果bol是true显示”正“，false显示”反“。

5）{{}}用法。做数学运算如{{3+5}}，做字符串连接如{{"hello"+id}}，做三元运算，配合wx:for做循环相当于ruby的each do，做数组组合如wx:for="{{[id,3,2,1]}}"形成新的数组，wxml模板template的传参，

6）wxml模板template，独立作用域，**『用法见问题5』**。{{…散列}}的写法，就不用一个个变量和值去写。
```

## 9、wx:for详解

1）下标是index，值是item。自定义下标变量名wx:for-index="i"、值的变量名wx:for="j"。

2）for的嵌套做九九乘法表，**『用法见问题6』**。 

## 10 、事件详解

1）bind+tap相当于事件，可以对应到function。

2）冒泡事件和非冒泡事件详解，**『实例见问题7』**。

3）移动开发常用事件：touchstart、touchmove、touchcancel。比原生js多了两个事件，tap等价于桌面端的click即手指按下并抬起，longtap等价于桌面端的mousedown即手指按下。

事件参数：type事件类型，timeStamp触发时间，touches返回数组如果是多点触控就有多个数组，detail其他信息后面会用特别多。target（触发事件）和currentTarget（当前事件）返回值的结果是一样的。

> target是事件触发事件的源对象，即**罪魁祸首**。currentTarget是**所在组件**。
>
> 比如**『问题7中的冒泡事件』**，点击inner同时触发inner、middle后，可以看两个事件的target即罪魁祸首都是inner，而middle的currentTarget所在组件是middle。

## 11、wxml中引用import、incloud

详细**『案例见问题8』**。

## 12、wxss

import/incloud，**『调用见问题9』**。

全局样式app.wxss和局部样式，局部样式优先级比全局样式高。

## 13、view组件-flex布局

flex:1相当于bootstrap中的col-md-xx。区别是col-md-12固定12格，而flex是根据我们设置的flex总数按比例显示，如下会按1/4、1/4、2/4显示。

<img src="https://ws1.sinaimg.cn/large/006tKfTcgy1fmznfge678j30jl07574i.jpg" width="600">

## 14、view组件-scroll-view

1）解决样式逸出/超出问题（子元素比父元素大会超出父元素，给父元素加个边框就能看清楚）

2）参数

scroll-y、scroll-x，滚动方向；

upper-threshold距离顶部/左边多远(默认50)触发scrolltoupper 事件、lower-threshold距离底部/右边多远时触发scrolltolower 事件；

scroll-top、scroll-left，滚动条的初始位置；

scroll-into-view="id标签"，比scroll-top/left好用，初始值在id的标签位置；

bindscroll，滚动时触发事件；

3）滚动切换的**『案例，见问题10』**。

## 15、view组件-swiper

### 15.1 轮播图swiper

1）参数

indicator-dots="true"，指示点；

autoplay="true"，自动切换，默认5秒；

interval="3000"，自动切换的时间3秒；

duration="3000"，滑动动画持续时间；

current="2"，初始图片第几张，不设置默认0；

bindchange，current改变时会触发事件；

2）注意：swiper里只能放`<swiper-item/>`组件，否则会导致未定义的行为。 

### 15.2 拓展：表单-滑动选择器`<slider/>`

用slider标签做动态切换，**『案例见问题11』**。

①、`<slider min="2000" max="5000"/>`，像播放器的进度条。

②、参数

min，起点值；

max，终点值；

show-value，显示值；

bindchange，滑动进度条触发事件；

③、`<slider/>`滑动选择器能用于：

* 动态修改轮播图切换时间；


* 动态修改轮播图动画持续时间；
* 动态修改范围内的数值；

小结：各种属性都可以作为数据，实现动态更改。

## 16、组件-基础内容

1）icon

type、size、color

2）text，特点是长按可以被选中。

3）proress进度条，percent进度百分之多少。用js制作进度条见视频。

## 17、组件-表单1

1）button上用form-type="submit/reset"，配合`<form bindreset/bindsubmit="xx"/>`，做点击重置或点击发送的功能。

## 18、组件-表单2

1）checkbox

2）input

## 19、组件-表单3

1）picker，用bindchange触发事件。

<img src="https://ws2.sinaimg.cn/large/006tNc79gy1fn0yff5vn0j306206kdfq.jpg" width="200">

## 20、组件-表单4

1）radio，单选框。跟复选框checkbox非常像。

<img src="https://ws1.sinaimg.cn/large/006tNc79gy1fn0yolwv55j306a03vmx9.jpg" width="200">

2）silder，滑动选择器。详见**『15节讲解的问题11』**。

3）textarea，多行文本。auto-height，输入框根据文字变大，不会出现滚动条。

## 21、api-界面-交互反馈

常配合点击事件bindtap使用。

1）wx.request()

2）wx.showActionSheet()，显示操作菜单。

3）wx.showModal()，显示模态弹窗。

<img src="https://ws4.sinaimg.cn/large/006tNc79gy1fn0ztev74aj305y04r3yd.jpg" width="200">

4）wx.showToast()，删除/加载数据时的提示框。

wx.hideToast()，隐藏提示框，放在setTimeout的function里可以提前隐藏。

<img src="https://ws4.sinaimg.cn/large/006tNc79gy1fn0zxk7gh6j30a9053q2v.jpg" width="200">



## 22、api-导航、组件-导航

1）组件`<navigator>..</navigator>`

2）api的wx.navigateTo、wx.redirectTo、wx.switchTab

其他wx.navigateBack、wx.reLaunch

## 23、组件-媒体组件、api-音频组件控制

1）组件audio，音频。

2）audio可配合api的音频组件控制wx.createAudioContext，控制播放/暂停。

3）组件image，mode对图片进行裁剪/缩放。

最长用mode="aspectFill"，保持纵横比缩放图片，只保证图片的短边能完全显示出来。

4）组件video，视频。danmu-btn弹幕。

## 24、组件-地图、api-位置

1）wx.getLocation，获取当前地理位置。

2）wx.openLocation，查看位置。

## 25、组件-画布canvas

腾讯不允许发布游戏，但是可以用canvas做一些动画。

1）canvas，画布。

## 26、canvas动画实例

# 二、问题实例（本教程实例）

## 1、怎么把加载中、request请求api等function，封装到app.js中？

## 2、app.js的全局函数app()怎么设置变量和调用？

1）app.js设置变量

```
  globalData: {
    userInfo: null,
    pass: "999"
  }
```

2）如在index.js定义pass2，app.js里拿到数据

```
  var app = getApp() //获取到全局实例
  
  onLoad: function () {
    this.setData({
      pass2: app.globalData.pass
    });
```

3）显示数据

```
<view>密码是：{{pass2}}</view>
```

## 3、js模块化怎么定义和调用？

* 定义：模块化。可以将一些公共的代码抽离成为一个单独的 js 文件，作为一个模块。模块只有通过 `module.exports` 或者 `exports` 才能对外暴露接口。
  * `exports` 是 `module.exports` 的一个引用，因此在模块里边随意更改 `exports` 的指向会造成未知的错误。所以更推荐开发者采用 `module.exports` 来暴露模块接口，除非你已经清晰知道这两者的关系。
* 用require调用（本机需安装nodejs才会生效） 。

### 1）根目录创建common/common.js，定义模块化数据，并暴露接口

先定义function，如`function sayHello(name){..}`，然后在`module.exports`中暴露接口。

```
// common.js
console.log("我是common.js") //一样可以用console.log来测试数据
function sayHello(name) {
  console.log(`Hello ${name} !`)
}
function sayGoodbye(name) {
  console.log(`Goodbye ${name} !`)
}

module.exports = {  //只有在module里暴露接口，才能被其他文件调用。
  hello1: sayHello, //暴露接口sayHello，在其他文件上用common.hello1()来调用
  goodbye1: sayGoodbye
}
```

### 2）调用js模块，拿到数据

比如index.wxml

```
<button bindtap="say">say hello!</button>
```

index.js，用`require(模块js文件)`引用js文件，然后用`common.变量(参数)`调用接口。

```
var common =require("../../common/common.js"); //引入common.js文件所暴露的接口
Page({
  data: {
    motto: 'Hello World',
	name: '999'
  },
  say:function(){
    common.hello1(this.data.motto); //点击按钮后输出Hello Hello World
    common.goodbye1(this.data.name); //点击按钮后输出Goodbye 999
  },
```

测试：微信工具重新编译，可以看到console里出现”我是common.js“，单击按钮出现定义的结果。

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmz07vheibj30d40c4dgt.jpg)

### 3）进阶：用require可以引用其他的js依赖

1）新建common/a.js

```
console.log("我是common.js所依赖的a.js")
```

2）在common.js加入a.js

```
require("a.js")
```

3）测试：微信工具重新编辑，console里出现”我是common.js所依赖的a.js“、”我是common.js“。

## 4、显示/隐藏功能？!取反

### 方法一：wx:if="{{true/false}}"，推荐用！

1）wxml增加按钮，以及要显示/隐藏的内容

```
<button bindtap='show'>点击显示/隐藏</button>
<view wx:if="{{bol}}">条件渲染显示</view>
```

2）js初始化bol的值为true/fale，然后利用`!bol`即与bol的值相反，来实现显示/隐藏

```
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bol: true
  },
  show:function(e){
    console.log(this.data.bol);
    var bol = this.data.bol //this.data.bol就是拿到Page的data散列中的bol值，即初始值
    this.setData({
      bol: !bol //最关键的点，用!bol来实现true和false的切换
    })
  },
```

### 方法二：hidden="{{true/false}}"，不推荐！

测试发现，hidden只能在text文本使用，如果在view上是不生效的。

## 5、定义和调用wxml模板template？独立作用域？——同文件调用（跨文件调用见问题8）

1）定义wxml模板，用template和name

```
<template name="object"> <!--name属性一定要写-->
  <view>第一个对象{{a}}</view>
  <view>{{b}}</view>
  <view>{{name}}</view>
</template>
```

2）wxml模板调用 ，用is和data

```
<template is="object" data="{{a:1, b:2}}"></template>
```

```
注意：模板template是独立作用域，只能使用这里的data传进来的数据。因此，即便js里的data有设置name的值，也跟template没有任何关系，所以在这里不会显示name的值。

如果想使用js的data的name值，可以把传进template的数据写成`<template is="object" data="{{a:1, b:2, temname: name}}"></template>`。
```



## 6、九九乘法表（用wx:for和wx:if）？

因为是嵌套wx:for，所以item可能会搞不清楚是哪一个wx:for的，这种情况建议自定义item的变量名。

1）用wx:for初步显示列表

```
<view wx:for="{{[1,2,3,4,5,6,7,8,9]}}" wx:for-item="i">
  <view wx:for="{{[1,2,3,4,5,6,7,8,9]}}" wx:for-item="j" style="display:inline-block; width:50rpx;">
    {{j}}
  </view>
</view>
```

2）用wx:if判断输出具体列表

```
<view wx:for="{{[1,2,3,4,5,6,7,8,9]}}" wx:for-item="i">
  <view wx:for="{{[1,2,3,4,5,6,7,8,9]}}" wx:for-item="j" style="display:inline-block; width:150rpx;">
    <view wx:if="{{j<=i}}">
      {{i}}*{{j}}={{i*j}}
    </view>
  </view>
</view>
```

## 7、冒泡事件 和 非冒泡事件？

1）冒泡示例

wxml

```
<view id="outter" bindtap="outterTap">
  outter view
  <view id="middle" bindtap="middleTap">
    middle view
    <view id="inner" bindtap="innerTap">
      inner view
    </view>
  </view>
</view>
```

js

```
  outterTap:function(){ 
    console.log("触发了outter事件")
  },
  middleTap:function(){
    console.log("触发了middle事件")
  },
  innerTap:function(){
    console.log("触发了inner事件")
  },
```

测试：点击最里层的inner view，在console可以看到同时触发了inner view、middle view、outter view。

> 冒泡是怎么一回事？
>
> 可以给outter view加一个红色边框`style="border:1px solid red;"`，可以看到inner也是包含在outter边框里的。所以一点击就会触发三个事件。而且执行顺序是从里到外。

2）解决办法

把bindtap改成catchtap，就可以阻止冒泡。

```
<view id="outter" bindtap="outterTap">
  outter view
  <view id="middle" catchtap="middleTap">
    middle view
    <view id="inner" catchtap="innerTap">
      inner view
    </view>
  </view>
</view>
```

## 8、调用template文件import、include——跨文件调用

### 8.1 import（拿template模板）

1）import可在当前文件中使用目标文件定义的`<template/>`，而且只调用`<template/>`，其他内容忽略。

index文件夹新建item.wxml

```
<view>我是item.wxml</view>
<template name="item">
  <text>我是item.wxml里的{{name}}</text>
</template>
```

index.wxml

```
<import src="item.wxml"/>
<template is="item" data="{{name: '99'}}"/>
```

测试：输出”我是item.wxml里的99“，没有出现”我是item.wxml“。

2）如果上边例子的item也调用了其他文件c.wxml。

结论是：不能嵌套调用。

c.wxml

```
<template name="c">
  <text>我是c.wxml里的{{pass}}</text>
</template
```

item.wxml

```
<view>我是item.wxml</view>
<import src="c.wxml"/>
<template name="item">
  <text>我是item.wxml里的{{name}}</text>
</template>
```

index.wxml

```
<import src="item.wxml"/>
<template is="item" data="{{name: '99'}}"/>
<template is="c" data="{{pass: '12345'}}"/>
```

测试：发现c.wxml没有生效。

### 8.2 include（拿 !template模板）

1）可以将目标文件除了`<template/>`的整个代码引入。即与import相反。

index.wxml注解所有代码，新增

```
<include src="item.wxml"/>
<template is="item" data="{{name: '99'}}"/>
```

测试：显示”我是item.wxml“，所有`<template/>`没有被调用。

## 9、调用wxss模块

common/common.js

```
.aaa{
  background: blue;
}
```

pages/index.index.wxss

```
@import "../../common/common.wxss";  /*要写在文件最上面*/
```

index.wxml

```
<view class='aaa'>调用common.wxss的aaa</view>
```

## 10、滚动切换，用scroll-into-view

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmzriz66qmg308h0790t1.gif)

1）wxml，因为scroll-into-view是调用id选择器的，所以相应的给a/b/c加上id。{{toView}}放的是数组，数组的值就是id的值，值的变化就相当于是id的变化。

```
 <scroll-view scroll-y="true" class='flex-wrap' scroll-into-view="{{toView}}">
  <view id="a" >a</view>
  <view id="b" >b</view>
  <view id="c" >c</view>
</scroll-view> 
<button bindtap='tapChange'>切换</button>
```

2）wxss

```
.flex-wrap{
  height: 400rpx;
}
.flex-wrap view{
  text-align: center;
  font-size: 40rpx;
  color: white;
}
#a{
  background-color: green;
  height: 100%;
}
#b{
  background-color: red;
  height: 100%;
}
#c{
  background-color: blue;
  height:100%;
}
```

3）js

```
var order = ["a", "b", "c"]; //数组
var index = 0; //初创下标值
Page({
  data: {
    toView:"b",  //给toView数组的默认值，在wxml上表现为id="b"
  },
  tapChange:function(){
    index++;
    if(index > order.length-1){
      index = 0;
    }
    this.setData({
      toView: order[index]
    })
  },
```

## 11、swiper动态切换

1） wxml

```
<swiper autoplay='true' interval='{{inter}}'>
  <swiper-item wx:for="{{imgUrls}}">
    <image src="{{item}}" style='width:750rpx;'></image>
  </swiper-item>
</swiper>
<slider bindchange="intervalChange" show-value min="2000" max="5000"/>

```

2）js

```
Page({
  data: {
    inter:2000, //轮播切换时间初始值2秒
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
  },
  intervalChange:function(e){
    console.log(e)
    var sliderValue = e.detail.value;
    this.setData({
      inter: sliderValue
    })
  },


```

