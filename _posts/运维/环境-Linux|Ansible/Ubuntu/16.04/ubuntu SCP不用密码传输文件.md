* 201804
* 编程+ubuntu

## SCP不用密码传输文件

SCP不用密码传输文件http://blog.csdn.net/u012062455/article/details/78341540


1）、[参考vps scp对拷命令](http://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/scp.html)，备份证书到本地

拷贝vps上的ssl证书文件夹到本地桌面

```
scp -r root@45.32.42.11:/etc/nginx/ssl /Users/apple/Desktop
```

拷贝ssl的https配置文件到本地桌面

```
scp root@45.32.42.11:/etc/nginx/sites-enabled/rails-recipes.conf /Users/apple/Desktop
```

3）、上传证书到vps

①、上传本地`购买的域名`目录到vps目录（注意检查ip）

```
scp -r /Users/apple/Desktop/luccake.top root@120.79.71.78:/root/.acme.sh
```

②、上传本地配置文件到vps目录（注意检查ip）

会覆盖vps上的原文件，必要时可以先进行备份。

```
scp -r /Users/apple/Desktop/rails-recipes.conf root@120.79.71.78:/etc/nginx/sites-enabled
```

③、执行上边第一节第三部的命令（详细设置方法见上）

```
~/.acme.sh/acme.sh  --installcert  -d  luccake.top   \
        --key-file   /etc/nginx/ssl/luccake.top.key \
        --fullchain-file /etc/nginx/ssl/fullchain.cer \
        --reloadcmd  "service nginx force-reload"
```

OK，可以用域名访问网站了！！！

如果有问题，请参考第一节第五步检查。