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
（暂不用）笔记类 app 不能导入文件夹，文件受限（不能批量下载以定时备份），只能搜索标题不能全文搜索：印象笔记、有道云笔记、为知笔记  。但好处是不用在电脑或云盘里保留一堆的 md 文件，想要改的地方也能马上修改（不像 Jekyll 博客或 gitbook 需要打开代码编辑器，修改后在本地开启服务查看，最后上传代码）。在一个 app 里就能同时存放公开的文件和私有的文件（用 Jekyll 博客或 gitbook 就要分成两个项目，一个放公开的一个放私有的，修改文件很费劲。且私有的项目没有 githubpage 所以还需要搭建一个 seafile 才能随时随地查看私有文件）。

1）搜索

* 有道云笔记：Mac 版的全文搜索经常搜索不出，网页版问题较少
* 印象笔记：全文搜索精准
* 为知笔记：全文搜索，但公司太小怕中途跑路
* OneNote：

2）能否上传文件夹、能否批量导出（含文件夹）、导出的格式

* 有道云笔记：网页版可以上传文件夹（这个功能太爽了，印象笔记都没有），windows 免费版每三个月批量导出一次（mac 版和安卓不能导出），一次性批量导出所有文件夹和文件，格式不变。单个文件导出 pdf/markdown
* 印象笔记：只能上传文件，能按文件夹一个一个导出，html/enex，只有 enex 格式能导入
* 为知笔记：不能批量导出
* OneNote：

3）多级目录

* 印象笔记：只能两级，更适合标签思维；删除文件夹后不能恢复文件夹；

4）网页版（很想用它替代 app）

* 印象笔记：不能创建和编辑 Markdown
* 有道笔记：能创建和编辑 Markdown，全文搜索能正常使用

### 总结

201904，各种折腾，时间都花在整理笔记上，经历：文件夹 - 印象笔记 - 有道云笔记 - icloud - icloud + seafile - icloud + blog - icloud + gitbook - 有道云笔记，选一个适合自己的笔记方案真的太太重要了，节省的注意力可能是十倍百倍。最后选用有道云笔记。原因如下：

1）大集团出品，保证服务器长久可用

2）不想多开一个 app，想直接用网页版。有道云笔记网页版功能齐全，且全文搜索正常；而印象笔记网页版不能编辑和创建 markdown 文件，不能导入文件，界面太花。

3）网页版全文搜索正常使用，够用。虽然 mac 版客户端全文搜索功能有问题，印象笔记全文搜索非常强大。

4）网页版可以上传文件夹，好像只有有道云笔记有，开始转移笔记时不用像印象笔记那样一篇一篇文章地复制粘贴，太爽了

5）windows 版本每三个月可免费导出一次，会员无限导出，免费基本够用，个别特殊文件自己手动备份。另外，导出的是文件夹，文件夹结构和文件格式不变（印象笔记是一个文件夹下一堆文件，且格式只能导出为 html 或 enex），这样才不会被这个 app 绑架，用的不爽时可以随时切换到其他 app（印象笔记就不行了，所有文件全部导出到一个文件夹，光是重新给文件分类就够呛）。

6）有道云笔记的文件夹思维符合我的需求。建议文件夹只做三层，第一层是分类，第二层是电子书名，第三层是每一章，第三层的内容就是一堆 markdown 文件，每个文件就是一个小节。

印象笔记则是标签思维，标签思维最大的坑是：

①、千万不要复制文件，因为复制X次文件，就会在这个标签下出现X个相同的文件，经常出现更新内容时有时更新了第一个文件，有时更新了第二个；

②、不论是 mac 还是印象笔记，标签都无法导出。因为标签只是一个标记/记号，不像文件夹是个实实在在存在的东西可以导出。用标签就意味着，只能永远使用印象笔记、只能永远用这台 mac，如果切换其他笔记或 mac，所有标签都要重新创建，所有文档都要重新归类到标签下，工程量有多巨大自己遇到过就知道了。

7）减少修改一个文件的阻力。有道云笔记只需一个 app，私有文档可以加密。而 gitbook 和 blog 修改文件后，还要开启服务查看效果，然后再推送代码，修改的步骤太繁琐，而且公有和私有文档要分开两个项目存放，查找文件难上加难，所以比较适合在文档内容成熟丰满时再使用。

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

docker run -d --name seafile --rm \
  -e SEAFILE_SERVER_LETSENCRYPT=false \
  -e SEAFILE_ADMIN_EMAIL=admin \
  -e SEAFILE_ADMIN_PASSWORD=Admin@111 \
  -v /www/seafile:/shared \
  -p 80:80 \
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