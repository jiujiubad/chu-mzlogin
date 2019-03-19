# 四、linux命令

## 1、服务器常用

### 1】root 下新增 sudo 账号密码

```
adduser yyy 

测试能否访问root文件，返回Permission denied：
cd /root     
```

### 2】sudo 权限

```
touch /etc/sudoers.d/yyy

填写：
yyy  ALL=(ALL:ALL) ALL
```

或是执行

```
gpasswd -a yyy sudo
```

### 3】公钥免密登录

```
mkdir ~/.ssh
touch ~/.ssh/authorized_keys

mac上，复制公钥：
cat ~/.ssh/id_rsa.pub

服务器上，粘贴公钥：
nano ~/.ssh/authorized_keys  

修改文件夹、文件权限：
chmod 700 ~/.ssh
chmod 644 ~/.ssh/authorized_keys
```

### 3】公钥免密登录

1）

```
mkdir ~/.ssh
touch ~/.ssh/authorized_keys
```

2）mac上，复制公钥：

```
cat ~/.ssh/id_rsa.pub
```

3）服务器上，粘贴公钥：

```
nano ~/.ssh/authorized_keys  
```

### 4】改变档案权限

```
chmod 700 ~/.ssh
chmod 644 ~/.ssh/authorized_keys
```

### 5】ip和dns

```
cat /etc/resolv.conf  #查看DNS
```

## 2、本地常用

1）打印

```
tail -f /var/log/nginx  #打印文件夹里的文件
cat ~/.ssh/id_rsa.pub   #打印文件内容，比如打印公钥
```

2）历史命令

```
history  | grep 'docker run'  #在命令历史里，正则匹配'docker run' 
```

3）显示文件

```
 ls      #显示当前目录非隐藏的档案
 ls -la  #显示当前目录的所有档案
```

4）删除文件

```
trash  #进入mac回收站
rm     #完全删除
```



## 端口

如果有结果，说明端口已开放启用

```
lsof -i:80 
```



## 查看 vps

查看内核，比如 x86_64 / amd64、armhf、IBM Power（ppc64le）、IBM Z（s390x）

```
uname -a
```

硬盘剩余空间，硬盘大小

```
df -lh
```

文件夹总大小

```
du -sh
```

文件大小：根据文件大小单位（ k/M/G ）

```
ls -lh
```

文件大小：以 M 为单位

```
ls -l --block-size=M
```



## 用户

root 切换普通用户

```
su user_name
```

普通用户切换 root

```
sudo su
```

新增用户

```
adduser your_user
```

删除用户，`--remove-home` 参数表示同时删除 `/home` 目录里的用户文件夹

```
deluser --remove-home your_user
```

`root:root` 表示 `用户:用户组`

查看用户：

```
# 查看所有用户组
/etc/group
# 查看所有用户
/etc/shadow
# 查看当前用户名
whoami
# 查看当前用户组
groups
# 查看指定用户组
groups 用户名
```



## 搜索

搜索文件名

```
find / -name 文件名 -ls
```

搜索文件大小大于 1G 的文件

```
find / -size +1G -ls
```



## 压缩与解压缩

tar 类型：`z` 参数表示压缩，`cvf` 是打包

```
tar -zcvf test.tar.gz ./test
tar -xvf test.tar.gz 
```

jar 类型

```
jar cvf test.jar *
jar xvf test.jar
```

