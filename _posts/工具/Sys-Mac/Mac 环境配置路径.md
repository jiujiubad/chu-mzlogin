# Mac 环境配置路径

20180817【mac】【重装系统】【环境配置】

[TOC]

查找文件

```
find / -name redis.conf
```



## Mac 重装系统

显示路径：`opthin+command+p`

系统偏好设置 全局快捷键：

### 安装任何来源的 app

1）不设置的坏处：安装第三方应用**提示app已损坏**

2）设置方法

①、打开**偏好设置**，选择**键盘**，点击**快捷键**，点击下方**所有控制**

②、执行以下命令，会在**安全与隐私**-允许从以下位置下载应用，出现**任何来源**选项。先解锁，然后勾选它。然后用tab键控制光标移到允许按键上，**用空格确认（！！非常重要）**，这样应该就可以了。

```
sudo spctl --master-disable
```

![image-20180529173348193](https://ws2.sinaimg.cn/large/006tNc79gy1frscdrfjy4j30if0fvwgd.jpg)

### Mac App 安装

搜狗输入法

- 登录微信账号『同步词库』，导入『自定义短语』
- Alfred，设置-添加要被搜索到的文件夹，重新索引：聚焦-隐私-添加文件夹-删除文件夹，

### Mac 设置

全局的『系统偏好设置』：键盘-快捷键-应用快捷键-加号-名称『系统偏好设置...』、快捷键 `command+option+,`

预览文字高亮显示：键盘-快捷键-应用快捷键-加号-选择预览.app-名称『文字高亮显示』、快捷键 `option+c`

睡眠立即触发密码验证：安全与隐私-通用-进入睡眠开始屏幕保护程序-选择『立即』

电池：节能-电池（1小时，选项全部勾选）-电源适配器（1小时，选项全部勾选）



### ruby 环境配置

以下安装 gem 时，如果无法连接，则改用 ruby-china 的源

```
$ gem sources --add https://gems.ruby-china.org/ --remove https://rubygems.org/
```

安装 Xcode，在 App Store 安装

安装 Command Line Tools

```
# 安装
$ xcode-select --install
```

打开 Xcode 让它初始化配置，设置 - Locations - Command Line Tools 选择 Xcode

```
# 查看如果安装成功，会提示 /Applications/Xcode.app/Contents/Developer
$ xcode-select -p
```

安装 Homebrew，官网 https://brew.sh/

```
# 安装
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# 检查有无问题
$ brew doctor
```

安装 git

```
# 安装
$ brew install git
	
# 查看
$ git --version
```

安装 PostgreSQL

```

```

安装 RVM，官网 https://rvm.io/

```
# 安装 gpg 工具
$ brew reinstall gnupg

# 导入公钥
$ curl -sSL https://rvm.io/mpapis.asc | gpg --import -

$ gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB

# 安装 rvm
$ \curl -sSL https://get.rvm.io | bash -s stable

# 开启 rvm
$ source /Users/aaron/.rvm/scripts/rvm

# 查看版本
$ rvm -v
```

安装 Ruby

```
# 安装
$ rvm install 2.5.1

# 列出已安装 ruby 版本
$ rvm list

# 设置默认版本
$ rvm use 2.3.1 --default
```

安装 Rails

```
$ brew install bundler
$ gem install rails -v 5.2.2 --no-ri --no-rdoc
```



## 终端 

去掉小括号：终端-显示-隐藏标记

### oh-my-zsh

自己帖子

* 终端 + oh-my-zsh
* 终端工具 autojump | autosuggestions | syntax-highlighting
* 终端工具 tmux
* 终端工具 percol
* 终端工具 mosh

### Vim

自己帖子

* 终端工具 Vim 高亮



## 安装 Docker CE Edge 版本（带 Kubernetes）



## 运行项目

安装 gem

```
# 安装项目里的 gem
bundle
```

安装 mysql@5.7/5.7.23 失败

正确的安装方法：<https://gist.github.com/6temes/3c52f8a472f61d9676e7218a98812286> ，最关键的修改 zshrc 后要执行 `source ~/.zshrc`

```
# 检测 brew 有无问题，删除垃圾文件
brew doctor
brew cleanup 

# 安装 mysql
brew install mysql 
# 第一次登录
mysql -uroot
# 查看用户
 SELECT DISTINCT User FROM mysql.user;


# 安装 mysql 5.7
brew install mysql@5.7
# 连接 mysql
brew link mysql@5.7 --force
# 启动和开机自启动 mysql 5.7
brew services start mysql@5.7
# ~/.zshrc 新增一行
export PATH="/usr/local/opt/mysql@5.7/bin:$PATH"
# source ~/.zshrc
# 检查 mysql 是否运行
brew services list
ps -ef | grep mysql


# 防止无意升级超过5.7.22
brew pin mysql
# link 5.7.22 as default mysql command
brew switch mysql 5.7.22 

```

安装 mysql 客户端

```
# 安装过程，记住初始密码
2018-08-17T06:19:16.569306Z 1 [Note] A temporary password is generated for root@localhost: kewYnjuho6=v
If you lose this password, please consult the section How to Reset the Root Password in the MySQL reference manual.

# ~/.zshrc 配置路径
export PATH=$PATH:/usr/local/mysql/bin

# 更改 root 密码
mysqladmin -u root -p password your_new_password

# 新建用户：授权所有操作权限、可操作所有数据库和表、任意 hostname
GRANT ALL ON *.* to jiujiubad@'%' IDENTIFIED BY 'password'; 
flush privileges;

# 查看用户
SELECT DISTINCT User FROM mysql.user;

# 更新密码
alter user 'jiujiubad'@'%' identified by 'new_password';
flush privileges;
```

mysql 客户端卸载方法及安装 MySQL Community Server 方法：https://www.jianshu.com/p/71f81a0c62b2
```
sudo rm /usr/local/mysql
sudo rm -rf /usr/local/mysql*
sudo rm -rf /Library/StartupItems/MySQLCOM
sudo rm -rf /Library/PreferencePanes/My*
vim /etc/hostconfig  (and removed the line MYSQLCOM=-YES-)
rm -rf ~/Library/PreferencePanes/My*
sudo rm -rf /Library/Receipts/mysql*
sudo rm -rf /Library/Receipts/MySQL*
sudo rm -rf /var/db/receipts/com.mysql.*
```

mysql brew 端卸载方法：
```
brew remove mysql
sudo rm /usr/local/mysql
sudo rm -rf /usr/local/mysql*
sudo rm -rf /Library/StartupItems/MySQLCOM
sudo rm -rf /Library/PreferencePanes/My*
vim /etc/hostconfig  (and removed the line MYSQLCOM=-YES-)
rm -rf ~/Library/PreferencePanes/My*
sudo rm -rf /Library/Receipts/mysql*
sudo rm -rf /Library/Receipts/MySQL*
sudo rm -rf /var/db/receipts/com.mysql.*
brew cleanup
```

mysql docker 方案使用

```
##安装 mysql
brew install mysql
mysql --version

## docker-mysql-5.7，自己修改密码
docker run -it -d --name mysql5.7 --restart=always -e "MYSQL_ROOT_PASSWORD=password" -p 336:3306 -v /tmp/mysql5.7:/var/lib/mysql mysql:5.7.22
mysql -u root -p -h 0.0.0.0 -P 336

## docker-mysql-8.0，自己修改密码
docker run -it -d --name mysql8.0 --restart=always -e "MYSQL_ROOT_PASSWORD=password" -p 337:3306 -v /tmp/mysql8.0:/var/lib/mysql mysql:8.0.12
mysql -u root -p -h 0.0.0.0 -P 337
```

安装 postgresql

```

```

安装 redis

```
# 安装
brew install redis

# 开机自启动
ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents

# 启动 redis
brew services start redis  

# 进入 redis
redis-cli

# 修改密码（定位于 requirepass xxx）
vim /usr/local/etc/redis.conf

# 重启 redis
brew services restart redis  

# 再次进入 redis（如果没有密码则执行命令会提示 NOAUTH Authentication required）
redis-cli
auth 密码
```

安装 java

```
# 当时版本 10.0.2
brew cask install java 
```



## 新公钥 gitlab、服务器

```
# 输入路径，密码之类的，如果不输入，工程就会保存到根目录下面，密码也为空。
ssh-keygen -t rsa -C "jiujiubad@gmail.com"

# 打印公钥
cat ~/.ssh/id_rsa.pub

# 编辑 host
sudo vim /etc/hosts 
```

/etc/hosts 

```
127.0.0.1 localhost
255.255.255.255 broadcasthost
::1             localhost

# 『Kubernetes 集群服务器』

## 测试系统
47.52.138.66  staging-master
47.75.204.142 staging-node

## 正式系统
47.91.154.39  master
35.194.251.43 jump
47.75.186.76  node-web-services

## 公司用的服务(仓库 gitlab、邮件 postfix、文档 confluence、权限 openldap)
47.75.66.135  node-services

## 站群服务群
23.107.88.2     ip-6
104.203.181.98  ip-127
23.244.77.202   ip-128
23.245.202.226  ip-129
198.56.192.186  ip-130
198.2.199.65    ip-181
103.193.246.122 ip-185
192.74.244.1    ip-198
142.4.121.25    ip-199

## postfix
192.168.50.206 mailserver.com mail.mailserver.com
192.168.10.26  mailserver.com mail.mailserver.com
```

 ~/.zshrc

```
# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH="/Users/aaron/.oh-my-zsh"

# Set name of the theme to load. Optionally, if you set this to "random"
# it'll load a random theme each time that oh-my-zsh is loaded.
# See https://github.com/robbyrussell/oh-my-zsh/wiki/Themes

# vim 不要复制行号（进入 vim 后，在 Esc 模式下，键入 :se nonu ）

# oh-my-zsh 主题
# ZSH_THEME="robbyrussell"
ZSH_THEME="agnoster"

# cats 打印时高亮
alias cats='pygmentize -O style=monokai -f console256 -g'

# 显示多少行代码
HISTSIZE=100000
SAVEHIST=100000

# 编码（mosh 编码问题解决）
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

# Kubernetes 自动补全
source <(kubectl completion zsh)

# 终端打开 vscode （用 code .）
alias code='/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code'

# Mysql 路径配置
export PATH=$PATH:/usr/local/mysql/bin
# Homebrew's sbin（被 brew doctor 要求配置）
# echo 'export PATH="/usr/local/sbin:$PATH"' >> ~/.zshrc

# 终端配置科学上网 proxy list
## 让Shadowsocks代理（其中1086是Shadowsocks-偏好设置-高级-本地Socks5监听端口）
alias proxy='export all_proxy=socks5://127.0.0.1:1086'
## 不要让Shadowsocks代理
alias unproxy='unset all_proxy'

# Set list of themes to load
# Setting this variable when ZSH_THEME=random
# cause zsh load theme from this variable instead of
# looking in ~/.oh-my-zsh/themes/
# An empty array have no effect
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion. Case
# sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
# DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to change how often to auto-update (in days).
# export UPDATE_ZSH_DAYS=13

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# You can set one of the optional three formats:
# "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# or set a custom format using the strftime function format specifications,
# see 'man strftime' for details.
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.

plugins=(
  git zsh-syntax-highlighting zsh-autosuggestions Z autojump brew node npm rails ruby kubectl vscode docker
)

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# ssh
# export SSH_KEY_PATH="~/.ssh/rsa_id"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.

# git 别名
alias gl='git log --pretty=oneline'
# 显示器 别名
alias dd1='ddcctl -d 1 -b'
alias dd2='ddcctl -d 2 -b'

# 隐藏终端 host_name 即 user@computer name
prompt_context() {
  if [[ "$USER" != "$DEFAULT_USER" || -n "$SSH_CLIENT" ]]; then
  fi
}

```





## Vscode

配置

插件

代码片段



## 参考资源