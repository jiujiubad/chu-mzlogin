---
title: tool-mac-下载网站工具offline pages pro使用方法
date: '2018-01-10 00:10'
categories:
  - 工具
tags:
  - 工具
  - mac
  - 下载
img: 'https://ws2.sinaimg.cn/large/006tKfTcgy1fnfcwsitmgj30da08pjrg.jpg'
abbrlink: 8f82da10
---

* 201801
* 工具+mac



5000页约1.1G，不够放，重新下载

# 二、99总结-建议自定义

## 1、配置详解

1）默认5个选项跟自定义5个选项，看起来像是一一对应的（实测结果也类似），除了第一项下载媒体文件没测试过。

2）下载页数，测试过可以一次性写多点如20000页。

* 以前担心写多了会帮我们乱下载，实测不会。

3）level只有website这个设置不限级，其他几个默认level1。

* 测试学习中心（正常有一两千页），levels1只下载83页。

  <img src="https://ws1.sinaimg.cn/large/006tNc79gy1fnaranclb7j30eq0d23yx.jpg" width="400">

4）Follow links to的三个选项：外父目录、其他子域、其他网站。

1）外父目录是最最重要的，**一定要勾选**。测试了1000页的Website，默认只勾选这一项，好像该有的网页都有。

2）其他子域，除非一些特定的文档或链接，一般小点的网站都没有用子域名。**建议不勾选**，下载前可以先看看域名，对个别域名不同的文档或链接单独下载。

3）其他网站，**建议不勾选**，下载其他网站的资源第一会很大，第二没必要因为可能压根就不会点进去看。

<img src="https://ws3.sinaimg.cn/large/006tNc79gy1fnad6fhj1og30ty0i3drc.gif" width="800">



## 2、总结：直接按这样配置

<img src="https://ws1.sinaimg.cn/large/006tNc79gy1fnareekp6zj30ek0d2jrx.jpg" width="400">

* 再补充操作动图

  <img src="https://ws3.sinaimg.cn/large/006tNc79gy1fnargpdbnig30qm0e6k1d.gif" width="600">



# 一、下载的默认选项

## 1、Page and Media，网页+媒体文件

## 2、Page and Important Links，网页+重要链接

## 3、Page and All Links，网页+所有链接

## 4、Website(1000 Pages)，网页1000个

## 5、Advanced，自定义

按照下载链接分为

1）None，下载1000页，level第一级。不下载外父目录、其他子域、其他网站。

2）Intelligent，下载50页，level第一级。下载外父目录、其他子域、其他网站。

3）First Level，下载1000页，level第一级。下载外父目录、其他子域、其他网站。

4）Website，下载1000页，level不限级。下载外父目录，不下载其他子域、其他网站。

5）custom，自定义。