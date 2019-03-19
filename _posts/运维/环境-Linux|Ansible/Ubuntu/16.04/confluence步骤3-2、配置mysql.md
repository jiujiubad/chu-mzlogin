* 201803
* 编程+ubuntu

1）备份配置文件

```
sudo cp /etc/mysql/my.cnf /etc/mysql/my.cnf.bak
```

2）编辑mysql的编码方式为utf8。

```
sudo vim /etc/mysql/my.cnf
```

在最后面写入

```
[mysql]
default-character-set=utf8


[mysqld]
init_connect='SET collation_connection = utf8_unicode_ci'
init_connect='SET NAMES utf8'
character-set-server=utf8
collation-server=utf8_unicode_ci
skip-character-set-client-handshake
transaction-isolation=READ-COMMITTED
```

3）重启mysql，让编码生效。

```
sudo /etc/init.d/mysql restart
```

4）进入mysql

```
mysql -uroot -p
```

查看utf8编码是否生效

```
show variables like "%character%";show variables like "%collation%";
```

<img src="https://ws1.sinaimg.cn/large/006tNc79gy1fpq3edqr6vj30gv0ad0t5.jpg" width="400">

5）在 mysql 中创建数据表 confluence ，并设置账号和密码为 confluence ，并刷新权限。

```
create database confluence default character set utf8 collate utf8_bin;
grant all on confluence.* to 'confluence'@'%' identified by 'confluence';
flush privileges;
```

