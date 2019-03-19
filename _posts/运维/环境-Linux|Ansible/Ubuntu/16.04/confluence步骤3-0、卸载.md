* 201803
* 编程+ubuntu

## 1、卸载confluence

1）找到路径，运行卸载命令

```
~/atlassian/confluence/uninstall
```

2）手动删除安装文件夹

```
rm -rf ~/atlassian
```

3）查找atlassian/confluence相关的文件，如果有残留的一并删除。

```
sudo find / -name atlassian/confluence
```



## 2、卸载java

1）找到文件

```
whereis jdk
```

2）如果安装的命令是：

```
sudo apt-get install default-jdk
```

反向删除（连同配置一起删干净）就是：

```
sudo apt-get remove --purge default-jdk  
```



## 3、卸载数据库

1）进入mysql

```
mysql -uroot -p
```

2）删除数据库confluence

```
DROP DATABASE confluence;
```

