---
title: ror-system-rails101
date: '2017-12-13 10:25'
categories:
  - ror系统
tags:
  - ror系统
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: e434021
---

* 201802
* 编程+rails

## 2、基础建设

rails new、git init，或者是git clone、cp config/database.yml.example config/database.yml、bundle install

①、gem 'bootstrap-sass'，css、html、flashes

②、gem 'devise'，做navbar的login、logout、signup

③、gem 'simple_form'

④、gem 'font-awesome-rails'，加入登录和退出小图标



## 3、讨论群架构

- 讨论群要有“标题”与“叙述”
  - group的CRUD
- 使用者要可以看到“讨论群一览表”
- 把new和edit换成partial表单

![](https://ws4.sinaimg.cn/large/006tKfTcgy1flv9a9md7pj30rk0dmwfo.jpg)

## 5-4、权限设置

- 只有登录了的使用者，才可以建立群组

  - 设置关系，<%= group.user.email %>

- 只有群组的建立者，才可以 编辑 / 删除群组

  - `<% if current_user && current_user == group.user %>`

- 没登录的路人，不能通过网址进入后台

  - ```
    before_action :authenticate_user! , only: [:new, :create, :edit, :update, :destroy]
    ```

- 已登录的用户，不能通过网址进入后台

  - 定义find_group_and_check_permission方法

    ```
      def find_group_and_check_permission
        @group = Group.find(params[:id])

        if current_user != @group.user
          redirect_to root_path, alert: "You have no permission."
        end
      end
    ```



## 6、posts的CRUD

- 可以在群组里面新增 / 编辑 / 删除文章
  - 新建model前注意看model文件夹，要加入哪些外键，并设置好关系
  - posts的CRUD，注意create的action较难
- 文章必须要有“内容”，否则不允许被发表
  - validates限制content内容不能空、order排序用到scope、分页gem 'will_paginate'

![](https://ws1.sinaimg.cn/large/006tKfTcgy1flvattp5v8j30rq0a5jsh.jpg)



### 6-2、我发现：

1、current_user是devise这个gem的方法，代表是已登录的用户。所以可以用`<% if current_user %> `来判断用户是否登录。

2、每次新建model时，看下model文件夹下已有的跟它有没有关系，如果有就把相应的外键xx_id栏位加上。保存后设置相互关系。

### 6-2、posts的CRUD思路（特别是create这个action里指定外键）：

①、定义post的new的action，按照网址`http://localhost:3000/groups/9/posts/new`需要知道@group的id

```
  def new
    @group = Group.find(params[:group_id])
    @post  = Post.new
  end
```

②、首先要在view的new表格里填写content并保存，这里用到simple_form_for和[@group, @post]

```
<%= simple_form_for [@group, @post] do |f| %>
  <%= f.input :content %>
  <%= f.submit "保存", data:{disable_with:"正在保存.."} %>
<% end %>

```

③、系统提示缺少create的action。因为post有两个外键，这里需要指明它们具体是什么，即@post.group = @group、@post.user  = current_user两个表达式的左边。因为第一个表达式的@group未知，所以补充了`@group = Group.find(params[:group_id])`

```
  def create
    @post = Post.new(post_params)
    @group = Group.find(params[:group_id])
    @post.group = @group
    @post.user  = current_user
    if @post.save
      redirect_to group_path(@group)
    else
      render :new
    end
  end
```

④、另外，因为要在`http://localhost:3000/groups/9`页面显示post，即需要用到`@posts.each do |post|`，所以要在grroup的show的action里加入`@posts = @group.posts`

### 6-2、问题：

#### 1、跟招聘网中的一样，create的action中，因为group有外键user_id要注明@group.user = current_user，感觉应该只在creat这个action加入就可以而edit不用因为数据库在create时已经记录。

①、在create的action中为什么要加@group.user = current_user ？

【待完善的解释】：

因为user用户有很多个，用@group.user = current_user 来指明这个群组具体是谁创建的。测试发现，当user和group的model没有建立关系时，没有`@group.user = current_user `也能创建group；但是当group的model加入`belongs_to :user`后不能创建。而且原来的数据库要删除，因为user_id为nil会报错。

![](https://ws2.sinaimg.cn/large/006tKfTcgy1flu94poavsj30s50cymzk.jpg)

②、如果model中没有写group和user的关系，会发生什么报错 ？

undefined method，跟上面①的报错类似。

```
undefined method `user' for #<Group:0x007fc0c0f48728>
Did you mean?  user_id
```



## 7、退出/加入群组（非常陌生）

- 一个使用者可以选择“加入”、“退出”讨论群
  - 建立群成员的关系表
  - 会员要可以在社团里面看到自己“是否群组成员”，即views层面
  - 实作 model 层 “加入群组”、“退出群组”
  - 实作controller里的 “加入群组”、“退出群组”
- 群的创始者，创群一开始就应该加在群组里
  - 新建group后自动成为group的一员，在create中操作

![](https://ws1.sinaimg.cn/large/006tKfTcgy1flvav0tsp7j30qx0f9q4s.jpg)

### 难点解答：

#### 1、用类似招聘网的**is_hidden和is_admin**即数据库的方式，可以判断做出**views层面**的join/quit（加入/退出群组），但是所有用户登录进去都显示是群组成员。。

【问题1】在于，不知道哪个用户是哪个群组的成员？用is_member一个栏位，要不add_to_user要不add_to_group，不管加入哪一边，另一个变量就不知道具体是指哪一个个体，所以就会出现上面描述的现象：所有用户登录进去都是显示群组成员。

【小结】目前学会的两种判断对错的方法，①、用布林值boolean，是涉及一个model对象判断对与错（比如is_admin只判断user是不是admin，比如is_hidden只判断job是否隐藏）在数据库层面通过update_columns判断。注意：这种方法可能不适用与多对多（需进一步验证）。②、多对多关系（比如这里判断user是不是属于group，涉及两个model，所以用boolean来判断会说不清楚）。设置关系后，通过.includes？、<<、.delete(group)等方式来判断和操作。

#### 2、关键是，这里还想捞出 “群组的所有用户” 和 “用户参与的所有群组” ，所以必须讲清楚关系。

【问题2】has_many :participated_groups和has_many :members，这里的participated和member是不是rails内建的词语，换成其他词语行不行？

【解答】测试发现，participated和member是自定义的，改成par和mem也可以。

#### 3、【问题3】下面这段rails c里的代码怎么解读

```
 u = User.first  
 g = Group.first
 g.members << u
 g.members
 u.participated_groups
```

* 定义单数的u

  定义单数的g

  **g群组包含成员u**

  显示g群组的成员——可以看到成员u在群组g里面

  显示成员u所参加的群组——可以看到成员u所参加的群组里有g

#### 4、【问题4】解读代码

```
app/models/user.rb
+    def is_member_of?(group)
+      participated_groups.include?(group)
+    end
```

* 这个用户参与的所有群组participated_groups中，包含了group这个群组即include?(group)

* 因为用的是判断式include?，所以返回的值是true或false。

  * ```
    u = User.first
    g = Group.first
    u.is_member_of?(g)
    ```

【问题5】include？与<<有什么区别？

解答：**include？是一种状态的判断**，如`participated_groups.include?(group)`是说参与的群是不是**包含了**group。**<<是一个动作**，如`g.members << u`是说让g的所有用户**包含**用户u。

#### 5、views层面的加入/退出群组：user的model加入`is_member_of?(group)`来判断

#### 6、model层面的加入/退出群组。

​      因为是用户在执行join和quit，所以在user的model里定义。

```
  app/models/user.rb
  
  def join!(group)
    participated_groups << group  #该用户参与的所有群组包含group这个群组
  end

  def quit!(group)
    participated_groups.delete(group) #[问题]如果这里用destroy行不行？
  end
```

rail c里的测试解读：

```
u = User.first
g = Group.first
u.join!(g)
u.is_member_of?(g)
u.quit!(g)
u.is_member_of?(g)
exit
```

#### 7、controller里的join和quit

```
+  def join
+   @group = Group.find(params[:id])
+  
+    if !current_user.is_member_of?(@group)
+      current_user.join!(@group)
+      flash[:notice] = "加入本讨论版成功！"
+    end
+  
+    redirect_to group_path(@group)
+  end
```

#### 8、创办群组的时候自动加入群组，又是在creat的action中加入。注意这里是用model里的join!方法，而不是同个文件controller里的join方法。

```
  def create
    @group = Group.new(group_params)
    @group.user = current_user
    if @group.save
+     current_user.join!(@group)
      redirect_to groups_path
    else
      render :new
    end
  end
```



## 8、

- 新增一个下拉选单


- 可以看到自己过去曾经发表的文章
- 可以看到自己过去曾经参与的社团

![](https://ws1.sinaimg.cn/large/006tKfTcgy1flvalg3hmqj30m80a6my4.jpg)



## 9、

- 了解 Helper 是什么，怎么使用

  * 换行显示simple_format(group.description)
  * 自定义helper，<%= render_group_description(group) %>

- 了解 Partial 是什么，怎么使用

  - 共用表单的作用，并且可以设置参数来替代<% @groups.each do |group| %>

    `<%= render :partial => "group_item", :collection => @groups, :as => :group %>`



## 10、上传

1、上传github

`git remote add origin git@github.com:你的github名字/rails101-1.git`
`git push -u origin master`

`git push --all origin`

* github报错强推`git push origin master —force`

2、上传heroku

* 修改 Gemfile 文件，把 sqlite3 从第7行搬到约第30到40行的group :development, :test do

* 在末尾新增一个 production group，加上 pg 这个 gem。然后`bundle install`

  ```
  group :production do 
    gem 'pg'
  end 
  ```

* heroku login

  heroku create

  git push heroku ch08:master

  heroku run rake db:migrate

  * 新建`heroku create app名字`


*   改名`heroku apps:rename 新app名字`

  * 删除`heroku apps:destroy app名字`

  * 报错强推`git push -f heroku master`

  * 报错debug，`heroku logs | grep -i error`

  * 清空数据

    * ```
      heroku pg:reset DATABASE（清空heroku数据库，比如旧的seed档）
      heroku run rake db:migrate
      heroku run rake db:seed
      ```

