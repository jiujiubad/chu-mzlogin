---
layout: post
title: 自搭建-文件上传下载-aria2+rclone
categories: 工具-自搭建
---

## 文件上传下载的场景
### 本地上传大文件到 VPS
rsync 上传下载大文件-参数详解：<http://blog.51cto.com/colderboy/132054>
```
rsync -auvzP ~/Downloads/西虹市首富.mp4  root@34.80.205.231:/root/Download
```
（rsync 最好用）rsync、btsync、syncthing，据说比 scp 快很多，大多有增量同步不用担心文件大而在传送中失败  
（线路一般的 vps 效果跟 rsync 和 scp 差不多）`sftp` 或 `ftp`：vps 线路要好，带宽足  
（土豪好用）有网盘 vip，用网盘中转  
（弃用）Caddy 插件 filemanager：断点续传什么的扯鸡巴蛋，上传几兆就停了还不能续传。。  
（弃用）NFS 挂载 vps：mac 端挂载不友好，报错 `mount_nfs: can't mount .. Operation timed out`  

### 本地或外地 上传到第三方云盘
第三方云盘或限速或被墙，上传速度无法把控。百度云上传，速度 100-200k/s，算比较稳定

### 链接下载到 vps
Aria2 粘贴外地下载地址进行离线下载，速度 10M/s，AriaNg 界面进行可视化离线下载

### 链接下载到 vps 再传到第三方云盘
Gdrive：Linux下同步Google Drive文件、自动备份网站到Google Drive：<https://lighti.me/1532.html>  
先用 Aria2 离线下载到 vps，再用 Rclone 或 Gdriver 同步到第三方云盘，同步速度几乎瞬间完成



## 1.1 aria2 + rclone 配置环境
### 1.1.1 准备环境
更新系统并安装必须组件，此处安装 nginx web 服务器。  
```
apt-get -y update
apt-get -y install wget git unzip gcc nginx
```

### 1.1.2 配置防火墙
配置防火墙  
```
ufw enable
ufw app list
ufw allow 'Nginx Full'
ufw status
```
或是直接关闭防火墙  
```
systemctl stop firewalld # 关闭防火墙
```

### 1.1.3 设置开机自启并检查 Web 连接
```
systemctl restart nginx
systemctl status nginx
systemctl enable nginx
systemctl list-unit-files |grep nginx
```
这个时候可以访问服务器的外网 IP 查看 nginx 启动成功。  

## 1.2 安装 Aria 组件
### 1.2.1 安装 Aria2
安装逗比大佬的脚本，输入1安装 Aria2（过程中要按回车安装最新版本）   
```
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/aria2.sh && chmod +x aria2.sh && bash aria2.sh
```
创建 Aria2 下载文件夹
```
mkdir /root/Download
```
执行 `vi /root/.aria2/aria2.conf` 修改文件，然后 `/etc/init.d/aria2 restart` 重启生效。几个比较重要的配置（PRC 秘钥记录下来，等下在网页上要用）  
```
# aria2 下载文件后所在目录
dir=/root/Download
# aria2 RPC 监听端口
rpc-listen-port=6800
# aria2 RPC 秘钥
rpc-secret=your_password
```
关于 aria2 的常用操作：

- 启动：`/etc/init.d/aria2 start`
- 停止：`/etc/init.d/aria2 stop`
- 重启：`/etc/init.d/aria2 restart`
- 查看状态：`/etc/init.d/aria2 status`
- 配置文件：`/root/.aria2/aria2.conf` （配置文件包含中文注释，但是一些系统可能不支持显示中文）
- 令牌密匙：随机生成（可以自己修改配置文件）
- 下载目录：`/data/Download`

### 1.2.2 安装 AriaNg
下载 AriaNg
```
mkdir -p /data/www/ariang && cd /data/www/ariang && wget https://github.com/mayswind/AriaNg-DailyBuild/archive/master.zip && unzip master.zip && mv AriaNg-DailyBuild-master/* . && rm -rf master.zip AriaNg-DailyBuild-master
```
配置 nginx
```
vi /etc/nginx/conf.d/ariang.conf
```
修改 listen 的端口 82（可修改为其他端口），ip 改为自己服务器的 ip
```
server {
    listen 82;
    server_name <IP_ADDRESS>;

    location / {
        root   /data/www/ariang;
        index  index.html index.htm;
    }
}
```
执行 `nginx -t` 查看配置修改成功
```
root@ss2:~# nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```
重新加载 nginx
```
systemctl reload nginx
```

访问 `http://ip:端口号` 即可看到 AriaNg 网页  
网页上点击左侧『AriaNg 设置』-『RPC』- 填写『Aria2 RPC 密钥』  

## 1.2.3 安装 Rclone
rclone 常用参数：<https://p3terx.com/archives/rclone-advanced-user-manual-common-command-parameters.html>

1）安装 Rclone  
```
apt-get -y install unzip
curl https://rclone.org/install.sh | sudo bash
```
2）配置  
```
rclone config
```
根据提示，分别选择：New remote，输入自定义名称，Storage 选择 12（即 Google Drive），client_id 回车，client_secret 回车，scope 选择 1（即 Full access all files ..），root_folder_id 回车，service_account_file 回车，Edit advanced config? 选择 n，Use auto config? 选择 n，然后会出现一个网址用浏览器打开 → 登陆谷歌账号 → 授权 rclone 以获取授权码，Enter verification code 填写谷歌授权码，Configure this as a team drive? 选择 y，等待配置完成后输入 y（即 Yes this is OK），最后选择 Quit config。

3）测试：用 rclone 复制文件，然后到谷歌硬盘查看  
修改 `/root/Download/xx.mp4` 为要复制的文件路径
修改 `myrclone:/Download` ，其中 `myrclone` 是你 rclone 的配置，`/Download` 是你的谷歌硬盘文件夹
```
rclone copy -v /root/Download/xx.mp4 myrclone:/Download
```

## 1.3 Rclone 用法1：Aria2 离线下载后移动到谷歌硬盘
AriaNg + rclone 实现 Google Drive 离线下载：<https://blog.codesofun.com/ariang-rclone-for-google-drive-offline-download.html>    
使用 Aria2 + rclone 遇到的一些问题：<https://blog.codesofun.com/aria2-rclone-faq.html>  

1）新建一个名为 `rcloneupload.sh` 的脚本
```
vim /root/rcloneupload.sh
```
填写
```
#!/bin/bash

filepath=$3	 #取文件原始路径，如果是单文件则为/Download/a.mp4，如果是文件夹则该值为文件夹内第一个文件比如/Download/a/1.mp4
path=${3%/*}	 #取文件根路径，如把/Download/a/1.mp4变成/Download/a
downloadpath='/root/Download'	#Aria2下载目录
name='myrclone' #配置Rclone时的name
folder='/Download'	 #网盘里的文件夹，如果是根目录直接留空
MinSize='10k'	 #限制最低上传大小，默认10k，BT下载时可防止上传其他无用文件。会删除文件，谨慎设置。
MaxSize='15G'	 #限制最高文件大小，默认15G，OneDrive上传限制。

if [ $2 -eq 0 ]; then exit 0; fi

while true; do
if [ "$path" = "$downloadpath" ] && [ $2 -eq 1 ]	#如果下载的是单个文件
    then
    rclone move -v "$filepath" ${name}:${folder} --min-size $MinSize --max-size $MaxSize
    rm -vf "$filepath".aria2	#删除残留的.aria.2文件
    exit 0
elif [ "$path" != "$downloadpath" ]	#如果下载的是文件夹
    then
    while [[ "`ls -A "$path/"`" != "" ]]; do
    rclone move -v "$path" ${name}:/${folder}/"${path##*/}" --min-size $MinSize --max-size $MaxSize --delete-empty-src-dirs
    rclone delete -v "$path" --max-size $MinSize	#删除多余的文件
    rclone rmdirs -v "$downloadpath" --leave-root	#删除空目录，--delete-empty-src-dirs 参数已实现，加上无所谓。
    done
    rm -vf "$path".aria2	#删除残留的.aria2文件
    exit 0
fi
done
```
需要修改几个地方：  
* `downloadpath`：填写 aria2 的下载目录
* `name`：填写 rclone 配置的名称
* `folder`：填写谷歌云盘的文件夹名称，根目录填 `/` 即可

保存后给予执行权限  
```
chmod +x /root/rcloneupload.sh
```
2）打开 Aria2 配置文件  
```
vim /root/.aria2/aria2.conf
```
加入一行代码（路径为脚本路径）  
```
on-download-complete=/root/rcloneupload.sh
```
重启 Aria2 生效  
```
/etc/init.d/aria2 restart
```

## 1.4 Rclone 用法2：挂载谷歌硬盘
AriaNg + rclone 实现 Google Drive 离线下载：<https://blog.codesofun.com/ariang-rclone-for-google-drive-offline-download.html>  
在Debian/Ubuntu上使用rclone挂载Google Drive网盘：<https://www.moerats.com/archives/481>  

1）挂载谷歌硬盘（第二行命令修改三个参数， `myrclone` 改为 rclone 的配置名，`/Download` 改为谷歌硬盘的文件夹，`/root/googledriver` 改为 vps 上挂载的文件夹）
```
mkdir -p /root/googledriver  # 新建文件夹
rclone mount myrclone:/Download /root/googledriver --copy-links --no-gzip-encoding --no-check-certificate --allow-other --allow-non-empty --umask 000
```

> 如需取消挂载，用 `fusermount -u /root/googledriver`

一段时间后，查看是否已挂载
```
df -h
```
2）开机自动挂载谷歌硬盘  
```
wget https://blog.codesofun.com/scripts/rcloned && vim rcloned
```
修改三个引号里的参数  
```
NAME="myrclone" #rclone配置名
REMOTE='/Download' #谷歌硬盘文件夹
LOCAL='/root/googledriver' #vps上的挂载文件夹
```
3）开机自启动  
```
mv rcloned /etc/init.d/rcloned
chmod +x /etc/init.d/rcloned
update-rc.d -f rcloned defaults
bash /etc/init.d/rcloned start
```
4）测试效果：vps 上新建文件，看谷歌硬盘上刷新看看  
```
cd /root/googledriver
touch codesofun.txt
```

## 1.5 常见问题
1）rclone 挂载或复制时，出现 `NOTICE: Time may be set wrong - time from "www.googleapis.com" is -4h40m33.230674052s different from this computer`  
解决办法：属于正常，等待即可，如果挂载的硬盘很大需要等很久。