* 201806
* +ubuntu16.04+ladp+slapd+nginx+phpldapadmin



### 参考帖子：

1）youtube搜索ubutnu 16.04 openldap，得到安装和使用教程https://www.youtube.com/watch?v=zNzRNgSbDPs

2）提到apache和nginx代理php网页的配置，https://www.linuxbabe.com/ubuntu/install-configure-openldap-server-ubuntu-16-04

3）提到具体的配置文件位置，https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-openldap-and-phpldapadmin-on-an-ubuntu-14-04-server

```
LDAP_ADMIN_PASSWORD: b3BlbmxkYXA=  # echo -n "123" | base64
  LDAP_CONFIG_PASSWORD: b3BlbmxkYXAgY29uZmln
  #LDAP_READONLY_USER_PASSWORD: b3BlbmxkYXAgcmVhZG9ubHk=
  POSTGRES_PASSWORD: cG9zdGdyZXNxbDE=
```

4）日本教程：日本教程：https://qiita.com/ir-shin1/items/12d0dbea40d1f1f06747

# 一、开始配置

### 步骤1 查看hostname

```
hostname   #修改成比如server.ldap.com
```

### 步骤2 安装ldap和slapd，并设置admin账号密码

```
sudo apt-get install -y ldap-utils slapd
```

### 步骤3 配置ldap

```
sudo dpkg-reconfigure slapd
```

1）Omit OpenLDAP server configuration?  跳过ldap服务器配置

* No

2）DNS domain name：

* 比如hostname是server.ldap.com，这里填写ldap.com

3）Organization name：

* ldap.com

4）password

* 密码

5）confirm password

* 确认密码

6）Database backend to use：

* MDB

7）want database to be removedq，是否在清除slapd时删除数据库

* No

8）Move old database?

* Yes

9）Allow LDAPv2 protocol?

* No

### ~~步骤4 配置ldap——！！实测这步不用配置，result: 32 No such object也没问题~~

```
sudo vi /etc/ldap/ldap.conf
```

检查是否生效

```
ldapsearch -x
```

* 如果结果result 0 success，有信息输出证明安装成功。
* 如果result: 32 No such object，不能正常运行。

解决result: 32 No such object，添加 

```
BASE   dc=ldap,dc=com          #比如hostname是server.ldap.com时
URI    ldap://192.168.0.8:389  #389是ldap默认端口
```

### 步骤5 安装phpldapadmin页面

```
sudo apt-get install phpldapadmin
```

### 步骤6 配置phpldapadmin页面

```
sudo vim /etc/phpldapadmin/config.php
```

修改文件

```
$servers->setValue('server','host','192.168.0.8');
$servers->setValue('server','base',array());
$servers->setValue('login','bind_id','cn=admin,dc=ldap,dc=com');
// $config->custom->appearance['hide_template_warning'] = true;
```

### 步骤7 用nginx(成功)或apache2(失败)指向php页面

1）打开配置文件

```
sudo vim /etc/nginx/conf.d/phpldapadmin.conf
```

2）修改配置文件，并保存

```
server {
        listen 81;
        server_name localhost;

        root /usr/share/phpldapadmin/htdocs; 
        index index.php index.html index.htm;

        error_log /var/log/nginx/phpldapadmin.error;
        access_log /var/log/nginx/phpldapadmin.access;

        location ~ \.php$ {
            fastcgi_pass unix:/var/run/php/php7.0-fpm.sock; # unix:/run/php/php7.0-fpm.sock;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME  $document_root/$fastcgi_script_name;
            include fastcgi_params;
        }
}
```

> 其中，最重要的是listen 81监听端口、root /usr/share/phpldapadmin/htdocs;指向php页面位置

3）查看配置是否生效

```
sudo nginx -t
```

返回

> nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
>
> nginx: configuration file /etc/nginx/nginx.conf test is successful

4）重启nginx

```
sudo service nginx restart
或
sudo systemctl reload nginx
```

5）测试nginx是否生效

* 访问192.168.0.8:81，如果返回php页面，或页面提示nginx，说明nginx配置成功



# 二、如何debug？相关命令

## 1、如何debug

### 方法一：查看log日志

1）如果nginx配置成功，但不能返回php页面，要查看nginx的log日志（nginx配置文件的error_log），不要盲目debug

```
sudo vim /var/log/nginx/phpldapadmin.error;
```

* 打开log日志，刷新页面查看log最新日志

### 方法二：检查gem是否安装，版本

```
apache2 -v      #Apache/2.4.18 (Ubuntu)
mysql --version #mysql  Ver 14.14 Distrib 5.7.22
php -v          #PHP 7.0.30-0ubuntu0.16.04.1 (cli) ( NTS )
php7.0 -v       #PHP 7.0.30-0ubuntu0.16.04.1
php-fpm7.0 -v   #PHP 7.0.30-0ubuntu0.16.04.1
```

## 2、遇到的bug

1）查看nginx的error_log，发现php、php7.0、php-fpm7.0没有全部安装，因此nginx能生效但是不能指向php页面。

## 3、相关命令

1）查看端口

```
netstat -plane | grep 389
```

2）查看进程

```
ps -ef | grep ldap
```

3）查看状态

```
sudo service apache2 status
sudo service nginx status
sudo service slapd status
```

4）重启服务

```
sudo service apache2 restart
sudo service nginx restart
sudo service slapd restart
```

5）卸载

```
sudo apt-get remove --purge ldap-utils slapd
sudo apt-get remove --purge phpldapadmin
```
