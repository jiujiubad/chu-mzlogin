* 201804
* 编程+ubuntu

创建用户三部曲：

1）加入组
```
sudo addgroup deploy
```

2）创建用户
```
sudo adduser deploy --ingroup deploy #=> 输入密码
```

3）给用户sudo权限
```
sudo usermod -a -G sudo deploy
```