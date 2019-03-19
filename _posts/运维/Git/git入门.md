## git 配置语法

语法

```
/ 目录
？通配单个字符
* 通配多个字符
! 跟踪某个文件或目录
```

示例

```
/tmp/* 忽略文件夹下的所有文件和文件夹
/tmp   忽略tmp文件夹
!/tmp/.keep 不忽略tmp文件夹下的.keep文件
```



## git 配置步骤

### 1）git login

```
# 输入账号密码
git config --global --add user.name "xxx"
git config --global --add user.email "xxx@yy.com"

# 查看 git 的配置文件
git config --global list
```



### 2）.gitignore

```

```



### 3）初始化仓库

```
git init
git add -A 或 git add .
git commit -am "xxx" 或 git commit -m "xxx"
```



### git push

```
# 推送所有分支的代码
git push origin --all 
git push local --all 
```



## git 常用命令

### 修改文件名

```
git mv
```

