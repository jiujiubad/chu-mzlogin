* 201805
* 工具+mac+vps



### 2018年3月31日发布

视频地址：https://www.youtube.com/watch?v=pL0EZrKL6mA

代码地址： [https://github.com/allenking1028/ss/i...](https://www.youtube.com/redirect?redir_token=rWSggSuCF2S32as_InKm8dHqhC58MTUyNjI4OTQyNUAxNTI2MjAzMDI1&q=https%3A%2F%2Fgithub.com%2Fallenking1028%2Fss%2Fissues%2F4&v=pL0EZrKL6mA&event=video_description) 

各平台客户端地址： 

百度云盘：[https://pan.baidu.com/s/1VuMZy4cgXYNO...](https://www.youtube.com/redirect?redir_token=rWSggSuCF2S32as_InKm8dHqhC58MTUyNjI4OTQyNUAxNTI2MjAzMDI1&q=https%3A%2F%2Fpan.baidu.com%2Fs%2F1VuMZy4cgXYNOf56jkczpHw&v=pL0EZrKL6mA&event=video_description) 

谷歌云盘：[https://drive.google.com/drive/folder...](https://www.youtube.com/redirect?redir_token=rWSggSuCF2S32as_InKm8dHqhC58MTUyNjI4OTQyNUAxNTI2MjAzMDI1&q=https%3A%2F%2Fdrive.google.com%2Fdrive%2Ffolders%2F1Fq8_lVbx0T6vZNeobLTfigoF3E-NlClq%3Fusp%3Dsharing&v=pL0EZrKL6mA&event=video_description) 

最新客户端下载 或更多文章 也是原创技术小哥的网站： https://doub.io/brook-jc2/

---

99使用心得：

* 速度也很快

* 没有全局模式之分，上amazon.com没有ss/ssr的全局模式快

  

# 一、安装或卸载

系统要求：CentOS 6+ / Debian 6+ / Ubuntu 14.04 +

推荐使用： **Debian 7 x64**，这个是我一直使用的系统，我的脚本在这个系统上面出错率最低。（99为了方便转换v2ray，干脆把系统统一成**Debian9 x64**试试）

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

## 步骤2 搭建brook服务端

1）安装

```
wget -N --no-check-certificate https://softs.fun/Bash/brook.sh && chmod +x brook.sh && bash brook.sh
```

~~2）如果失效用这个~~

```
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/brook.sh && chmod +x brook.sh && bash brook.sh
```

#### BIG东东的安装选项：

* 1安装Brook
* brook端口456
* 默认协议：Brook（新版协议，即[servers]）

## 步骤3 重启vps

安装完成后一定要重启机器，否则BBR加速不会启用。

````
reboot
````

## 步骤4 针对谷歌云、亚马逊ec2

谷歌云防火墙规则（说白了就是创建完实例以后需要再去防火墙那个地方打开相应的端口才可以使用实例），要为http和https开放刚刚设置好的端口。



# 二、使用

![image-20180513200216402](https://ws3.sinaimg.cn/large/006tKfTcgy1fr9yrb111ij30f307fq3f.jpg)

# 三、测试工具

1）安装htop

```
apt-get install htop
```

2）使用htop

```
htop
```

