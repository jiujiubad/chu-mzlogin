# 终端工具 tmux
## 1.1 安装、配置
github 的 Yousri/tmux.conf：https://gist.github.com/Yousri/3950948
如何在tmux中滚动：https://superuser.com/questions/209437/how-do-i-scroll-in-tmux
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

## 1.2 常用操作
### 1.2.1 Session 会话操作
```
tmux new -s session_name # 新建
tmux a -t session_name   # 进入
tmux ls  # 列出所有会话
ctrl + b + x      # 关闭当前会话
tmux kill-server  # 关闭所有会话
```
### 1.2.2 Windows 窗口操作
ctrl + b + ？
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

## 1.3 （未用）自定义快捷键
```
bind-key z kill-session  # 使用 z 关闭 session
# 把 prefix 的 ctrl+b 变为了 ctrl+a
set-option -g prefix C-a
unbind-key C-a
bind-key C-a send-prefix
```