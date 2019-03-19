* 201804
* 编程+ubuntu


## ubuntu卸载，以java为例

1、找到文件
```
whereis jdk
```

2、如果安装的命令是：
```
sudo apt-get install default-jdk
```

反向删除（连同配置一起删干净）就是：
```
sudo apt-get remove --purge default-jdk  
```
