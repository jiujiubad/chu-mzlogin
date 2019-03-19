## [Ubuntu 16.04 install oh-my-zsh](https://www.howtoforge.com/tutorial/how-to-setup-zsh-and-oh-my-zsh-on-linux/)

遇到的坑：全部流程配置完样式效果不生效。

解决办法：

* 可能是本地没有安装 poerline

* 也可能是要先安装 powerline，然后再修改 ~/.zshrc 的主题。

### Step 1 - Install and configure ZSH

```sh
$ echo $SHELL

$ sudo apt update
$ sudo apt install zsh -y

$ which zsh

# sudo su 进入root
$ chsh -s $(which zsh) ubuntu
```

### Step 2 - Install and configure Oh-my-zsh framework
```sh
# 安装 wget git 
$ sudo apt install wget git -y

# 安装oh-my-zsh
$ wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh

$ cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
$ source ~/.zshrc

```

### Step 4 - Enable Oh-my-zsh plugins
```sh
# 默认插件 plugins 目录地址
$ cd ~/.oh-my-zsh/plugins/
$ ls -a

# 安装 autojump
$ sudo apt-get install autojump -y 

$ cat /usr/share/doc/autojump/README.Debian

# 修改 .zshrc 配置文件
$ vim ~/.zshrc

# 添加autojump
. /usr/share/autojump/autojump.sh

# 添加必要插件
plugins=(git autojump zsh-autosuggestions zsh-syntax-highlighting colorize kubectl docker)

```

### Step 5 - Install Plugin
#### zsh-autosuggestions

Plugin: zsh-autosuggestions (optional)
Clone this repository somewhere on your machine. This guide will assume ~/.zsh/zsh-autosuggestions.

```sh
$ git clone git://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
```
Add the following to your .zshrc:
```sh
$ vim ~/.zshrc
source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=6'
```
#### zsh-syntax-highlighting
1. Clone this repository in oh-my-zsh's plugins directory:
```sh
$ git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```
2. Activate the plugin in ~/.zshrc:
```
$ plugins=( [plugins...] zsh-syntax-highlighting)
```
3. Source ~/.zshrc to take changes into account:
```
$ source ~/.zshrc
```

#### kubernetes complete

```
echo "source <(kubectl completion bash)" >> ~/.zshrc
```

### Step 3 - Change default themes

```sh
# Install powerline font
$ cd ~
$ wget https://github.com/powerline/powerline/raw/develop/font/PowerlineSymbols.otf
$ wget https://github.com/powerline/powerline/raw/develop/font/10-powerline-symbols.conf
$ mkdir -p .config/fontconfig/conf.d ~/.fonts/ #if directory doesn't exists
$ mv PowerlineSymbols.otf ~/.fonts/

# Clean fonts cache
$ sudo apt install -y font-manager
$ fc-cache -vf ~/.fonts/

# Move config file
$ mv 10-powerline-symbols.conf ~/.config/fontconfig/conf.d/

$ vim ~/.zshrc
# Change [ZSH_THEME="robbyrussell"] to [ZSH_THEME="agnoster"]
ZSH_THEME="agnoster"
$ source ~/.zshrc

# 以下是桌面版
# Change theme colors to solarize
# dconf is required if you don't already have it.
$ sudo apt-get install dconf-cli
$ git clone git://github.com/sigurdga/gnome-terminal-colors-solarized.git ~/.solarized
$ cd ~/.solarized
$ ./install.sh
```



### 参考

* [How to Setup ZSH and Oh-my-zsh on Linux](https://www.howtoforge.com/tutorial/how-to-setup-zsh-and-oh-my-zsh-on-linux/)
* [Ubuntu 16.04 + Terminator + Oh My ZSH with Agnoster Theme](https://gist.github.com/kejincan0527/69df337229a9b824267fd5610a285cec)
* [Oh-My-Zsh Themes](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes)
* [Install Powerline on Debian/Ubuntu](https://gist.github.com/leosuncin/25bad6ae66c5d513b986)
* [Install Powerline-Shell on Ubuntu 16.04 TLS](https://gist.github.com/KINGSABRI/f6b2f15b54771cba49664fb296311b23)
* [使用autojump更快地进行文件导航](https://www.linode.com/docs/tools-reference/tools/faster-file-navigation-with-autojump/)
* [安装：zsh-autosuggestions](https://gist.github.com/kejincan0527/73c0e9d8a167f154aa5f4b7b48930eb7)
* [安装：zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md)
