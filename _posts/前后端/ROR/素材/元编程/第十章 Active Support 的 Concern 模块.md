# 第十章 Active Support 的 Concern 模块



## 10.1 Concern 模块出现之前

### 包含并扩展技巧

缺点：每定义一个类方法的模块，就必须定义一个相似的 included 钩子方法



## 10.2 ActiveSupport::Concern 模块

ActiveSupport::Concern，封装了『包含并扩展技巧』

`included` 和 `append_features` 的区别：前者是钩子方法，只有覆写才有内容；后者检查模块是否在祖先链上并加入祖先链



## 10.3 经验之谈

