---
title: ror-function-搜索(大数据量)如elastic：gem searchkick
date: '2018-01-10 00:10'
categories:
  - ror功能
tags:
  - ror功能
img: 'https://ws3.sinaimg.cn/large/006tNc79gy1fnfvqdlgzej30d608s74i.jpg'
abbrlink: c8b6f8d4
---

* 201801
* 编程+rails



# 一、参考资料

## 1、用gem elasticsearch-rails还是searchkick？

1）searchkick有更多的基于个人用户的定制，[gem elasticsearch-rails](https://github.com/elastic/elasticsearch-rails)只是ElasticSearch团队的一个语言库。[参考资料点击](https://stackoverflow.com/questions/26210175/what-is-the-difference-between-searchkick-and-elasticsearch-rails)。

## 2、Ruby on rails 实战圣经

*ActiveReord*: 加强搜寻

* [Ransack](https://github.com/activerecord-hackery/ransack)可以很快的针对*ActiveRecord*做出排序和复杂的条件搜寻。不过 ransack 并不太考虑效能问题，特别是文字模糊搜寻，这部份网站长大后会改用全文搜寻引擎，例如 [ElasticSearch](https://www.elastic.co/)

## 3、Ruby on rails 实战圣经

[全文搜尋*Full-text search engine*](https://ihower.tw/rails/performance-cn.html)

如果需要搜尋*text*欄位，因為資料庫沒辦法加索引，所以會造成*table scan*把資料表所有資料都掃描一次，效能會非常低落。這時候可以使用外部的全文搜尋伺服器來做索引，目前常見有以下選擇：

* *Elasticsearch*全文搜尋引擎和*elasticsearch-rails gem*
* *Apache Solr(Lucenel)*全文搜尋引擎和*Sunspot gem*
* *PostgreSQL*內建有全文搜尋功能，可以搭配 *texticle gem*或 *pg_search gem*
* *Sphinx*全文搜尋引擎和*thinking_sphinx gem*





# 二、搜索gem选哪个？

## 1、结论

1）效能要求较低，一万笔以内的数据，用[gem ransack](https://github.com/activerecord-hackery/ransack)；

2）几万笔属于，用elasticsearch，其中最好用的是[gem searchkick](https://github.com/ankane/searchkick)；

> searchkick建立在[elasticsearch-transport](https://github.com/elastic/elasticsearch-ruby/tree/master/elasticsearch-transport)和[elasticsearch-api](https://github.com/elastic/elasticsearch-ruby/tree/master/elasticsearch-api)之上，详见[gem elasticsearch-ruby](https://github.com/elastic/elasticsearch-ruby)的README的Usage。

# 二、searchkick实作

[gem '**searchkick**'](https://github.com/ankane/searchkick)

[Rails，ElasticSearch和SearchKick深入](https://www.webascender.com/blog/rails-elasticsearch-searchkick-depth/#.WLQdQxJ96O8)，进阶用法。

[视频+代码教程Searchkick and Elasticsearch | Drifting Ruby](https://www.driftingruby.com/episodes/searchkick-and-elasticsearch)

[刘鲁鹏同学的blog elasticsearch部署linode](http://liulupeng-blog.logdown.com/)

[刘鲁鹏作品Pharmabook](http://www.chinapharmabook.com/apis)

[视频例子 Ruby on Rails - Railscasts #306 Elasticsearch Part 1](https://www.youtube.com/watch?v=0j-gNrLfDFs)



[gem 'searchkick'搜索功能 by-毛尧吉](http://milesmao233.logdown.com/posts/1479410-gem-searchkick-search-function)

[用searchkick来实现敏捷搜索 by-yammy](http://yammy-blog.logdown.com/posts/1545031)

[如何在linode服务器端，实现elasticsearch敏捷搜索 by-LIULUPENG](http://liulupeng-blog.logdown.com/posts/2132069-the-linode-server-enable-elasticsearch-quick-search)

[Elasticsearch 實戰筆記 by-StevenTTuD](http://steventtud.logdown.com/posts/2016/09/11/862748)



优先按刘鲁鹏，其次毛尧吉、yammy实作帖子

官网searchkick，以及transport和api

微信求助

## 一、失败！！第一次测试

`gem 'searchkick'`

`brew cask install caskroom/versions/java8`，安装好久30分钟。

` brew install elasticsearch`，安装好久15分钟。

`brew info elasticsearch`，查看是否安装成功。

`launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist `，。。没有显示



## 二、

开启elasticsearch后，看是否有数据http://localhost:9200/?pretty

1、第一次用`Job.reindex`

```
 apple@apple-2 ⮀ ~/rails/job-listing1129 ⮀ ⭠ master± ⮀ rails c
Running via Spring preloader in process 3835
Loading development environment (Rails 5.0.6)
2.3.1 :001 > Job.reindex
  Job Load (5.0ms)  SELECT  "jobs".* FROM "jobs" ORDER BY "jobs"."id" ASC LIMIT ?  [["LIMIT", 1000]]
  Job Import (1808.1ms)  {"count":998}
 => true
2.3.1 :002 > exit
```

执行`rake searchkick:reindex CLASS=Job`报错，再次`Job.reindex`报错

```
 ✘ apple@apple-2 ⮀ ~/rails/job-listing1129 ⮀ ⭠ master± ⮀ rails c
Running via Spring preloader in process 3905
Loading development environment (Rails 5.0.6)
2.3.1 :001 > Job.reindex
  Job Load (3.7ms)  SELECT  "jobs".* FROM "jobs" ORDER BY "jobs"."id" ASC LIMIT ?  [["LIMIT", 1000]]
  Job Import (892.0ms)  {"count":998}
Elasticsearch::Transport::Transport::Errors::Forbidden: [403] {"error":{"root_cause":[{"type":"cluster_block_exception","reason":"blocked by: [FORBIDDEN/12/index read-only / allow delete (api)];"}],"type":"cluster_block_exception","reason":"blocked by: [FORBIDDEN/12/index read-only / allow delete (api)];"},"status":403}
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/elasticsearch-transport-6.0.0/lib/elasticsearch/transport/transport/base.rb:202:in `__raise_transport_error'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/elasticsearch-transport-6.0.0/lib/elasticsearch/transport/transport/base.rb:319:in `perform_request'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/elasticsearch-transport-6.0.0/lib/elasticsearch/transport/transport/http/faraday.rb:20:in `perform_request'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/elasticsearch-transport-6.0.0/lib/elasticsearch/transport/client.rb:131:in `perform_request'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/elasticsearch-api-6.0.0/lib/elasticsearch/api/namespace/common.rb:21:in `perform_request'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/elasticsearch-api-6.0.0/lib/elasticsearch/api/actions/indices/update_aliases.rb:43:in `update_aliases'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/searchkick-2.4.0/lib/searchkick/index.rb:70:in `promote'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/searchkick-2.4.0/lib/searchkick/index.rb:244:in `reindex_scope'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/searchkick-2.4.0/lib/searchkick/model.rb:72:in `searchkick_reindex'
	from (irb):1
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/railties-5.0.6/lib/rails/commands/console.rb:65:in `start'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/railties-5.0.6/lib/rails/commands/console_helper.rb:9:in `start'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/railties-5.0.6/lib/rails/commands/commands_tasks.rb:78:in `console'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/railties-5.0.6/lib/rails/commands/commands_tasks.rb:49:in `run_command!'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/railties-5.0.6/lib/rails/commands.rb:18:in `<top (required)>'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:293:in `require'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:293:in `block in require'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:259:in `load_dependency'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:293:in `require'
	from /Users/apple/rails/job-listing1129/bin/rails:9:in `<top (required)>'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:287:in `load'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:287:in `block in load'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:259:in `load_dependency'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:287:in `load'
	from /Users/apple/.rvm/rubies/ruby-2.3.1/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:55:in `require'
	from /Users/apple/.rvm/rubies/ruby-2.3.1/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:55:in `require'
	from -e:1:in `<main>'
2.3.1 :002 > exit
```



2、删除commit重新操作，`Job.reindex`还是报错

```
 apple@apple-2 ⮀ ~/rails/job-listing1129 ⮀ ⭠ master± ⮀ rails c
Running via Spring preloader in process 4765
Loading development environment (Rails 5.0.6)
2.3.1 :001 > Job.reindex
  Job Load (0.4ms)  SELECT  "jobs".* FROM "jobs" ORDER BY "jobs"."id" ASC LIMIT ?  [["LIMIT", 1000]]
Elasticsearch::Transport::Transport::Errors::Forbidden: [403] {"error":{"root_cause":[{"type":"cluster_block_exception","reason":"blocked by: [FORBIDDEN/12/index read-only / allow delete (api)];"}],"type":"cluster_block_exception","reason":"blocked by: [FORBIDDEN/12/index read-only / allow delete (api)];"},"status":403}
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/elasticsearch-transport-6.0.0/lib/elasticsearch/transport/transport/base.rb:202:in `__raise_transport_error'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/elasticsearch-transport-6.0.0/lib/elasticsearch/transport/transport/base.rb:319:in `perform_request'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/elasticsearch-transport-6.0.0/lib/elasticsearch/transport/transport/http/faraday.rb:20:in `perform_request'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/elasticsearch-transport-6.0.0/lib/elasticsearch/transport/client.rb:131:in `perform_request'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/elasticsearch-api-6.0.0/lib/elasticsearch/api/namespace/common.rb:21:in `perform_request'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/elasticsearch-api-6.0.0/lib/elasticsearch/api/actions/indices/update_aliases.rb:43:in `update_aliases'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/searchkick-2.4.0/lib/searchkick/index.rb:70:in `promote'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/searchkick-2.4.0/lib/searchkick/index.rb:244:in `reindex_scope'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/searchkick-2.4.0/lib/searchkick/model.rb:72:in `searchkick_reindex'
	from (irb):1
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/railties-5.0.6/lib/rails/commands/console.rb:65:in `start'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/railties-5.0.6/lib/rails/commands/console_helper.rb:9:in `start'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/railties-5.0.6/lib/rails/commands/commands_tasks.rb:78:in `console'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/railties-5.0.6/lib/rails/commands/commands_tasks.rb:49:in `run_command!'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/railties-5.0.6/lib/rails/commands.rb:18:in `<top (required)>'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:293:in `require'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:293:in `block in require'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:259:in `load_dependency'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:293:in `require'
	from /Users/apple/rails/job-listing1129/bin/rails:9:in `<top (required)>'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:287:in `load'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:287:in `block in load'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:259:in `load_dependency'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:287:in `load'
	from /Users/apple/.rvm/rubies/ruby-2.3.1/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:55:in `require'
	from /Users/apple/.rvm/rubies/ruby-2.3.1/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:55:in `require'
	from -e:1:in `<main>'
2.3.1 :002 >
```



```
Elasticsearch transport error 403, when Product.reindex in the local

When "Add data to the search index", I run "Job. reindex" in `rails c`, then return an error as follows.

​```
 apple@apple-2 ⮀ ~/rails/job-listing1129 ⮀ ⭠ master± ⮀ rails c
Running via Spring preloader in process 4765
Loading development environment (Rails 5.0.6)
2.3.1 :001 > Job.reindex
  Job Load (0.4ms)  SELECT  "jobs".* FROM "jobs" ORDER BY "jobs"."id" ASC LIMIT ?  [["LIMIT", 1000]]
Elasticsearch::Transport::Transport::Errors::Forbidden: [403] {"error":{"root_cause":[{"type":"cluster_block_exception","reason":"blocked by: [FORBIDDEN/12/index read-only / allow delete (api)];"}],"type":"cluster_block_exception","reason":"blocked by: [FORBIDDEN/12/index read-only / allow delete (api)];"},"status":403}
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/elasticsearch-transport-6.0.0/lib/elasticsearch/transport/transport/base.rb:202:in `__raise_transport_error'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/elasticsearch-transport-6.0.0/lib/elasticsearch/transport/transport/base.rb:319:in `perform_request'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/elasticsearch-transport-6.0.0/lib/elasticsearch/transport/transport/http/faraday.rb:20:in `perform_request'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/elasticsearch-transport-6.0.0/lib/elasticsearch/transport/client.rb:131:in `perform_request'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/elasticsearch-api-6.0.0/lib/elasticsearch/api/namespace/common.rb:21:in `perform_request'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/elasticsearch-api-6.0.0/lib/elasticsearch/api/actions/indices/update_aliases.rb:43:in `update_aliases'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/searchkick-2.4.0/lib/searchkick/index.rb:70:in `promote'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/searchkick-2.4.0/lib/searchkick/index.rb:244:in `reindex_scope'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/searchkick-2.4.0/lib/searchkick/model.rb:72:in `searchkick_reindex'
	from (irb):1
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/railties-5.0.6/lib/rails/commands/console.rb:65:in `start'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/railties-5.0.6/lib/rails/commands/console_helper.rb:9:in `start'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/railties-5.0.6/lib/rails/commands/commands_tasks.rb:78:in `console'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/railties-5.0.6/lib/rails/commands/commands_tasks.rb:49:in `run_command!'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/railties-5.0.6/lib/rails/commands.rb:18:in `<top (required)>'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:293:in `require'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:293:in `block in require'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:259:in `load_dependency'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:293:in `require'
	from /Users/apple/rails/job-listing1129/bin/rails:9:in `<top (required)>'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:287:in `load'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:287:in `block in load'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:259:in `load_dependency'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies.rb:287:in `load'
	from /Users/apple/.rvm/rubies/ruby-2.3.1/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:55:in `require'
	from /Users/apple/.rvm/rubies/ruby-2.3.1/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:55:in `require'
	from -e:1:in `<main>'
2.3.1 :002 >
​```

I try to find solution in Google and stackoverflow, but did not find it.
I am very new to be a coder. I use ruby on rails.
I hope I didn't bring trouble to you.


```

