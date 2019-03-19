# 第 2 章 弃用 RVM
## 2.1 遗留问题
RVM 的 PATH 与 ~/.zshrc 的 PATH 设置冲突，所以每次终端开启一个新窗口，都要重新指定 ruby 版本。
这个问题暂时没有解决办法。把 zsh 换成 bash 可能可以解决，详见：https://ruby-china.org/topics/25702。换用 rbenv 可以快速解决。
```
rvm use 2.6.0@default --default
```
## 2.2 RVM 卸载
备份配置文件
```
mkdir ~/bakfile
cp ~/.bashrc ~/.bash_profile ~/.profile ~/.zshrc ~/bakfile
ls -a bakfile 
```
卸载
```
# 卸载 RVM
rvm implode
# 删除 RVM 文件夹
rm -rf /etc/rvmrc ~/.rvmrc ~/.rvm
# 删除 .bashrc .bash_profile .profile .zshrc 中与 RVM 相关的配置
vi ~/.bashrc
vi ~/.bash_profile
vi ~/.profile
vi ~/.zshrc
source ~/.bashrc ~/.bash_profile ~/.profile ~/.zshrc
```

# 第 1 章 Ruby升级 Rails升级

* 关系：一个 RVM 有多个 ruby，一个 ruby 有多个 gemset，一个 gemset 有一个 gems 文件夹（常用 gem 包约 300M）
* 如果自定义了 gemset，每次切换 ruby 都要用 `rvm use 2.6.0@gemset_name --default`，否则会指定到 default 的 gemset。
* gemset 用复制，而不是迁移，因为迁移过程出错会把两个环境都弄坏。再加上重装电脑，重新配置环境，这一天什么都不用做了！

## 1.1 Ruby 升级或安装
【精】Ruby 的安装与切换：https://ruby-china.org/wiki/rvm-guide
rvm用法总结：http://homeway.github.io/tutorial/rvm.html
使用gemset在不同版本ruby间切换Rails：https://llp0574.github.io/2017/06/09/rvm-control-version-ruby-and-rails-rails-notes-version/

### 1.1.1 RVM 升级或安装
RVM 官网多种升级方法（实测有的会报错）：https://rvm.io/rvm/upgrading
```
# 获知RVM最新版本号：https://github.com/rvm/rvm/releases
# 安装 RVM
\curl -sSL https://get.rvm.io | bash -s stable
# 如果报错，按报错内容，安装依赖的Key
command curl -sSL https://rvm.io/mpapis.asc | gpg --import -
command curl -sSL https://rvm.io/pkuczynski.asc | gpg --import -
# 重启
rvm reload
# 重看版本
rvm -v
```
### 1.1.2 Ruby 升级
```
# 查看可用的ruby版本
rvm list known
# 更改rvm源为ruby-china
echo "ruby_url=https://cache.ruby-china.org/pub/ruby" > ~/.rvm/user/db
# 安装ruby
rvm install ruby-2.6.0
```
### 1.1.3 指定 ruby 默认版本，gemset 设置（可跳过，当项目需要一个 ruby 版本有多个 rails 才使用）
geset 创建与使用：https://rvm.io/gemsets/clear
```
# 指定ruby版本，创建 gemset
rvm 2.6.0
rvm gemset create rails-5.2.2        
# 切换默认的ruby和gemset（注意：每次切换ruby，gemset都会指向default，所以每次切换切换ruby都要用以下命令）
rvm use 2.6.0@rails-5.2.2 --default
# 检查默认 ruby 和 gemset
rvm list（ruby默认版本）
rvm list gemsets（所有ruby和gemset版本）
rvm gemset name（当前gemset名称）
rvm gemdir（当前gemset位置）
# gemset重命名 （旧名→新名）
rvm gemset rename rails522 rails-5.2.2
```
### 1.1.4 Ruby 升级后 gem 包的复制
第一选择（已实战）：安装过程出错了，不会破坏旧环境
```
rvm gemset copy 2.5.1@default 2.5.3@default，执行成功
rvm gemset copy 2.5.1@default 2.6.0@default，执行失败，好像是 ruby2.6.0 的问题
```

第二选择（已实战）：安装 ruby 后，`cp -R ~/.rvm/gems/ruby-2.5.1/* ~/.rvm/gems/ruby-2.6.0/`，测试 `rails -v`

第三选择（未实战）：安装 ruby 后，手动安装 rails，所需的 gem 在开启 rails 项目后 bundle 安装

第四不要选择（已实战）：安装过程出错了，会破坏新旧环境！
```
# 升级 ruby，并移动所有 gemsets、包装器、别名、环境文件（可能相当于：cp -R ~/.rvm/gems/ruby-2.5.1/* ~/.rvm/gems/ruby-2.6.0/）
rvm upgrade x.x.x y.y.y
# 移动 gemset
rvm migrate x.x.x y.y.y
```

> 以上方法，可能会遇到的问题：
* FixError：`rails -v` 返回 Ignoring xxx because its extensions are not built. Try: gem pristine xxx
解决：`gem pristine --all` 重装，剩下一些不能重装的，可以手动删除 `gem uninstall xxx`，再执行 `rails -v` 排查错误 
* nokogiri configure: error: C compiler cannot create executables
解决：打开 Xcode 让它初始化配置，设置 - Locations - Command Line Tools 选择 Xcode。执行 `xcode-select -p` 返回 `/Applications/Xcode.app/Contents/Developer`

## 1.2 其他相关命令
### 1.2.1 gemset 的操作
```
# gemset 导出所用的 gem 清单（只是一个清单，导入实测失败）：https://rvm.io/gemsets/exporting，https://rvm.io/gemsets/importing
rvm gemset export ~/rails-5.2.2.gems
# 删除gemset
rvm gemset delete ruby-2.5.1
# 清空gemset的gem包
rvm gemset empty ruby-2.5.1
```

### 1.2.2 gem 的操作
【精】修改 gem 源：https://gems.ruby-china.com/
```
# 查看本地所有gem
gem list
gem list | grep rails
# 查看可删除的gem
gem cleanup -d 
# 删除所有gem的旧版本
gem cleanup
# 删除指定gem的旧版本
gem cleanup gemname
# 删除指定gem的指定版本
gem uninstall gemname --version 1.1.1
```

### 1.2.3 在 rails 项目中：指定 ruby 和 gemset
RVM 项目工作流程：https://rvm.io/workflow/projects

方法一：Gemfile 添加
```
#ruby=ruby-2.6.0
#ruby-gemset=rails-5.2.2
```
方法二：使用脚本文件 `.rvmrc`
```
vi ~/.rvmrc
```
填写
```
rvm use 2.6.0@rails-5.2.2
```

### 1.2.4 Ruby 删除 
RVM 官网：https://rvm.io/rubies/removing
```
＃ 删除ruby、源文件、可选的gemsets/archives
rvm remove 2.1.1
＃ 删除ruby、源文件
rvm uninstall 2.1.1
```