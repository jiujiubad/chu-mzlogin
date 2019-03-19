* 201804
* 编程+rails

# 搜索gem ransack问题

## bug ransack heroku operator does not exist: integer

* 报错如下：

```
ActionView::Template::Error (PG::UndefinedFunction: ERROR:  operator does not exist: integer ~~* integer
```

* sql查询语句如下（ILike后应该是我们查询的关键词，这里不管查什么词都变成0）：

```
SELECT  "guanggaos".* FROM "guanggaos" WHERE ("guanggaos"."zhanxianliang" ILIKE 0) LIMIT $1 OFFSET $2):
```

* 我的代码如下，**==问题出在栏位zhanxianliang上，删掉或把cont改成eq就不会报错==**。

```
<%= search_form_for @q do |f| %>
  <%= f.search_field :riqi_or_huobi_or_guanggao_huodongmingcheng_or_guanggaozu_mingcheng_or_guanjianzi_or_pipeileixing_or_kehu_sousuoci_or_zhanxianliang_cont %>
<% end %>
```

### 方法一：官方及stackoverflow（！！失败）

1）github ransack

* https://github.com/activerecord-hackery/ransack/wiki/Using-Ransackers，Convert an integer database field to a string
* https://github.com/activerecord-hackery/ransack/issues/709

2）stackoverflow，https://stackoverflow.com/questions/32477415/in-rails-ransack-search-gives-the-error-pgundefinedfunction-error-operator

### 方法二：logdown（！！失败）

google到解法是需要把id装化成text来进行搜索。

```
def self.search(search)
  where("cast(id as text)  LIKE ?", "%#{search}%")
end
```

http://3014zhangshuo.logdown.com/posts/1450931-notes-mysql-and-pg-database-bug

### 方法三：可以用第二个搜框来区分开数字。——或是，干脆把数字搜索砍掉，想想为什么要搜索数字，好像根本没必要（！！成功）

1）把所有的integer、float、日期datetime类型的栏位删掉，剩下的代码如下：

```
<div style="float:left">
  <%= search_form_for @q do |f| %>
    <%= f.search_field :guanggao_huodongmingcheng_or_guanggaozu_mingcheng_or_pipeileixing_or_kehu_sousuoci_cont %>
    <%= f.submit %>
  <% end %>
</div>
```

搞定！！顺便，之前部分栏位搜索不精准的问题也同时解决了，估计不精准是因为受到数字类型栏位的影响。