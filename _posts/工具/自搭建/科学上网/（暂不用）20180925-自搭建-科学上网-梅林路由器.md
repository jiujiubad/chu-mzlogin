* 201805
* 工具+mac+vps



## 开始前的准备

1）路由器：华硕ac88u（BIG东东使用）

* http://firmware.koolshare.cn，支持科学上网的路由器型号
* 淘宝搜索：“梅林 路由器”，推荐华硕ac68u物美价廉。一定要让卖家帮忙装好**梅林小宝固件**。

2）一台已经可以科学上网的服务器

3）第三方固件

* 梅林小宝



## 科普

硬路由：平时家里用的。优点：无线发射好。

软路由：相当于小型的主机。优点：负载软件。



## 安装

1）如果梅林小宝的软件中心有ss，则可以直接使用

![image-20180523164301489](https://ws4.sinaimg.cn/large/006tKfTcgy1frld73t86sj30ds0awn06.jpg)

2）如果没有ss，离线安装最新版本 。填写版本号时要跟下载的对的上。

下载地址：https://github.com/koolshare/koolshare.github.io/tree/acelan_softcenter_ui/shadowsocks/history

下载地址2：https://github.com/hq450/fancyss_history_package/tree/master/fancyss_arm

下载后要把文件后缀改成gz，如“shadowsocks_3.9.9.tar.gz”

3）升级固件，和配置

视频地址：https://www.youtube.com/watch?v=3-ehSeaGA9I

论坛地址：http://koolshare.cn/forum.php?mod=forumdisplay&fid=96&filter=typeid&typeid=68

如果是大版本升级，需要双清：系统管理-系统设置-`Format JFFS partition at next boot` 选择是-应用本页面设置，然后重启路由

系统管理-固件升级-选择文件-上传



## 使用

节点管理-添加节点-ss账户-添加-使用。出现两个✔️，即可科学上网。

![image-20180523164743699](https://ws2.sinaimg.cn/large/006tKfTcgy1frldbyg6qgj30dy0aowiv.jpg)



## AC68U 恢复出厂

关电源，按住侧面的 `WPS` 键，然后开电源，数十秒后松开



## 黑白名单

[IP/CIDR白名单](javascript:void(0);)，添加不需要走代理的外网ip地址

```
140.205.94.189
120.52.148.118
220.181.57.216
```

[域名白名单](javascript:void(0);) ，添加不需要走代理的域名

```
# https://doub.io/ss-jc43/
# http://www.ip138.com/ips1388.asp?ip=www.taobao.com&action=2
taobao.com
jd.com
baidu.com
```

```
# https://doub.io/ss-jc43/
# http://www.ip138.com/ips1388.asp?ip=www.taobao.com&action=2
*.taobao.com
*.jd.com
*.baidu.com
```



[IP/CIDR黑名单](javascript:void(0);) ，添加需要强制走代理的外网ip地址

```
75.126.135.131
216.58.221.142
176.32.103.205
66.135.216.190
151.101.193.69
31.13.69.33
13.250.177.223
17.142.160.59
```

[域名黑名单](javascript:void(0);)，添加需要强制走代理的域名

```
facebook.com
google.com
amazon.com
ebay.com
stackoverflow.com
doub.io
github.com
apple.com
```

```
*.facebook.com
*.amazon.com
*.ebay.com
*.stackoverflow.com
*.doub.io
*.github.com
*.apple.com
*.vagrantup.com
```





