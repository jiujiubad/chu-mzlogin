---
layout: post
title: 终端Shell-oh-my-zsh
categories: 工具-终端Shell
---

## 总结：~/.zshrc 最终配置如下
```ruby
# 远程复制：rsync -auvzP ~/local_path admin@ip:~/vps_path
# oh-my-zsh
export ZSH="/Users/aaron/.oh-my-zsh" #oh-my-zsh 路径
ZSH_THEME="agnoster" #主题 #ZSH_THEME="robbyrussell"

# 环境配置
HISTSIZE=100000 && SAVEHIST=100000 #显示多少行代码
export LC_ALL=en_US.UTF-8 && export LANG=en_US.UTF-8 #utf-8编码（解决mosh编码问题）
export PATH="/usr/local/sbin:$PATH" #homebrew's sbin路径
export PATH=$PATH:/usr/local/mysql/bin #Mysql 路径
export PATH="$HOME/.rbenv/bin:$PATH" && eval "$(rbenv init -)" #rbenv设置ruby默认版本

# 插件
plugins=(autojump zsh-autosuggestions zsh-syntax-highlighting git Z brew node npm rails ruby gem kubectl vscode docker) #其他插件：bundle,cap,github,osx
source $ZSH/oh-my-zsh.sh #让插件生效
source <(kubectl completion zsh) #K8s自动补全（kubernetes autocomplete）

# 别名
## 终端科学上网（Shadowsocks-偏好设置-高级-本地Socks5监听端口，默认1086）
## 终端是否能科学上网：curl -i https://www.google.com
alias proxy='export all_proxy=socks5://127.0.0.1:1086' #开启 Shadowsocks
alias unproxy='unset all_proxy' #关闭 Shadowsocks
alias gl='git log --pretty=oneline' # git log显示
alias dd1='ddcctl -d 1 -b' #显示器1亮度
alias dd2='ddcctl -d 2 -b' #显示器2亮度
alias cats='pygmentize -O style=monokai -f console256 -g' #cats 打印时高亮
alias code='/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code' #终端打开vscode（用 code .）

# 历史命令ctrl+r
function exists { which $1 &> /dev/null }
if exists percol; then
    function percol_select_history() {
        local tac
        exists gtac && tac="gtac" || { exists tac && tac="tac" || { tac="tail -r" } }
        BUFFER=$(fc -l -n 1 | eval $tac | percol --query "$LBUFFER")
        CURSOR=$#BUFFER         # move cursor
        zle -R -c               # refresh
    }
    zle -N percol_select_history
    bindkey '^R' percol_select_history
fi

# 隐藏路径的 path_name 和 host_name
prompt_dir() {prompt_segment blue black '%c'}
prompt_context() {
  if [[ "$USER" != "$DEFAULT_USER" || -n "$SSH_CLIENT" ]]; then
  fi
}
```

## 1.1 配置 oh-my-zsh
【精】最简单iTerm2 + oh-my-zsh打造Mac炫酷终端教程-菜鸟版实操整理：<https://www.jianshu.com/p/53eb1075f627>
### 1.1.1 zsh 安装、主题设置
```
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```
进入文件
```
vi ~/.zshrc
```
修改主题
```
# ZSH_THEME="robbyrussell"
ZSH_THEME="agnoster"
```
![img](https://upload-images.jianshu.io/upload_images/99476-5091a9e0ce90bb11.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/529)

应用配置
```
source ~/.zshrc
```

### 1.1.2 安装 Powerline
```
# 用 pip 工具来安装这个字体
sudo easy_install pip
# 安装 powerline
pip install -user powerline-status
```

### 1.1.3 安装 Powerline 字体（针对 Agnoster 主题）
```
# 下载字体
git clone https://github.com/powerline/fonts ~/Downloads/fonts 
# 进入文件夹
cd ~/Downloads/fonts
# 安装字体
./install.sh
```
安装好字体之后的即时画面，需要在配置里选择字体才能有最终效果
![img](https://upload-images.jianshu.io/upload_images/99476-d102687fdec4f647.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/547)

### 1.1.4 导入色彩预设 Argonaut
1）下载配色方案
```
git clone https://github.com/mbadolato/iTerm2-Color-Schemes ~/Downloads/colors
```
2）打开 `~/Downloads/colors/terminal/Argonaut.terminal`
![img](https://upload-images.jianshu.io/upload_images/99476-d102687fdec4f647.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/547)  

3）终端-设置-选择字体（powerline）
Roboto Mono Light for Powerline，13号
![img](https://upload-images.jianshu.io/upload_images/99476-6d14d857bbe2224c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/648)

### 1.1.5 （根据需要可选）zsh docker auto-complete
参考资料：<https://docs.docker.com/compose/completion/#bash>
```
# 新建文件夹
mkdir -p ~/.zsh/completion
# 安装 docker 自动补全
curl -L https://raw.githubusercontent.com/docker/docker-ce/master/components/cli/contrib/completion/zsh/_docker > ~/.zsh/completion/_docker
# 安装 docker-compose 自动补全
curl -L https://raw.githubusercontent.com/docker/compose/1.22.0/contrib/completion/zsh/_docker-compose > ~/.zsh/completion/_docker-compose
```

## 1.2 zsh-plugins 插件
【精】最简单oh-my-zsh mac版基本插件安装-菜鸟实操整理：<https://www.jianshu.com/p/59a3f1601cfc>
- autojump，通过 `j xxx` 自动跳转文件夹
- zsh-autosuggestions，输入过的代码再次输入时会显示灰色，按箭头 `→` 可以自动补全
- zsh-syntax-highlighting，终端语法高亮

### 1.2.1 安装插件 autojump、zsh-autosuggestions、zsh-syntax-highlighting
```
brew install autojump  # 安装 autojump
cd ~/.oh-my-zsh/custom/plugins  # 进入下面两个插件的目标文件夹
# 下载自动补全
git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_COSTOM/plugins/zsh-autosuggestions/
# 下载语法高亮
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH_COSTOM/plugins/zsh-syntax-highlighting/
```
打开文件
```
vim ~/.zshrc
```
修改配置
```
plugins=(
  git zsh-syntax-highlighting zsh-autosuggestions Z autojump brew node npm rails ruby kubectl vscode docker
)
```
应用配置
```
source ~/.zshrc
```

### 1.2.1 autojump 常用命令
```
j -v  #查看安装的 autojump 的版本
j -h  #查看帮助选项

j 进入权重最高的目录
j 名称 #跳转到目录
j --stat  #查看每个文件夹的权重和全部文件夹计算得出的总权重的统计数据
j --purge #去除不存在的路径

j -i 权重  #增加
j -d 权重  #减少
jo xx  #Finder中打开目录
```

## 1.3 percol 命令行历史
用于 `command + r` 显示所有输⼊入过的命令 
安装及使用：<https://github.com/mooz/percol>
```
pip install percol  # 安装percol
percol --match-method pinyin  # 拼音支持
sudo touch /var/log/syslog    # 新建配置文件
percol /var/log/syslog        # 指定文件名
ps aux | percol               # 指定重定向
```

## 1.4 tmux 多窗口管理
### 1.4.1 tmux 安装 + 我的配置
github 的 Yousri/tmux.conf：<https://gist.github.com/Yousri/3950948>
如何在tmux中滚动：<https://superuser.com/questions/209437/how-do-i-scroll-in-tmux>
```
brew install tmux  #安装 tmux
brew install reattach-to-user-namespace  #安装必要组件（防止运行 tmux 时出现 [exited] 的错误）
```
修改 `vim ~/.tmux.conf`
```
# tmux v2.7 有效 (用 tmux -V 查看)
# 滚动模式(如果用默认复制模式：是用 ctrl+b+[ 滚动)
set -g terminal-overrides 'xterm*:smcup@:rmcup@'
# 滚动速度
bind -Tcopy-mode WheelUpPane send -N1 -X scroll-up
bind -Tcopy-mode WheelDownPane send -N1 -X scroll-down
# 滚动时支持剪贴板(需要安装 brew install reattach-to-user-namespace)
set-option -g default-command "reattach-to-user-namespace -l zsh"
bind C-c run "tmux save-buffer - | reattach-to-user-namespace pbcopy"
bind C-v run "tmux set-buffer $(reattach-to-user-namespace pbpaste); tmux paste-buffer"
# 历史行数
set -g history-limit 5000
# 关闭状态栏（解决 rubymine 终端光标显示错位的问题）
set -g status off
# 右下角状态栏样式
# set -g status-right "#[fg=default][电池：#(batt capacity)] #[fg=default][%Y年%m月%d日 %H:%M]"
# 自定义快捷键：ctrl+b+?
bind-key v split-window -h     #横向切割窗口
bind-key h split-window -v     #纵向切割窗口
bind -n S-Left previous-window #切换窗口
bind -n S-Right next-window    #切换窗口
```

### 1.4.2 tmux 常用操作
Session 会话操作
```
tmux new -s session_name # 新建
tmux a -t session_name   # 进入
tmux ls  # 列出所有会话
ctrl + b + x      # 关闭当前会话
tmux kill-server  # 关闭所有会话
```
Windows 窗口操作：快捷键是 `ctrl + b + ？`
```
c  新建窗口
,  重命名当前窗口
&  关闭当前窗口
d  退出 session
n  后一个窗口
p  前一个窗口
w  列出所有会话和窗口
s  列出所有会话
f  查找窗口
```

### 1.4.3 （未用）tmux 自定义快捷键
```
bind-key z kill-session  # 使用 z 关闭 session
# 把 prefix 的 ctrl+b 变为了 ctrl+a
set-option -g prefix C-a
unbind-key C-a
bind-key C-a send-prefix
```

## 1.5 mosh 替代 ssh 连接，用不掉线
### 1.5.1 mosh 安装
```
brew install mosh
```
### 1.5.2 mosh 使用
```
mosh username@vps_ip -p 80  #跟 ssh 用法一样
```
### 1.5.3 解决 mosh 编码utf-8 问题
```
export LANGUAGE=en_US.UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
sudo locale-gen en_US.UTF-8
sudo dpkg-reconfigure locales
source ~/.zshrc
```









