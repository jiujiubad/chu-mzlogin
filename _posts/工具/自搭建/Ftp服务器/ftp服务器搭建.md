

参考：https://segmentfault.com/a/1190000009036435



## 安装与使用

1）安装 vsftpd

```
apt-get install vsftpd
```

2）添加用户，或用当前 root 用户

```
mkdir /home/your_name
useradd -d /home/your_name -M your_name
```

3）修改配置文件

```
vim etc/vsftpd.conf
```

具体配置项如下

```
anonymous_enable=NO
local_enable=YES 
write_enable=YES 
pam_service_name=ftp

# 设置固定目录，在结尾添加。如果不添加这一行，各用户对应自己的目录。
local_root=/home/your_name
```

重启 vsftpd 服务

```
service vsftpd restart
```

4）连接访问

```
ftp your_ip
```

5）文件的上传及下载

使用 `put` 与 `get` 命令



## 客户端

官网下载：<https://filezilla-project.org/>

使用：填写 `host` 即你的 ip，用户名（比如 root），密码，`Port` 默认是 21，然后连接。