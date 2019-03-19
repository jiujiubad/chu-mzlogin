* 201803
* 工具+mac

需要环境
```
mac
zsh
iterm
```
配置方式
在iterm2里面的家目录
```
vim ~/.zshrc
```

在最后一行添加
```
alias code='/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code'
```
让上面配置的命令生效
然后执行
```
source ~/.zshrc 
```
或重启 iterm2
接下来使用code . 就可以使用vs code 打开当前目录