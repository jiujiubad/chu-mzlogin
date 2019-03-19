* 201803
* 编程+ubuntu 桌面版+ubuntu desktop


# Ubuntu16.04 desktop U盘安装图文教程

### 原文链接：

1、Ubuntu 16.04 U盘安装图文教程https://www.linuxidc.com/Linux/2016-04/130520.htm



[Ubuntu](http://www.linuxidc.com/topicnews.aspx?tid=2) 每年发布两个版本，目前最新正式版版本也升到了 16.04。Ubuntu 16.04 开发代号为“Xenial Xerus”，为第六个长期支持（LTS）版本，其主要特色是引入了新的 snap 包格式和 LXD 纯容器 hypervisor。

**Ubuntu 16.04 LTS正式发布下载**，长达5年技术支持  [http://www.linuxidc.com/Linux/2016-04/130508.htm](https://www.linuxidc.com/Linux/2016-04/130508.htm)

Ubuntu 16.04 的其他特点包括：

* 支持 IBM LinuxONE 及 z Systems 的 s390x 架构
* 引入新的 Ubuntu MATE 社区版本
* Linux 内核更新到 4.4.6，包含 ZFS on Linux
* 桌面版本的 GTK、Qt 均已升级至最新版本，包含 Firefox 45、Chromium 48、LibreOffice 5.1、Python 3.5 等
* 服务器版本包含 OpenStack Mitaka、Juju 2.0、LXD 2.0、NGINX 1.9.15、Docker 1.10、PHP 7.0、MySQL 5.7 等

下面我们来看看Ubuntu 16.04 U盘安装图文教程，希望对Linux新手有所帮助。您可以直接从此U盘尝试Ubuntu，而不用对您的电脑做任何更改。如果您已经准备完毕，您也可以与现有系统并存（或者替代）方式将Ubuntu安装到您的电脑上。此过程无需耗时太久。

 **相关阅读**：**U盘操作系统安装工具- Universal USB Installer最新版** [http://www.linuxidc.com/Linux/2011-01/31350.htm](https://www.linuxidc.com/Linux/2011-01/31350.htm)

参考上面的文章下载最新的**Universal USB Installer。**

在Windows下的安装就不说了，安装后打开。

在Setp 1选择Ubuntu，我选择的是64位的。

![Ubuntu 16.04 U盘安装图文教程](https://ws3.sinaimg.cn/large/006tNc79gy1fppjumx9zij30e90b43za.jpg)

在Setp 2选择 ubuntu-16.04-desktop-amd64.iso文件

![Ubuntu 16.04 U盘安装图文教程](https://ws3.sinaimg.cn/large/006tNc79gy1fppjus6f3gj30e90b4n09.jpg)

在Setp 3选择 U盘，U盘在哪里呢，在这里 [http://www.linuxidc.com/Linux/2014-04/100149.htm](https://www.linuxidc.com/Linux/2014-04/100149.htm)

然后点击 Create

![Ubuntu 16.04 U盘安装图文教程](https://ws1.sinaimg.cn/large/006tNc79gy1fppjuora7sj30g009p0t1.jpg)

当把ubuntu-16.04-desktop-amd64.iso文件全部写入U盘后，在BIOS里设置为U盘启动。

**启动后就会出现这个画面**

![Ubuntu 16.04 U盘安装图文教程](https://ws2.sinaimg.cn/large/006tNc79gy1fppjurcqhij30go0ccjw5.jpg) 

选择第一选项 Try Ubuntu without installing 或 第二选项 Install Ubuntu 直接安装。

![Ubuntu 16.04 U盘安装图文教程](https://ws4.sinaimg.cn/large/006tNc79gy1fppjuurwpoj30sg0lcgwx.jpg)

点击桌面上的 Install Ubuntu 16.04 LTS 图标开始正式安装。

![Ubuntu 16.04 U盘安装图文教程](https://ws3.sinaimg.cn/large/006tNc79gy1fppjuz7qtkj30sg0lcgqo.jpg)

选择语言：中文（简体）

![Ubuntu 16.04 U盘安装图文教程](https://ws1.sinaimg.cn/large/006tNc79gy1fppjv1jh7uj30sg0lctev.jpg)

我选择安装时暂时不更新Ubuntu系统。

![Ubuntu 16.04 U盘安装图文教程](https://ws3.sinaimg.cn/large/006tNc79gy1fppjv4g6twj30sg0lc44c.jpg)

如果是Windows与Linux双系统安装，请选择**其他选项**，**切记**。您可以自己创建、调整分区，或者为 Ubuntu 选择多个分区。

![Ubuntu 16.04 U盘安装图文教程](https://ws4.sinaimg.cn/large/006tNc79gy1fppjvq0lq3j30sg0lcjw4.jpg)

这里选择安装在 sda9，使用ext4格式。 

![Ubuntu 16.04 U盘安装图文教程](https://ws3.sinaimg.cn/large/006tNc79gy1fppjva7zudj30sg0lcgtr.jpg)

点击继续 及 现在安装。 

> 安装完成后，接下来要做的事情是：2、备份/etc/network/interfaces，并修改桌面版ip为固定ip，比如192.168.0.8；3、更新apt，安装vim，安装ssh；4、配置Samba服务，用于在其他电脑上通过窗口访问服务器；5、安装ruby和rails；6、安装git服务器；

**更多详情见请继续阅读下一页的精彩内容**： [http://www.linuxidc.com/Linux/2016-04/130520p2.htm](https://www.linuxidc.com/Linux/2016-04/130520p2.htm)

--------------------------------------分割线 --------------------------------------

百度网盘下载 Ubuntu 16.04 U盘安装图文教程PDF版 <http://pan.baidu.com/s/1geFzCu3>

或到**Linux公社资源站下载：**

**免费下载地址在** <http://linux.linuxidc.com/>

**用户名与密码都是**[www.linuxidc.com]()

**具体下载目录在** /2016年资料/4月/22日/Ubuntu 16.04 U盘安装图文教程/

下载方法见 [http://www.linuxidc.com/Linux/2013-07/87684.htm](https://www.linuxidc.com/Linux/2013-07/87684.htm)

--------------------------------------分割线 --------------------------------------

Ubuntu 16.04 LTS安装好需要设置的15件事 [http://www.linuxidc.com/Linux/2016-04/130519.htm](https://www.linuxidc.com/Linux/2016-04/130519.htm)

Ubuntu 16.04 LTS 今日发布 Canonical公布系统新特性 [http://www.linuxidc.com/Linux/2016-04/130466.htm](https://www.linuxidc.com/Linux/2016-04/130466.htm)

Ubuntu 16.04 LTS值得关注的新特性和改进盘点 [http://www.linuxidc.com/Linux/2016-04/130136.htm](https://www.linuxidc.com/Linux/2016-04/130136.htm)

将Ubuntu 15.10升级到Ubuntu 16.04  [http://www.linuxidc.com/Linux/2016-03/129158.htm](https://www.linuxidc.com/Linux/2016-03/129158.htm)

Ubuntu 16.04安装Lua游戏引擎Love [http://www.linuxidc.com/Linux/2016-03/129108.htm](https://www.linuxidc.com/Linux/2016-03/129108.htm)

Ubuntu 16.04 需要你的帮助，让 GNOME Software 更美观 [http://www.linuxidc.com/Linux/2016-03/129237.htm](https://www.linuxidc.com/Linux/2016-03/129237.htm)