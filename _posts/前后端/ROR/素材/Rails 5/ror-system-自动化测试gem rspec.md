---
title: ror-system-自动化测试
date: '2017-12-14 00:10'
categories:
  - ror系统
tags:
  - ror系统
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: bf9570f4
---

* 201712
* 编程+rails



```
gem 'rspec-rails'
```

```
gem 'capybara'
```



## 1.3 [bug] 执行rspec leap_year_spec.rb报错

### 问题描述：

用`gem install rspec`安装rspec，执行`rspec leap_year_spec.rb`时报错：

```
 apple@bogon ⮀ ~/rails/rspect_app ⮀ ⭠ master± ⮀ rspec leap_year_spec.rb

An error occurred while loading ./leap_year_spec.rb.
Failure/Error: super

NoMethodError:
  undefined method `this' for #<Gem::Specification:0x3fc1e0143fac rspec-support-3.7.0>
# ./leap_year_spec.rb:3:in `<top (required)>'
# ------------------
# --- Caused by: ---
# LoadError:
#   cannot load such file -- rspec/mocks
#   ./leap_year_spec.rb:3:in `<top (required)>'
No examples found.

Finished in 0.00026 seconds (files took 0.16653 seconds to load)
0 examples, 0 failures, 1 error occurred outside of examples
```

### 解决办法：

改用官网gemfile的安装方法：

```
group :development, :test do
  gem 'rspec-rails'
end
```



## 2-8 TDD

你会发现我们不需要一开始就把全部测试案例都先写上去(这样要一次通过所有测试会很辛苦)，而是新写一段测试码让测试失败，改一下实作让测试通过，然后再新写下一个测试码让测试失败，然后再改实作，如此迭代交替。

这种技巧，在软件开发领域有一个很响亮的名称，叫做 TDD(Test-Driven Development)，流程是这样的（流程的最后一步是重构）：

![](https://ws3.sinaimg.cn/large/006tNc79gy1fm3scyrdfbj30s60djwf7.jpg)

## 3-8 debug除错方法

在测试代码中，你可以直接 `puts` 变量，跑测试的时候就会印出来了。这是最简单的除错方式。或是你可以在任意地方放 `byebug` 下中断点，就会在执行到那一行时停下来，可以检查变量，输入 `continue` 就会继续执行下去。





### ===================================================

rspec测试文档vs，context 和 describe 作用一模一样，单纯只是分类组织而已，没有实际作用。

自动化测试分成几种不同类型，目前学的这种是针对单一类别的方法进行测试，叫做单元测试(Unit Testing)。

刚刚都是跑单个测试档案，如果要跑全部测试，可以执行 `rake spec`。通常我们会在 git push 前，尽量跑过一次全部的测试。



## 5-1-5-9 三步写api测试

1、测试http

```
expect(response).to have_http_status(200)
```

2、测试json。其中expect_result是一个hash。

```
expect(response.body).to eq( {:x=>xxx, :y=>xxx}.to_json )
```

3、测试database有无数据。

```
expect(new_user.email).to eq("admin@example.com")
```

