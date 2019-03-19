---
title: 【命令笔记】【长期更新】rails常用命令
date: '2017-04-08 09:11'
categories:
  - ror系统
tags:
  - ror系统
  - 常用
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: 6577848a
top: 3
---

* 201704
* 编程+rails
* 编程+ruby



### git 删除文件所有历史版本

```
git filter-branch -f --tree-filter 'rm -rf app/model/..' HEAD
git push -f origin master

#=> Rewrite d6bcca0eee002418bdc73a7672b7b478ed8f8761 ..
```



## 查看db相关的帮助命令

但是好像查的并不全，比如`rake db:migrate:down VERSION=20100905201547，撤销某一个迁移`

```
rails -h | grep db
```

## git 查看文件改动

```
git diff >> file.diff
```

## git add 删除已添加的文件

```
# 删除所有已添加
git reset

# 删除文件/文件夹
git rm -rf --cached file_name
```

## git commit重命名

git commit --amend  进入vim编辑器修改最后一次commit
参考资料https://github.com/uolcano/blog/issues/12

#推github失败
git push --all origin --force（如果确定本地是正确的，可以强推）
![](http://ww1.sinaimg.cn/large/006tNc79gy1ff2g4284f3j30j704dt9x.jpg)

git push origin --delete <branchname>（删除指定远程分支）



# 分支的重命名

```
git branch -m oldName newName
```



# 1-1 分支的删除/恢复

git branch -D 分支名（删除指定分支）

分支的恢复：
git reflog（查看分支ID）
git branch 分支名 分支ID

# 2-1 commit的删除/恢复
* commit的删除：
```
git log（查看现存commit的历史，按`q键`退出）
git reset --hard HEAD~1（数字代表删除多少个分支）
```

* commit的恢复：
```
git reflog（查看commit历史，包括现存和已删除的，按`q键`退出）
复制分支名字
git reset --hard 想恢复的commitID（恢复指定commit）
```

![](http://ww4.sinaimg.cn/large/006tNc79gy1fez5ptqnebj30d5052ab4.jpg)

![](http://ww1.sinaimg.cn/large/006tNc79gy1fez50kbqujj30mz0d8780.jpg)

* （不常用）其他操作：把commit恢复到新建分支上
```
git reflog（查看commit历史，包括现存和已删除的，按`q键`退出）
复制分支名字
git branch recover_新分支名 commit_id (比如git branch recover_9999 179577c)
```

![](http://ww2.sinaimg.cn/large/006tNc79gy1fez6jfvqvij30it0atwji.jpg)

![](http://ww2.sinaimg.cn/large/006tNc79gy1fez6nq6cjyj30k10bdgnt.jpg)

# 2-2 合并分支(commit的复制)
git merge 想合并的分支名称（相当于复制了克隆分支上，不一致的commit点——即commit的复制）

>Nic老师使用场景：
>在开发时习惯有一只产品分支比如prodt，一只测试分支比如test（test要从prodt分支git checkout -b新建的，或是说是prodt的克隆品）。
>平时在test分支随便玩，测试好功能就在test上commit保存，烂掉的分支可用git stash等。
>test上commit后切换到prodt分支，最后`git merge test` 合并。

# 2-3（不常用）当前分支上做烂了——情景1.有touch新建文件时 (commit的剪切)
当前分支不要git add .不要git commit，直接新建分支，在新分支上commit保存，最后切回原来的分支（临时保存的分支如果不要了可以删除git branch -D 临时分支名）——【可以用来做commit的剪切，从test分支剪切到prodt产品分支】
```
git checkout -b 临时分之名
git add .
git commit -m "linshifenzhi"
git checkout 刚刚在做的分支名
```

# 2-4（常用）当前分支上做烂了——情景2.没有touch新建文件时
```
git status （查看已更改文件）
git stash 或者 
git stash save 本次暂存的名字（一次临时的commit，即暂存）
```

>Nic老师使用场景：正在做分支1还没有保存，老板叫你马上做分支2，这时在分支1上git stash。然后切换到分支2上工作，完工commit保存后，想继续做分支1。切换回分支1，然后git stash pop，就回到刚刚被老板打断的位置。

```
git checkout -f #强制撤销这次改动，好像不能回退
```



### git stash的 删除/恢复（一般不做删除操作）
* git stash恢复：
```
git stash list（显示暂存清单，按`q键`退出）
git stash pop（恢复到最后一次的操作） 
git stash pop 某次暂存的ID如stash@{0}（恢复到特定某次的操作）
```

* git stash删除：
```
git stash drop（删除最新操作）
git stash drop 某次暂存的ID如stash@{0} （删除特定某次的操作）
git stash clear（删除所有暂存）
```

![](http://ww4.sinaimg.cn/large/006tNc79gy1fez5lg9ywgj30o707ownw.jpg)

# clone的时候只有master分支：
git branch -a 或者
git fetch origin

# 数据文件——新建/删除
rails g controller xxx
rails g model xxx
rails d controller xxx
rails d model xxx

# 数据重置——rake三兄弟
rake db:drop
rake db:create
rake db:migrate

# 推heroku报错1（原heroku已删除）
git push heroku step8:master
remote: !	No such app as blooming-earth-94985.
fatal: repository 'https://git.heroku.com/blooming-earth-94985.git/' not found
git logs
Couldn't find that app.  

```解决办法：
git remote rm heroku（如果是github的用git remote rm/add origin）
heroku apps 查看名称
git remote add heroku https://git.heroku.com/名称.git（或git@heroku.com:名称.git）
git push heroku 分支名:master
```
> Nic老师说，这个办法是特效药，如果有时间的话，还是先尝试修复的方法。比如你去公司上班，然后数据库有问题，是不可能把几万笔数据rm的。

# 推heroku报错2
```
git push heroku 分支名:master
heroku pg:reset DATABASE（清空heroku数据库，比如旧的seed档）
heroku run rake db:migrate
heroku run rake db:seed
```

https://forum.qzy.camp/t/heroku-push-migrate/1529
对于precompile，当由于可能有文件没生效，导致出现push到Heroku上出现远端画面和本地服务器画面不一致的情形时，执行rake assets:precompile可以吧app/assets的静态文档压缩到public/assets，使得浏览器能够访问到。
```
rake assets:precompile
git add .
git commit -m "vendor compiled assets"
重新git push heroku 分支名:master
```

# heroku重命名

```
heroku apps:rename taset-laboratory
```



# iterm快捷键

```
清除当前行：ctrl + u 
到行首：ctrl + a 
到行尾：ctrl + e 
分屏：ctrl + d
```



# rake的前进后退

`rake db:migrtae`前进保存
`rake db:rollback`后退一步，修改后再`rake db:migrtae`
`rake db:rollback STEP=10`后退10步

```
rake db:migrate:down VERSION=20100905201547，撤销某一个迁移
```

```
rails db:migrate:status查看状态
```

