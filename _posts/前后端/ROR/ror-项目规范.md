# 《ROR 指南》第 2 章 ror 项目规范
## 2.1 项目初始化
### 2.1.1 新建项目（不安装依赖）
```
rails new xxx --skip-bundle
```
### 2.1.2 修改 RubyGems 源
【精】RubyGems镜像源-Ruby China：https://gems.ruby-china.com/
```
bundle config mirror.https://rubygems.org https://gems.ruby-china.com
bundle
```
### 2.1.3 Git 忽略 Mac 和 IDE 配置文件
Github官方-全局.gitignore：https://gist.github.com/octocat/9257657
1）新增 Mac 全局配置文件
```
vi ~/.gitignore_global
```
2）填写
```
## IDE、文本编辑器 配置文件 ##
.vscode
.idea
## 编译来源 ##
*.com
*.class
*.dll
*.exe
*.o
*.so
### 压缩文件 ##
# *.7z
# *.dmg
# *.gz
# *.iso
# *.jar
# *.rar
# *.tar
# *.zip
## 日志 | 数据库 ##
*.log
*.sql
*.sqlite
## Mac 配置文件 ##
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
```
3）让配置生效
```
git config --global core.excludesfile '~/.gitignore_global'
```
### 2.1.4 提交代码（比如 Github）
```
git add -A
git commit -am "Initial commit"
git remote add origin git@github.com:your_project
git push -u origin master
```

## 2.2 项目步骤
入门项目需掌握：调试工具，大框架（Module 和 Class）与小框架（元编程），数据查询语句

怎样让问题在一开始就暴露出来：
* 第一步，建表包含主要字段，读 Api 存储主要数据
* 第二步，针对主要字段，做 Seed 假数据，查询算法难写的直接给个值就好（只要能展示就行）
* 第三步，用假数据展示

最耗时的事：
* seed 假资料（参考天马项目总结）
* 数据表命名、字段命名、添加标记类字段（参考云豹项目）
* 数据库查询展示（参考天马项目）

### 2.2.1 画出：建表脑图
### 2.2.2 写出：展示的页面和字段
### 2.2.3 建表并关联
### 2.2.4 编写假数据Seed
### 2.2.5 用假数据展示页面
### 2.2.6 改用真数据：数据库查询
### 2.2.7 扩展数据库字段

## 2.3 命名与描述
### 2.3.1 README模板
Ruby README：https://github.com/ruby/ruby/blob/trunk/README.md
Rails README：https://github.com/rails/rails/blob/master/README.md
```
# What's《ROR 指南》?
Ruby 是一门 xxx 的语言，Rails 是 Ruby 的框架，用于快速开发 Web 项目。
## Ruby 的特点
* 动态语言
* 脚本语言
## Getting Started
gem install rails
rails new myapp
## License
Copyright (c) 2011-2017 Ruby China
Ruby on Rails is released under the [MIT License]().
```
### 2.3.2 表命名
### 2.3.3 字段命名
### 2.3.4 Commit与tag命名
阮一峰-Commit和Changelog编写指南：http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html
Git Commit 怎么写：https://www.jianshu.com/p/0117334c75fc
> Finish | Update | Add | Fix | Merge | Import | FixError

### 2.3.5 Changelog命名
阮一峰-Commit和Changelog编写指南：http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html
rails/activerecord/CHANGELOG.md：https://github.com/rails/rails/blob/master/activerecord/CHANGELOG.md
So-simple-theme changelog：https://github.com/mmistakes/so-simple-theme/blob/master/CHANGELOG.md
The format is based on Keep a Changelog：http://keepachangelog.com/en/1.0.0/
Semantic Versioning：http://semver.org/spec/v2.0.0.html
```r
## [Released]
此项目的所有值得注意的更改都将记录在此文件中
## [0.0.1] - 2018-09-01
### Added/新添加的功能
- New visual identity by @tylerfortune8.
- Version navigation.
### Changed/对现有功能的变更
- Start using "changelog" over "change log" since it's the common usage.
- Start versioning based on the current English version at 0.3.0 to help
  translation authors keep things up-to-date.
### Deprecated/很快移除的功能
- Remove empty sections from CHANGELOG
### Removed/已经移除的功能
- Section about "changelog" vs "CHANGELOG".
### Fixed/对bug的修复
- Fix Markdown links to tag comparison URL with footnote-style links.
### Security/对安全的改进
- Refer to a "change log" instead of a "CHANGELOG"
```