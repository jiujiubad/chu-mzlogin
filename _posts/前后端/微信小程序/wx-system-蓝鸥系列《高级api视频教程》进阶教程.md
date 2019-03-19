---
title: wx-system-蓝鸥系列《高级api视频教程》进阶教程
date: '2018-01-01 00:10'
categories:
  - 微信小程序
tags:
  - 微信系统
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fng5pmwdonj30cd08u0sx.jpg'
abbrlink: ce9bbb1c
---

* 201801
* 编程+小程序



# 一、小程序注册及服务器配置

## 1、小程序教程

1）搜索百度传课，搜“微信小程序”，销量排行里的《微信小程序全方位深度解析》，蓝鸥出品。

主要分析一些前端组件、功能、贪吃蛇项目、豆瓣电影项目。

## 2、总览

### PS：以下这些api都具有一个特点：需要跟后台进行配合。所以这个课要有前台、后台基础（主要以php，websocket接口后台我用nodejs）。

1）wx.uploadFile，上传头像、图片；

2）wx.connectSocket，做实时的东西，比如直播；

3）wx.login，登录时拿到用户的openid。一些接口如模板消息等要用到，用的非常多；

4）wx.requestPayment，微信支付；

5）模板消息，用户支付后给他的一些反馈、提示；

6）客服消息，聊天功能；

## 3、要做的准备工作

1）小程序的注册，拿到appid。搜索“微信公众平台”-立即注册-选择小程序。

2）服务器搭建，可用新浪云sae，自带域名和https、而且是按用时收费。

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmyizgkb34j30rm0cngme.jpg)

3）小程序后台，配置服务器域名。socket域名可以不配置，其他几个可填相同的域名。

4）

# 二、打开图片wx.uploadFile（前端代码）

## 1、准备工作

1）小程序后台，设置上传、下载域名，可以用request的域名；

2）用apiID添加项目

3）清空index.wxml、index.js保留page

## 2、开始

### 2.1

wxml

```
<button bindtap="uploadImg">打开图片</button>
```

js

```
Page({

  data: {

  },
  uploadImag:function(){

  }
})
```

### 2.2 wx.chooseImage，比较简单。先复制示例代码。

加入`console.log(tempFilePaths);`，可以在console里看到输出的是一个带有图片网址的数组。

```
  uploadImag:function(){
    wx.chooseImage({
      count: 1, // 打开或选择图片的数量。默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
      }
    })
  }
```

### 2.3 调用图片

wxml

```
<image src="{{imgSrc}}"></image>
```

js

```
  uploadImag:function(){
    var that = this;//缓存一下
    wx.chooseImage({
      count: 1, // 打开或选择图片的数量。默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          imgSrc: tempFilePaths[0]
        });
        console.log(tempFilePaths);
      }
    })
  }
```

* 遇到的bug：[net::ERR_NAME_NOT_RESOLVED](http://www.wxapp-union.com/thread-1450-1-1.html)
  * 关闭shadowsocks代理，或者依次点击工具栏“设置”-“代理设置”，选择“不使用任何代理，勾选后直连网络”。

### 2.4 本章难点wx.uploadFile。

1）重要参数

url，服务器url

filePath，文件路径即上边获取的tempFilePaths

name，文件对应的key，注意这个key获取的是文件二进制的内容，必须用二进制的方式处理

2）前端代码如下，剩下的url需要后端处理。

```
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        /*
        //显示图片
        that.setData({
          imgSrc: tempFilePaths[0]
        });
        console.log(tempFilePaths);*/
        //上传图片
        wx.uploadFile({
          url: '',
          filePath: tempFilePaths[0],
          name: 'fileup',
          success: function(res){
            var data = res.data;
            console.log(data);
          },
          fail:function(){
            console.log('fail');
          }
        })
      }
```

# 三、上传下载api（后端代码）

问题：ruby on rails + ubuntu +七牛云，怎么设置接收图片的目录？

# 四、登录api获取openid

# 五、客服会话

# 六、客服会话2

# 七、模板消息

# 八、模板消息2

# 九、websocket

# 十、websocket2

# 十一、微信支付1

# 十二、微信支付2