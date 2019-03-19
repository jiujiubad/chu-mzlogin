---
title: tool-vps-部署-linux云服务器部署运维
date: '2017-12-14 00:10'
categories:
  - 工具
tags:
  - 工具
  - vps
  - 部署
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfdhnbgrrj308506bmx2.jpg'
abbrlink: d646e837
---

* 201712
* 编程+ubuntu





![](https://ws3.sinaimg.cn/large/006tKfTcgy1fm757uv3vaj31kw2wsti0.jpg)

# 一、前半部分介绍云服务器类型IaaS、PaaS、SaaS，和常用linux指令

# 二、后半部分以IaaS的阿里云或linode为例，示范ruby on rails在vps上的安装、部署、运维、第三方服务、域名设定



### 1、云服务类型和厂商

- IaaS：基础设施服务，Infrastructure-as-a-Service（相当于是买的房子，可以任意拆掉东西装修）
  - vps虚拟机，如vultr、linode
  - 云计算平台，亚马逊、微软、谷歌、阿里云、腾讯云
- PaaS：平台服务，Platform-as-a-Service（相当于是租的房子，只能把东西做好摆进去）
  - 虚拟主机，如heroku、openshift
  - 价格比IaaS贵，大多只有美国机房，有能力运维linux服务器的都很少选用
- SaaS：软件服务，Software-as-a-Service（只能执行特定软件）
  - 如github、金数据、tower、office365



### 2、租用云服务器（vultr、阿里云）

* Linux 时，通常是讲 Linux Kernel (内核)。给一般用户安装的又分为不同的发行版本(Linux distribution)，例如 Ubuntu、Linux Mint、Debian、CentOS、Redhat 等



### 3、CLI命令

* CLI，指用文字输入的方式来操作电脑。——高效、占用资源少

  * Mac 和 Linux 都是 [UNIX-like](https://zh.wikipedia.org/wiki/%E7%B1%BBUnix%E7%B3%BB%E7%BB%9F) 操作系统。爱用 Mac 的原因，因为接近 Linux 服务器的环境
    * Shell 是指和电脑沟通的指令
    * Terminal 是指 CLI 输入输出的介面程序
    * Console 指某特定的指令语言环境
* GLI，指用图形用户界面输入的方式来操作电脑

### 4、常用命令

> `/` 根目录
>
> `~` 家目录
>
> `cd`
>
> `pwd`
>
> `ls`
>
> `mkdir`
>
> `touch`
>
> `cp`
>
> `mv` 移动档案，或重命名
>
> `rm` 删除档案
>
> `rm -r` 删除整个目录及以下的档案
>
> `sudo apt-get update`



CLI中内建的是nano、或vi（vi和vim功能更强但较难上手），而atom是GUI



> - `gzip` 压缩档案
> - `gzip -d` 解压缩档案
> - `tar zcvf xxx.tar.gz xxx` 将 xxx 目录打包并压缩成 `xxx.tar.gz` 档案
> - `tar zxcf xxx.tar.gz`。将 `xxx.tar.gz` 解压缩



### 5、权限管理

`su` 指令可以切换身份，例如切换成 root 帐号，但是每次都要输入；

`sudo`权限，可以暂时提升权限。



### 6、安装Linux、ruby on rails所需套件、ruby、MySQL或PostgreSQL、 Nginx + Passenger 网站服务器

* 在本机开发的时候，我们使用 [puma](https://github.com/puma/puma) 这一套由 Ruby 写的网站服务器，无论是静态档案(图片/CSS/JS)或是会进到 Rails 处理的动态网页，一律都是由 puma 来处理。
* [Nginx](http://nginx.org/) 是目前最流行的网站服务器(用C语言开发的)，可以非常高效能地提供静态档案，效能是纯 Ruby 网站服务器的数十倍以上。因此像图档/CSS/JS等等静态资源，都会由 Nginx 处理
* passenger是支持ruby的web服务器。Rails 动态网页的部分，我们会安装 [Passenger](https://www.phusionpassenger.com/) 这个 Nginx 的扩充模组来执行 Ruby 程序。



### 7、新增deploy账号

* root账号权限太大，新增deploy账号，用来放*Rails*代码。



### 8、安装Capistrano

* [Capistrano](http://capistranorb.com) 是 Rails 社区中最常使用的布署工具
* `ap production deploy`，这个指令会登入远端服务器，把 Github 上的代码抓下来，然后自动执行 bundle 安装套件、跑数据库 migration 和编译 assets 编译等等步骤：
* 要部署新代码上服务器，记得需要先 `git push` 到 Github 上，再执行 `cap production deploy`