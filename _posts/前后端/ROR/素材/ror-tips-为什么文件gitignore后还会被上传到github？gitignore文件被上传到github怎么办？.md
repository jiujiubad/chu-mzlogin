---
title: ror-tips-为什么文件gitignore后还会被上传到github？gitignore文件被上传到github怎么办？
date: '2017-12-17 00:10'
categories:
  - ror知识点
tags:
  - ror知识点
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfwh0s580j305k050a9w.jpg'
abbrlink: 24cbb5e
---

* 201711
* 编程+ruby



## 方法一：暂时最好的解法

1）`git rm --cached config/database.yml`和`git rm --cached config/application.yml`

效果：不会删除文件，会删除git追踪记录。

但是，在github点commit进去看，仍然可以看到刚刚删除的内容即我们的密钥。



## 方法二：测试失败！！

`git rm -r --cached .`，然后保存。

效果：application.yml和database.yml文件都被删除了。但是，再次push到github会发现可以在commit里看到被删除的两个文档，密钥全部可以看到。

小结：一点都不好用，效果跟直接删除两个文件一样。



## 方法三：测试失败！！很危险

### 参考文档

http://gitbook.tw/chapters/faq/remove-sensitive-data.html

http://gitbook.tw/chapters/faq/remove-files-from-git.html

方法1：失败！！git commit功能失效不能再用git保存

1）使用`git filter-branch --tree-filter "rm -f config/database.yml"`即可，如果后悔了可以`git reset refs/original/refs/heads/master --hard`恢复。

> 1. `filter-branch` 這個指令可以讓你根據不同的 filter，一個一個 Commit 的來處理它。
> 2. 這裡使用了 `--tree-filter` 這個 filter，它可以讓你在 Checkout 到每個 Commit 的時候執行你指定的指令，執行完後再自動幫你重新再 Commit。以上面這個例子來說，便是執行「強制刪除 `config/database.yml` 檔案」這個指令。
> 3. 因為刪除了某個檔案，所以在那之後的 Commit 全部都會重新計算，也就是說等於產生一份新的歷史紀錄了。

2）如果要多次使用上边的命令，会提示在命令里加入`Force overwriting the backup with -f`，即`git filter-branch -f --tree-filter "rm -f config/database.yml"`，注意这条命令是不能恢复的！！——不过也不难，先从最新分支checkout一个分支，就可以随便测试

3）最后，用`git push -f origin master`，强推github覆盖原来泄露密钥的代码。



## 方法四：失败！！所有的分支、所有绑定的内容全部清空！！！

### 参考文档同方法三

> 這招是屬於「逃避雖然可恥但是有用」的做法，把因為所有的 Commit 紀錄都在 `.git` 目錄裡，所以可以這樣：
>
> 1. 把 .git 目錄刪掉。
> 2. 把那個密碼檔刪掉或修掉。
> 3. 重新 Commit。
>
> 不要以為我是在開玩笑，這也是一招，而且是比較不需要什麼技術的招式，缺點就是之前的 Commit 紀錄都不見了。所以這個專案如果只有你自己一個人做，而且也不在乎之前的 Commit 紀錄的話，這也是一個選擇。

### ！！！吓死我了，还好在github上有上传最新的分支，否则整个专案全没了，后果不堪设想。