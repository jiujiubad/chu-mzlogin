# 第 1 章 Rubymine 入门
## 1.1 基本设置
### 1.1.1 导出自己的 Rubymine 配置
「文件 → 导出设置 → 类型全选、选择文件夹 → 确定」
### 1.1.2 快捷键方案
「设置 → 快捷键：Mac OS X 10.5+」
### 1.1.3 字体 - 侧边栏
「设置 → 外观 & 行为 → 外观 → 勾选『使用自定义字体』、字体选择『Roboto Mono for Powerline』、大小9 → 确定」，https://jingyan.baidu.com/article/d3b74d64e005201f77e609ff.html
### 1.1.4 字体 - Terminal 终端
「设置 → 编辑器 → 切换配色方案 → Console Font → 勾选『使用控制台字体代替』、字体选择『Roboto Mono for Powerline』、大小9 → 确定 → 重启才能生效」
### 1.1.5 `.gitignore` 的文件灰色显示
「设置 → Plugins → 搜索『ignore』→ 安装 → 重启 Rubymine 」，然后「文件 → 关闭项目 → 重新打开项目生效」
### 1.1.6 显示内存使用多少
「设置 → 外观 & 行为 → 外观 → 窗口选项勾选『显示内存指示』，会在窗口右下角出现」
> 如何修改 Rubymine 内存分配：https://blog.csdn.net/qq_27093465/article/details/81947933
### 1.1.7 刷新当前窗口（暂不用）
`command + fn +  F5`，用于新建文件后，如果 Rubymine 没有新增文件，则手动刷新
> 注意：实测发现有时不灵，还不如新建文件后点击左侧目录栏，即可激活显示新增的文件
### 1.1.8 自动换行、粘贴不要换行
「设置 → 编辑器 → 常规 → 自动换行 → 勾选『在编辑窗口使用自动换行』『仅显示当前行的换行指示器』，反选『自动换行时显示原始的缩进』」  
### 1.1.9 修改内存大小
修改内存大小-使得idea运行更流畅：https://blog.csdn.net/qq_27093465/article/details/81947933
「打开Finder → 应用程序 → 右键『Rubymine.app』 → 显示包内容 → 修改内存 Contents/bin/rubymine.vmoptions」
```
-Xms1024m
-Xmx2048m
-XX:ReservedCodeCacheSize=1024m
-XX:+UseCompressedOops
```
### 1.1.10 Markdown Css 自定义
「设置 → 语言&框架 → Markdown → Custom Css 勾选『Add Css Rules』」
```css
body {
  font-size: 13px;
  line-height: 1.6;
}
h1 {
    padding-bottom: .3em;
    font-size: 2.1em;
    margin-top: 0em;
    margin-bottom: 0.85em;
    line-height: 1.2;
    border-bottom: 1px solid #eee;
}
h2 {
    padding-bottom: .3em;
    font-size: 1.7em;
    margin-top: 1.275em;
    margin-bottom: 0.85em;
    line-height: 1.3;
    border-bottom: 1px solid #eee;
}
h3 {
    font-size: 1.3em;
    margin-top: 1.275em;
    margin-bottom: 0.85em;
    line-height: 1.43;
}
```
### 1.1.11 代码样式
「设置 → 编辑器 → Code Style → 分别修改 Ruby 和 其他文件类型（Markdown）」，在设置界面的右侧有效果预览图，根据预览选择自己的喜好
### 1.1.12 html.erb 代码缩进问题
默认<head><body>以及<body>下的以及标签都不会缩进。解决方法：「设置 → 编辑器 → code style → HTML → Other → 不缩进子元素，删掉<html><head><body>这几项」
### 1.1.13 配色-编辑器和外观
设置 - 编辑器 - 切换配色方案 - 方案选择『Raliscasts』  
设置 - 外观&行为 - 外观 - 主题选择『Darcula 黑色主题』

## 1.2 快捷键自定义
### 1.2.1 编辑器操作
移动插入符号到行首：`ctrl + a`
移动插入符号到行首：`ctrl + e`
移动插入符号到行首并选择（删除光标左右侧的代码）：`ctrl + option + a`
移动插入符号到行尾并选择（删除光标左右侧的代码）：`ctrl + option + e`
移动插入符号到文本的开始处：`command + ↑`
移动插入符号到文本的末尾处：`command + ↓`
在上方克隆插入符号：`option + command + ↑`
在下方克隆插入符号：`option + command + ↓`
开始新行：`command + 回车`
在当前位置之前开始新行：`shift + command + 回车`
### 1.2.2 主菜单
导航 - 后退（是光标位置）：`command + ←`，返回到上一个操作的位置
导航 - 向前（是光标位置）：`command + →`，返回到下一个操作的位置
窗口 - 编辑器选项卡 - 选择上一个选项卡（Tab 标签左右切换）：`option + command + ←`
窗口 - 编辑器选项卡 - 选择下一个选项卡（Tab 标签左右切换）：`option + command + →`
编辑 - 查找 - 将下一个匹配项添加到选择：`command + d`
编辑 - 查找 - 选择所有匹配项：`command + fn + F2`
视图 - 最近的文件：`command + p`
VCS - Git - 与同一个版本库比较：`ctrl + option + command + b`
### 1.2.3 工具窗口
终端 - Terminal：ctrl + `

## 1.3 快捷键补充
### 1.3.1 Rubymine 自带
* 代码补全 Autocomplete（补全任何类、方法、变量）
* 代码语法检测 Linter：自带
* Emmet 展开 html 代码（div.notice>ul>li*5）：自带
### 1.3.2 主菜单
**打开任何文件（最好用！搜索时巧用*代表任意文字）：双击 `shift`**
> 比如，搜索 `app/views/orders/new.html.erb` 页面，只需搜索 `vi*or*new`
（搜索后选中所有搜索到的词）：`command + f` 然后 `option + 回车`
替换 - 当前文件：`command + r`
替换 - 全局：`command + shift + r`
重命名：`command + fn + F6`
### 1.3.3 编辑器操作
缩进、反缩进：`tab`，`shfit + tab`，因为 Rubymine 有自动格式化所以不太需要。
插入代码片段 snippet（html、js等）：`command + J`
格式化 Beautify：`command + option + L`，部分缩进不规范（特别是 html 页）但总体 ok
注释：`command + /`，或 `shift + command + /`
整行代码 - 复制：`command + c` 
整行代码 - 删除：`command + x` 
整行代码 - 上下移动（有时失灵，光标最好放在行首尾再操作）：`shift + command + 上/下`
饥饿退格：`shift + command + 退格delete`
展开或收缩 - 代码 ：`command + +` 和 `command + -`
展开或收缩 - 全部代码：`shift + command + +` 和 `shift + command + -`

## 1.4 Ruby China 解答常见问题
> Rubymine 优点总结：跳转（读源码好工具），Debug，代码补全，能连接数据库，
### 1.4.1 Vim 比 Rubymine 高端？
flowerwrong-2015：完全是个人喜好，用了 N 年 `Vim` 又怎样，我认识一哥们 N 年后换了 `Sublime`。我系统装了 `Atom`、` Vim`、  `Sublime`、 `Rubymine`，每次第一个出现在脑海的名字就打开。
### 1.4.2 怎么学习 Rails 源码？
jasl-2018：用 `RubyMine` 干活，心情好的时候按住 `command 点一下方法名`，就跳进 `Rails 源码`了，顺着翻就行了
### 1.4.3 Sublime、Vim、Rubymine（IDE），到底用哪个？
jasl-2018：`IDE` 的智能感知的实现原理和编辑器不一样，相比来说 `IDE` 的准确率更高一些。不用纠结，用惯了干活都一样，到时候见招拆招就行了
* Rei-2011：喜欢用什么就用什么，只要代码规范简洁易读。用什么都好，**一定要把自己的工具用到滚瓜烂熟**。
* xautjzd-2013：不喜欢折腾就 `Rubymine`，喜欢折腾建议 `Vim`
* railsboy-2017：之前一直用 `vim`，新公司用的 `RubyMine`，用挺方便的，就不用 `vim`，咋舒服咋来
* guyanbiao-2017：`Rubymine` 的 `vim` 模式是最好的
### 1.4.4 Rubymine 的代码格式化对齐问题？
jasl-2017：https://ruby-china.org/topics/34139，要去配的... 我记得 `Rubymine` 默认 `<%` 不算缩进
### 1.4.5 2018 RubyMine 加强了对 I18n 的支持
https://ruby-china.org/topics/37573
### 1.4.6 为什么 `before_action` 没有智能提示？
zhufenggood-2017：https://github.com/rails/rails/blob/master/actionpack/lib/abstract_controller/callbacks.rb#L186>  这几个 `callback` 方法是元编程出来的，`RubyMine` 对 `dynamic` 出来的代码智能提示一般。jasl-2017：试试刚发布的2017.3
### 1.4.7 Rubymine 的块注释会标黄线报警怎么解决？
jasl-2017：可以关 `inspection` 的，另外如果你项目配置了  `rubocop`，`RubyMine` 会自动使用 `rubocop` 的配置，其实相比编辑器要方便的多的。mingyuan0715-2017：头下角头像 - `Configure inspections` - 搜索  `reference` - 反选 `Ruby` 下的 `Unresolved Ruby reference` 
### 1.4.8 我 rubocop 总是找不到路径，必须在项目目录下 `mine .` 才好使，atom 也是这样，求大哥给支个招，我用的 rvm？
jasl-2017：在rubymine的设置里 有个选择ruby sdk的 选和你rvm的一致就可以了