# 《ROR 指南》第 3 章 ror gem 常用
## 3.1 调试
### 3.1.1 byebug
打开 `/config/puma.rb`
```
# 设置 puma 超时时间
worker_timeout 5000
```
### 3.1.2 pry
## 3.2 权限管理
### 3.2.1 devise
### 3.2.2 cancancan
## 3.3 美观
### 3.3.1 bootstrap
### 3.3.2 jquery


## 开发必备的 gem
安装 figaro

```
gem 'pry-rails', '~> 0.3.9', group: :development
gem 'figaro', '~> 1.1', '>= 1.1.1', group: :development
```

pry-rails

pry

pry-byebug + awesome_rails_console 高亮样式