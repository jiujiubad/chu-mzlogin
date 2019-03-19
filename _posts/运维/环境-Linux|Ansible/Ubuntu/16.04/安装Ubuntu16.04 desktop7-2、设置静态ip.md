* 201803
* 编程+ubuntu 桌面版+ubuntu desktop

1）查看本机ip信息

```
ifconfig 
```

<img src="https://ws3.sinaimg.cn/large/006tNc79gy1fpqfdzdy4dj30ou0ci764.jpg" width="700">

2）备份ip配置

```
sudo cp /etc/network/interfaces /etc/network/interfaces.bak #做任何修改前先备份
```

3）打开ip配置

```
sudo vim /etc/network/interfaces
```

加入配置如下，其中lo、enp0s31f6（网卡名）、address（ip）、netmask（网关）、gateway（路由器ip）分别与上图对应。

```
auto lo
iface lo inet loopback
auto enp0s31f6
iface enp0s31f6 inet static
address 192.168.0.8
netmask 255.255.255.0
gateway 192.168.0.1
dns-nameserver 202.96.128.166
```

<img src="https://ws1.sinaimg.cn/large/006tNc79gy1fpqfk0x0wlj30bv069jrf.jpg" width="500">

4）打开DNS配置文件

```
sudo vim /etc/resolv.conf
```

写入

```
nameserver 202.96.128.166
```

<img src="https://ws1.sinaimg.cn/large/006tNc79gy1fpqfo2my18j30hl036jre.jpg" width="600">



5）重启网络

```
sudo /etc/init.d/networking restart
```

检查，看ip即addr的值是否生效

```
ifconfig
```

