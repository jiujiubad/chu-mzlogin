## Ruby 升级或安装
rbenv 使用指南：https://ruby-china.org/wiki/rbenv-guide
【精】使用 rbenv 安装和管理 Ruby 版本：https://www.hi-linux.com/posts/41737.html
```
brew install rbenv ruby-build  # 安装 rbenv 和 ruby-build（下载ruby后会自动编译）
rbenv install -l               # 显示可用的 Ruby 版本
rbenv install 2.6.0            # 安装 Ruby
rbenv global 2.6.0             # 设置 Ruby 全局版本

# 以下三行用于解决 bundle 时报错：rbenv: version `ruby-2.6.0' is not installed (set by。。)
rbenv local --unset            # 当前 shell 不设置 Ruby 版本
rbenv shell --unset            # 当前目录不设置 Ruby 版本
bundle update
```
测试是否成功：打开两个终端窗口分别执行（RVM 就会因为 Shell PATH 冲突，每次都要修改默认版本）
```
ruby -v        # ruby版本
which ruby     # ruby路径
rbenv versions # 列出rbenv安装的版本
rbenv version  # 列出正在使用的版本
```
不同版本的 Ruby 和 gems 会安装在 `~/.rbenv/versions`

## 配置 zsh 路径
`vi ~/.zshrc` 填写
```
export PATH="$HOME/.rbenv/bin:$PATH" && eval "$(rbenv init -)" #rbenv设置ruby默认版本
```
让配置生效
```
source ~/.zshrc
```
## rbenv 插件
### rbenv-gem-rehash
`gem install xxx` 或 `bundle` 后无需手动输入 `rbenv rehash`，就可以查看版本和使用
```
git clone https://github.com/rbenv/rbenv-gem-rehash.git ~/.rbenv/plugins/rbenv-gem-rehash
```
* ruby-build：不折腾。`rbenv install 2.6.0` 时会自动用它编译 ruby
* gemset：不折腾。没有一个 ruby 下打开多版本 rails 的需求。
* rbenv-update：不折腾，危险的操作。通过rbenv update命令来更新rbenv以及所有插件
* rbenv-aliases：不折腾，没需求。别名
## Ruby 删除
```
rbenv uninstall 2.6.0
rbenv rehash
```

## Rails 升级或安装
### 安装指定的 rails 版本
```
gem install rails -v 5.2.2
```
### Rails 旧项目（没有 master.key）升级
1）修改 `Gemfile`
```
gem 'rails', '~> 5.2.2'
```
2）更新项目里的 rails 目录结构， http://guides.rubyonrails.org/upgrading_ruby_on_rails.html
```
# 目录结构更改，一些文件会被复写，留一个分支作为备份
git checkout -b bak  
# 更新文件和目录，全部选 y 复写Overwrite
rails app:update
```
3）把被修改的项目文件，改回原来的代码（天马项目实测失败）