---
title: wx-function-商城(视频)分类菜单左右联动（详细讲wx/for和console案例）
date: '2017-12-24 00:10'
categories:
  - 微信小程序
tags:
  - 微信功能
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfwxbwogcj30dy0ccwer.jpg'
abbrlink: 8282a6c
top: 3
---

* 201712
* 编程+小程序



### 参考资料

视频地址https://ke.qq.com/course/243926

# 目录

参考资料

一、菜单联动实际用途，分析

二、创建基本框架

* 1、基本元素
* 2、先做菜单/分类标题
* 此时的完整代码

三、创建菜单联动

* 3、再做菜单/分类明细
* 4、两个模块关联到一起

四、最终的完整代码（理清思路）

![](https://ws4.sinaimg.cn/large/006tNc79gy1fmrosrcrrcg308l0f9ai1.gif)



# 一、菜单联动实际用途，分析

# 二、创建基本框架

<img src="https://ws3.sinaimg.cn/large/006tNc79gy1fmqgw27f1pj30oi0si0tp.jpg" width="300">

## 1、基本元素

1）写入基本左右栏元素，左右按列排放

wxml

```
<view class="Box">
  <view class="category">
    <view class='address_top'>地区</view>
    <view class='address_bottom'>分类1</view>
    <view class='address_bottom'>分类2</view>
    <view class='address_bottom'>分类3</view>
    <view class='address_bottom'>分类4</view>
  </view>
  <view class='orientation_region'>
    <view class='orientation'>自动定位</view>
    <view class='orientation_city active'>1</view>
    <view class='orientation_city'>2</view>
  </view>
</view>
```

js

```
// pages/cata88/cata88.js
Page({
  data: {
    orientationlist: [
      { id: "01", region: "东北" },
      { id: "02", region: "华北" },
      { id: "03", region: "华东" },
      { id: "04", region: "华南" },
      { id: "05", region: "华中" }
    ],
    act_addlist: [
      {
        id: "01", region: "东北地区",
        city: [
          { id: "0101", name: "白山市" },
          { id: "0102", name: "汕头市" },
          { id: "0103", name: "深圳市" },
          { id: "0104", name: "广州市" },
          { id: "0105", name: "测试1" },
          { id: "0106", name: "测试2" },
          { id: "0107", name: "测试3" },
          { id: "0108", name: "测试4" },
          { id: "0109", name: "测试5" },
        ]
      },
      {
        id: "02", region: "华北地区",
        city: [
          { id: "0201", name: "包头市" },
          { id: "0202", name: "大庆" },
          { id: "0203", name: "保定" },
          { id: "0205", name: "测试1" },
          { id: "0206", name: "测试2" },
          { id: "0207", name: "测试3" },
          { id: "0208", name: "测试4" },
          { id: "0209", name: "测试5" },
          { id: "0210", name: "测试6" }
        ]
      },
      {
        id: "03", region: "华东地区",
        city: [
          { id: "0301", name: "东东市" },
          { id: "0302", name: "东东" },
          { id: "0303", name: "咚咚咚" },
          { id: "0305", name: "测试1" },
          { id: "0306", name: "测试2" },
          { id: "0307", name: "测试3" },
          { id: "0308", name: "测试4" },
          { id: "0309", name: "测试5" },
          { id: "0310", name: "测试6" }
        ]
      },
      {
        id: "04", region: "华南地区",
        city: [
          { id: "0401", name: "东东市" },
          { id: "0402", name: "东东" },
          { id: "0403", name: "咚咚咚" },
          { id: "0405", name: "测试1" },
          { id: "0406", name: "测试2" },
          { id: "0407", name: "测试3" },
          { id: "0408", name: "测试4" },
          { id: "0409", name: "测试5" },
          { id: "0410", name: "测试6" }
        ]
      },
      {
        id: "05", region: "华中地区",
        city: [
          { id: "0501", name: "东东市" },
          { id: "0502", name: "东东" },
          { id: "0503", name: "咚咚咚" },
          { id: "0505", name: "测试1" },
          { id: "0506", name: "测试2" },
          { id: "0507", name: "测试3" },
          { id: "0508", name: "测试4" },
          { id: "0509", name: "测试5" },
          { id: "0510", name: "测试6" }
        ]
      }
    ],
    classifySelected: ''
  },
})
```

wxss

```
.Box {
  display: flex;
  justify-content: space-between;
}
.orientation_city.active { /*测试变量classifySelected是否等于{{item.id}}，改变字色*/
  color: red;
}
```

## 2、先做菜单/分类标题

1）先把列表循环出来

```
  <view class='orientation'>自动定位</view>
    <block wx:for="{{orientationlist}}" wx:key="">
      <view class="orientation_city">{{item.region}}</view>
    </block>
  </view>
```

2）点击事件。并且点击某个标题时有标红的css，需要加id。

wxml 

```
  <view class='orientation'>自动定位</view>
    <block wx:for="{{orientationlist}}" wx:key="">
      <view class="orientation_city" bindtap='right_fl' data-id='{{item.id}}'>{{item.region}}</view>
    </block>
  </view>
```

js

```
  right_fl: function(e){
    console.log(e)
  }
```

测试：用console左上角的自动检查工具（小箭头图标），检查是否能捕捉到wxml的id。

3）如上，加入console.log(e)后，点击后可以在console里看到这笔数据，按照console面板里这笔数据的位置来写consolelog

```
  right_fl: function(e){
    console.log(e)
    var _id = e.currentTarget.dataset.id;
    console.log(_id)
  }
```

测试：点击标题后可以看到显示id

4）增加一个变量classifySelected，用来存放当前id。

```
  right_fl: function(e){
    console.log(e)
    var _id = e.currentTarget.dataset.id;
    console.log(_id)
    this.setData ({
      classifySelected: _id
    })
  }
```

并把变量放到class里，增加判断：如果变量等于{{item.id}}则增加css样式active，如果不等于就为空，即`classifySelected==item.id? 'active':'`。

```
  <view class='orientation'>自动定位</view>
    <block wx:for="{{orientationlist}}" wx:key="">
      <view class="orientation_city {{classifySelected==item.id? 'active':''}}" bindtap='right_fl' data-id='{{item.id}}'>{{item.region}}</view>
    </block>
  </view>
```

测试：点击标题，字色变成css里设置的红色。



## 此时的完整代码

wxml

```
<view class="box">
  <view class="category" wx:for="{{act_addlist}}">
    <view class='address_top'>{{item.region}}</view>
    <view wx:for="{{item.city}}">
      <view class='address_bottom'>{{item.name}}</view>
    </view>
  </view>
  <view class='orientation_region'>
    <view class='orientation'>自动定位</view>
    <block wx:for="{{orientationlist}}" wx:key="">
      <view class="orientation_city {{classifySelected==item.id? 'active':''}}" bindtap='right_fl' data-id='{{item.id}}'>{{item.region}}</view>
    </block>
  </view>
</view>
```

js

```
// pages/cata88/cata88.js
Page({
  data: {
    orientationlist: [
      { id: "01", region: "东北" },
      { id: "02", region: "华北" },
      { id: "03", region: "华东" },
      { id: "04", region: "华南" },
      { id: "05", region: "华中" }
    ],
    act_addlist: [
      {
        id: "01", region: "东北地区",
        city: [
          { id: "0101", name: "白山市" },
          { id: "0102", name: "汕头市" },
          { id: "0103", name: "深圳市" },
          { id: "0104", name: "广州市" },
          { id: "0105", name: "测试1" },
          { id: "0106", name: "测试2" },
          { id: "0107", name: "测试3" },
          { id: "0108", name: "测试4" },
          { id: "0109", name: "测试5" },
        ]
      },
      {
        id: "02", region: "华北地区",
        city: [
          { id: "0201", name: "包头市" },
          { id: "0202", name: "大庆" },
          { id: "0203", name: "保定" },
          { id: "0205", name: "测试1" },
          { id: "0206", name: "测试2" },
          { id: "0207", name: "测试3" },
          { id: "0208", name: "测试4" },
          { id: "0209", name: "测试5" },
          { id: "0210", name: "测试6" }
        ]
      },
      {
        id: "03", region: "华东地区",
        city: [
          { id: "0301", name: "东东市" },
          { id: "0302", name: "东东" },
          { id: "0303", name: "咚咚咚" },
          { id: "0305", name: "测试1" },
          { id: "0306", name: "测试2" },
          { id: "0307", name: "测试3" },
          { id: "0308", name: "测试4" },
          { id: "0309", name: "测试5" },
          { id: "0310", name: "测试6" }
        ]
      },
      {
        id: "04", region: "华南地区",
        city: [
          { id: "0401", name: "东东市" },
          { id: "0402", name: "东东" },
          { id: "0403", name: "咚咚咚" },
          { id: "0405", name: "测试1" },
          { id: "0406", name: "测试2" },
          { id: "0407", name: "测试3" },
          { id: "0408", name: "测试4" },
          { id: "0409", name: "测试5" },
          { id: "0410", name: "测试6" }
        ]
      },
      {
        id: "05", region: "华中地区",
        city: [
          { id: "0501", name: "东东市" },
          { id: "0502", name: "东东" },
          { id: "0503", name: "咚咚咚" },
          { id: "0505", name: "测试1" },
          { id: "0506", name: "测试2" },
          { id: "0507", name: "测试3" },
          { id: "0508", name: "测试4" },
          { id: "0509", name: "测试5" },
          { id: "0510", name: "测试6" }
        ]
      }
    ],
    classifySelected: ''
  },
//右边点击事件
  right_fl: function(e){
    console.log(e)
    console.log("没有看到")
    var _id = e.currentTarget.dataset.id;
    console.log(_id)
    this.setData ({
      classifySelected: _id
    })
  }
})
```

wxss

```
.box {
  display: flex;
}
.category{
  background: green;
}
.orientation_region{

}
.orientation_city.active { /*测试变量classifySelected是否等于{{item.id}}，改变字色*/
  color: red;
}
```



# 三、创建菜单联动

一定要经常看官方文档，现在更新比较快，而且网上卖的教程都是根据文档改编的。

事件的注解一定要写清楚，以后再回来看比较方便。

## 3、再做菜单/分类明细

1）先把列表循环出来。这里是两级循环。

```
  <view class="category" wx:for="{{act_addlist}}">
    <view class='address_top'>{{item.region}}</view>
    <view wx:for="{{item.city}}">
      <view class='address_bottom'>{{item.name}}</view>
    </view>
  </view>
```

2）使用滑动组件scroll-view。

```
  <scroll-view class="content" scroll-y="true" scroll-with-animation="true" scroll-into-view="" bindscroll="gdcf">
    <view class="category" wx:for="{{act_addlist}}">
      <view class='address_top' id="{{aa+item.id}}">{{item.region}}</view>
      <view wx:for="{{item.city}}">
        <view class='address_bottom'>{{item.name}}</view>
      </view>
    </view>
  </scroll-view>
```

①、最重要的参数是scroll-into-view，值为id，且id不能以数字开头。

在每个大标题如这里{{item.region}}的class加上，`id="{{aa+item.id}}"`

②、scroll-y: true，y轴方向滚动。

③、scroll-with-animation，滚动条动画过渡。

3）开始写滚动触发

①、bindscroll是滚动时触发，可以让文字变红色。

wxml设置`bindscroll="gdcf"`，并且要**特别注意一定要给scroll-view设置一个固定的height**，否则滚动后console里没有数据出现。

wxss

```
.content{
  height: 2000rpx;
}
.address_top{
  background: yellow;
  height: 76rpx;  //计算高度用到
}
.address_bottom{
  height: 88rpx;  //计算高度用到
}
```

js设置

```
//滚动触发
gdcf: function(e){
  console.log(e)
}
```

console.log(e)测试：滚动后查看数据。

主要用到scrollTop参数（注意此时console中单位是px，wxss中要换算）。

```
  //滚动触发
  gdcf: function (e) {
    console.log(e)
    var that = this;
    var scrollTop = e.detail.scrollTop * 2, //高度单位换算，detail.scrollTop是从console知道的。
    h = 0, //默认高度0
    classifySelected;
    that.data.orientationlist.forEach(function (classify, i) {  //javascript的forEach()方法，详见http://www.runoob.com/jsref/jsref-foreach.html。
      // var _h = 76 + ?*88; //这里的小分类数量计算见下面length:function()
      console.log(classify.id);//看不懂的值，console.log一下就知道这个其实是id
      var _h = 76 + that.length(classify['id']) * 88;
      if (scrollTop >= h){
        classifySelected = classify['id'];
      }
      console.log(_h)
      h += _h;
      console.log(h)
    }, 
    );
    that.setData({
      classifySelected: classifySelected
    })
  },
  //计算当前大分类(id值为e)下有多少个小分类
  length: function (e) {
    var that = this;
    var act_addlist = that.data.act_addlist; //然后进行下面的循环
    for (var i = 0; i < act_addlist.length; i++){
      if (act_addlist[i]['id'] == e){
        return act_addlist[i]['city'].length;
      }
    }
  }
```

测试：检查if判断句里的classifySelected是否生效，在console的AppData选项里，滚动页面后可以看到classifySelected的id变化。



## 4、两个模块关联到一起

### 目的：左边滚动时右边会跳转并标红；右边点击时会标红并且左边相应跳转

1）在js里，把右边点击事件right_fl里的classifySelected改成vieid；

然后在scrollview标签里加上`scroll-into-view="{{aa+vieid}}"`。这样右边点击时，左边就会相应地跳转。

2）此时第一个大菜单/分类并没有默认标红。

在js的onLoad事件里，加入

```
  onLoad: function(options){
    this.setData({
      classifySelected: this.data.orientationlist[0]['id']     
    })
  },
```



> 另外，http://www.bijishequ.com/detail/568266?p=有人提出**wx.getSystemInfo**用这个获取windowHeight，把这个设置为scroll-view的高度。

# 四、最终的完整代码（理清思路）

## 1、哪个view调用哪个id？

1）classifySelected是在bindscroll="gdcf"，即gdcf滚动触发的function里定义的，滚动一定的距离就会成功执行forEach循环里的classifySelected = classify['id']，即等于分类标题的id。——在wxml的分类标题的class里（orientation_city），用classifySelected来判断是否等于{{item.id}}，实现了边滚动边触发字色变红。

> 一句话：左边滚动事件获得的id给右边调用。

2）js右点击事件里定义了vieid，于是点击分类标题就会获得id。把这个vieid给到分类明细用，使用`scroll-into-view="{{aa+vieid}}"`滚动到该元素，实现了点击分类标题后会滚动到相应的分类明细位置。

> 一句话：右边点击事件获得的id给左边调用。

wxml

```
<view class="box">
  <scroll-view class="content" scroll-y="true" scroll-with-animation="true"   bindscroll="gdcf" scroll-into-view="{{aa+vieid}}">
    <view class="category" wx:for="{{act_addlist}}"  wx:key="">
      <view class='address_top' id="{{aa+item.id}}">{{item.region}}</view>
      <view wx:for="{{item.city}}"  wx:key="">
        <view class='address_bottom'>{{item.name}}</view>
      </view>
    </view>
  </scroll-view>
  <view class='orientation_region'>
    <view class='orientation'>自动定位</view>
    <block wx:for="{{orientationlist}}" wx:key="">
      <view class="orientation_city {{classifySelected==item.id? 'active':''}}" bindtap='right_fl' data-id='{{item.id}}'>{{item.region}}</view>
    </block>
  </view>
</view>
```

js

```
// pages/cata88/cata88.js
Page({
  data: {
    orientationlist: [
      { id: "01", region: "东北" },
      { id: "02", region: "华北" },
      { id: "03", region: "华东" },
      { id: "04", region: "华南" },
      { id: "05", region: "华中" }
    ],
    act_addlist: [
      {
        id: "01", region: "东北地区",
        city: [
          { id: "0101", name: "白山市" },
          { id: "0102", name: "汕头市" },
          { id: "0103", name: "深圳市" },
          { id: "0104", name: "广州市" },
          { id: "0105", name: "测试1" },
          { id: "0106", name: "测试2" },
          { id: "0107", name: "测试3" },
          { id: "0108", name: "测试4" },
          { id: "0109", name: "测试5" },
          { id: "0110", name: "测试1" },
          { id: "0111", name: "测试2" },
          { id: "0112", name: "测试3" },
          { id: "0113", name: "测试4" },
          { id: "0114", name: "测试5" },
          { id: "0115", name: "测试1" },
          { id: "0116", name: "测试2" },
          { id: "0117", name: "测试3" },
          { id: "0118", name: "测试4" },
          { id: "0119", name: "测试5" }
        ]
      },
      {
        id: "02", region: "华北地区",
        city: [
          { id: "0201", name: "包头市" },
          { id: "0202", name: "大庆" },
          { id: "0203", name: "保定" },
          { id: "0205", name: "测试1" },
          { id: "0206", name: "测试2" },
          { id: "0207", name: "测试3" },
          { id: "0208", name: "测试4" },
          { id: "0209", name: "测试5" },
          { id: "0210", name: "测试6" }
        ]
      },
      {
        id: "03", region: "华东地区",
        city: [
          { id: "0301", name: "东东市" },
          { id: "0302", name: "东东" },
          { id: "0303", name: "咚咚咚" },
          { id: "0305", name: "测试1" },
          { id: "0306", name: "测试2" },
          { id: "0307", name: "测试3" },
          { id: "0308", name: "测试4" },
          { id: "0309", name: "测试5" },
          { id: "0310", name: "测试6" }
        ]
      },
      {
        id: "04", region: "华南地区",
        city: [
          { id: "0401", name: "东东市" },
          { id: "0402", name: "东东" },
          { id: "0403", name: "咚咚咚" },
          { id: "0405", name: "测试1" },
          { id: "0406", name: "测试2" },
          { id: "0407", name: "测试3" },
          { id: "0408", name: "测试4" },
          { id: "0409", name: "测试5" },
          { id: "0410", name: "测试6" }
        ]
      },
      {
        id: "05", region: "华中地区",
        city: [
          { id: "0501", name: "东东市" },
          { id: "0502", name: "东东" },
          { id: "0503", name: "咚咚咚" },
          { id: "0505", name: "测试1" },
          { id: "0506", name: "测试2" },
          { id: "0507", name: "测试3" },
          { id: "0508", name: "测试4" },
          { id: "0509", name: "测试5" },
          { id: "0510", name: "测试6" }
        ]
      }
    ],
    classifySelected: ''
  },
  onLoad: function(options){
    this.setData({
      classifySelected: this.data.orientationlist[0]['id']     
    })
  },
//右边点击事件
  right_fl: function(e){
    console.log(e)
    var _id = e.currentTarget.dataset.id;
    console.log(_id)
    this.setData ({
      vieid: _id
    })
  },
//滚动触发
  gdcf: function (e) {
    console.log(e)
    var that = this;
    var scrollTop = e.detail.scrollTop * 2, //高度单位换算，detail.scrollTop是从console知道的。
    h = 0, //默认高度0
    classifySelected;
    that.data.orientationlist.forEach(function (classify, i) {  //javascript的forEach()方法，自己百度。
      // var _h = 76 + ?*88; //这里的小分类数量计算见下面length:function()
      console.log(classify.id);//看不懂的值，console.log一下就知道这个其实是id
      var _h = 76 + that.length(classify['id']) * 88;
      if (scrollTop >= h){
        classifySelected = classify['id'];
      }
      console.log(_h)
      h += _h;
      console.log(h)
    }, 
    );
    that.setData({
      classifySelected: classifySelected
    })
  },
//计算当前大分类下有多少个小分类
  length: function (e) {
    var that = this;
    var act_addlist = that.data.act_addlist; //然后进行下面的循环
    for (var i = 0; i < act_addlist.length; i++){
      if (act_addlist[i]['id'] == e){
        return act_addlist[i]['city'].length;
      }
    }
  }
})
```

wxss

```
.box{
  display:flex;
  justify-content: space-between;
}
.content{
  height: 2000rpx;
}
.category{
  background: green;
}
.address_top{
  background: yellow;
  height: 76rpx;
}
.address_bottom{
  height: 88rpx;
}
.orientation_region{
  background: yellow;
}
.orientation_city.active{ /*测试变量classifySelected是否等于{{item.id}}，改变字色*/
  color: red;
}
```

