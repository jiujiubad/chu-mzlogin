* 201803
* 编程+ubuntu 桌面版+ubuntu desktop


原文链接：http://blog.topspeedsnail.com/archives/7511



Samba是开源软件，用来让Linux系统与Windows系统的SMB/CIFS网络协定做连结，实现Windows主机与Linux服务器之间的资源共享。Samba服务为两种不同的操作系统架起了一座桥梁，使Linux系统和Windows系统之间能够实现互相通信，为广泛的Linux爱好者提供了极大方便。

#### 安装Samba

使用apt-get安装：

```
$ sudo apt-get install samba samba-common
```



如果你开启了防火墙，关闭：

```
$ sudo systemctl stop ufw
```



#### 配置Samba

编辑配置文件：

```
$ sudo vim /etc/samba/smb.conf
```



添加Samba共享目录：

```
[homes]
    comment = Home Directories
    browseable = no
    path = /
    valid users = root
    read only = no
```



添加一个用户：

```
$ sudo smbpasswd -a root
```



我这里输入的是root用户，也可以输入其他的存在用户名。

重启samba服务生效：

```
$ sudo systemctl restart smbd
```



测试：在Windows下运行窗口输入\加上IP，例如：\\192.168.1.199\root。在弹出的窗口，输入刚刚添加的用户名和密码，就可以访问Linux的文件目录了。

![Ubuntu 16.04安装配置Samba服务](http://blog.topspeedsnail.com/wp-content/uploads/2016/08/Screen-Shot-2016-08-04-at-11.43.08-AM.png)

更多信息：<https://www.samba.org/>

Share the post "Ubuntu 16.04安装配置Samba服务"

* [Facebook](https://www.facebook.com/sharer/sharer.php?u=http://blog.topspeedsnail.com/archives/7511)
* [Google+](https://plus.google.com/share?url=http://blog.topspeedsnail.com/archives/7511)
* [Twitter](https://twitter.com/intent/tweet?source=webclient&original_referer=http://blog.topspeedsnail.com/archives/7511&text=Ubuntu%2016.04%E5%AE%89%E8%A3%85%E9%85%8D%E7%BD%AESamba%E6%9C%8D%E5%8A%A1&url=http://blog.topspeedsnail.com/archives/7511)
* [Weibo](http://service.weibo.com/share/share.php?title=Ubuntu%2016.04%E5%AE%89%E8%A3%85%E9%85%8D%E7%BD%AESamba%E6%9C%8D%E5%8A%A1+%3A+Samba%E6%98%AF%E5%BC%80%E6%BA%90%E8%BD%AF%E4%BB%B6%EF%BC%8C%E7%94%A8%E6%9D%A5%E8%AE%A9Linux%E7%B3%BB%E7%BB%9F%E4%B8%8EWindows%E7%B3%BB%E7%BB%9F%E7%9A%84SMB%2FCIFS%E7%BD%91%E7%BB%9C%E5%8D%8F%E5%AE%9A%E5%81%9A%E8%BF%9E%E7%BB%93%EF%BC%8C%E5%AE%9E%E7%8E%B0Windows%E4%B8%BB%E6%9C%BA%E4%B8%8ELinux%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E8%B5%84%E6%BA%90%E5%85%B1%E4%BA%AB%E3%80%82Samba%E6%9C%8D%E5%8A%A1%E4%B8%BA%E4%B8%A4%E7%A7%8D%E4%B8%8D%E5%90%8C%E7%9A%84%E6%93%8D&url=http://blog.topspeedsnail.com/archives/7511)
* [Email](mailto:?subject=Visit%20this%20link%20find%20on%20http://blog.topspeedsnail.com&body=Hi,%20I%20found%20this%20information%20for%20you%20:%20%22Ubuntu%2016.04%E5%AE%89%E8%A3%85%E9%85%8D%E7%BD%AESamba%E6%9C%8D%E5%8A%A1%22!%20This%20is%20the%20direct%20link:%20http://blog.topspeedsnail.com/archives/7511%20Have%20a%20nice%20day%20:))

### 相关文章

[Ubuntu安装配置LAMP](http://blog.topspeedsnail.com/archives/253)

[Ubuntu 安装 L2TP 协议的 VPN服务](http://blog.topspeedsnail.com/archives/260)

[在Ubuntu中用Fail2Ban保护SSH](http://blog.topspeedsnail.com/archives/262)

[Ubuntu 16.04安装配置NFS](http://blog.topspeedsnail.com/archives/908)

[Ubuntu14.04安装OpenCV](http://blog.topspeedsnail.com/archives/1257)