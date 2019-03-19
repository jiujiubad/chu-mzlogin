

* 201711
* 工具+mac+vps



# 背景和工具介绍

1. 非技术出身，不懂 Linux、SS、SSR
2. MacOs系统
3. [搬瓦工 VPS](https://bandwagonhost.com/aff.php?aff=20657)
4. ShadowsocksR
5. [ip111用于测试vpn状态](http://ip111.cn/)
6. [Test your IP](http://ping.pe/)



## 1. 明确需求，做出选择

- VPS 服务商选搬瓦工、Vultr 还是 Linode？
- 服务器地址选香港、日本、美国还是韩国、俄罗斯等国家？
- VPS 的框架选 Openvz、KVM 还是 XEN 框架？
- 服务器系统选 CentOS、Debian 还是 Ubuntu？
- 加速选锐速、TCP BBR、Final Speed 还是 Google BBR？
- 用 SS 还是 SSR？

我的选择依次为[搬瓦工](https://bandwagonhost.com/aff.php?aff=20657)、美国洛杉矶、KVM、CentOS-6-x86_64-bbr、SSR。

因为搬瓦工是公认的性价比高，而且搬瓦工的教程最多、最齐全，我没有专人指导，最好找资料丰富的方式。

我选择的套餐就是洛杉矶机房的，因为之前的 SS 用下来，我发现洛杉矶机房的速度最快，延迟最少、最稳定，我自己也不喜欢切换来切换去，直接锁定洛杉矶就行了。

至于 Openvz、KVM、XEN 的选择很简单。我看过一篇教程帖，知道了 Openvz 是被淘汰的选择，现在主流就是 KVM，它内置了 BBR 内核优化，访问速度会比 Openvz 好很多。

Shadowsocks 和 ShadowsocksR 的选择，我毫不犹豫选了后者。一方面是我之前的 VPN 服务商发了一封通告告诉大家要强制换用 SSR 让我了解到 SSR 更加密（加入了混淆算法），后来又搜到了不少谈论它们两者区别的文章，让我下定决心使用 SSR。另外，之前 SS 换 SSR 的时候，我就已经找到了 SSR 的安装包，这就省了很多时间。



## 2. 购买 VPS

[搬瓦工](https://bandwagonhost.com/aff.php?aff=20657) Special 20G KVM-洛杉矶-中国直连，可更换机房，内存 1024 MB，20G SSD，月流量 2000 GB，年付 39.99 美元，使用优惠码 BWH1ZBPVK，后 37.59 美元一年，支付宝付款。



## 3. 配置服务器



## 4. 上网测试



# ShadowsocksR

## Windows 下载地址

- [SS](https://github.com/shadowsocks/shadowsocks-windows/releases)
- [SSR-4.7.0](https://cache.cdn.bydisk.com/ShadowsocksR-4.7.0-win.7z)

ShadowsocksR 分为 dotnet 2.0 和 4.0，实际功能无区别，只是电脑安装 .NET Framework v2.0 或 4.0 的支持库版本不同。一般 Win7 以后都默认安装了 v2.0；Win8 以后都默认安装了 2.0 和 4.0，只有 XP 系统两个都默认没有安装，需要手动安装支持库。

## Android 下载地址

- [SS](https://github.com/shadowsocks/shadowsocks-android/releases)
- [SSR-3.4.0.5](https://qiniucloud.download.storage.bydisk.com/ssr-3.4.0.5.apk)

## Mac 下载地址

- [ShadowsocksX-NG-R](https://github.com/qinyuhang/ShadowsocksX-NG-R/releases)
- [electron-ssr](https://github.com/erguotou520/electron-ssr/releases)

## iOS 下载地址

- [Wingy](https://itunes.apple.com/us/app/wingy-http-s-socks5-proxy-utility/id1178584911)
- [Shadowrocket](https://itunes.apple.com/us/app/shadowrocket/id932747118)

------

# 我的不足（我没弄明白的地方）

1. 我不知道最终生效是因为我成功登陆了 putty 还是在服务器中安装了 OpenVPN 服务？
2. 我不知道直接在服务器中一键安装 SSR 服务，跟我用 putty 手动安装有多大差别？
3. 服务器的 SS 和 SSR 服务都安装了，会不会有冲突，能否同时用呢？（虽然都安装了，但我只用 SSR，并没有同时开启 SS 和 SSR）
4. 我不知道目前的状态需不需要再做多用户配置？
5. 我不知道需不需要加一段代码，让服务器自动启动？（目前是可以的，所有账户都不需要做另外的操作，打开 SSR 就能成功翻墙）
6. 我的 Windows 系统有 SS 和 SSR 之分，可是 MAC 端只有 ShadowsocksX-R，不知道会不会有问题？（MAC 端的 ShadowsocksX-R 需要用全局模式才能上 Pixiv 站，PAC 模式能上 Google 和 Youtube）
7. 不知道 ShadowsocksR 开发者是否会持续维护？
8. SSR 服务端加密方式 chacha20 和 aes-256-cfb 有多大区别，编译安装 libsodium？
9. IPv6 有必要开启嘛，KVM 系统不支持 IPv6？

------

# 总结经验

1. 优先看官方文档，官方论坛，尽快补全基本知识
2. 一些小众的问题需要单独搜索，也多开几个页面互相补充知识
3. 很多教程受限于时间，其实后来有更好的解决办法
4. 根据自己的需求去做决定，不要盲目跟随别人的选择
5. 有些选择很纠结，但你做完前面所有操作之后，你可能会发现它已经不成问题了
6. 遇到问题的时候，不要蛮干，实在做不好就先放松心情，等会继续
7. 一定会有人遇到跟你一样的问题，搜不到解决方法的时候换一个检索词
8. 你解决了一个问题时，不妨输出成文章，兴许能帮助到其他人
9. 写教程的时候，不仅要写 What 和 How，也要写上 Why，还有参考资料，能帮别人省很多事

------

# 参考网站

## 总网站

- [Shadowsocks 的衍生版本下载镜像](https://ssr.h2y.co/)、[Shadowsocks 官方网站下载地址](https://shadowsocks.org/en/download/clients.html)
- [ShadowsocksR 各版本下载地址](https://bbs.bydisk.com/shadowsocks-download.html)
- [ShadowsocksR 开发者-BreakWa11 的个人博客](https://breakwa11.blogspot.com/)
- [ShadowsocksR 在 Google+ 的社群](https://plus.google.com/communities/117390969460066916686)

## 单篇教程

- [关于 Shadowsocks 的小白常见问题 总结篇](https://doub.io/ss-jc35/#Shadowsocks原版和ShadowsocksR的区别是什么？)
- [ShadowsocksR 客户端 小白使用教程](https://doub.io/ss-jc10/)
- [新手用户搬瓦工 VPS 购买图文指导教程](http://banwagong.cn/gonglue.html)
- [BandwagonHost搬瓦工VPS主机教程-KiwiVM面板应用](http://www.bawagon.com/kiwivm/)
- [搬瓦工搭建 Shadowsocks 并优化速度](https://blog.kuoruan.com/48.html)
- [使用搬瓦工bandwagonhost VPS安装Shadowsocks Server](http://blog.csdn.net/win_turn/article/details/51559867)
- [大陆翻墙新秘技教学，无 VPN 照上 Facebook，ShadowsocksR 全攻略](https://unwire.hk/2017/08/16/shadowsocks-windows-macos/software/) （这里面有介绍 SS 和 SSR 的区别）
- [ShadowsocksR 单端口多用户配置方法](https://breakwa11.blogspot.com/2017/01/shadowsocksr-mu.html)
- [Shadowsocks Configure Multiple Users](https://github.com/shadowsocks/shadowsocks/wiki/Configure-Multiple-Users)
- [putty 与 xshel l及 winscp 初级使用方法](http://www.bawagon.com/puttyandwinscp/)
- [Linux SSH 链接工具 Putty 新手详细使用教程](https://doub.io/linux-jc2/)
- [LinuxVPS 基本命令](http://www.bawagon.com/linuxvps%E5%9F%BA%E6%9C%AC%E5%91%BD%E4%BB%A4/)