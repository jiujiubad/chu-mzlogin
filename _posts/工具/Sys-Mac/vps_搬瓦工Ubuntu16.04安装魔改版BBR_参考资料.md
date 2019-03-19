

* 201711
* 工具+mac+vps



# 搬瓦工Ubuntu16.04安装魔改版BBR

 

点击主控制面板，先关机：

 

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fnfyn39tygj30bj03aglp.jpg)

 

 

如果只是用来做梯子用，只推荐重装成Ubuntu 16.04 x86_64系统，不要问我为什么，CentOS对脚手架的速度优化并不友好（不能替换内核，不能一键BBR）~~

 

![img](https://ws2.sinaimg.cn/large/006tNc79gy1fnfyoqpwf9j30bk07z3z1.jpg)

 

 

重装完系统，记得把搬瓦工告诉你的新的SSH登录密码给记好，记事本存在本地就好，别忘了~~

 

 

下面步骤请严格按照执行，对你肯定是有好处的，不要侥幸偷懒~~

 

SSH登陆无须赘述，想必这些都懂，你要是不懂，我也得给你讲清楚：

 

去百度软件中心，下载最新版Xshell

<http://rj.baidu.com/soft/detail/15201.html?ald> 

 

记住，**别点“高速下载”，点“普通下载”就好了**，要不然会附带百度全家桶~~

![img](https://ws3.sinaimg.cn/large/006tNc79gy1fnfynz5zi4j30bj05et90.jpg)

 

一路安装，这个就没什么要说的了，然后，打开软件~~

 

Alt+O打开会话，点击“属性”：

 

![img](https://ws3.sinaimg.cn/large/006tNc79gy1fnfyosvllzj30at071mxq.jpg)

 

以下是必填项：

 

![img](https://ws4.sinaimg.cn/large/006tNc79gy1fnfyntu5v1j307y07bgly.jpg)

 

用户名默认是root，密码是搬瓦工给你的：

 

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fnfyo7f5zbj308107ddg6.jpg)

 

 

设置完成，点击“确定”，再打开“会话”框，就可以连接了：

 

![img](https://ws4.sinaimg.cn/large/006tNc79gy1fnfyn45e0wj307x05574j.jpg)

 

阅读本文前，必须掌握的快捷键：

 

在ssh中选中字符的操作和在Windows下是一样的，鼠标左键点住拖动即可，选中部分的底色会发生变化。

 

Linux的复制/粘贴命令快捷键和Windows下有所不同：

 

Ctrl+Insert  

 

**从VPS里复制文字出来到你的电脑**

 

Shift+Insert 

 

**把你电脑里的文字粘贴进入VPS里。**

 

**很明显，在我们的教程里，你用Shift+Insert这个快捷键的频率更高一些~~**

** **

vi /xxx/xxxx.xxx

 

这条命令是指打开某个文件并进行修改，打开后，可以按键盘上的“上下左右键”来移动光标。

 

如果你想输入或修改内容，请按键盘上的“**Insert**”键：

 

待里面内容修改完成后，我们在纯英文输入状态下，按键盘上的“Esc”键，在底部输入（下面那个冒号是英文，不是中文）

 

:wq

 

按回车（Enter），更改生效。

 

如果你在编辑文件的时候，因为一些不可抗力意外推出了，因为Linux也有Swap（虚拟内存）机制，一些缓存在虚拟内存（也是由硬盘空间虚拟出来的）里的数据还没来得及刷新至硬盘空间里，所以系统会有以下提示：

 

![img](https://ws4.sinaimg.cn/large/006tNc79gy1fnfynufuoej307m04i0sz.jpg)

无需纠结这些问题，按“E”键（Editanyway）继续编辑，并正常保存并退出即可。

## ![img](https://ws4.sinaimg.cn/large/006tNc79gy1fnfyoncj3tj306k08vmx5.jpg)

 

如果发现自己输错了，要么按键盘上的退格（BackSpace）键删除，如果一次性输错（一般是因为粘贴错了）了太多，干脆按“Esc”键，再输入：

 

:q!

 

按回车，所有更改不生效

 

 

## 下面正式进入部署环节：

 

先更新一下软件安装源：

 

apt-get update

 

![img](https://ws2.sinaimg.cn/large/006tNc79gy1fnfyotz9d7j30a507eabd.jpg)

如果你执意用Debian，Debian版本推荐搬瓦工里提供的这个镜像：

 

![img](https://ws2.sinaimg.cn/large/006tNc79gy1fnfyo2ve53j30be00o0sn.jpg)

 

**再次重申，千万别用CentOS+搬瓦工一键酸酸乳部署包，到时候防火长城会把你的裤子扒下来干你！**

** **

**再次重申，千万别用CentOS+搬瓦工一键酸酸乳部署包，到时候防火长城会把你的裤子扒下来干你！**

** **

**再次重申，千万别用CentOS+搬瓦工一键酸酸乳部署包，到时候防火长城会把你的裤子扒下来干你！ **

** **

 

用Debian的话，我推荐你安装Vim编辑器，你要是不选择装，到时候修改参数内容的时候够你喝一壶的：

 

apt-get install vim vim-gnome -y

 

![img](https://ws2.sinaimg.cn/large/006tNc79gy1fnfynvewexj30bj06pt9r.jpg)

 

Tips：据有些同学测试发现，经过搬瓦工后面板重装过后的Ubuntu 16.04系统，执行apt-get update命令后，会弹出以下提示：

 

![img](https://ws3.sinaimg.cn/large/006tNc79gy1fnfyo61nqzj30bj01uq34.jpg)

 

错误主要集中在：

 

E: Could not get lock/var/lib/dpkg/lock - open (11: Resource temporarily unavailable)

E: Unable to lock theadministration directory (/var/lib/dpkg/), is another process using it?

 

这段错误的大致含义，是指由apt-get命令执行时，具有相关性的文件目录缓存出现了问题，故使apt命令置于锁定状态。

 

解决办法：

 

1.      输入“reboot”，重启下机器，然后重新ssh连接试试。（重启包治百病）



2.      如果发现还是不行，请使用以下命令，删除锁定文件：



rm /var/lib/apt/lists/lock

 

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fnfyog9bmcj306d00d0sl.jpg)

 

然后继续删除缓存目录中的锁定文件：

 

rm /var/lib/dpkg/lock

 

![img](https://ws4.sinaimg.cn/large/006tNc79gy1fnfyo7wgdqj305k00cjr8.jpg)

 

修复dpkg安装软件依赖关系：

 

dpkg --configure –a

 

![img](https://ws4.sinaimg.cn/large/006tNc79gy1fnfyn5ir2aj306405dwen.jpg) ![img](https://ws4.sinaimg.cn/large/006tNc79gy1fnfynxlivqj305805h3ym.jpg)

 

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fnfyoj9l3fj305z068wep.jpg)

继续执行apt-get命令，就没有问题了。

 

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fnfyojzx6kj308v01zaa5.jpg)

 

如果你**没有碰到**过上面这个奇怪的问题，就**不要执行**这一步。

 

## 把系统内核更到最新，自带原版BBR

 

wget --no-check-certificate -qO 'BBR.sh' 'https://moeclub.org/attachment/LinuxShell/BBR.sh' && chmod a+x BBR.sh

 

![img](https://ws4.sinaimg.cn/large/006tNc79gy1fnfyn3ly05j30bj007wec.jpg)

 

指定安装4.12.14内核版本，目前魔改版BBR不支持最新的4.13内核：

 

bash BBR.sh -f v4.12.14

 

![img](https://ws2.sinaimg.cn/large/006tNc79gy1fnfynq6ra7j30bj060mxo.jpg)

 

安装新内核后，系统会重新启动，重新连接即可

 

 

![img](https://ws3.sinaimg.cn/large/006tNc79gy1fnfyny772fj30bj02ymxl.jpg)

 

 

一键安装魔改版BBR（适配4.12.14并安装4.9版GCC，如果系统自带GCC版本高于此，则不会安装）

 

wget --no-check-certificate -qO'BBR_POWERED.sh' 'https://moeclub.org/attachment/LinuxShell/BBR_POWERED.sh'&& chmod a+x BBR_POWERED.sh && bash BBR_POWERED.sh -f v4.12.14

 

![img](https://ws4.sinaimg.cn/large/006tNc79gy1fnfyn0xz1ej30bj01tmx5.jpg)

## 安装SSR

安装流程已简化，直接将以下命令复制并执行即可：

 

wget --no-check-certificate -O shadowsocksRR.sh <https://git.io/vdMUr> && chmod +x shadowsocksRR.sh &&./shadowsocksRR.sh 2>&1 | tee shadowsocksR.log

 

![img](https://ws4.sinaimg.cn/large/006tNc79gy1fnfyouyvsbj30bk01yaa2.jpg)

![img](https://ws2.sinaimg.cn/large/006tNc79gy1fnfyn6fhu1j30am03dt93.jpg)

 

![img](https://ws3.sinaimg.cn/large/006tNc79gy1fnfynte9l2j305z06p74g.jpg)![img](https://ws1.sinaimg.cn/large/006tNc79gy1fnfyolm92uj305a076mxe.jpg)

目前经过测试，以下几个端口算是“良民”，可长期设置使用：

 

20、21、22、**80**、115、152、**443**、989、990、992、3306、3389（带红色的极力推荐）

 

**协议推荐auth_chain_b（如果你不用任何iOS和Mac OS设备，我推荐你用auth_chain_d）**

** **

**加密推荐chacha20-ietf**

** **

**混淆推荐：tls1.2_ticket_auth**

 

确认无误后，按回车键继续安装，如果发现自己有某个选项选错了，请按Ctrl+C取消安装流程，并重新执行刚才的步骤。

 

![img](https://ws4.sinaimg.cn/large/006tNc79gy1fnfyo489t7j305i05pmxh.jpg)

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fnfynskyewj309k05p750.jpg)

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fnfyow0as6j3073070t9a.jpg)

![img](https://ws3.sinaimg.cn/large/006tNc79gy1fnfyo5457gj305k05umxh.jpg)

![img](https://ws3.sinaimg.cn/large/006tNc79gy1fnfyo0j017j30df055t91.jpg)

![img](https://ws3.sinaimg.cn/large/006tNc79gy1fnfynw70y2j30df05a0t1.jpg)

 

![img](https://ws4.sinaimg.cn/large/006tNc79gy1fnfyn4lg9vj30bj07vq3s.jpg)

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fnfyoh2z38j307p084t9h.jpg)

 

![img](https://ws3.sinaimg.cn/large/006tNc79gy1fnfyo1hqegj30bj09zwg3.jpg)

看到形如下面这张图里附带的红底白字图样，就说明安装成功啦~~

![img](https://ws2.sinaimg.cn/large/006tNc79gy1fnfynwpa49j30760a1754.jpg)

## 安装后，进行一些优化，加快访问速度：

## ulimit优化

输入

ulimit -n 51200 && echo ulimit -n 51200>> /etc/rc.local

回车（加大ulimit数值并加入开机启动）

## limits优化

输入echo "* soft nofile 51200" >>
/etc/security/limits.conf回车
输入echo "* hard nofile 51200" >> /etc/security/limits.conf回车

然后优化一下BBR算法：

 

首先看一下VPS现有算法：

 

sysctl net.ipv4.tcp_available_congestion_control

 

 

![img](https://ws2.sinaimg.cn/large/006tNc79gy1fnfynx3naaj30bj00p0sq.jpg)

 

如果不带hybla字样，需要开启hybla算法：

 

/sbin/modprobe tcp_hybla

 

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fnfyoiovmsj30bk00pjrd.jpg)

 

带了hybla字样，说明安装成功

 

开始修改sysctl.conf文件：

 

vi  /etc/sysctl.conf

 

按键盘上的Page Down键浏览这个文件的最后部分，直接粘贴以下：

 

\#TCP optimization

fs.file-max = 51200

\#Increase transmission limits

net.core.rmem_max =67108864

net.core.wmem_max =67108864

net.core.netdev_max_backlog= 250000

net.core.somaxconn = 4096

net.ipv4.tcp_syncookies = 1

net.ipv4.tcp_tw_reuse = 1

net.ipv4.tcp_tw_recycle = 0

net.ipv4.tcp_fin_timeout =30

net.ipv4.tcp_keepalive_time= 1200

net.ipv4.ip_local_port_range= 10000 65000

net.ipv4.tcp_max_syn_backlog= 8192

net.ipv4.tcp_max_tw_buckets= 5000

net.ipv4.tcp_fastopen = 3

net.ipv4.tcp_mem = 2560051200 102400

net.ipv4.tcp_rmem = 409687380 67108864

net.ipv4.tcp_wmem = 409665536 67108864

net.ipv4.tcp_mtu_probing =1

net.ipv4.tcp_congestion_control= hybla

\#END OF LINE

 

示例：

![img](https://ws3.sinaimg.cn/large/006tNc79gy1fnfyovd1vbj305r06ojrq.jpg)

 

 

更改完成，按“Esc”键，再输入

 

:wq

 

退出（**:wq命令一定是英文的冒号哟，不是中文的**）。

输入以下命令，保存生效：

 

sysctl -p

![img](https://ws3.sinaimg.cn/large/006tNc79gy1fnfyofuzrrj30bk06xdgj.jpg)

 

重启SSR

/etc/init.d/shadowsocksrestart

 

![img](https://ws2.sinaimg.cn/large/006tNc79gy1fnfynzwnkfj30bj031wer.jpg)

###  

### 维护服务器/SSR：

## 安全加固

 

修改端口：

 

vi /etc/ssh/sshd_config

 

![img](https://ws4.sinaimg.cn/large/006tNc79gy1fnfyooedttj30bj0cj0tv.jpg)

 

修改Port 值，为自己需要的端口。

 

“Esc”退出、“:wq”保存生效

 

## 修改系统时间：

虽然SSR的auth_chain_b协议允许客户端和服务器端的时间差不超过1天（用于身份、加密、连接有效性校验），但我还是强烈推荐你将VPS上的时间设置成你所在的时区（一般都是将国外时区的VPS设置成国内时区）：

 

输入：

 

dpkg-reconfigure tzdata

![img](https://ws2.sinaimg.cn/large/006tNc79gy1fnfynrybryj30bj04jglp.jpg)

 

选择“Asia”（亚洲）：

 

![img](https://ws2.sinaimg.cn/large/006tNc79gy1fnfyohwuwzj303j04taa2.jpg)

 

“↓”键按住不动，选择“Shanghai”（上海），我也不知道为啥没有“Beijing”（北京）

 

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fnfyo6lgkfj302m06cq2x.jpg)

 

Local time is now 显示的是本机当前时间：

 

![img](https://ws4.sinaimg.cn/large/006tNc79gy1fnfynr9dj1j3085017t8p.jpg)

## 安装fail2ban，自动ban掉反复试密码的![img](https://ws1.sinaimg.cn/large/006tNc79gy1fnfyn2az5nj3010010jr7.jpg)，防止![img](https://ws4.sinaimg.cn/large/006tNc79gy1fnfyn2ovwuj3010010glf.jpg)被破解

安装fail2ban

 

apt-get install fail2ban -y

 

重启：

 

service fail2ban restart

 

乱入一张网速测试：

 

![img](https://ws2.sinaimg.cn/large/006tNc79gy1fnfyowrpybj30bj074dgn.jpg)

 

TCP、UDP优化对应的产品和一句话原理：

 

![img](https://ws4.sinaimg.cn/large/006tNc79gy1fnfyo3ox01j30ao03qmxc.jpg)

 

 

 

其实SSR也没什么好维护的，无非就是重启、更换密码/协议，下面就来简单说一下：

 

重启：

 

/etc/init.d/shadowsocksrestart

 

 

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fnfyopar5wj30bj03i0t1.jpg)

 

根据auth_chain_b协议的特性，定期更换密码，即可以有效有效防止自己的流量特征被qiang识别，下面就来说明一下更改SSR配置文件的命令：

 

vi /etc/shadowsocks.json

 

若其他配置没有发生异常，请勿随意更改，仅更改password项即可：

 

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fnfyome0o3j305l03lgll.jpg)

 

一点小提示：你可以用随机生成的乱序密码先保存在本地txt文档里，再把它直接复制到ssh里，这样方便一些：

 

按“Insert”键输入：

 

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fnfyn1pehrj309000jjr8.jpg)

 

先删除整行，再按“Shift+Insert”键粘贴即可。

 

更改完成，按“Esc”键，再输入

 

:wq

 

更改生效

 

再次重启SSR服务，本地客户端的密码也要随之改变才行。

 

如果是在ssh里，重启整个VPS系统，用这个命令即可：

 

reboot

 

以下是我自用的混淆参数，复制下来填写到你客户端的混淆参数里即可：

 

az813057.vo.msecnd.net,az817829.vo.msecnd.net,media.gettyimages.com,origin.cdn77.com,mail.yandex.com,mc.yandex.ru,upics.yandex.net,tns-counter.ru,yastatic.net,captcha.yahoo.co.jp,b6.yahoo.co.jp,s.yimg.com,s2.yimg.com,s3.yimg.com,s.yimg.jp,search.yahoo.com,csc.beap.bc.yahoo.com,yrtas.btrll.com,shim.btyll.com,comet.yahoo.com,downloads.yahoo.com,hk.mail.yahoo.com,pr.comet.yahoo.com,geo.yahoo.com,ucs.query.yahoo.com,clientlog.portal.office.com,outlook.live.com,cdn.optimizely.com,spoprod-a.akamaihd.net,spoprod-c.akamaihd.net,icloud.cdn-apple.com,icloud.com,edge.icloud.com,p12-contacts.icloud.com,support.icloud.com,beta.icloud.com,icloud-beta.icloud.com,appleid.apple.com,apple.co,cdn.apple-cloudkit.com,cdn.apple-livephotoskit.com,webcourier.push.apple.com,images.apple.com,securemetrics.apple.com,secure-appldnld.apple.com,lotte.com,image.lotte.com,pathfinder.lotte.com,static.criteo.net,rt.buzzni.com,inpref-asia.s1.amazonaws.com,inpref-asia.s2.amazonaws.com,inpref-asia.s2.amazonaws.com,hsmoa.com,asia.frosmo.com,maxcdn.bootstrapcdn.com,b97.yahoo.co.jp,users.storage.live.com,clientlog.portal.office.com,r4.res.office365.com,swx.cdn.skype.com,a.config.skype.com,b.config.skype.com,emailcufeeducn-my.sharepoint.com,cloudflare.com,cn.bing.com,s1.cn.bing.com,s2.cn.bing.com,s3.cn.bing.com,s4.cn.bing.com,tse1.mm.bing.net,tse2.mm.bing.net,tse3.mm.bing.net,apps.bdimg.com,akamaitechnologies.com,akamai.com,maxcdn.com,cloudfront.net,jsdelivr.net,cloudfront.com,qiniucdn.com,yahoo.com,51cdn.com,lxdns.com,upaiyun.com,qcloud.com,alicdn.com,aliyun.com,qingcloud.com,incapdns.net,azureedge.net

 

 

![img](https://ws4.sinaimg.cn/large/006tNc79gy1fnfyo2avhmj304h058t8s.jpg)

## 相关资源：

 

SSR Windows版4.8.1下载链接：

 

<https://github.com/shadowsocksrr/shadowsocksr-csharp/releases/download/4.8.1/ShadowsocksR-win-4.8.1.zip> 

 

 

SSR 安卓3.5.1.1版下载链接：

 

<https://github.com/shadowsocksrr/shadowsocksr-android/releases/download/3.5.1.1/shadowsocksr-android-3.5.1.1.apk> 

 

SSR Mac电脑版下载链接：

 

<https://github.com/qinyuhang/ShadowsocksX-NG-R/releases/download/1.4.3-R8-build2/ShadowsocksX-NG-R8.dmg> 

 

SSR iOS版，需要更换你的Apple ID到美区，教程：

 

<https://zhuanlan.zhihu.com/p/28625807> 

 

如何购买、使用iOS上的小火箭（shadowrocket）呢？这个坑我再想着慢慢填~~

 

 