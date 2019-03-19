* 201804
* 编程+ubuntu

1）ubuntu上边任何修改，都要
```
cp 文件名 文件名.bak
```

2）google搜索不要用中文，最好用官方的教程，其他中文教程贴来贴去容易踩坑。

* 比如用“ubuntu16.04 install java”、“ubuntu16.04 install confluence”

3）tar.gz、rpm、deb等等包，都要用相应的包工具去解压和安装。而在ubuntu下，最好就用apt，找教程也是找那些使用apt的教程。

4）如果执行一个命令，返回Unrecognized option: xxxx，表示有这个命令。如果没有，返回的是command not found。

5）Wells建议：在服务器的操作不要用root权限账户，因为会造成很多不可逆的操作。最好是新建用户，并给予sudo权限