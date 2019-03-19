---
layout: post
title: 自搭建-云播放-CloudRorrent
categories: 工具-自搭建
---

## 方案对比
（小视频可用，第一选择）`Cloud Rorrent`，300M 的文件可以在线播放，2G 的文件不能在线播放；另外可离线下载（没资源的链接还是没速度）  
（小视频可用，搭建麻烦，第二选择）`Rclone + 谷歌硬盘`，缺点是大视频谷歌处理很慢，300M 的文件可以在线播放，2G 的文件不能在线播放，并且上传的视频要等谷歌处理完才能观看（处理时间几小时）  
（小视频可用，搭建麻烦）`Kodexplorer`，300M 文件可以在线播放，2G 文件不能在线播放  

（弃用）NextCloud：挂载谷歌硬盘，打开 `设置-外部存储` 显示 `未设置外部存储或者没有权限`  
（弃用）plex：扫描不到大多数 MP4  
（没用过）Ftp：开个 Caddy，然后用 MPC  

总结：vps 离线下载的速度，和在线播放的速度取决于 vps 线路，所有工具都不能离线播放 2G 的大文件

## 安装 Cloud Rorrent
```
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/cloudt.sh && chmod +x cloudt.sh && bash cloudt.sh
```
选择 1，IP 用默认（或填写 vps 的 IP），端口比如 2019，账号密码  

## 出现的 Bug
`listen tcp xx.xx.xx.xx​:xx:​ bind: cannot assign requested address`  
解决办法：目前只有谷歌云会出现，安装 `Cloud Rorrent` 时不要填写 `IP`，按默认的 `0.0.0.0` 即可成功启动。