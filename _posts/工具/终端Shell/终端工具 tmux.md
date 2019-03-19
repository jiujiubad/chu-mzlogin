# 终端工具 tmux

20180817【终端】【插件】【tmux】

[TOC]

## tmux 安装

安装

```
# 安装 tmux
brew install tmux

# 安装必要组件（防止运行 tmux 时出现 [exited] 的错误）
brew install reattach-to-user-namespace
```

配置文件

```
vim ~/.tmux.conf
```

填写配置

```
# tmux v2.7 有效 (用 tmux -V 查看)

# 设置窗口开始标记
set -g base-index 0

# 开启鼠标模式
set-option -g mouse on

# 配色
set-option -g default-terminal "screen-256color"

# 历史行数
set -g history-limit 10000

# 设置下边导航右侧
# set-window-option -g clock-mode-colour colour64
set -g status-right "#[fg=default][电池：#(batt capacity)] #[fg=default][%Y年%m月%d日 %H:%M]"

# 设置滚动速度
bind -Tcopy-mode WheelUpPane send -N1 -X scroll-up
bind -Tcopy-mode WheelDownPane send -N1 -X scroll-down

# MacOS 剪贴板
# https://blog.carbonfive.com/2017/08/17/copying-and-pasting-with-tmux-2-4/
# 要安装`brew install reattach-to-user-namespace`
set-option -g default-command "reattach-to-user-namespace -l zsh"
bind C-c run "tmux save-buffer - | reattach-to-user-namespace pbcopy"
bind C-v run "tmux set-buffer $(reattach-to-user-namespace pbpaste); tmux paste-buffer"

#-------------------------------------------------------#
# Default inactive/active window styles
#-------------------------------------------------------#
set -g window-style 'fg=default,bg=default'
set -g window-active-style 'fg=default,bg=default'
set-window-option -g window-status-current-bg blue
#-------------------------------------------------------#

# 使配置生效
# tmux source-file ~/.tmux.conf
```

使配置生效（这次不用执行也生效了）

```
tmux source-file ~/.tmux.conf
```



## 常用操作

操作 session

```
# 退出 session
ctrl + b + d

# 查看所有 session
tmux ls

# 进入指定 session
tmux a -t 编号
```

操作 session 里的窗口 windows

```
# 新建窗口
ctrl + b + c

# 切换到下一个窗口
ctrl + b + p

# 切换到上一个窗口
ctrl + b + n

# 查看所有 session 的所有窗口
ctrl + b + w
```



## 现在就用

```
# 用鼠标就能切换 window，pane，还能调整 pane 的大小
set -g mouse on

# 切割 pane。prefix+v 代表竖着切，prefix+h 代表横着切
bind-key v split-window -h
bind-key h split-window -v

# 不用关掉tmux。直接用 prefix+r，就能重新加载 tmux 设置
bind-key r source-file ~/.tmux.conf \; display-message "tmux.conf reloaded"
```



## 可能用上

```
# 不用按 prefix，直接用 shift+箭头 在 window 之间 switch
bind -n S-Left previous-window
bind -n S-Right next-window

# 把 prefix 的 ctrl+b 变为了 ctrl+a
set-option -g prefix C-a
unbind-key C-a
bind-key C-a send-prefix
```



## 正在测试

```

# 美化状态栏
set-option -g status on
set-option -g status-interval 2
set-option -g status-justify "centre"
set-option -g status-left-length 60
set-option -g status-right-length 90
set-option -g status-left "#(~/WebstormProjects/wxnacy.github.io/shells/tmux/plugin/tmux-powerline/powerline.sh left)"
set-option -g status-right "#(~/WebstormProjects/wxnacy.github.io/shells/tmux/plugin/tmux-powerline/powerline.sh right)"
set-window-option -g window-status-current-format "#[fg=colour235, bg=colour27]⮀#[fg=colour255, bg=colour27] #I ⮁ #W #[fg=colour27, bg=colour235]⮀"

# 选择面板，更符合 Vim 习惯
bind k selectp -U
bind j selectp -D
bind h selectp -L
bind l selectp -R

# 使用 X 关闭 window
unbind &
bind X killw
```





## 参考资源