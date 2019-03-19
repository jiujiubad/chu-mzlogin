# 终端工具 autojump | autosuggestions | syntax-highlighting
## oh-my-zsh 三大插件安装
- autojump，通过 `j xxx` 自动跳转文件夹
- autosuggestions，输入过的代码再次输入时会显示灰色，可以自动补全
- syntax-highlighting，终端语法高亮

安装
```
brew install autojump  # 安装自动跳转（项目文件夹）
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


## autojump 命令
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