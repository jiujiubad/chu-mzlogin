---
layout: post
title: 自搭建-私有云盘-seafile-kodexplorer
categories: 工具-自搭建
---

## 方案对比
### 云盘功能需求：
* 增量同步，否则修改几个文档也要重新上传全部文件很蛋疼
* 在线预览 md、xls、mp4 文件
* 搜索
* 分享
* 上传文件夹
* 版本控制

### 公有云
（工作文档用）icloud：增量同步，本地挂载。安卓只能用浏览器开启桌面版打开，安卓只能下载不能预览  
（大文件用）百度云：免费空间大。上传下载慢，上传文件、或同步文件后本地文件夹时间会被修改  
（icloud 备用方案）坚果云：增量同步，版本控制，各运营商上传下载速度都稳定。免费版不能搜索，流量只有 1G/月  
（数据库备份）七牛云  
（临时文件可用）google driver：有墙  

（暂不用）dropbox：有墙  
（暂不用，付费可考虑）Onedriver：版本控制，上传不限速，总体没有太大硬伤。没有增量备份  
（暂不用）微云：没有增量同步，没有版本控制  
（暂不用）亿方云：版本控制，免费空间大。没有增量同步  
（暂不用）笔记类 app 不能上传文件夹，文件受限：印象笔记、有道云笔记、为知笔记  

### 私有云
（主力用）seafile：增量同步，版本控制，专业版 3 个用户以下免费（个人使用推荐）。不能预览 office 文件，上传下载速度不稳定  
（临时分享用）kodexplorer：支持 office 预览但不能编辑，无数据库安装方便，没有安卓客户端  
（条件允许可用）家里放台服务器  

（弃用）owncloud，不稳定、速度慢、bug 多，只能试用 30 天，没有历史记录  
（弃用）nextcloud 是 owncloud 的升级版：没有增量同步  
（弃用）syncthing，没有云盘功能，同步特别慢，不是增量同步  
（暂不用）h5ai 文件目录：轻便，但不合适存私密文件  
（没用过）filebrowser  
（没用过）synctrayzor  

## 搭建私有云盘
### 可道云 kodexplorer（宝塔面板）
ubuntu 安装宝塔面板(最好在纯净的vps上或在开启防火墙等配置前安装，否则容易出错)
```
wget -O install.sh http://download.bt.cn/install/install-ubuntu.sh && sudo bash install.sh
# 宝塔面板端口：80/888/8888/20/21/443
rm -f /etc/init.d/bt && rm -rf /www/server/panel  # 卸载宝塔面板
```
Docker方式安装，实测会卡可能比较吃配置
```
docker run -d -p 80:80 --name kodexplorer --restart=always -v /opt/kodexplorer:/var/www/html yangxuan8282/kodexplorer
```

### Seafile（基于 C）
docker 安装 seafile，10 分钟搞定：<http://www.vpsjxw.com/vps_use/seafile_intro/>  
安装/卸载 docker 官方教程：<https://docs.docker.com/install/linux/docker-ce/ubuntu/#os-requirements>  
```
docker login docker.seadrive.org，账号 seafile，密码 zjkmid6rQibdZ=uJMuWS  #登录seafile私有仓库

# 修改 SEAFILE_SERVER_LETSENCRYPT（先用 false 测试，因为每周只能申请 5 份证书）、密码、端口；先用参数 --rm 测试，正式开启才换 --restart=always（seafile 容器开机自启用）
docker run -d --name seafile --restart=always \
  -e SEAFILE_SERVER_LETSENCRYPT=true \
  -e SEAFILE_SERVER_HOSTNAME=xiaochu.gq \
  -e SEAFILE_ADMIN_EMAIL=admin \
  -e SEAFILE_ADMIN_PASSWORD=Admin@111 \
  -v /www/seafile:/shared \
  -p 80:80 \
  -p 443:443 \
  docker.seadrive.org/seafileltd/seafile-pro:latest
 
 注意：
 1、实测发现，配置 https 证书时只能用 80、443 端口（用其他端口页面打不开）
 2、容器开启后，要进入网页-系统管理-设置-把 URL 根据情况改成 http 或 https
 3、客户端-设置-高级-勾选 “不自动解除同步”、“当服务器..不要自动解除”、“HTTPS同步..”
 4、同步失败时，重新开启容器

# docker 开机自启动：<https://blog.csdn.net/julius819/article/details/7665679>
systemctl enable docker
systemctl list-unit-files |grep docker
```