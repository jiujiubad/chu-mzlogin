## 2019 年 3 月 功能
### 1.1.1 已用插件：
* Chinese（Simplified），简体中文
* Markdown Preview Enhanced，预览和在浏览器打开 markdown 文件
* open in browser，浏览器打开 html 文件
* New Moon Syntax Theme，主题 markdown 高亮
* Material Theme，主题 markdown 高亮
### 1.1.2 Markdown Preview Enhanced 插件
要自定义 css，cmd-shift-p 然后搜索 `Markdown Preview Enhanced: Customize Css` 即可打开 `style.less`
```css
.markdown-preview.markdown-preview {
  //全局-字
  font-size: 15px;
  font-family: "Open Sans", "Clear Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: rgb(51, 51, 51);
  line-height: 1.6;
  //全局-窗口
  max-width: 1024px;
  margin: 0 auto;
  padding: 30px;
  padding-bottom: 100px;
  //正文设置
  h1 {
      padding-bottom: .3em;
      /*font-size: 2.25em;*/
      font-size: 2.1em;
      margin-top: 0em;
      margin-bottom: 0.85em;
      line-height: 1.2;
      border-bottom: 1px solid #eee;
  }
  h2 {
      padding-bottom: .3em;
      /*font-size: 1.75em;*/
      font-size: 1.7em;
      margin-top: 1.275em;
      margin-bottom: 0.85em;
      /*line-height: 1.225;*/
      line-height: 1.3;
      border-bottom: 1px solid #eee;
  }
  h3 {
      /*font-size: 1.5em;*/
      font-size: 1.3em;
      margin-top: 1.275em;
      margin-bottom: 0.85em;
      line-height: 1.43;
  }
}
```
### 1.1.3 修改 vscode 左侧目录字体大小
`command + ,` 搜索『settings.json』- 添加两行代码，调试大小
```js
  "editor.fontSize": 15,
  "window.zoomLevel": -1,
```
### 1.1.4 关闭右侧预览面板
设置里面搜索 "editor.minimap.enabled"，设置为false即可
### 1.1.5 最终的 setting.json
```
{
  "terminal.integrated.fontFamily": "Source Code Pro for Powerline",
  "terminal.integrated.scrollback": 100000,
  "editor.tabSize": 2,
  "files.associations": {
    "*.erb": "html",
    "*.basic": "dockerfile",
  },
  "editor.wordWrap": "on",
  "window.zoomLevel": 1,
  // "workbench.editor.enablePreview": false, 
      // 控制是否将代码段与其他建议一起显示以及它们的排序方式。
      "editor.snippetSuggestions": "top",
      "workbench.startupEditor": "newUntitledFile",
  "markdown.styles": [
    ""
  ],
  "editor.minimap.enabled": false,
  "files.autoSave": "afterDelay",
  // 以下两行修改侧边目录字体大小
  "editor.fontSize": 13,
  "window.zoomLevel": 0,
  "workbench.iconTheme": null,
  "workbench.colorTheme": "New Moon",
  "explorer.confirmDragAndDrop": false,
  "explorer.confirmDelete": false,
}
```



## 2019 年 弃用
### Local History，本地文件历史版本（不如用github私有仓库，已弃用）
把工作区加入侧边栏后，编辑工作区中的 md 文件就会生成一个『.history 文件夹』，用于保存文件历史版本。
注意：
* 要在 vscode 中编辑 md 文件，每次保存会在『.history 文件夹』生成一个临时文件
* 要在工作区保持加载『.history 文件夹』，才能查看『.history 文件夹』里的历史
* 默认保存 30 天，默认配置够用，不折腾
所以：建议一开始就在 icloud 和 Mac 桌面各编辑一个 md 文件来生成『.history 文件夹』，这样云端、桌面只要使用 vscode 打开的 md 文件，都会有历史版本记录。


## 2018 年 9 月
go to definition 跳转到方法
https://blog.csdn.net/qq_36279445/article/details/79650144

单击文件在新窗口打开
```
  "workbench.editor.enablePreview": false, 
```

# 一、使用心得
## 1、不好：
### 1】安装插件后并不轻量
1）装35个插件，启用25个，几次出现卡住，有时保存3秒后才成功保存
2）某个插件在每个文件夹里都生成一个Icon文件

### 2】某些插件乱生成文件
1）某个插件生成.idea、.tmp.drivedownload、.vscode文件夹

### 3】ruby on rails插件不好用
1）圈子并不活跃，每个插件优化都不好

## 2、插件关键词
最常用：ruby、rails、erb

格式化代码：关键词beautify、formatting

实时代码检测：关键词lint、linter

代码片段：snippet

自动补全：autocomplete

## 3、atom的插件

1）==ruby-block==——vscode上暂时功能很不完善，各种错乱

功能：点击end，显示相应的def——vscode用双击end

2）atom-beautify

功能：快速格式化html、erb、css、js等几乎所有文件

3）atom linter-html/css/js/ruby

功能：代码规范化检查html/css/js/ruby——vscode ruby-linter（很好用）、eslint（es/js用）

4）atom ternjs

功能：智能语法提示js——vscode ruby solargraph、intellisense

5）atom highlight-line

功能：鼠标点哪里那一行就会高亮——vscode自带

6）arom pigments

功能：代码颜色显示——vscode colorize



# 二、用户配置

# 1、User Settings

```
{
    // vscode，tab空多少格
    "editor.tabSize": 2, 
    // vscode，当打开文件时，将基于文件内容检测 "editor.tabSize" 和 "editor.insertSpaces"。——否则，部分html.erb文件的tab会变成4个空格！
    "editor.detectIndentation": false,
    // vscode，自带的emmet，输入后按tab键，将展开 Emmet 缩写
    "emmet.triggerExpansionOnTab": true,
    // vscode，调整窗口的缩放级别。原始大小是 0
    "window.zoomLevel": 1,
    // vscode，文件格式所对应的语言
    "files.associations": {
        "*.erb": "html.erb",
        "*.rb": "ruby"
    },
    // vscode，代码区域，根据视区宽度自动换行
    "editor.wordWrap": "on",
    // vscode,控制终端terminal保持在缓冲区的最大行数。
    "terminal.integrated.scrollback": 1000000,
    //google翻译，api key
    "googleTranslateExt.apiKey": "AIzaSyBmZngY32nFAQYFX7BiNij31FLQ6RbOqlU",
    "googleTranslateExt.languages": [
        "zh-CN"
    ],
    // vscode，文件图标主题
    "workbench.iconTheme": "material-icon-theme",
    // material-icon-theme，文件图标主题的详细设置
    "[html]": {},
    "material-icon-theme.activeIconPack": "angular",
    "material-icon-theme.folders.theme": "specific",
    "material-icon-theme.folders.color": "#90a4ae",
    "material-icon-theme.hidesExplorerArrows": false,
    "material-icon-theme.files.associations": {},
    "material-icon-theme.folders.associations": {},
    "material-icon-theme.languages.associations": {},
    // vscode，用户代码段，输入后按tab可以展开。否则是输入后按enter展开。
    "editor.tabCompletion": true,
    // rufo (Ruby formatter)，针对 [ruby] 语言，配置替代编辑器设置。
    "[ruby]": {
        "editor.formatOnSave": false
    },  
    // // ruby，输入时自动语法检查
    // "ruby.lint": {
    //     "reek": true,
    //     "rubocop": true,
    //     "ruby": true, //Runs ruby -wc
    //     "fasterer": true,
    //     "debride": true,
    //     "ruby-lint": true
    // },

    // TODO，用List hilighted annotations进行搜索时，需要提前配置文件类型
    "todohighlight.include": [
        "**/*.js",
        "**/*.jsx",
        "**/*.ts",
        "**/*.tsx",
        "**/*.html",
        "**/*.php",
        "**/*.css",
        "**/*.scss",
        "**/*.erb",
        "**/*.rb",
        "**/*.yml",
        "**/*.md"
    ],
    // Setting Sync,同步vscode插件和配置到github
    "sync.gist": "ca8244aea88dce369d7a650431172186",
    "sync.host": "",
    "sync.pathPrefix": "",
    "sync.quietSync": false,
    "sync.askGistName": false,
    "sync.removeExtensions": true,
    "sync.syncExtensions": true,
    "sync.autoDownload": false,
    "sync.autoUpload": false,
    "sync.lastUpload": "2018-07-21T06:40:26.779Z",
    "sync.lastDownload": "",
    "sync.forceDownload": false,
    "workbench.activityBar.visible": true,
    "workbench.colorTheme": "RailsCasts",
    "editor.matchBrackets": false,
    "materialTheme.fixIconsRunning": false,
    "editor.formatOnSave": false,
    
    // Prettier code formatter，Wells给的格式化代码配置
    "eslint.autoFixOnSave": false,
    "eslint.alwaysShowStatus": true,
    "prettier.eslintIntegration": true,
    "prettier.semi": false,
    "prettier.singleQuote": true,
    
    // vscode，erb关联html（配置语言的文件关联）。
    "files.associations": {"*.erb": "html"},

    // vscode，用户代码片段设置，控制键入时是否应自动显示建议
    "editor.quickSuggestions": {
      "other": true,
      "comments": false,
      "strings": false
    },
    // 控制是否将代码段与其他建议一起显示以及它们的排序方式。
    "editor.snippetSuggestions": "top",
    // 控制编辑器是否显示内联颜色修饰器和颜色选取器。
    "editor.colorDecorators": false,
}
```

## 2、用户代码片段

其中，scope 指定的是所作用的语言，perfix 是别名，$1 是光标位置，$2 是按下 tab 后光标的位置
```
	"Print to console": {
		"scope": "",
		"prefix": "lgg",
		"body": [
			"consggg.log('$1');",
			"$2"
		],
		"description": "Log output to console"
	}
```

```

	"01": {
		"prefix": "ff",
		"body": [
			"<% $1 %>"
		]
	},
	"02": {
		"prefix": "fff",
		"body": [
			"<%= $1 %>"
		]
	},
	"03": {
		"prefix": "lt",
		"body": [
			"<%= link_to '$1', '#', class:'btn btn-danger btn-sm pull-right' %>"
		]
	},
	"04": {
		"prefix": "ltp",
		"body": [
			"<%= link_to '$1', '#', class:'btn btn-danger btn-sm pull-right', method: :post %>"
		]
	},
	"05": {
		"prefix": "ltd",
		"body": [
			"<%= link_to '$1', '#', class:'btn btn-danger btn-sm pull-right', method: :delete, data:{confirm:"确认删除"} %>"
		]
	},
	"06": {
		"prefix": "tb1",
		"body": [
			"table.table.table-bordered>(thead>tr>th*4)+(tbody>tr>td*4)$1"
		]
	},
	"07": {
		"prefix": "tb2",
		"body": [
			"div.table-responsive>table#datatable-1.table.table-datatable.table-striped.table-hover>(thead>tr>th*4)+(tbody>tr>td*4)$1"
		]
	},
	"08": {
		"prefix": "sf",
		"body": [
			"<%= simple_form_for @$1 do |f| %><% end %>"
		]
	},
```

## 3、快捷键

### 1】最重要的快捷键，全局

```
shift+command+p
```





# 三、常用插件

```
CODE SETTINGS SYNC UPLOAD SUMMARY
Version: 3.0.0
--------------------
GitHub Token: 6c71860b6d1fd7445e8c63e25ca38dc3021d2471
GitHub Gist: ca8244aea88dce369d7a650431172186
GitHub Gist Type: Secret

Restarting Visual Studio Code may be required to apply color and file icon theme.
--------------------
Files Uploaded:
  keybindings.json > keybindingsMac.json
  99.code-snippets > snippets|99.code-snippets
  erb.json > snippets|erb.json
  gen80.json > snippets|gen80.json
  html.json > snippets|html.json

Extensions Ignored:
  No extensions ignored.

Extensions Removed:
  No extensions removed.

Extensions Added:
  auto-rename-tag v0.0.15
  beautify v1.3.2
  bracket-pair-colorizer v1.0.59
  code-runner v0.9.3
  code-settings-sync v3.0.0
  gen80-colorizer v0.0.2
  githistory v0.4.2
  google-translate-ext v1.3.0
  indenticator v0.6.0
  open-in-browser v1.1.0
  path-intellisense v1.4.2
  prettier-vscode v1.5.0
  project-manager v8.0.0
  rails v0.8.0
  rails-snippets v0.4.1
  railscasts v0.0.4
  rest-client v0.19.0
  Ruby v0.18.0
  spellchecker v1.2.13
  subtle-brackets v2.1.1
  vscode-colorize v0.6.21
  vscode-eslint v1.4.12
  vscode-gemfile v0.0.2
  vscode-html-css v0.2.0
  vscode-language-pack-zh-hans v1.25.3
  vscode-rufo v0.1.1
  vscode-todo-highlight v0.5.12
--------------------
Done.
```



## 1、Wells用的：

1）bootstrap 3 snippets

* 输入bs3，会出现很多智能代码

2）bootstrap 4, font awesome 4

* 输入b4-，智能代码
* 输入fa4-、fa5-、fa5p-，智能代码

3）html css support

4）html snippets，html代码片段

5）jquery code snippets，jquery代码片段

6）20180606删除mithril emmet，代码片段，用vscode自带的，设置

```
    // vscode，自带的emmet，输入后按tab键，将展开 Emmet 缩写
    "emmet.triggerExpansionOnTab": true,
```

## 2、Aron用的：

### 1）ruby，ruby语法比如def，ruby文件即rb文件的代码语法检查。

![image-20180511144103401](https://ws1.sinaimg.cn/large/006tNc79gy1fr7e8gsz01j30cn03eweu.jpg)



### 2）rufo (Ruby formatter)——（正在用，保存时自动格式化）

功能：rb格式化代码

1）安装vscode插件rufo (Ruby formatter)

2）安装gem

```
gem install rufo
```

* 此时，可以手动格式化，先shift+command+p，输入format document回车

3）vscode配置

```
  "[ruby]": {
    "editor.formatOnSave": true
  }
```

* 保存的时候，会自动格式化.rb文件的代码

### rb格式化代码——rubocop

1）安装gem rubocop，然后重启vscode

```
group :develop do
  gem 'rubocop', require: false
end
```

2）使用：右键-格式化代码，快捷键shift+alt+f

3）失败！！vscode配置保存时自动格式化

```
    // ruby，当保存文件时格式化代码
    "ruby.format": "rubocop",
```

* 缺点：自动格式化代码，还需要配置.rubocop.yml文件，不会用。

### 3）ruby，设置linter——rb实时代码检测

```
    // ruby，输入时自动语法检查
    "ruby.lint": {
        "reek": true,
        "rubocop": true,
        "ruby": true, //Runs ruby -wc
        "fasterer": true,
        "debride": true,
        "ruby-lint": true
    },
```

![image-20180511144016065](https://ws4.sinaimg.cn/large/006tNc79gy1fr7e7nhpmij30c502aaa6.jpg)

### 4）rails snippets——rb代码智能提示

### 5）erb格式化代码（无）https://github.com/rubyide/vscode-ruby/issues/56

### 6）erb实时代码检测（无）

### 7）rails snippets——erb代码智能提示

### 8）Beautify——css/scss/js格式化代码

### 9）eslint——css/scss/js实时代码检测

### 10）css/scss/js代码智能提示（无）

### 11）==rails——文件跳转，vscode-转到定义==

1）command+单击，或fn+F12

作用：跨文件跳转。比如引用的类Product、引用的方法current_user。对于引用的类或方法会在鼠标划过的地方高亮显示。

2）fn+alt+F12，按esc退出预览窗口

作用：预览

3）ctrl+-

作用：后退

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fr8zx3nek6g30of0ba1kx.gif)

### 1】Code runner，在vscode中执行代码

功能：Code runner，在vscode中执行代码。 --- 支持多种语言例如： C，C++，Java，JavaSript，PHP，Python，Perl，Perl6 等

![image-20180512174559052](https://ws4.sinaimg.cn/large/006tKfTcgy1fr8p73cif1j30mi0i5jw9.jpg)

**类似的 Extension:**

* [Quokka.js](https://link.zhihu.com/?target=https%3A//quokkajs.com/) ---支持 JavaScript 和 TypeScript。
* [Runner](https://link.zhihu.com/?target=https%3A//marketplace.visualstudio.com/items%3FitemName%3Dmattn.Runner)

### 2）Bracket Pair Colorizer，彩色的括号{}/[]/() 

功能：彩色的括号{}/[]/()

1）安装后重启生效

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fr8pqfxa34j30cb04c743.jpg)

### 3】Indent Rainbow，缩进位置分别按四种颜色显示

功能：缩进位置分别按四种颜色显示

1）可配置颜色

```
  // An array with color (hex, rgba, rgb) strings which are used as colors, can be any length.
  "indentRainbow.colors": [
    "rgba(64,64,16,0.3)",
    "rgba(32,64,32,0.3)",
    "rgba(64,32,64,0.3)",
    "rgba(16,48,48,0.3)"
  ]
```

![image-20180512180644873](https://ws1.sinaimg.cn/large/006tKfTcgy1fr8pssqa5nj306b034aaf.jpg)

### 4】Snippets，常用的代码片段

功能：Snippets 是一些常用的代码片段，比如说 `import React from 'react';` 这些常用的代码，我们只需要打 `imr`  然后按下 tab 键就能自动帮我们补全。同样的 `clg` 会变成 `console.log`。

### 常用extension：

* [JavaScript (ES6) code snippets](https://link.zhihu.com/?target=https%3A//marketplace.visualstudio.com/items%3FitemName%3Dxabikos.JavaScriptSnippets)
* [React-Native/React/Redux snippets for es6/es7](https://link.zhihu.com/?target=https%3A//marketplace.visualstudio.com/items%3FitemName%3DEQuimper.react-native-react-redux)
* [React Standard Style code snippets - Visual Studio Marketplace](https://link.zhihu.com/?target=https%3A//marketplace.visualstudio.com/items%3FitemName%3DTimonVS.ReactSnippetsStandard)
* [React Standard Style code snippets - Visual Studio Marketplace](https://link.zhihu.com/?target=https%3A//marketplace.visualstudio.com/items%3FitemName%3DTimonVS.ReactSnippetsStandard)

### 5】TODO，加备注

功能：高亮TODO，并可以搜索。通常我们编写代码的时候，会觉得当前实现不优雅，有更好的实现方式。我们会习惯性的加上`// TODO: Needs Refactoring` 或者其他内容。

1）搜索前，需要在配置里加入文件类型

```
      // TODO，用List hilighted annotations进行搜索时，需要提前配置文件类型
    "todohighlight.include": [
        "**/*.js",
        "**/*.jsx",
        "**/*.ts",
        "**/*.tsx",
        "**/*.html",
        "**/*.php",
        "**/*.css",
        "**/*.scss",
        "**/*.erb",
        "**/*.rb",
        "**/*.yml",
        "**/*.md"
    ]
```



![image-20180512182406424](https://ws3.sinaimg.cn/large/006tKfTcgy1fr8qav1vt6j306x022q32.jpg)

### 6】REST Client，测试我们的 API ，替代chrome的postman

作为一个 Web 开发，我们经常需要使用 REST API。为了检测 URL 并检测响应，我们一般会使用 **Postman** 这类工具来测试。但是如果使用了  [REST Client](https://link.zhihu.com/?target=https%3A//marketplace.visualstudio.com/items%3FitemName%3Dhumao.rest-client) 这个插件我们就可以直接在 VSCode 中来测试我们的 API 了。

![image-20180512183119791](https://ws1.sinaimg.cn/large/006tKfTcgy1fr8qidge2yj30ip09ln0g.jpg)

1）测试api接口，新建demo.http文件

```
GET http://news-at.zhihu.com/api/4/news/latest
```

2）用法：alt+command+r，或shift+command+p输入Rest Client: Send Request。

### 7】Auto Rename Tag，同步修改标签前后的内容

功能：同步修改标签前后的内容。它的兄弟插件Auto Close Tag，试用了和emmet功能重复，且远没有emmet好用。

![image-20180512184752376](https://ws2.sinaimg.cn/large/006tKfTcgy1fr8qzl95oqj306w01lweg.jpg)



### 8】Git History，显示git的提交记录

功能：显示git的提交记录。

1）安装、重新加载，必须重启vscode

2）必须打开想要查看记录的文件，然后shift+command+p输入想查看内容

```
Git：View History
Git：View File History
Git：View Line History
```

### 9】Project Manager，切换项目。 

### 10】Indenticator，左侧高亮竖线，显示缩进的深度。

![image-20180512190847237](https://ws3.sinaimg.cn/large/006tKfTcgy1fr8rlcmu96j306r05hgm6.jpg)

 

### 11】Setting Sync，同步vscode的插件和设置

功能：同步vscode的插件和设置。

1）==报错==：vscode settings Sync : Invalid / Expired GitHub Token. Please generate new token with scopes mentioned in readme. Exception Logged in Console.

==解决办法==：shift+command+p输入sync: Reset Extension Settings。

2）然后重新shift+alt+u，在github上新建token，最后回到vscode在弹出的输入框里输入这个token。

```
我的token：6c71860b6d1fd7445e8c63e25ca38dc3021d2471
我的GIST ID : ca8244aea88dce369d7a650431172186 
```

成功会在输出里提示Done，以及弹窗提示GIST ID（必须记录下来）：

![image-20180512201633955](https://ws3.sinaimg.cn/large/006tKfTcgy1fr8tjvhkjyj30ot06ldi4.jpg)

3）访问设置的网址

[https://gist.github.com/{your_userName}/{gist_id}](https://gist.github.com/%7Byour_userName%7D/%7Bgist_id%7D)

替换成自己的：

```
https://gist.github.com/jiujiubad/ca8244aea88dce369d7a650431172186
```

4）手动上传配置：shift+alt+u

5）在其他电脑上下载配置：shift+alt+d，填写token和gist id

### 12】filesize，左下角显示文件大小。

![image-20180512220902298](https://ws1.sinaimg.cn/large/006tKfTcgy1fr8wsw82qnj30bf00kq2x.jpg)

### 13】Subtle Match Brackets，点击括号{}/[]/()，会显示下划线 

![image-20180512220835818](https://ws2.sinaimg.cn/large/006tKfTcgy1fr8wsfu4cfj305s00nwee.jpg)

### 14】Chinese (Simplified) Language Pack for Visual Studio Code，配置信息翻译成中文 

功能：配置信息翻译成中文。

### 15】Material Icon Theme，主题 

功能：文件图标，超简洁好看。

### 16】主题：One Monokai Theme，主题

功能：主题，99最喜欢的两款之一。

### 17】主题：RailsCasts，主题

功能：主题，99最喜欢的两款之一。

### 18）主题：Material Theme

功能：主题，适用于 Markdown

### 19】open in browser，在浏览器打开当前文件 

功能：在浏览器打开当前文件。





# 四、其他插件

### 1】Import Cost，导入包的时候就提示这个包有多大

功能：[Import Cost](https://link.zhihu.com/?target=https%3A//marketplace.visualstudio.com/items%3FitemName%3Dwix.vscode-import-cost) 这个扩展简直惊艳到我了，之前写代码的时候很少有关注导入包的大小。只有在后期优化的时候才考虑这些问题。但是这个插件可以在你导入包的时候就提示这个包有多大。

![image-20180512184229248](https://ws4.sinaimg.cn/large/006tKfTcgy1fr8qtzgbw5j30gb02paat.jpg)

### 2】Path Intellisense，路径提示

功能：路径提示器。——试用后感觉写js会好一点，ruby作用不是很大。

![image-20180512221213656](https://ws1.sinaimg.cn/large/006tKfTcgy1fr8ww7m323j309i016jrm.jpg)

### 3】Output Colorizer 或 GEN80 Output Colorizer，给“输出”窗口的代码配色

功能：与vscode终端在同个窗口的“输出”窗口，给里面的代码配色。

1）==报错==，安装后不生效。搜索后，发现可能是跟其他的插件冲突。

解决办法：换用GEN80 Output Colorizer

![image-20180512221114614](https://ws1.sinaimg.cn/large/006tKfTcgy1fr8wv6sjyhj30d104bac8.jpg)

### 4】Spellchecker，markdown、text文件拼写检查

功能：markdown、text文件拼写检查。——试用觉得不太实用，md文档不怕打错字，而ruby文件又有ruby语法检查。

![image-20180512221014558](https://ws2.sinaimg.cn/large/006tKfTcgy1fr8wu56a2aj303m00kt8k.jpg)

### 5】CodeBing，搜索vscode里的文字（搜索不如Alfred）

功能：指定浏览器搜索vscode里的文字。——感觉有Alfred就足够了。

### 6】colorize，颜色代码用颜色块显示 

功能：颜色代码用颜色块显示。——vscode自带有小颜色块，暂时不用。

### 7】google translate，谷歌翻译

功能：在vscode上进行谷歌翻译。



