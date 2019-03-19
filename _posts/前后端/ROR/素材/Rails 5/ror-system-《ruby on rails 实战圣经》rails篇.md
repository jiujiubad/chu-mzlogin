---
title: 《ruby on rails 实战圣经》rails篇
date: '2018-01-20 00:10'
categories:
  - ror系统
tags:
  - ror系统
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: 4ec09a62
top: 2

---

* 201801
* 编程+rails

[TOC]



# 一、Ruby on rails 1 简介

## 1、经历

Perl CGI，用程式输出html。2000年动态网。

php，在html里面内嵌程式的写法，`<?php...?>`。

php&mysql，开头在<?php..?>里连接资料库，主体html里用sql操作资料库，用php把资料印出来。2000年初动态网。

2005，因为php代码会越做越混乱，自己刻php web framework，用于学校系统。 

* MVC，更系统地组织代码
* ORM，使用物件导向语法操作资料库 
* ORL，自有弹性的网址 

## 2、ruby on rails特色

ruby on rails设计原则与特色

1、不重复自己。

2、惯例优于设定。



# 二、Ruby on rails 2 安装

```
gem list #列出所有的gem清单
```

ruby安装

rails安装



# 三、Ruby on rails 3 起步走

## 1、新建专案

```
rails new demo --skip-test-unit
```

命令附加参数是忽略掉测试的目录，因为我们会用rspc测试框架而不是rails内建的test-unit。不过2017版的ruby好像改善测试了。

**index.html.erb**，这里的erb是用ruby语法的意思，在文件里可以运算ruby，比如<%= 1+1 %>。

**link_to**是rails提供的方法，在view里我们叫它helper。

## 2、新建资料库

`rake db:create`，建立sqlite3资料库。

## 3、快速产生预设demo样板

```
rails g scaffold person name:string bio:text birthday:date
```

会快速产生MVC程式码，快速产生CRUD、路由、model、view、db等预设的文件。——有经验的工程师一般不用。

`rake db:migrate`，实际在资料库建立table。



# 四、Ruby on rails 4 手工打造CRUD应用程式

## 1、SourceTree工具，管理git

```
stree #打开SourceTree工具
```

用法在5分钟的时候，看不懂？？？

## 2、rails c里，操作资料库：

x = Event.find(1)，查找id为1的资料。

更新资料x.name = "RAisl"。

Event.where(:opacity => 100).first

Event.where( ["opacity >= ?", 100] ).limit(3).order("id desc")

x.errors，看报错。

x.errors.full_messages，看具体报错。

##  3、DB Browser工具，查看migration

用于打开table的档案，看这个table长什么样子。

rails migration的好处：①、纳入git版本管理；②、应用程式升级时，只要rake db:migrate；③、跨资料库通用的，不需要修改代码。

添加栏位时，如果model已经建立过，就不需要再建立model，直接用rails g migration。

## 4、资料验证validation

## 5、外卡路由（不安全）

`match ':controller(/:action(/:id(.:format)))', :via => :all`  ，万能的路由设置方法/foo/bar，第一段是controller，第二段是action。

放在最下面是因为处理顺序是从上到下，如果上面有自定义的会优先执行。

## 6、新建controller

### 6.1 @event是什么？

所有在controller里带有小老鼠@的变量，都会传到template使用。

### 6.2 params[:event]是什么？

在create时，查看rails s里的信息，params就是送出的params代表的那笔资料。

在rails c中，可以这样写Event.new( :name => "QQ", :description => "fdsfds")；

在controller中，写法类似，都是在new里初始化一个hash，比如下面的params[:event]就是用一个hash来传递参数。

```
def create
  @event = Event.new(params[:event]) //因为浏览器安全过滤，这部分还要再提取到event_params里
  @event.save
end
```

## 7、页面

simple_format，自动换行。

## 8、其他小功能

## 1、layout

比如在controller设置`@page_title = @event.name`，然后在layout设置

```
<title><%= @page_title || "JDstore" %></title>
```

## 2、partial template

即重复使用template样板。  

## 3、before_action

重构controller里的Event.find()。

## 4、新增/编辑时显示错误信息

reder，返回，会保留已经编辑了一半的数据。

redirect_to，重定向，正在编辑的数据会被清除重新打开xx页面。

## 5、flash

## 6、rails c跑回圈

```
100.times do |i|
  Event.create( :name => "Event #{i}")
end
```

## 7、分页kaminnari

 



 

# 五、Ruby on rails 5-1 RESTFUL

《ruby on rails实战圣经》https://ihower.tw/rails/

取代外卡路由的写法，外卡路由代码臃肿，且太自由有安全隐患。

# 六、Ruby on rails 5-2 RESTFUL

# 七、Ruby on rails 5-3 RESTFUL

REST的核心精神：

* 提供routing设计准则，以及controller、action命名和组织惯例。


* 同个action，可以respond_to不同的format格式。

rails的命名惯例，分三段action.format.render，即action.格式.引擎。比如index.html.erb、index.xml.builder。

# 八、Ruby on rails 5-4 RESTFUL

## 1、写法

```
def index
  @events = Event.all
  respond_to do |format|
    format.html #index.html.erb
    format.xml{
      render :xml => @events.to_xml
    }
    format.json{
      render :json => @events.to_json
    }
    format.atom{
      @feed_title = "My event list"
  	} #index.atom.builder
  end
end
```

chrome显示样式，安装插件json formatter。



json指定具体栏位

```
format.json{
  render :json => {id:@event.id, name:@event.name}.to_json
}
```



拿json，只要稍微修改路径。比如`<%=link_to('get json', event_path(e, :format=> :json)) %>`。



命令`rake stats`，计算写了多少行代码。



## 2、如何除错debug

在html，<%= debug(@events[0]) %>

在controller， Rails.logger.debug("xxxx": + @events.count) 





# 九、Ruby on rails 6 Heroku

# 十、Ruby on rails 7 Bootstrap

## 1、rails的功能Asset Pipeline

前端的东西统一由rails来管理。 会把所有css、js配置压缩打包在head里的档案中，所以会加快浏览器下载速度，因为会减少浏览器发request的次数。

另外，它还支援其他css、js的写法。

* 比如，最出名的[sass](sass-lang.com)是进阶的css写法，支援变数、nesting写法、partial写法、import等。
* 比如，js的[CoffeeScript](coffeescript.org)，支援class继承写法，看起来像ruby但会转成js。 



一般会在部署的过程做compile，比如用命令模拟`rake assets:precompile`，会在public的文件夹里出现编译的结果。



如何处理图片

`cp ~/Picture/xx.png app/assets/images`，复制照片。

用image_tag这个rails的helper调用，`<%= image_tag("xx.png") %>`。

如何在css调用图片档名？

* 办法一（常用）：把application.css改为application.css.scss
  * `background-image: image-url("xx.png");`

* 办法二：把文件名由application.css改为application.css.erb，用asset_path这个help找到实际档名
  * `background-image: url('<%= asset_path("xx.png")');`




# 十一、Ruby on rails 8-1 一对多

## 1、可以修改自己的专案：

1）新建model时为外键生成索引，`add_index :attedees, :event_id`。

2）路由重命名，ihower个人喜好用event_attendees。

3）before_action :find_event。

4）外键加索引add_index。



# 十二、Ruby on rails 8-2 一对多

下拉单选有三种写法，以下两种，加上第10讲collection的二维阵列（没有用循环）。

## 1、下拉单选用select。

```
<%= f.select :category_id Category.all.map{ |x| [x.name, x.id] } %>
```

## 2、下拉单选用f.collection，效果同1）。

```
<%= f.collection_select :category_id Category.all, :id, :name %>
```

* 增加预设的空值，在后面加上`:include_blank => "Please select"`
* 增加预设空值，也可以用`:prompt => "Please select"`，新增是会有这个选项，但是编辑时没有。

## 3、ABCD单选用radio_button

比如单选event属于什么分类。

```
<% Category.all.each do |c| %>
  <%= f.radio_button :category_id, c.id %> 
  <%= c.name %>
<% end %>
```



## 2、新增栏位，旧数据报错的处理办法：

1）用try，比如

````
<%= @event.category.try(:name) %>
````

2）用delegate。比如在model增加宣告

```
delegate name, :to => category, :perifx => true, :allow_nil => true
```

在view修改

```
<%= @event.category_name) %>
```





# 十三、Ruby on rails 9 多对多

## 1、同百宝箱核选方块： 

1）在view用collection_check_boxes。

```
<%= f.collection_check_boxes(:group_ids, Group.all, :id, :name) %>
```

并在controlle白名单的最后加上`:groups_ids => []`，注意要放在最后。



# 十四、Ruby on rails 10 RESTFUL collection

## 1、案例一，客制化自己的路由get。

## 2、案例二，一次删除多笔资料post。

1）veiw用form标签，或用button_to实际上会自带form标签。

2）controller

```
def bulk_delete
  Event.destroy_all
  redirect_to :back
end
```

## 3、案例三，用核选方块选择删除/编辑哪些资料post。

1）view用form标签。

```
<%= form_tag bulk_update_events_path do %>
  <% @events.each do |e| %>
    <tr>
      <td>
        <%= check_box_tag "ids[]", e.id, false %>
      </td>
    ....
    </tr>
  <% end %>
  <%= submit_tag "Delete" %>
  <%= submit_tag "Publish" %>
<% end %>
```

2）controller，用Array方法让传进来的参数不管是不是数组都转化成数组，比如当参数是1或nil时。

```
def bulk_update
  ids = Array(params[:ids])
  events = ids.map{ |i| Event.find_by_id(i) }.compact
  
  if params[:commit] = "Delete"
    events.each{ |e| e.destroy}
  elsif params[:commit] = "Publish"
    events.each{ |e| e.update(:status => "published") }
  end
  
  redirect_to :back
end
```

* 如果是find(i)找不到会丢一个例外出来，如果用find_by_id(i)找不到会回传nil。
* compact，会把阵列里的nil去除。
* chrome检查"Delete"按钮、"Publish"按钮，看到都是name="commit"。在console log也可以看到。

3）用二维阵列做status的下拉选单

```
<div class="form-group">
  <%= f.label :status, "Status" %>
  <%= f.select :status, [["Published", "published"],["Draft", "draft"]] %>
</div>
```



# 十五、Ruby on rails 11 RESTFUL member

自定义每笔资料的页面。



# 十六、Ruby on rails 12 RESTFUL其他

在同个页面做过滤，相当于关键字搜寻。

排序。

```
if params[:keyword]
  xxx
end

if params[:order]
  xxx
end
```



# 十七、Ruby on rails 13 RESTFUL namespace



# 十八、Ruby on rails 14 Devise

# 十九、Ruby on rails 15 Rake

# 二十、Ruby on rails 16 Authorization用户权限

# 二十一、Ruby on rails 17 paperclip上传