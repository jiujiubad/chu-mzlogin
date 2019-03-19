

## 实战总结

不好用！！

很多 MP4 都扫描不到，按其他帖子修改名字还是扫描不到



## 相关链接

实战：利用Plex搭建跨平台云播平台，https://yorkchou.com/plex-video-stream.html

图文：Plex Media Server安装与使用方法，https://wzfou.com/plex/



## 安装

1）下载：在 <https://www.plex.tv/downloads/> 找到适合自己系统的安装包，右键复制下载链接

以 ubuntu 16.04 为例，替换链接

```
wget https://downloads.plex.tv/plex-media-server/1.14.1.5488-cc260c476/plexmediaserver_1.14.1.5488-cc260c476_amd64.deb
```

2）使用 `dpkg` 安装

```
dpkg -i plexmediaserver_1.14.1.5488-cc260c476_amd64.deb
```

> 如需卸载，用 dpkg -P 参数

3）创建 plex 文件夹（`plex:plex` 表示 `用户是plex:用户组是plex`）

```
mkdir -p /var/lib/plexmediaserver
chown -R plex:plex /var/lib/plexmediaserver
chmod -R 777 /var/lib/plexmediaserver
```

4）开启服务并查看状态，显示 active (running) 表示开启成功

```
service plexmediaserver start && service plexmediaserver status
```

5）开机自启动

```
systemctl enable plexmediaserver.service
```



## 使用

第一次进入 http://ip:32400，页面左侧会显现**『找不到服务器。 下载并安装 Plex Media Server ，它会显示在这里』**，要用 ssh 转发端口处理

```
ssh root@云主机IP -L 8888:localhost:32400
```

登录 ssh 后打开 http://localhost:8888/web

按步骤注册账号、设置媒体库（如下图 `/var/lib/plexmediaserver/Library` 正确的路径会在右下角显示识别出的视频文件）

![](https://ws2.sinaimg.cn/large/006tNc79gy1g02afaa8kmj30wq0nidih.jpg)

最后查看 `设置 → 远程访问` 确保已经开启远程访问

设置成功后，以后就可以通过 http://ip:32400 进行访问



## 更多设置

自动扫描视频文件：设置 → 资料库 → 勾选 Scan my library automatically



## 常见问题

1）plexmediaserver.service: Failed with result 'start-limit

解决办法：文件夹权限问题，https://askubuntu.com/questions/859621/unable-to-start-plexmediaserver-service

2）plex 媒体库有文件，却显示此媒体库没有任何项目？

解决办法：

* root 目录权限设置 777 就可以了 `chmod -R 777 文件夹路径`；
* （未验证）要安装群晖 DSM 内的 plex 组件才能扫描到的