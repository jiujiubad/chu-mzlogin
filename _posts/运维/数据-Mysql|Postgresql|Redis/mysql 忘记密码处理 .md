# 九、mysql

1）

```
# 改密码
SET PASSWORD = PASSWORD('your_new_password');

# 在mysql>这里输入：
mysql> GRANT ALL ON *.* to username@'%' IDENTIFIED BY 'password';
mysql> flush privileges;
```

2）myysql 忘记密码处理 

<https://www.jb51.net/article/105668.htm> 

