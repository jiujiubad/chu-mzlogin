* 201805

* 工具+mac+vps

```
mine:
ssh root@173.82.232.63

other:
ssh root@100.42.64.212

xiaoyu:
ssh root@67.218.148.196 -p 29506

35.229.131.171

使用v2ray，配置Websocket+cdn，满血复活
http://ping.pe/
```

### 20180513结论

* ss作者被喝茶已停更，所以ssr比ss更安全。——**实测两个都不靠谱**，速度该变慢的当天就很慢了(youtube 约400kbps，谷歌打不开，还不如**逗逼论坛共享的账号**好用)。
* **brook**因为小众而安全，**v2ray**因为复杂而安全，目前都比ss好
* 国产软件360、杀毒、浏览器等，能检测到上谷歌，是被墙或被运营商限速的原因。




[TOC]

# 一、vps的搭建

## 1、ubuntu16.04 64位安装shadowsock，python版，20180501

### 系统支持：ubuntu、debian、centos6/7

### 1.1 补充：ss和ssr参数选择

1）酸酸ss（比如我在mac上用的shadowsocksx-ng）

```
加密：aes-256-gcm最佳，其次chacha20

混淆：plain最佳，其次http_simple（不要选tls，容易被墙）

协议推荐：auth chain b
```

2）酸酸乳ssr

```

```

### 1.2 安装shadowsocks

1）登录服务器

```
ssh root@你的ip地址
```

2）修改root密码

```
passwd
```

3）安装三部曲之一

```
wget --no-check-certificate -O shadowsocks.sh https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks.sh
```

4）安装三部曲之二

```
chmod +x shadowsocks.sh
```

5）安装三部曲之三，大约3-5分钟

```
./shadowsocks.sh 2>&1 | tee shadowsocks.log
```

①、首先设置shadowsocks的密码（默认为 teddysun.com）

②、端口（默认为 8989），两位数到四位数字都可以写，我喜欢用**8381**

③、加密方式，我喜欢用默认（默认为 **aes-256-gcm**）

④、按任意键继续

⑤、安装完成后，脚本提示如下，此时已经可以科学上网：

```
Congratulations, Shadowsocks-python server install completed!
Your Server IP        :your_server_ip
Your Server Port      :your_server_port
Your Password         :your_password
Your Encryption Method:your_encryption_method

Welcome to visit:https://teddysun.com/342.html
Enjoy it!
```

### 1.3补充： 卸载方法（这里不需要执行）：

使用root用户登录，运行以下命令：

```
./shadowsocks.sh uninstall
```

### 1.4 配置多用户端口

#### 补充：vi常用命令：

删除：用`ctrl+u`，可以一行一行删

编辑：键盘`i`

保存并退出（两种方法）：①、按一下`esc`，输入`:wq`，回车；②、按住`esc+shift`，再按两下`z`

不保存退出：按一下`esc`，输入`:q!`，回车

1）安装vim（vi模式下可以编辑，否则无法输入，按方向键会变成A、B字幕）：

```
sudo apt-get install vim
```

2）配置文件，最好先在其他文档上编辑好再粘贴进去。

```
vi /etc/shadowsocks.json
```

20180501配置如下：

```
{
    "server":"0.0.0.0",
    "server_port":8381,
    "local_address":"127.0.0.1",
    "local_port":1080,
    "port_password":{
         "8381":"Qq112233",
         "8382":"Qq112233",
         "443":"Qq112233"
    },
    "timeout":300,
    "method":"aes-256-gcm",
    "fast_open":false,
    "protocol":"origin",
    "obfs":"plain"
}
```

3）修改文件后重启shadowsocks：

```
/etc/init.d/shadowsocks restart
```

注意：

* 重启后，一开始是可能不可以科学上网的，有时要稍等1-3分钟，配置才会生效。（等待时间可以先配置好下面下载的shadowsocks客户端）
* 实测：cloudcone看youtube4k视频，没装锐速前约3000-5000kbps，装完锐速10000-40000kbps。

4）查看shadowsocks状态/重启（实测正常reboot后shadowsocks会自启动，但要稍等一两分钟，查看status就可以看到是running的）

```
service shadowsocks status   查看运行状态
service shadowsocks start    停止
service shadowsocks stop     暂停
service shadowsocks restart  重启

或用
启动：/etc/init.d/shadowsocks start
停止：/etc/init.d/shadowsocks stop
重启：/etc/init.d/shadowsocks restart
状态：/etc/init.d/shadowsocks status
```

5）用http://ip111.cn/测试vps状态是否科学上网，谷歌网站一行有出现ip就是可以科学上网

6）**如果是Centos系统**，配置多用户端口后，还要在防火墙开放端口（每个端口如下贴两行代码），才能科学上网。ubuntu系统无视这一步。

```
firewall-cmd --zone=public --add-port=9001/tcp --permanent # 开9001 TCP端口
firewall-cmd --zone=public --add-port=9001/udp --permanent # 开9001 UDP端口
firewall-cmd --zone=public --add-port=9002/tcp --permanent # 开9002 TCP端口
firewall-cmd --zone=public --add-port=9002/udp --permanent # 开9002 UDP端口
firewall-cmd --reload  # 重载配置
iptables -L -n  # 查询防火墙规则
```

#### **参考网站：**

1）https://shadowsocks.be/1.html

#### 更多版本 Shadowsocks 服务端一键安装脚本：

2）[shadowsocks常见问题](https://teddysun.com/399.html)

3）[ShadowsocksR 版一键安装脚本（CentOS，Debian，Ubuntu）](https://shadowsocks.be/9.html)
4）[CentOS 下 Shadowsocks-libev 一键安装脚本](https://teddysun.com/357.html)
5）[Debian 下 Shadowsocks-libev 一键安装脚本](https://teddysun.com/358.html)
6）[Shadowsocks-go 一键安装脚本（CentOS，Debian，Ubuntu）](https://teddysun.com/392.html)

7）[CentOS下pip和shadowsocks的安装使用](https://teddysun.com/339.html)

8）限速，https://mucut.com/vpsapp/dlsw/sslk/11-ssszlj.html

9）fast_open、重启自动启用shadowsocks



## 2、ubuntu16.04/14.04安装锐速

## 步骤1 安装BBR加速器

### 方案1，20180510更新（好用，容易安装）

使用 root 用户输入下面命令安装或卸载

```
bash <(curl -s -L https://233blog.com/v2ray.sh)
```

> 如果提示 curl: command not found ，那是因为你的小鸡没装 Curl ubuntu/debian 系统安装 Curl 方法: `apt-get update -y && apt-get install curl -y` centos 系统安装 Curl 方法: `yum update -y && yum install curl -y` 安装好 curl 之后就能安装脚本了

选择9其他，再选择1安装BBR，版本默认。

### 方案2，安装BBR加速（实测无用，垃圾）

1）使用root权限

```
sudo -i
或
ssh root@ip地址
```

2）安装

```
wget --no-check-certificate https://github.com/iyuco/scripts/raw/master/bbr.sh
chmod +x bbr.sh
./bbr.sh
```

* 出现提示：needs to be restart. Do you want to reboot?时，**选择n**，否则重启后卡住了。

![image-20180514000425428](https://ws3.sinaimg.cn/large/006tKfTcly1fra5ranxtvj30xi07lgqb.jpg)

### 方案3，第二套代码（有时行有时不行）

```
wget -N --no-check-certificate https://raw.githubusercontent.com/FunctionClub/YankeeBBR/master/bbr.sh && bash bbr.sh install
```

```
bash bbr.sh start
```

* 会有中文字提示“魔改版BBR启动成功！”

### 方案4，20180427更新（有时会中断或不起作用）

一键安装脚本如下，测速youtube的4k视频，30000kbps：

```
wget xiaofd.github.io/ruisu.sh && bash ruisu.sh  
```

安装完会断开vps连接是正常现象，重启后就安装好了锐速。检测是否安装成功：

```
ps aux | grep appex
```

会出现类似词语：“Ubuntu_16.04_4.4.0-47-generic”即有关键词"generic"时，说明已安装！！

查看锐速状态/重启（实测正常reboot后ruisu会自启动，但要等shadowsocks重启之后一两分钟，查看status就可以看到是running的）

```
service serverSpeeder status   查看锐速的运行状态
service serverSpeeder start    停止锐速
service serverSpeeder stop     暂停锐速
service serverSpeeder restart  重启锐速
```

### 

# 过时的方法备份：BBR/锐速安装

参考网站

http://yangteng.me/blog/2017/05/03/cj879gh7m000cy2tgojdcogpz/

https://www.mostxw.com/rj/3699.html【Most图文】

https://www.youtube.com/watch?v=oYyUkkIF1p4【Most视频】

## 1、谷歌 TCP BBR

先来简单说一下这个东西吧，就是Google开发的新的拥塞控制算法，据说是用在YouTube上，并且在去年9月开源并且现在已经集成到Linux `4.9-rc8之后版本` 的内核中。
[官方论坛](https://groups.google.com/forum/#!forum/bbr-dev)
[官方Start Guide](https://github.com/google/bbr/blob/master/Documentation/bbr-quick-start.md)

因此，我们这次很重要的一项步骤就是更换Linux的内核。这里要提醒的是，如果你的VPS使用的是**OpenVZ**的虚拟技术，是**不能**使用BBR的。并且，系统要求在 `CentOS 6+`，`Debian 7+`，`Ubuntu 12+`。

**开始前先说一声，我使用的系统是Ubuntu Server 14.04 x86-64，并且使用root用户操作**

#### 1、更换Linux内核

##### 按照惯例我们先更新一下`apt`源：

①、ubuntu系统

```
apt-get update
```

②、如果是 CentOS 系统，执行如下命令即可升级内核：

```
yum --enablerepo=elrepo-kernel -y install kernel-ml kernel-ml-devel
```

​        CentOS 6 的话，执行命令：

```
sed -i 's/^default=.*/default=0/g' /boot/grub/grub.conf

```

​        CentOS 7 的话，执行命令：

```
grub2-set-default 0
```

##### 然后我们要下载Ubuntu的内核，

在[谷歌内核库](http://kernel.ubuntu.com/~kernel-ppa/mainline/)，找到我们需要的内核文件，先下载到 `/tmp` 文件夹中，下面是一个指令

```
cd /tmp
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.12.4/linux-image-4.12.4-041204-generic_4.12.4-041204.201707271932_amd64.deb
```

##### 然后执行安装

> 文件名你可以只输入前几个字母然后按`tab`键自动补齐

```
dpkg -i linux-image-4.12.4-041204-generic_4.12.4-041204.201707271932_amd64.deb
```

##### 装完以后，我们查看一下已安装的内核列表

```
dpkg -l | grep linux-image
```

如果列表中出现了你刚才安装的内核，那么证明已经安装成功了。

##### 然后我们执行内核更新，完成后重启。

```
update-grub
## 等待输出 done 后重启系统

reboot 
##完成后重启，这里操作后会退出root权限需要重新登录`ssh root@你的ip地址`
```

##### 重启以后，我们检查一下系统内核是否正确切换

```
uname -a
```

如果输出的结果是你刚才安装的系统内核，则表示安装成功了。

#### 2、开启BBR

分别执行下面这两条脚本

```
echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
```

保存生效

```
sysctl -p
```

执行脚本

```
sysctl net.ipv4.tcp_available_congestion_control
```

如果刚才的保存和执行脚本结果都有 `bbr` 那么代表你的内核已经开启了BBR

执行脚本

```
lsmod | grep bbr
```

如果结果中有`tcp_bbr` ，则说明bbr已经启动。

![](https://ws3.sinaimg.cn/large/006tNc79gy1flx5g8bik3j30hv06n3zq.jpg)

#### 3、检查BBR启动

1、检查核心

> uname -r

检查内核是不是4.10，检测后看到的是"4.10.5-1.el6.elrepo.x86_64"。

2、sysctl net.ipv4.tcp_available_congestion_control

执行后看看返回"net.ipv4.tcp_available_congestion_control = bbr cubic reno" 

3、sysctl net.ipv4.tcp_congestion_control

看到返回值"net.ipv4.tcp_congestion_control = bbr"

4、sysctl net.core.default_qdisc

查看返回值"net.core.default_qdisc = fq"

5、lsmod | grep bbr

然后可以看到有BBR信息。说明安装成功了。

这样，在安装完毕BBR之后，我们去建站等用途的时候，应该是速度有提高的。

## 2、centos安装锐速

### ！！成功——以下方法，一条命令搞定

参考链接：

https://github.com/91yun/serverspeeder

### 特别说明

另外：重要的事情说三遍！！！

锐速不支持Openvz！！！锐速不支持Openvz！！！锐速不支持Openvz！！！

### 你可能需要：

* 如果你不知道你的机子到底是不是Openvz，请食用[《教程：一键检测VPS是Openvz还是KVM还是Xen》](http://www.91yun.org/archives/836)
* 如果你的内核不对，是Centos的话请食用[《教程：CentOS更换内核，提供锐速可用的内核下载》](http://www.91yun.org/archives/795)。debian和ubuntu我不熟，暂时还没一键包，请自行百度google。。
* 如果你嫌麻烦，只是想找个好用的SS，嫌麻烦又不想花太多钱，你可以和我合租我的自用精选线路。。。[想租SS的进](https://www.vpn100.xyz/)
* 如果你想知道一些服务器是否适合你，请食用 各种[评测报告](http://www.91yun.org/?s=%E8%AF%84%E6%B5%8B)。我每天都会把我尝试的一些vps评测报告发出来，大家可以收藏好本站，及时关注。

### 锐速破解版安装方法：——！！一条命令搞定

```
wget -N --no-check-certificate https://github.com/91yun/serverspeeder/raw/master/serverspeeder.sh && bash serverspeeder.sh

```

### 锐速破解版卸载方法：

```
chattr -i /serverspeeder/etc/apx* && /serverspeeder/bin/serverSpeeder.sh uninstall -f


```

锐速破解版功能： 如果内核完全匹配就会自动下载安装。 如果没有完全匹配的内核，会在界面提示可选内核，可以手动选个最接近的尝试 自动下载授权文件 自动修改配置文件 已chattr +i /serverspeeder/etc/apx*禁止修改配置文件，可以不用加hosts了 目前只支持C

## 3、shadowsock自定义规则

<http://honglu.me/2015/06/26/ShadowSocks%E8%87%AA%E5%AE%9A%E4%B9%89%E8%A7%84%E5%88%99/> 

# 二、测试

## 1、服务器分配

```
mine：小兰、小兰弟弟、99
other：婉、老晓、燕琳            猫、梁育铭、risa、黄雨
google：                    #sudo -i进入
xiaoyu：小宇
aws：
```

## 2、测试工具

* http://ip111.cn/，测试：是否已经科学上网
* https://www.ipip.net/，全国测速ip的ping
* http://ping.chinaz.com/65.49.198.150，全国测速ip的ping、上传速度、下载速度，并且有**全国分布图**

## 3、测试命令

1）测速命令

```
curl -s https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py | python -
```

20180501测试几台服务器，如下：

| vps       | ip             | download(Mbit/s) | upload(Mbit/s) | 备注   |
| --------- | -------------- | ---------------- | -------------- | ------ |
| google    | 35.229.131.171 | 148              | 77             |        |
| cloudcone | 173.82.240.212 | 278              | 37             | other  |
| cloudcone | 173.82.153.182 | 463              | 371            | xiaoyu |
| cloudcone | 173.82.206.161 | 578              | 276            | mine   |

2）硬件使用状况

```
df -hl  #硬盘使用情况
cat /proc/cpuinfo  #查看cpu

top   #几个用户，内存使用情况，cpu使用情况
free -m  #内存使用情况
vmstat  #cpu使用，比top更具体

sudo apt-get install htop
然后htop  #动态显示cpu、内存使用情况
```

* 总结：最好用的是htop和top



# 三、知识点讲解

## 1、linux/ubuntu技巧

1）在linux里，移动光标可以边按住左或右键，边按ctrl或shift，实现光标快速移动。

2）在linux如果编辑文件遇到报错，无需纠结，按E键继续编辑。

3）Ctrl+Insert，从VPS里复制文字出来到你的电脑。mac的insert是fn+enter。

4）Shift+Insert，把你电脑里的文字粘贴进入VPS里。

## 2、vps知识

### 2.1 影响vps速度和稳定性的关键因素

**1）『服务器地址』影响最大**，最好选香港、新加坡、日本的

* 实测cloudcone年付套餐，除了黑色星期五的17.9套餐，其余的一开始又快又稳定，用几天后速度特别慢安装锐速也完全没用（看youtube不超过1000k/s）。而且会有很大的cpu占用、ram占用问题，而cloudcone会因为占用率100%的问题直接把服务器暂停（完全无法使用）。——分钱分货，换用cloudcone最新的月付套餐，2美元/月，速度马上又上去了，安装锐速前youtube5000k/s，安装锐速后25000k/s。

2）**其次vps的『带宽』影响多用户数据传输量**

3）下载速度。需要测试的最重要的参数，直接关乎看视频和加载网页的快慢

4）ping值。只影响延迟**（几百ms感觉不出来），看电影用美国服务器，**玩游戏用香港服务器

### 2.2 带宽单位换算：

1）1Gbps=1000Mbps，1000Mbps/8=宽带125兆宽带（比如vultr的1Gbps），10Mbps/8=1.25兆宽带（比如DGCHost）

2）即带宽=8倍宽带，1Gbps即1024Mbps就是传说中的G级宽带，理论上带宽是125MB/s，也就是说满速下下载速度为128MB每秒，所以我们说“百兆宽带100Mbps”，实际理论上最高速度能达到12.5MB/s。

3）理论上，看4k视频带宽15-30MBPS，所以，**一个1Gbps带宽的服务器，理想是最多4个人用**。超过4人后，如果刚好及格人同时在看高清视频，或是在下载，就很容易出现带宽长期处于或超过1Gbps的情况，由于这种带宽是共享带宽，服务商不允许我们长期处于带宽峰值，就会停用我们的服务器。

### 2.3 主流vps

1）最主流的四家是：vultr、linode、digitalocean（同等配置的运存最少）、搬瓦工CN2。

2）超级性价比鸡：cloudcone。

3）超售严重的小鸡：virmach（用达拉斯），优惠码LEB30、zhujiceping25。

4）iozoom，知乎答主自己在用。

### 2.4 每月500G流量够不够用？

1）测试virmach，**十多个人用一个月才用了25G**，但是速度真心慢。

### 2.5 系统用ubuntu还是centos？

1）ubuntu好，据说比较人性化。centos在配置多用户端口后，还要把创建的端口加入防火墙的白名单，否则其他端口不能科学上网。

### 2.6 加速用谷歌BBR还是锐速？

1）不一定，要测试才知道。

### 2.7 shadowsoks常用语言

1）Shadowsocks 服务端大体上有 4 种版本，按照程序语言划分，分别为 Python ，libev ，Go ， Nodejs ，目前主流使用前 3 种。



# 四、遇到的bug

### 4.1【bug】使用Vultr的Server Reinstall，重启主机后报错——解决ssh登录Host key verification failed

使用SSH登录某台机器，有时因为server端的一些变动，会出现以下信息：

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that the RSA host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
50:e6:cb:58:bc:b7:a3:f6:e8:8f:46:a7:c1:5f:c2:df.
Please contact your system administrator.
Add correct host key in /home/cobyeah/.ssh/known_hosts to get rid of this message.
Offending key in /home/cobyeah/.ssh/known_hosts:7
RSA host key for 192.168.0.4 has changed and you have requested strict checking.
Host key verification failed.

（此处先不提及原理，只讲处理方法，需要了解原因的请留言或找其他资料）

**这时候的处理方法，有3种：**

方法1）删除提示信息中，对应的行数，例如上例，需要删除`vi /home/cobyeah/.ssh/known_hosts`文件的第7行。

方法2）删除整份/home/cobyeah/.ssh/known_hosts文件。

方法3）修改/etc/ssh/ssh_config文件的配置，以后则不会再出现此问题StrictHostKeyChecking no
UserKnownHostsFile /dev/null

### 4.2【bug】vi /etc/shadowsocks.json打开文件，用i进行编辑后，不能删除、而且上下键打出来变成A和B

1）按住esc+shift，连续按两下z，可以退出vi模式。

2）因为缺省是安装的不完全vim，用这条命令安装。

```
sudo apt-get install vim
```



# 五、vultr购买与配置

### 5.1 附加阅读：

现有 5$配置降价为 2.5$每月的正确做法：

> #### 1.后台新建一个快照2.将当前 IP 进行保留3.将 5$机器删除4.重新开一台 2.5$机器，系统选择刚创建的快照， IP 选择刚保留的 IP ，最后删除预留 IP5.大功告成，数据没有丢失， IP 没有变化，简单省事。详情见：[Vultr:原5$套餐降级2.5$的正确做法 Vultr保留IP 套餐降级的方法](http://www.vpsdx.com/2345.html)

### 5.2 正式开始

所用配置：电脑Mac pro 2015，Vultr日本服务器，开了两台主机分别测试ubuntu14.04 X64系统安装谷歌BBR加速、 centos7系统安装锐速加速

参考教程：Vultr优惠链接https://www.vultr.com/?ref=7272972

1）打开[Vultr官网](https://www.vultr.com/)

![](https://ws3.sinaimg.cn/large/006tNc79gy1flwqt7qxb1j31450meds0.jpg)



2）登录后

![](https://ws3.sinaimg.cn/large/006tNc79gy1flwr287bhnj31350h9442.jpg)

注意：

①、Vultr的消费方式，是先充值后消费，至少充值10美元。每月月结日（好像是月底）扣费。

②、paypal支持储蓄卡、信用卡，相当于是中国的支付宝，很多购物网都可以用。

③、Vultr都是按小时计费。如果选的是$5每月的服务器，搭建主机后按0.007$/小时计费，每月最多消费`0.007*30*24 ≈ $5`

④、搭建主机后，停用、或启用都会扣费，只有把主机删除了才停止扣费。

⑤、删除主机后，可以随意重装cenos、ubuntu等系统，重新选择机房服务器地址。

⑥、搭建多个主机，计费会按每台主机0.007$/小时累加。这里要特别注意，废弃的主机一定要删掉，不然会继续计费。



3）点击pay with paypal后进入官网，点击“创建账户”，然后填写个人信息。

![](https://ws1.sinaimg.cn/large/006tNc79gy1flwrg5xjbij30cu0g274t.jpg)

![](https://ws3.sinaimg.cn/large/006tNc79gy1flwrh0edvzj314g1dh7bb.jpg)



4）付款完成后，会跳转到以下页面。或者点击左侧Billing，然后点击加号。

![](https://ws3.sinaimg.cn/large/006tNc79gy1flwrrrnwx2j312w0lugpo.jpg)



5）配置主机，这里选择Centos系统。

![](https://ws2.sinaimg.cn/large/006tNc79gy1flws68owtqj314g27ue0b.jpg)



6）点击Deploy Now后，如果显示账号没有验证，会出现下图。点击`Click here to send a verification e-mail`，然后到注册邮箱去验证。

![](https://ws3.sinaimg.cn/large/006tNc79gy1flws97lkf8j312w0lbaf6.jpg)



7）等待系统安装，大约2-5分钟（我的用了2分钟），安装完成后，Status栏会显示为绿色的Running

![](https://ws4.sinaimg.cn/large/006tNc79gy1flwscd1l76j312d0ieq6o.jpg)



8）点击你的主机名字如99-one，进入下图，会用到的参数有IP Address、Password

![](https://ws3.sinaimg.cn/large/006tNc79gy1flwsg93ovrj312l0fvjv0.jpg)



9）用root权限连接主机

```
ssh root@45.76.104.195  #ip替换成自己的
```

如果输入后没有反应，可能是连接超时，可以在终端里输入`ping 你的ip`看有没有`time= 多少 ms`出现，如果没有很有可能这个ip被墙了，要删掉主机，需要删除主机重新安装。

注意：Vultr的主机新建5分钟后才能删除。

![](https://ws1.sinaimg.cn/large/006tNc79gy1flwt8tkmt5j30iu09w0vi.jpg)



### 5.3 Vultr最新促销活动：推特关注送3刀，蚊子再小也是肉啊

操作非常简单，只需4步即可，你获得赠送后如果觉得不爽，可以随时取消关注嘛，还是那句话，蚊子再小也是肉啊，能省一块是一块。。。。

> 1. 点击网址：[https://my.vultr.com/promo/](https://my.vultr.com/promo/)
> 2. 验证您的Twitter帐户并获得1美元的信用 - 验证将允许访问其他Twitter宣传！
> 3. 在Twitter上关注@Vultr并获得$ 1的信用！
> 4. 关于Vultr，并获得$ 1的信用！

依次点击网址及Vultr上的三个推特操作按钮即可，是不是很简单呢？！就这样3美元到手了，还不赶紧试试看啊！效果如下：

![](https://ws4.sinaimg.cn/large/006tNc79gy1flwxm72484j30cl09j74t.jpg)

### 5.4 vultr怎么备份？用快照snapshots

参考教程https://www.duoluodeyu.com/2481.html

1）进入主机，选择Snapshots栏，点击Add Snapshots按钮，输入名字新建备份。

2）如果当前ip不满意或被墙，点击新建一个ip主机，在选择页面的Server Type不是选ubuntu或centos了，而是选择Snapshot，选择上边做的那个备份，即可把旧主机的数据迁移到新主机。









