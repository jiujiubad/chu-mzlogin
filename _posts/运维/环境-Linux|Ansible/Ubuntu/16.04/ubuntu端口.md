* 201804
* 编程+ubuntu

## 以下这些命令，只是初步使用，未验证。

1）netstat*命令*用于显示与IP、TCP、UDP和ICMP协议相关的统计数据，一般用于检验本机各端口的网络连接情况。

```
netstat -apn | grep 8090
```

2）*lsof*(list open files)是一个列出当前系统打开文件的工具。

```
lsof -i:8090
```

3）结束端口

```
kill -9 PID号
```

4）开启端口

```
iptables -I INPUT -p tcp -m state --state NEW -m tcp --dport 8090 -j ACCEPT
```

