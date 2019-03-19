





本地、外地、第三方云盘、vps

* 本地到第三方云盘
* 本地到 vps
* 外地到第三方云盘
* 外地到 vps
* 外地到本地



## 上传大文件到VPS用什么方法 rsync 和 ftp 应该是最好的

1）rsync、btsync、syncthing，据说比 scp 快很多，大多有增量同步不用担心文件大而在传送中失败

2）Caddy 插件 filemanager——断点续传什么的扯鸡巴蛋，上传几兆就停了还不能续传。。

3）NFS 挂载vps，想要什么拷贝什么——mac 端挂载不友好，报错 `mount_nfs: can't mount /home/share from 67.218.148.196 onto /Users/aaron/nfsdata: Operation timed out `

4）有网盘vip，用网盘中转。 或者你的vps连接性好，带宽足，用 `sftp` 或者 `ftp`。

> ruby china：rsync btsync 都好复杂，不太喜欢这么折腾。自己随手搭建一个ftp service吧，我经常上传1G的文件，很少遇到网络不稳定数据中断的情况，所以我很少用网络不稳定来吓唬自己，真的遇到了，重新上传也没有啥关系。
>
> Rei：rsync 就一条命令。要支持断点续传使用`-P`参数。`rsync -auvzP /path/to/image root@xxx.xxx.xxx.xxx:/path/to/image`
>
> rsync 参数详解：http://blog.51cto.com/colderboy/132054



## 跳板机的原理？



## 本地/外地到第三方云盘

第三方云盘或限速或被墙，上传速度无法把控

百度云上传，速度 100-200k/s



## 本地到 vps

1）私有云盘上传：seafile、kodexplorer 电信上传 150k/s，联通上传 3M/s；kodexplorer 是最优选择，因为 seafile 用块存储文件有时不方便；

❌2）同步 app 上传：synthing 能不能连接到服务器很随缘（因为用全球发现服务器，有时等超久才开始同步），电信上传 100k/s，联通上传

3）scp，速度 1M/s 几秒内迅速降到 50k/s

4）rsync（**支持断点续传**），速度 10M/s 几秒内迅速降到 200k/s



## 外地到 vps

Aria2 粘贴外地下载地址进行离线下载，速度 10M/s，AriaNg 界面进行可视化离线下载



## 外地到 vps 到第三方云盘

先用 Aria2 离线下载到 vps，再用 Rclone 或 Gdriver 同步到第三方云盘，同步速度几乎瞬间完成

> [Gdrive：Linux下同步Google Drive文件、自动备份网站到Google Drive](https://lighti.me/1532.html)



## 外地到 vps 到本地/离线播放

先用 Aria2 离线下载到 vps，再用 kodexplorer 或 scp 下载到本地，或直接在 kodexplorer 网页上离线播放