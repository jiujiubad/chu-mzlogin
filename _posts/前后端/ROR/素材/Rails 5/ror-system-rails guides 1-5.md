---
title: ror-system-rails guides 1-5
date: '2017-12-14 00:10'
categories:
  - ror系统
tags:
  - ror系统
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: 30d3b38f
top: 2
---

* 201801
* 编程+rails



# 一、Active Record 基础

![](https://ws2.sinaimg.cn/large/006tKfTcgy1flbn2zjutlj31kw0ykqgc.jpg)



### 1 Active Record 是什么？

* Active Record 是 [MVC](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) 中的 M（模型），负责处理数据和业务逻辑，是一种对象关系映射系统。



### 2 Active Record 中的“多约定少配置”原则

#### 2.1 命名约定

- 数据库表名：复数，下划线分隔单词（例如 `book_clubs`）
- 模型类名：单数，每个单词的首字母大写（例如 `BookClub`）

| 模型/类       | 表/模式         |
| ---------- | ------------ |
| `Article`  | `articles`   |
| `LineItem` | `line_items` |
| `Deer`     | `deers`      |
| `Mouse`    | `mice`       |
| `Person`   | `people`     |

#### 2.2 模式约定

* 主键和外键



### 3 创建 Active Record 模型

```
class Product < ApplicationRecord
end
```

* 上面的代码会创建 `Product` 模型，对应于数据库中的 `products` 表。同时，`products` 表中的字段也映射到 `Product` 模型实例的属性上。



### 4 覆盖命名约定

* .table_name= 方法可以指定要使用的表名。如果这么做，还要调用 set_fixture_class 方法，手动指定固件（my_products.yml）的类名

```
class Product < ApplicationRecord
  self.table_name = "my_products"
end

```

```
class ProductTest < ActiveSupport::TestCase
  set_fixture_class my_products: Product
  fixtures :my_products
  ...
end
```



* .primary_key= 方法指定表的主键

```
class Product < ApplicationRecord
  self.primary_key = "product_id"
end
```



### 5 CRUD：读写数据

#### 5.1 创建

`new` 方法创建一个新对象，`create` 方法创建新对象，并将其存入数据库。调用 `user.save` 可以把记录存入数据库。



#### 5.2 读取

* Active Record 为读取数据库中的数据提供了丰富的 API，如.all、.first等。


* find、find_by、where三种查询API的区别？
  * find是找一个或多个id
  * `david = User.find_by(name: 'David')`，查找返回第一个名为 David 的用户
  * `users = User.where(name: 'David')`，查找所有名为 David的用户



#### 5.3 更新

* `user.name = 'Dave'` `user.save`，相当于是`user.update(name: 'Dave')`
* 量更新多个记录`User.update_all "max_login_attempts = 3, must_change_password = 'true'"`



#### 5.4 删除

`user.destroy`



### 6 数据验证

在存入数据库之前，Active Record 还可以验证模型。模型验证有很多方法，可以检查属性值是否不为空，是否是唯一的、没有在数据库中出现过，等等。



### 7 回调

Active Record 回调用于在模型生命周期的特定事件上绑定代码，相应的事件发生时，执行绑定的代码。例如创建新纪录时、更新记录时、删除记录时，等等



### 8 迁移

Rails 提供了一个 DSL（Domain-Specific Language）用来处理数据库模式，叫做“迁移”。迁移的代码存储在特定的文件中，通过 `rails` 命令执行，可以用在 Active Record 支持的所有数据库上。





# 二、Active Record 迁移

![](https://ws2.sinaimg.cn/large/006tKfTcgy1flbngdowrlj31kw1084cd.jpg)



### 1 迁移概述

* 迁移是以一致和轻松的方式按时间顺序修改数据库模式的实用方法。它使用 Ruby DSL，因此不必手动编写 SQL。
  * 可以把迁移看做数据库的新“版本”。数据库模式一开始并不包含任何内容，之后通过一个个迁移来添加或删除数据表、字段和记录。 
  * Active Record 还会更新 `db/schema.rb` 文件，以匹配最新的数据库结构。
* 如果想在迁移中完成一些 Active Record 不知如何撤销的操作，可以使用 `reversible do |dir|` 方法，或者用 `def up` 和 `def down` 方法来代替 `change` 方法




### 2 创建迁移

#### 2.1 创建独立的迁移

* `rails generate migration`，会创建空的迁移，并进行适当命名。

  * `rails generate migration xxx:string:index`

  * 如果迁移名称是 `AddXXXToYYY` 或 `RemoveXXXFromYYY` 的形式，并且后面跟着字段名和类型列表，那么会生成包含合适的 `add_column` 或 `remove_column` **语句的迁移（用于补充栏位）**。如下：

    ```
    rails generate migration RemovePartNumberFromProducts part_number:string

    class RemovePartNumberFromProducts < ActiveRecord::Migration[5.0]
      def change
        remove_column :products, :part_number, :string
      end
    end
    ```

  * 如果迁移名称是 `CreateXXX` 的形式，并且后面跟着字段名和类型列表，那么会生成用于创建包含指定字段的 `XXX` **数据表的迁移**。如下：

    ```

    rails generate migration CreateProducts name:string part_number:string

    class CreateProducts < ActiveRecord::Migration[5.0]
      def change
        create_table :products do |t|
          t.string :name
          t.string :part_number
        end
      end
    end
    ```

* 其他数据表

  * `references` 字段类型作为参数（还可使用 `belongs_to`）。如下：

    ```
    rails generate migration AddUserRefToProducts user:references

    class AddUserRefToProducts < ActiveRecord::Migration[5.0]
      def change
        add_reference :products, :user, foreign_key: true
      end
    end
    ```

  * 如果迁移名称中包含 `JoinTable`，生成器会创建联结数据表。如下：

    ```
    rails g migration CreateJoinTableCustomerProduct customer product

    class CreateJoinTableCustomerProduct < ActiveRecord::Migration[5.0]
      def change
        create_join_table :customers, :products do |t|
          # t.index [:customer_id, :product_id]
          # t.index [:product_id, :customer_id]
        end
      end
    end
    ```



#### 2.2 模型生成器

* 什么是脚手架生成器？

  在项目最开始的时候，就帮你搭建好架子，脚手架工具会生成好一些基本代码，一般是遵循MVC结构代码。比如生成好 struts+spring+hibernate 三个框架整合好的脚手架代码，会包含一下简单的CRUD代码、数据源、视图层等等项目中很常用的。

* 模型和脚手架生成器会生成适用于添加新模型的迁移。在`rails g migration xxx:xxx`添加字段名称:类型,那么添加这些字段所需的语句也会被创建。



#### 2.3 传递[类型修饰符](https://ruby-china.github.io/rails-guides/active_record_migrations.html#column-modifiers)

* 这些类型修饰符用大括号括起来，放在字段类型之后。

  ```
  rails generate migration AddDetailsToProducts 'price:decimal{5,2}' supplier:references{polymorphic}

  class AddDetailsToProducts < ActiveRecord::Migration[5.0]
    def change
      add_column :products, :price, :decimal, precision: 5, scale: 2
      add_reference :products, :supplier, polymorphic: true
    end
  end
  ```


### 3 编写迁移





## 三、Active Record 数据验证

![](https://ws3.sinaimg.cn/large/006tNc79gy1flbtsis34sj31kw0zd7ln.jpg)



### 2 数据验证辅助方法

#### 2.11 `uniqueness`

* 这个辅助方法在保存对象之前验证属性值是否是唯一的。



### 3 常用的验证选项

#### 3-1、allow_nil

* 如果要验证的值为 `nil` 就跳过验证。

#### 3-2、 `:allow_blank`

* 如果要验证的值为空（调用 `blank?` 方法判断，例如 `nil` 或空字符串），就跳过验证。

#### 3-3、 `:message`

#### 3-4、`:on` 选项指定什么时候验证。

* `on: :create`，指定只在创建记录时验证；或者使用 `on: :update`，指定只在更新记录时验证。
  * 还可以使用 `on:` 定义自定义的上下文。必须把上下文的名称传给 `valid?`、`invalid?` 或 `save` 才能触发自定义的上下文。

  ​


### 4 严格验证

* 当对象无效时抛出 `ActiveModel::StrictValidationFailed` 异常。还可以通过 `:strict` 选项指定抛出什么异常：

  ```
  class Person < ApplicationRecord
    validates :token, presence: true, uniqueness: true, strict: TokenGenerationException
  end
   
  Person.new.valid?  # => TokenGenerationException: Token can't be blank
  ```




### 5 条件验证

* `:if` 和 `:unless` 选项指定，这两个选项的值可以是符号、字符串、`Proc` 或数组。`:if` 选项指定何时做验证。如果要指定何时不做验证，使用 `:unless` 选项。



#### 5.1 使用符号

* 表示要在验证之前执行对应的方法。

```
validates :card_number, presence: true, if: :paid_with_card?
```

#### 5.2 使用 Proc

* 使用 Proc 对象可以在行间编写条件，不用定义额外的方法。

```
class Account < ApplicationRecord
  validates :password, confirmation: true,
    unless: Proc.new { |a| a.password.blank? }
end
```

#### 5.3 条件组合

* 同一个条件会用在多个验证上，这时可以使用 `with_options` 方法。

```
class User < ApplicationRecord
  with_options if: :is_admin? do |admin|
    admin.validates :password, length: { minimum: 10 }
    admin.validates :email, presence: true
  end
```

#### 5.4 联合条件

* 如果是否做某个验证要满足多个条件时，可以使用数组。

```
class Computer < ApplicationRecord
  validates :mouse, presence: true,
                    if: ["market.retail?", :desktop?],
                    unless: Proc.new { |c| c.trackpad.present? }
end
```


### 6 自定义验证

#### 6.1 自定义验证类(class)

* 自定义的验证类继承自 `ActiveModel::Validator`，必须实现 `validate` 方法，其参数是要验证的记录，然后验证这个记录是否有效。自定义的验证类通过 `validates_with` 方法调用。

  ```

  class MyValidator < ActiveModel::Validator
    def validate(record)
      unless record.name.starts_with? 'X'
        record.errors[:name] << 'Need a name starting with X please!'
      end
    end
  end
   
  class Person
    include ActiveModel::Validations
    validates_with MyValidator
  end
  ```

* 在自定义的验证类中验证单个属性，最简单的方法是继承 `ActiveModel::EachValidator` 类。此时，自定义的验证类必须实现 `validate_each` 方法。

  ```

  class EmailValidator < ActiveModel::EachValidator
    def validate_each(record, attribute, value)
      unless value =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
        record.errors[attribute] << (options[:message] || "is not an email")
      end
    end
  end
   
  class Person < ApplicationRecord
    validates :email, presence: true, email: true
  end
  ```



#### 6.2 自定义验证方法

* 验证方法必须使用类方法 `validate`（[API](http://api.rubyonrails.org/v5.1.1/classes/ActiveModel/Validations/ClassMethods.html#method-i-validate)）注册，传入自定义验证方法名的符号形式。

* 自定义的验证方法会按照注册的顺序执行。

* 使用 `validate` 方法注册自定义验证方法时可以设置 `:on` 选项，指定什么时候验证。`:on` 的可选值为 `:create` 和 `:update`。

  ```

  class Invoice < ApplicationRecord
    validate :active_customer, on: :create
   
    def active_customer
      errors.add(:customer_id, "is not active") unless customer.active?
    end
  end
  ```



### 7 处理验证错误

#### 7.1 `errors`

* `person.errors.messages # => {}`，键是每个属性的名称，值是一个数组，包含错误消息字符串。

  ```
  class Person < ApplicationRecord
    validates :name, presence: true, length: { minimum: 3 }
  end
   
  person = Person.new(name: "John Doe")
  person.valid? # => true
  person.errors.messages # => {}
  ```

#### 7.2 `errors[]`

* 如上代码，`errors[]` 用于获取某个属性上的错误消息，返回结果是一个由该属性所有错误消息字符串组成的数组，每个字符串表示一个错误消息。如果字段上没有错误，则返回空数组。

  ```

  class Person < ApplicationRecord
    validates :name, presence: true, length: { minimum: 3 }
  end

  person = Person.new
  person.valid? # => false
  person.errors[:name]
   # => ["can't be blank", "is too short (minimum is 3 characters)"]
  ```

#### 7.3 `errors.add`

* `add` 方法用于手动添加某属性的错误消息，它的参数是属性和错误消息。	使用 `errors.full_messages`（或等价的 `errors.to_a`）方法调用

  ```

  class Person < ApplicationRecord
    def a_method_used_for_validation_purposes
      errors.add(:name, "cannot contain the characters !@#%*()_-+=")
    end
  end
   
  person = Person.create(name: "!@#")
   
  person.errors[:name]
   # => ["cannot contain the characters !@#%*()_-+="]
   
  person.errors.full_messages
   # => ["Name cannot contain the characters !@#%*()_-+="]
  ```

* `<<` 的作用与 `errors#add` 一样：把一个消息追加到 `errors.messages` 数组中。

  ```
  class Person < ApplicationRecord
    def a_method_used_for_validation_purposes
      errors.messages[:name] << "cannot contain the characters !@#%*()_-+="
    end
  end
   
  person = Person.create(name: "!@#")
   
  person.errors[:name]
   # => ["cannot contain the characters !@#%*()_-+="]
   
  person.errors.to_a
   # => ["Name cannot contain the characters !@#%*()_-+="]
  ```

#### 7.4 `errors.details`

* 使用 `errors.add` 方法可以为返回的错误详情散列指定验证程序类型。

  * 如果想提升错误详情的信息量，可以为 `errors.add` 方法提供额外的键，指定不允许的字符。

  ```

  class Person < ApplicationRecord
    def a_method_used_for_validation_purposes
      errors.add(:name, :invalid_characters, not_allowed: "!@#%*()_-+=")
    end
  end
   
  person = Person.create(name: "!@#")
   
  person.errors.details[:name]
  # => [{error: :invalid_characters, not_allowed: "!@#%*()_-+="}]

  ```

#### 7.5 `errors[:base]`

* 错误消息可以添加到整个对象上，而不是针对某个属性。如果不想管是哪个属性导致对象无效，只想把对象标记为无效状态，就可以使用这个方法。`errors[:base]` 是个数组，可以添加字符串作为错误消息。

  ```
  class Person < ApplicationRecord
    def a_method_used_for_validation_purposes
      errors[:base] << "This person is invalid because ..."
    end
  end
  ```

#### 7.6 `errors.clear`

* 想清除 `errors` 集合中的所有错误消息，可以使用 `clear` 方法。
  * 当然，在无效的对象上调用 `errors.clear` 方法后，对象还是无效的，虽然 `errors` 集合为空了，但下次调用 `valid?` 方法，或调用其他把对象存入数据库的方法时， 会再次进行验证。如果任何一个验证失败了，`errors` 集合中就再次出现值了。

#### 7.7 `errors.size`

* `size` 方法返回对象上错误消息的总数。



### 8 在视图中显示验证错误

* 使用脚手架时，Rails 会在生成的 `_form.html.erb` 中加入一些 ERB 代码，显示模型错误消息的完整列表。假如有个模型对象存储在实例变量 `@article` 中，视图的代码可以这么写：

  ```
  <% if @article.errors.any? %>
    <div id="error_explanation">
      <h2><%= pluralize(@article.errors.count, "error") %> prohibited this article from being saved:</h2>
   
      <ul>
      <% @article.errors.full_messages.each do |msg| %>
        <li><%= msg %></li>
      <% end %>
      </ul>
    </div>
  <% end %>
  ```

* 此外，如果使用 Rails 的表单辅助方法生成表单，如果某个表单字段验证失败，会把字段包含在一个 `<div>` 中。脚手架默认添加的 CSS 规则如下：

  ```
  <div class="field_with_errors">
    <input id="article_title" name="article[title]" size="30" type="text" value="">
  </div>
  ```

  ```
  .field_with_errors {
    padding: 2px;
    background-color: red;
    display: table;
  }
  ```





# 四、Active Record 回调

![](https://ws1.sinaimg.cn/large/006tNc79gy1flbz202ifrj31hm11un8v.jpg)



### 1 对象的生命周期

* 在 Rails 应用正常运作期间，对象可以被创建、更新、保存或删除。



### 2 回调概述

* 回调是在对象生命周期的某些时刻被调用的方法。

#### 2.1 注册回调

* 回调在使用之前需要注册。我们可以先把回调定义为普通方法，然后使用宏式类方法把这些普通方法注册为回调：

  ——99：“类宏，书中给出的解释很简单, **Use a class method in a class definition.** 就是在一个类定义中使用一个类方法，那么这个类方法就叫类宏。”如下在User的class中使用self.login，这就是宏式类方法？before_validation就是注册？

  * 通常应该把回调定义为私有方法private。如果把回调定义为公共方法，就可以从模型外部调用回调，这样做违反了对象封装原则。

  ```
  class User < ApplicationRecord
    validates :login, :email, presence: true
   
    before_validation :ensure_login_has_a_value
   
    private
      def ensure_login_has_a_value
        if login.nil?
          self.login = email unless email.blank?
        end
      end
  end
  ```


### 3 可用的回调

#### 3.1 创建对象 & 3.2 更新对象

```
before_validation
after_validation
before_save
around_save
before_update
around_update
after_update
after_save
after_commit/after_rollback
```

#### 3.3 删除对象

```
before_destroy
around_destroy
after_destroy
after_commit/after_rollback
```

* 无论按什么顺序注册回调，在创建和更新对象时，`after_save` 回调总是在更明确的 `after_create` 和 `after_update` 回调之后被调用。

#### 3.4 `after_initialize` 和 `after_find` 回调

* 当 Active Record 对象被实例化时，不管是通过直接使用 `new` 方法还是从数据库加载记录，都会调用 `after_initialize` 回调。
* 当 Active Record 从数据库中加载记录时，会调用 `after_find` 回调。


* 如果同时定义了 `after_initialize` 和 `after_find` 回调，会先调用 `after_find` 回调。

#### 3.5 `after_touch` 回调

* 当我们在 Active Record 对象上调用 `touch` 方法时，会调用 `after_touch` 回调。


* `after_touch` 回调可以和 `belongs_to` 一起使用：

```
class User < ApplicationRecord
  after_touch do |user|
    puts "You have touched an object"
  end
end
```

### 4 调用回调

* 下面这些方法会触发回调：

```
create
create!
decrement!
destroy
destroy!
destroy_all
increment!
save
save!
save(validate: false)
toggle!
update_attribute
update
update!
valid?
```

* 此外，下面这些查找方法会触发 `after_find` 回调：

```
all
first
find
find_by
find_by_*
find_by_*!
find_by_sql
last
```

* 每次初始化类的新对象时都会触发 `after_initialize` 回调。

### 5 跳过回调

* 请慎重地使用这些方法，因为有些回调包含了重要的业务规则和应用逻辑，在不了解潜在影响的情况下就跳过回调，可能导致无效数据。

```
decrement
decrement_counter
delete
delete_all
increment
increment_counter
toggle
touch
update_column
update_columns
update_all
update_counters
```

### 6 停止执行

* 整个回调链包装在一个事务中。只要有回调抛出异常，回调链随即停止，并且发出 `ROLLBACK` 消息。如果想故意停止回调链，可以这么做：`throw :abort`

### 7 关联回调

* 回调不仅可以在模型关联中使用，还可以通过模型关联定义。假设有一个用户在博客中发表了多篇文章，现在我们要删除这个用户，那么这个用户的所有文章也应该删除，为此我们通过 `Article` 模型和 `User` 模型的关联来给 `User` 模型添加一个 `after_destroy` 回调：

  ```
  class User < ApplicationRecord
    has_many :articles, dependent: :destroy
  end
   
  class Article < ApplicationRecord
    after_destroy :log_destroy_action
   
    def log_destroy_action
      puts 'Article destroyed'
    end
  end
  ```

### 8 条件回调

#### 8.1 使用符号作为 `:if` 和 `:unless` 选项的值

* 可以使用符号作为 `:if` 和 `:unless` 选项的值，这个符号用于表示先于回调调用的断言方法。当使用 `:if` 选项时，如果断言方法返回 `false` 就不会调用回调；当使用 `:unless` 选项时，如果断言方法返回 `true` 就不会调用回调。

  ```
  class Order < ApplicationRecord
    before_save :normalize_card_number, if: :paid_with_card?
  end
  ```

#### 8.2 使用 Proc 作为 `:if` 和 `:unless` 选项的值

* 在验证方法非常短时最适合使用这种方式，这类验证方法通常只有一行代码：

  ```

  class Order < ApplicationRecord
    before_save :normalize_card_number,
      if: Proc.new { |order| order.paid_with_card? }
  end
  ```

#### 8.3 在条件回调中使用多个条件

* 在编写条件回调时，我们可以在同一个回调声明中混合使用 `:if` 和 `:unless` 选项：

  ```

  class Comment < ApplicationRecord
    after_create :send_email_to_author, if: :author_wants_emails?,
      unless: Proc.new { |comment| comment.article.ignore_comments? }
  end
  ```

### 9 回调类

* 有时需要在其他模型中重用已有的回调方法，为了解决这个问题，Active Record 允许我们用类来封装回调方法

  ```
  在下面的例子中，我们为 PictureFile 模型创建了 PictureFileCallbacks 回调类，在这个回调类中包含了 after_destroy 回调方法：

  class PictureFileCallbacks
    def after_destroy(picture_file)
      if File.exist?(picture_file.filepath)
        File.delete(picture_file.filepath)
      end
    end
  end

  在上面的代码中我们可以看到，当在回调类中声明回调方法时，回调方法接受模型对象作为参数。回调类定义之后就可以在模型中使用了：

  class PictureFile < ApplicationRecord
    after_destroy PictureFileCallbacks.new
  end
  ```

  * 请注意，上面我们**把回调声明为实例方法**，因此需要实例化新的 `PictureFileCallbacks` 对象。当回调想要使用实例化的对象的状态时，这种声明方式特别有用。尽管如此，一般我们会把回调声明为类方法：

  * 如果**把回调声明为类方法**，就不需要实例化新的 `PictureFileCallbacks` 对象。

    ```

    class PictureFile < ApplicationRecord
      after_destroy PictureFileCallbacks
    end
    ```

### 10 事务回调

* `after_commit` 和 `after_rollback` 这两个回调会在数据库事务完成时触发。它们和 `after_save`回调非常相似，区别在于它们在数据库变更已经提交或回滚后才会执行，常用于 Active Record 模型需要和数据库事务之外的系统交互的场景。

* 由于只在执行创建、更新或删除动作时触发 `after_commit` 回调是很常见的，这些操作都拥有别名：

  ```
  after_create_commit
  after_update_commit
  after_destroy_commit
  ```

* 在事务中创建、更新或删除模型时会调用 `after_commit` 和 `after_rollback` 回调。然而，如果其中有一个回调引发异常，异常会向上冒泡，后续 `after_commit` 和 `after_rollback` 回调不再执行。





## 五、Active Record 关联

![](https://ws3.sinaimg.cn/large/006tNc79gy1flc5zed7xmj31kw1007fu.jpg)



### 1 为什么使用关联

* Rails 知道两个模型之间有联系，相关操作可以得到简化。

### 2 关联的类型

* 关联使用宏式调用实现，用声明的形式为模型添加功能。例如，声明一个模型属于（`belongs_to`）另一个模型后，Rails 会维护两个模型之间的“[主键](https://en.wikipedia.org/wiki/Unique_key)-[外键](https://en.wikipedia.org/wiki/Foreign_key)”关系，而且还会向模型中添加很多实用的方法。

```
Rails 支持六种关联：
belongs_to
has_one
has_many
has_many :through
has_one :through
has_and_belongs_to_many
```

#### 2.1 `belongs_to` 关联

* `belongs_to` 关联创建两个模型之间一对一的关系，声明所在的模型实例属于另一个模型的实例。

  * 例如，如果应用中有作者和图书两个模型，而且每本书只能指定给一位作者

    ```
    class Book < ApplicationRecord
      belongs_to :author
    end
    ```

  * 相应的迁移如下：

    ```
    class CreateBooks < ActiveRecord::Migration[5.0]
      def change
        create_table :authors do |t|
          t.string :name
          t.timestamps
        end
     
        create_table :books do |t|
          t.belongs_to :author, index: true
          t.datetime :published_at
          t.timestamps
        end
      end
    end
    ```

#### 2.2 `has_one` 关联

* `has_one` 关联也建立两个模型之间的一对一关系，但语义和结果有点不一样。这种关联表示模型的实例包含或拥有另一个模型的实例。

  * 例如，应用中每个供应商只有一个账户

    ```
    class Supplier < ApplicationRecord
      has_one :account
    end
    ```

  * 相应的迁移如下：

    ```
    class CreateSuppliers < ActiveRecord::Migration[5.0]
      def change
        create_table :suppliers do |t|
          t.string :name
          t.timestamps
        end
     
        create_table :accounts do |t|
          t.belongs_to :supplier, index: true
          t.string :account_number
          t.timestamps
        end
      end
    end
    ```

* 根据使用需要，可能还要为 accounts 表中的 supplier 列创建唯一性索引和（或）外键约束。这里，我们像下面这样定义这一列：

    ```

    create_table :accounts do |t|
      t.belongs_to :supplier, index: { unique: true }, foreign_key: true
      # ...
    end
    ```

#### 2.3 `has_many` 关联

* `has_many` 关联建立两个模型之间的一对多关系。在 `belongs_to` 关联的另一端经常会使用这个关联。

* 声明 `has_many` 关联时，另一个模型使用复数形式。

  * 例如，对应用中的作者和图书模型来说

    ```
    class Author < ApplicationRecord
      has_many :books
    end
    ```

  * 相应的迁移如下：

    ```
    class CreateAuthors < ActiveRecord::Migration[5.0]
      def change
        create_table :authors do |t|
          t.string :name
          t.timestamps
        end
     
        create_table :books do |t|
          t.belongs_to :author, index: true
          t.datetime :published_at
          t.timestamps
        end
      end
    end
    ```

#### 2.4 `has_many :through` 关联

* `has_many :through` 关联经常用于建立两个模型之间的多对多关联。这种关联表示一个模型的实例可以借由第三个模型，拥有零个和多个另一模型的实例。

* `physician.patients = patients`会为新建立的关联对象创建联结模型实例。如果其中一个对象删除了，相应的联结记录也会删除。

* 自动删除联结模型的操作直接执行，不会触发 `*_destroy` 回调。

  * 例如，在医疗锻炼中，病人要和医生约定练习时间

    ```
    class Physician < ApplicationRecord
      has_many :appointments
      has_many :patients, through: :appointments
    end
     
    class Appointment < ApplicationRecord
      belongs_to :physician
      belongs_to :patient
    end
     
    class Patient < ApplicationRecord
      has_many :appointments
      has_many :physicians, through: :appointments
    end
    ```

  * 相应的迁移如下：

    ```
    class CreateAppointments < ActiveRecord::Migration[5.0]
      def change
        create_table :physicians do |t|
          t.string :name
          t.timestamps
        end
     
        create_table :patients do |t|
          t.string :name
          t.timestamps
        end
     
        create_table :appointments do |t|
          t.belongs_to :physician, index: true
          t.belongs_to :patient, index: true
          t.datetime :appointment_date
          t.timestamps
        end
      end
    end
    ```

    ![](https://ws3.sinaimg.cn/large/006tKfTcgy1flc8to7mnaj30ui0zsdpp.jpg)


#### 2.5 `has_one :through` 关联

* `has_one :through` 关联建立两个模型之间的一对一关系。这种关联表示一个模型通过第三个模型拥有另一模型的实例。

  * 例如，每个供应商只有一个账户，而且每个账户都有一个账户历史

    ```
    class Supplier < ApplicationRecord
      has_one :account
      has_one :account_history, through: :account
    end
     
    class Account < ApplicationRecord
      belongs_to :supplier
      has_one :account_history
    end
     
    class AccountHistory < ApplicationRecord
      belongs_to :account
    end
    ```

  * 相应的迁移如下：


    ​```
    class CreateAccountHistories < ActiveRecord::Migration[5.0]
      def change
        create_table :suppliers do |t|
          t.string :name
          t.timestamps
        end
     
        create_table :accounts do |t|
          t.belongs_to :supplier, index: true
          t.string :account_number
          t.timestamps
        end
     
        create_table :account_histories do |t|
          t.belongs_to :account, index: true
          t.integer :credit_rating
          t.timestamps
        end
      end
    end
    ​```
    
    ![](https://ws3.sinaimg.cn/large/006tKfTcgy1flc9ad3xitj30u210uajb.jpg)

#### 2.6 `has_and_belongs_to_many` 关联

* 直接建立两个模型之间的多对多关系，不借由第三个模型。

  * 例如，应用中有装配体和零件两个模型，每个装配体有多个零件，每个零件又可用于多个装配体

    ```
    class Assembly < ApplicationRecord
      has_and_belongs_to_many :parts
    end
     
    class Part < ApplicationRecord
      has_and_belongs_to_many :assemblies
    end
    ```

  * 相应的迁移如下：


    ​```
    class CreateAssembliesAndParts < ActiveRecord::Migration[5.0]
      def change
        create_table :assemblies do |t|
          t.string :name
          t.timestamps
        end
     
        create_table :parts do |t|
          t.string :part_number
          t.timestamps
        end
     
        create_table :assemblies_parts, id: false do |t|
          t.belongs_to :assembly, index: true
          t.belongs_to :part, index: true
        end
      end
    end
    ​```
    
    ![](https://ws4.sinaimg.cn/large/006tKfTcgy1flc9hkgojnj30t00u2tf2.jpg)

#### 2.7 在 `belongs_to` 和 `has_one` 之间选择

* 二者之间的区别是在哪里放置外键（外键在 `belongs_to` 关联所在模型对应的表中），不过也要考虑数据的语义。`has_one` 的意思是某样东西属于我，即哪个东西指向你。
  * 例如，说供应商有一个账户，比账户拥有供应商更合理

#### 2.8 在 `has_many :through` 和 `has_and_belongs_to_many` 之间选择

* 根据经验，如果想把关联模型当做独立实体使用，要用 `has_many :through` 关联；如果不需要使用关联模型，建立 `has_and_belongs_to_many` 关联更简单（不过要记得在数据库中创建联结表）。
* 如果要对联结模型做数据验证、调用回调，或者使用其他属性，要使用 `has_many :through` 关联。

#### 2.9 多态关联

* 关联还有一种高级形式——多态关联（polymorphic association）。在多态关联中，在同一个关联中，一个模型可以属于多个模型。

  * 例如，图片模型可以属于雇员模型或者产品模型

    ```

    class Picture < ApplicationRecord
      belongs_to :imageable, polymorphic: true
    end
     
    class Employee < ApplicationRecord
      has_many :pictures, as: :imageable
    end
     
    class Product < ApplicationRecord
      has_many :pictures, as: :imageable
    end
    ```

  * 在 `belongs_to` 中指定使用多态，可以理解成创建了一个接口，可供任何一个模型使用。

    * 在 `Employee` 模型实例上，可以使用 `@employee.pictures` 获取图片集合。
    * 类似地，可使用 `@product.pictures` 获取产品的图片。

  * 在 `Picture` 模型的实例上，可以使用 `@picture.imageable` 获取父对象。不过事先要在声明多态接口的模型中创建外键字段和类型字段：

    ```

    class CreatePictures < ActiveRecord::Migration[5.0]
      def change
        create_table :pictures do |t|
          t.string  :name
          t.integer :imageable_id
          t.string  :imageable_type
          t.timestamps
        end
     
        add_index :pictures, [:imageable_type, :imageable_id]
      end
    end
    ```

    * 上面的迁移可以使用 `t.references` 简化：

    ```

    class CreatePictures < ActiveRecord::Migration[5.0]
      def change
        create_table :pictures do |t|
          t.string :name
          t.references :imageable, polymorphic: true, index: true
          t.timestamps
        end
      end
    end
    ```

    ![](https://ws4.sinaimg.cn/large/006tKfTcgy1flcaao466qj30ta0xs10t.jpg)


#### 2.10 自联结

* 设计数据模型时，模型有时要和自己建立关系。

  * 例如，在一个数据库表中保存所有雇员的信息，但要建立经理和下属之间的关系

    ```
    class Employee < ApplicationRecord
      has_many :subordinates, class_name: "Employee",
                              foreign_key: "manager_id"
     
      belongs_to :manager, class_name: "Employee"
    end
    ```

  * 在迁移（模式）中，要添加一个引用字段，指向模型自身：


    ​```
    class CreateEmployees < ActiveRecord::Migration[5.0]
      def change
        create_table :employees do |t|
          t.references :manager, index: true
          t.timestamps
        end
      end
    end
    ​```

### 3 小技巧和注意事项

* 为了在 Rails 应用中有效使用 Active Record 关联，要了解以下几点：

  ```
  控制缓存
  避免命名冲突
  更新模式
  控制关联的作用域
  双向关联
  ```

#### 3.1 控制缓存

* 关联添加的方法都会使用缓存，记录最近一次查询的结果，以备后用。缓存还会在方法之间共享。

  ```
  author.books           # 从数据库中检索图书
  author.books.size      # 使用缓存的图书副本
  author.books.empty?    # 使用缓存的图书副本
  ```

* 应用的其他部分可能会修改数据，那么应该怎么重载缓存呢？在关联上调用 `reload` 即可：

  ```

  author.books                 # 从数据库中检索图书
  author.books.size            # 使用缓存的图书副本
  author.books.reload.empty?   # 丢掉缓存的图书副本
                               # 重新从数据库中检索
  ```

#### 3.2 避免命名冲突

* 因为创建关联时，会向模型添加同名方法，所以关联的名字不能和 `ActiveRecord::Base` 中的实例方法同名。如果同名，关联方法会覆盖 `ActiveRecord::Base` 中的实例方法，导致错误。

#### 3.3 更新模式

* 对 `belongs_to` 关联来说，要创建外键；对 `has_and_belongs_to_many` 关联来说，要创建相应的联结表。

##### 3.3.1 创建 `belongs_to` 关联所需的外键

* 为了提升查询性能，最好为外键添加索引；为了保证参照完整性，最好为外键添加约束：

  ```

  class CreateBooks < ActiveRecord::Migration[5.0]
    def change
      create_table :books do |t|
        t.datetime :published_at
        t.string   :book_number
        t.integer  :author_id
      end
   
      add_index :books, :author_id
      add_foreign_key :books, :authors
    end
  end
  ```

##### 3.3.2 创建 `has_and_belongs_to_many` 关联所需的联结表

* 创建 `has_and_belongs_to_many` 关联后，必须手动创建联结表。除非使用 `:join_table` 选项指定了联结表的名称，否则 Active Record 会按照类名出现在字典中的顺序为表起名。因此，作者和图书模型使用的联结表默认名为“authors_books”，因为在字典中，“a”在“b”前面。

  * 我们把 `id: false` 选项传给 `create_table` 方法，因为这个表不对应模型。只有这样，关联才能正常建立。如果在使用 `has_and_belongs_to_many` 关联时遇到奇怪的行为，例如提示模型 ID 损坏，或 ID 冲突，有可能就是因为创建了主键。

  ```
  class Assembly < ApplicationRecord
    has_and_belongs_to_many :parts
  end
   
  class Part < ApplicationRecord
    has_and_belongs_to_many :assemblies
  end
  ```


*   上述关联需要在迁移中创建 `assemblies_parts` 表，而且该表无主键：

  ```

  class CreateAssembliesPartsJoinTable < ActiveRecord::Migration[5.0]
    def change
      create_table :assemblies_parts, id: false do |t|
        t.integer :assembly_id
        t.integer :part_id
      end
   
      add_index :assemblies_parts, :assembly_id
      add_index :assemblies_parts, :part_id
    end
  end
  ```

#### 3.4 控制关联的作用域

* 默认情况下，关联只会查找当前模块作用域中的对象。

  * 第一段代码能正常运行，因为 `Supplier` 和 `Account` 在同一个作用域中。

    ```

    module MyApplication
      module Business
        class Supplier < ApplicationRecord
           has_one :account
        end
     
        class Account < ApplicationRecord
           belongs_to :supplier
        end
      end
    end
    ```

  * 但第二段代码就不行了，因为 `Supplier` 和 `Account` 在不同的作用域中。

    ```

    module MyApplication
      module Business
        class Supplier < ApplicationRecord
           has_one :account
        end
      end
     
      module Billing
        class Account < ApplicationRecord
           belongs_to :supplier
        end
      end
    end
    ```

  * 第二段代码改成第三段，声明关联时指定完整的类名可正常关联。但啰嗦不如用第一段。

    ```

    module MyApplication
      module Business
        class Supplier < ApplicationRecord
           has_one :account,
            class_name: "MyApplication::Billing::Account"
        end
      end
     
      module Billing
        class Account < ApplicationRecord
           belongs_to :supplier,
            class_name: "MyApplication::Business::Supplier"
        end
      end
    end
    ```

#### 3.5 双向关联

* 即在两个模型中都要声明关联。这样一来，Active Record 只会加载一个 `Author` 对象副本，从而确保应用运行效率更高效，并避免数据不一致。

* 具有下述选项的关联Active Record无法自动识别：

  ```
  :conditions
  :through
  :polymorphic
  :class_name
  :foreign_key
  ```

  * Active Record 提供了 `inverse_of` 选项，可以通过它明确声明双向关联：

    ```
    class Author < ApplicationRecord
      has_many :books, inverse_of: 'writer'
    end
     
    class Book < ApplicationRecord
      belongs_to :writer, class_name: 'Author', foreign_key: 'author_id'
    end
    ```

  * `inverse_of` 有些限制：

    > - 不支持 `:through` 关联；
    > - 不支持 `:polymorphic` 关联；
    > - 不支持 `:as` 选项；

### 4 关联详解

#### 4.1 `belongs_to` 关联详解

* `belongs_to` 关联创建一个模型与另一个模型之间的一对一关系。用数据库术语来说，就是这个类中包含外键。

##### 4.1.1 `belongs_to` 关联添加的方法

* 声明 `belongs_to` 关联后，所在的类自动获得了五个和关联相关的方法：

  ```
  association
  association=(associate)
  build_association(attributes = {})
  create_association(attributes = {})
  create_association!(attributes = {})
  ```

  * 对下述声明来说：

    ```
    class Book < ApplicationRecord
      belongs_to :author
    end
    ```

  * `Book` 模型的每个实例都获得了这些方法：

    ```
    author
    author=
    build_author
    create_author
    create_author!
    ```

* 在 `has_one` 和 `belongs_to` 关联中，必须使用 `build_*` 方法构建关联对象。`association.build` 方法是在 `has_many` 和 `has_and_belongs_to_many` 关联中使用的。创建关联对象要使用 `create_*` 方法。

###### 4.1.1.1 `association`

> 1、`@author= @book.author`，如果找不到关联的对象，返回 `nil`。
>
> 2、如果关联的对象之前已经取回，会返回缓存版本。如果不想使用缓存版本（强制读取数据库）在父对象上调用 `#reload` 方法。

###### 4.1.1.2 `association=(associate)`

> 这个方法的底层操作是，从关联对象上读取主键，然后把值赋给该主键对应的对象`@book.author = @author`

###### 4.1.1.3 `build_association(attributes = {})`

> `build_association` 方法返回该关联类型的一个新对象。这个对象使用传入的属性初始化，对象的外键会自动设置，但关联对象不会存入数据库。
>
> ```
> @author = @book.build_author(author_number: 123,
>                              author_name: "John Doe")
> ```

###### 4.1.1.4 `create_association(attributes = {})`

> `create_association` 方法返回该关联类型的一个新对象。这个对象使用传入的属性初始化，对象的外键会自动设置，只要能通过所有数据验证，就会把关联对象存入数据库。
>
> ```
> @author = @book.create_author(author_number: 123,
>                                    author_name: "John Doe")
> ```

###### 4.1.1.5 `create_association!(attributes = {})`

> 与 `create_association` 方法作用相同，但是如果记录无效，会抛出 `ActiveRecord::RecordInvalid` 异常。

##### 4.1.2 `belongs_to` 方法的选项

* 定制的方法很简单，声明关联时传入选项或者使用代码块即可。`belongs_to` 关联支持下列选项：

  ```
  :autosave
  :class_name
  :counter_cache
  :dependent
  :foreign_key
  :primary_key
  :inverse_of
  :polymorphic
  :touch
  :validate
  :optional
  ```

###### 4.1.2.1 `:autosave`

> 如果把 `:autosave` 选项设为 `true`，保存父对象时，会自动保存所有子对象，并把标记为析构的子对象销毁。

###### 4.1.2.2 `:class_name`

>  如果另一个模型无法从关联的名称获取，可以使用 `:class_name` 选项指定模型名。例如，如果一本书属于一位作者，但是表示作者的模型是 `Patron`，就可以这样声明关联：
>
>  ```
>
>  class Book < ApplicationRecord
>   belongs_to :author, class_name: "Patron"
>  end
>  ```

###### 4.1.2.3 `:counter_cache`

> 如果想知道 `@author.books.size` 的结果，要在数据库中执行 `COUNT(*)` 查询。如果不想执行这个查询，可以在声明 `belongs_to` 关联的模型中加入计数缓存功能：

###### 4.1.2.4 `:dependent`

> `:dependent` 选项控制属主销毁后怎么处理关联的对象：
>
> - `:destroy`：也销毁关联的对象
> - `:delete_all`：直接从数据库中删除关联的对象（不执行回调）
> - `:nullify`：把外键设为 `NULL`（不执行回调）
> - `:restrict_with_exception`：如果有关联的记录，抛出异常
> - `:restrict_with_error`：如果有关联的对象，为属主添加一个错误

4.1.2.5 `:foreign_key`

> Rails 都不会自动创建外键字段 `xxx_id`，你要自己在迁移中创建。

4.1.2.6 `:primary_key`

> Rails 假定使用表中的 `id` 列保存主键。使用 `:primary_key` 选项可以指定使用其他列。
>
> ```
> class User < ApplicationRecord
>   self.primary_key = 'guid' # 主键是 guid，不是 id
> end
>  
> class Todo < ApplicationRecord
>   belongs_to :user, primary_key: 'guid'
> end
> ```
>
> 执行 `@user.todos.create` 时，`@todo` 记录的用户 ID 是 `@user` 的 `guid` 值。

###### 4.1.2.7 `:inverse_of`

> `:inverse_of` 选项指定 `belongs_to` 关联另一端的 `has_many` 和 `has_one` 关联名。不能和 `:polymorphic` 选项一起使用。
>
> ```
>
> class Author < ApplicationRecord
>   has_many :books, inverse_of: :author
> end
>  
> class Book < ApplicationRecord
>   belongs_to :author, inverse_of: :books
> end
> ```

###### 4.1.2.8 `:polymorphic`

> `:polymorphic` 选项为 `true` 时，表明这是个多态关联。

###### 4.1.2.9 `:touch`

>  如果把 `:touch` 选项设为 `true`，保存或销毁对象时，关联对象的 `updated_at` 或 `updated_on` 字段会自动设为当前时间。还可指定要更新哪个时间戳字段：
>
>  ```
>
>  class Book < ApplicationRecord
>   belongs_to :author, touch: :books_updated_at
>  end
>  ```

###### 4.1.2.10 `:validate`

> 如果把 `:validate` 选项设为 `true`，保存对象时，会同时验证关联的对象。该选项的默认值是 `false`，保存对象时不验证关联的对象

4.1.2.11 `:optional`

> 如果把 `:optional` 选项设为 `true`，不会验证关联的对象是否存在。该选项的默认值是 `false`。

##### 4.1.3 `belongs_to` 的作用域

* 在作用域代码块中可以使用任何一个标准的[查询方法](https://ruby-china.github.io/rails-guides/active_record_querying.html)。下面分别介绍这几个：

  ```
  where
  includes
  readonly
  select
  ```

###### 4.1.3.1 `where`

> `where` 方法指定关联对象必须满足的条件。
>
> ```
>
> class book < ApplicationRecord
>   belongs_to :author, -> { where active: true }
> end
> ```

###### 4.1.3.2 `includes`

> `includes` 方法指定使用关联时要及早加载的间接关联。
>
> 如果经常要直接从商品上获取作者对象（`@line_item.book.author`），就可以在关联中把作者从商品引入图书中：
>
> ```
>
> class LineItem < ApplicationRecord
>   belongs_to :book, -> { includes :author }
> end
>  
> class Book < ApplicationRecord
>   belongs_to :author
>   has_many :line_items
> end
>  
> class Author < ApplicationRecord
>   has_many :books
> end
> ```
>
> 直接关联没必要使用 `includes`，常用于多对多关联。

###### 4.1.3.3 `readonly`

> 如果使用 `readonly`，通过关联获取的对象是只读的。

###### 4.1.3.4 `select`

> 1、`select` 方法用于覆盖检索关联对象使用的 SQL `SELECT` 子句。默认情况下，Rails 检索所有字段。
>
> 2、如果在 `belongs_to` 关联中使用 `select` 方法，应该同时设置 `:foreign_key` 选项，确保返回的结果正确。

##### 4.1.4 什么时候保存对象

* 把对象赋值给 `belongs_to` 关联不会自动保存对象，也不会保存关联的对象。


#### 4.2 `has_one` 关联详解

* `has_one` 关联建立两个模型之间的一对一关系。用数据库术语来说，这种关联的意思是外键在另一个类中。如果外键在这个类中，应该使用 `belongs_to` 关联。

##### 4.2.1 `has_one` 关联添加的方法

* 声明 `has_one` 关联后，声明所在的类自动获得了五个关联相关的方法：——**同4.1的belongs_to**

  ```
  association
  association=(associate)
  build_association(attributes = {})
  create_association(attributes = {})
  create_association!(attributes = {})
  ```

  ```
  class Supplier < ApplicationRecord
    has_one :account
  end
  ```

  ```
  account
  account=
  build_account
  create_account
  create_account!
  ```

###### 4.2.1.1 `association`

###### 4.2.1.2 `association=(associate)`

###### 4.2.1.3 `build_association(attributes = {})`

###### 4.2.1.5 `create_association!(attributes = {})`

##### 4.2.2 `has_one` 方法的选项

* 有时还是需要定制 `has_one` 关联的行为。定制的方法很简单，声明关联时传入选项即可。

  * 例如，下面的关联使用了两个选项：

    ```

    class Supplier < ApplicationRecord
      has_one :account, class_name: "Billing", dependent: :nullify
    end
    ```

* `has_one` 关联支持下列选项：

  ```
  :as
  :autosave
  :class_name
  :dependent
  :foreign_key
  :inverse_of
  :primary_key
  :source
  :source_type
  :through
  :validate
  ```

###### 4.2.2.1 `:as`

> `:as` 选项表明这是多态关联。[前文](https://ruby-china.github.io/rails-guides/association_basics.html#polymorphic-associations)已经详细介绍过多态关联。

###### 4.2.2.2 `:autosave`

> 如果把 `:autosave` 选项设为 `true`，保存父对象时，会自动保存所有子对象，并把标记为析构的子对象销毁。

###### 4.2.2.3 `:class_name`

> 如果另一个模型无法从关联的名称获取，可以使用 `:class_name` 选项指定模型名。例如，供应商有一个账户，但表示账户的模型是 `Billing`，那么就可以这样声明关联：
>
> ```
>
> class Supplier < ApplicationRecord
>   has_one :account, class_name: "Billing"
> end
> ```

###### 4.2.2.4 `:dependent`

> 控制属主销毁后怎么处理关联的对象：
>
> ```
> :destroy：也销毁关联的对象；
> :delete：直接把关联的对象从数据库中删除（不执行回调）；
> :nullify：把外键设为 NULL，不执行回调；
> :restrict_with_exception：有关联的对象时抛出异常；
> :restrict_with_error：有关联的对象时，向属主添加一个错误；
> ```

###### 4.2.2.5 `:foreign_key`

> 按照约定，在另一个模型中用来存储外键的字段名是模型名后加 `_id`。`:foreign_key` 选项用于设置要使用的外键名：
>
> ```
>
> class Supplier < ApplicationRecord
>   has_one :account, foreign_key: "supp_id"
> end
> ```

###### 4.2.2.6 `:inverse_of`

> `:inverse_of` 选项指定 `has_one` 关联另一端的 `belongs_to` 关联名。不能和 `:through` 或 `:as` 选项一起使用。
>
> ```
>
> class Supplier < ApplicationRecord
>   has_one :account, inverse_of: :supplier
> end
>  
> class Account < ApplicationRecord
>   belongs_to :supplier, inverse_of: :account
> end
> ```

###### 4.2.2.7 `:primary_key`

> 按照约定，用来存储该模型主键的字段名 `id`。`:primary_key` 选项用于设置要使用的主键名。

###### 4.2.2.8 `:source`

> `:source` 选项指定 `has_one :through` 关联的源关联名称。

###### 4.2.2.9 `:source_type`

> `:source_type` 选项指定通过多态关联处理 `has_one :through` 关联的源关联类型。

###### 4.2.2.10 `:through`

> `:through` 选项指定用于执行查询的联结模型。[前文](https://ruby-china.github.io/rails-guides/association_basics.html#the-has-one-through-association)详细介绍过 `has_one :through` 关联。

###### 4.2.2.11 `:validate`

> 如果把 `:validate` 选项设为 `true`，保存对象时，会同时验证关联的对象。该选项的默认值是 `false`，即保存对象时不验证关联的对象。

##### 4.2.3 `has_one` 的作用域

* 在作用域代码块中可以使用任何一个标准的[查询方法](https://ruby-china.github.io/rails-guides/active_record_querying.html)。下面介绍其中几个：——**同4.1的belongs_to**

  ```
  where
  includes
  readonly
  select
  ```

###### 4.2.3.1 `where`

###### 4.2.3.2 `includes`

###### 4.2.3.3 `readonly`

###### 4.2.3.4 `select`

##### 4.2.4 检查关联的对象是否存在

* 检查关联的对象是否存在，可以使用 `association.nil?` 方法：

  ```

  if @supplier.account.nil?
    @msg = "No account found for this supplier"
  end
  ```

##### 4.2.5 什么时候保存对象

* 把对象赋值给 `has_one` 关联时，那个对象会自动保存（因为要更新外键）。而且所有被替换的对象也会自动保存，因为外键也变了
  * 如果父对象（`has_one` 关联声明所在的模型）没保存（`new_record?` 方法返回 `true`），那么子对象也不会保存。只有保存了父对象，才会保存子对象。

#### 4.3 `has_many` 关联详解

* `has_many` 关联建立两个模型之间的一对多关系。用数据库术语来说，这种关联的意思是外键在另一个类中，指向这个类的实例。

##### 4.3.1 `has_many` 关联添加的方法

* 声明 `has_many` 关联后，声明所在的类自动获得了 16 个关联相关的方法：

  ```
  collection
  collection<<(object, &#8230;&#8203;)
  collection.delete(object, &#8230;&#8203;)
  collection.destroy(object, &#8230;&#8203;)
  collection=(objects)
  collection_singular_ids
  collection_singular_ids=(ids)
  collection.clear
  collection.empty?
  collection.size
  collection.find(&#8230;&#8203;)
  collection.where(&#8230;&#8203;)
  collection.exists?(&#8230;&#8203;)
  collection.build(attributes = {}, &#8230;&#8203;)
  collection.create(attributes = {})
  collection.create!(attributes = {})
  ```

* 这些个方法中的 `collection` 要替换成传给 `has_many` 方法的第一个参数。`collection_singular` 要替换成第一个参数的单数形式。对如下的声明来说：

  ```

  class Author < ApplicationRecord
    has_many :books
  end
  ```

  ```

  每个 Author 模型实例都获得了这些方法：
  books
  books<<(object, ...)
  books.delete(object, ...)
  books.destroy(object, ...)
  books=(objects)
  book_ids
  book_ids=(ids)
  books.clear
  books.empty?
  books.size
  books.find(...)
  books.where(...)
  books.exists?(...)
  books.build(attributes = {}, ...)
  books.create(attributes = {})
  books.create!(attributes = {})
  ```

###### 4.3.1.1 `collection`

###### 4.3.1.2 `collection<<(object, &#8230;&#8203;)`

###### 4.3.1.3 `collection.delete(object, &#8230;&#8203;)`

###### 4.3.1.4 `collection.destroy(object, &#8230;&#8203;)`

###### 4.3.1.5 `collection=(objects)`

###### 4.3.1.6 `collection_singular_ids`

###### 4.3.1.7 `collection_singular_ids=(ids)`

###### 4.3.1.8 `collection.clear`

###### 4.3.1.9 `collection.empty?`

###### 4.3.1.10 `collection.size`

###### 4.3.1.11 `collection.find(&#8230;&#8203;)`

##### 4.3.2 `collection.where(&#8230;&#8203;)`

###### 4.3.2.1 `collection.exists?(&#8230;&#8203;)`

###### 4.3.2.2 `collection.build(attributes = {}, &#8230;&#8203;)`

###### 4.3.2.3 `collection.create(attributes = {})`

###### 4.3.3 `collection.create!(attributes = {})`

##### 4.3.4 `has_many` 方法的选项

* 有时还是需要定制 `has_many` 关联的行为。定制的方法很简单，声明关联时传入选项即可。

  ```
  :as
  :autosave
  :class_name
  :counter_cache
  :dependent
  :foreign_key
  :inverse_of
  :primary_key
  :source
  :source_type
  :through
  :validate
  ```

###### 4.3.4.1 `:as`

###### 4.3.4.2 `:autosave`

###### 4.3.4.3 `:class_name`

###### 4.3.4.4 `:counter_cache`

###### 4.3.4.5 `:dependent`

###### 4.3.4.6 `:foreign_key`

###### 4.3.4.7 `:inverse_of`

###### 4.3.4.8 `:primary_key`

###### 4.3.4.9 `:source`

###### 4.3.4.10 `:source_type`

###### 4.3.4.11 `:through`

###### 4.3.4.12 `:validate`

##### 4.3.5 `has_many` 的作用域

* 在作用域代码块中可以使用任何一个标准的[查询方法](https://ruby-china.github.io/rails-guides/active_record_querying.html)。下面介绍其中几个：

  ````
  where
  extending
  group
  includes
  limit
  offset
  order
  readonly
  select
  distinct
  ````

###### 4.3.5.1 `where`

###### 4.3.5.2 `extending`

###### 4.3.5.3 `group`

###### 4.3.5.4 `includes`

###### 4.3.5.5 `limit`

###### 4.3.5.6 `offset`

###### 4.3.5.7 `order`

###### 4.3.5.8 `readonly`

###### 4.3.5.9 `select`

###### 4.3.5.10 `distinct`

##### 4.3.6 什么时候保存对象

* 把对象赋值给 `has_many` 关联时，会自动保存对象（因为要更新外键）。如果一次赋值多个对象，所有对象都会自动保存。

#### 4.4 `has_and_belongs_to_many` 关联详解

* `has_and_belongs_to_many` 关联建立两个模型之间的多对多关系。用数据库术语来说，这种关联的意思是有个联结表包含指向这两个类的外键。

##### 4.4.1 `has_and_belongs_to_many` 关联添加的方法

* 声明 `has_and_belongs_to_many` 关联后，声明所在的类自动获得了 16 个关联相关的方法：

  ```
  collection
  collection<<(object, &#8230;&#8203;)
  collection.delete(object, &#8230;&#8203;)
  collection.destroy(object, &#8230;&#8203;)
  collection=(objects)
  collection_singular_ids
  collection_singular_ids=(ids)
  collection.clear
  collection.empty?
  collection.size
  collection.find(&#8230;&#8203;)
  collection.where(&#8230;&#8203;)
  collection.exists?(&#8230;&#8203;)
  collection.build(attributes = {})
  collection.create(attributes = {})
  collection.create!(attributes = {})
  ```

4.4.1.1 额外的列方法

* 如果在多对多关联中需要使用这么复杂的数据表，应该用 `has_many :through` 关联代替 `has_and_belongs_to_many` 关联。

4.4.1.2 `collection`

4.4.1.3 `collection<<(object, &#8230;&#8203;)`

4.4.1.4 `collection.delete(object, &#8230;&#8203;)`

4.4.1.5 `collection.destroy(object, &#8230;&#8203;)`

4.4.1.6 `collection=(objects)`

4.4.1.7 `collection_singular_ids`

4.4.1.8 `collection_singular_ids=(ids)`

4.4.1.9 `collection.clear`

4.4.1.10 `collection.empty?`

4.4.1.11 `collection.size`

4.4.1.12 `collection.find(&#8230;&#8203;)`

4.4.1.13 `collection.where(&#8230;&#8203;)`

4.4.1.14 `collection.exists?(&#8230;&#8203;)`

4.4.1.15 `collection.build(attributes = {})`

4.4.1.16 `collection.create(attributes = {})`

4.4.1.17 `collection.create!(attributes = {})`

##### 4.4.2 `has_and_belongs_to_many` 方法的选项

* `has_and_belongs_to_many` 关联支持以下选项：

  ```
  :association_foreign_key
  :autosave
  :class_name
  :foreign_key
  :join_table
  :validate
  ```

4.4.2.1 `:association_foreign_key`

4.4.2.2 `:autosave`

4.4.2.3 `:class_name`

4.4.2.4 `:foreign_key`

4.4.2.5 `:join_table`

4.4.2.6 `:validate`

##### 4.4.3 `has_and_belongs_to_many` 的作用域

* 在作用域代码块中可以使用任何一个标准的[查询方法](https://ruby-china.github.io/rails-guides/active_record_querying.html)。

  ```
  where
  extending
  group
  includes
  limit
  offset
  order
  readonly
  select
  distinct
  ```

4.4.3.1 `where`

4.4.3.2 `extending`

4.4.3.3 `group`

4.4.3.4 `includes`

4.4.3.5 `limit`

4.4.3.6 `offset`

4.4.3.7 `order`

4.4.3.8 `readonly`

4.4.3.9 `select`

4.4.3.10 `distinct`

##### 4.4.4 什么时候保存对象

* 把对象赋值给 `has_and_belongs_to_many` 关联时，会自动保存对象（因为要更新外键）。如果一次赋值多个对象，所有对象都会自动保存。

#### 4.5 关联回调

* 关联回调和普通回调差不多，只不过由集合生命周期中的事件触发。关联回调有四种：

  ```
  before_add
  after_add
  before_remove
  after_remove
  ```

* 关联回调在声明关联时定义。同一事件可以触发多个回调，多个回调使用数组指定：

  ```

  class Author < ApplicationRecord
    has_many :books,
      before_add: [:check_credit_limit, :calculate_shipping_charges]
   
    def check_credit_limit(book)
      ...
    end
   
    def calculate_shipping_charges(book)
      ...
    end
  end
  ```

  * 如果 `before_add` 回调抛出异常，不会把对象添加到集合中。类似地，如果 `before_remove` 抛出异常，对象不会从集合中删除。

#### 4.6 关联扩展

* Rails 基于关联代理对象自动创建的功能是死的，可以通过匿名模块、新的查找方法、创建对象的方法等进行扩展。例如：

  ```

  class Author < ApplicationRecord
    has_many :books do
      def find_by_book_prefix(book_number)
        find_by(category_id: book_number[0..2])
      end
    end
  end
  ```

* 如果扩展要在多个关联中使用，可以将其写入具名扩展模块。例如：

  ```

  module FindRecentExtension
    def find_recent
      where("created_at > ?", 5.days.ago)
    end
  end
   
  class Author < ApplicationRecord
    has_many :books, -> { extending FindRecentExtension }
  end
   
  class Supplier < ApplicationRecord
    has_many :deliveries, -> { extending FindRecentExtension }
  end
  ```

  * 在扩展中可以使用如下 `proxy_association` 方法的三个属性获取关联代理的内部信息：

    ```
    proxy_association.owner：返回关联所属的对象；
    proxy_association.reflection：返回描述关联的反射对象；
    proxy_association.target：返回 belongs_to 或 has_one 关联的关联对象，或者 has_many 或 has_and_belongs_to_many 关联的关联对象集合；
    ```

### 5 单表继承

* 有时可能想在不同的模型中共用相同的字段和行为。

* 假如有 Car、Motorcycle 和 Bicycle 三个模型，我们想在它们中共用 `color` 和 `price` 字段，但是各自的具体行为不同，而且使用不同的控制器。

  在 Rails 中实现这一需求非常简单。首先，生成基模型 Vehicle：

  ```
  $ rails generate model vehicle type:string color:string price:decimal{10.2}
  ```

  * 对这个例子来说，“type”字段的值可能是“Car”、“Motorcycle”或“Bicycle”。如果表中没有“type”字段，单表继承无法工作。
  * 然后，生成三个模型，都继承自 Vehicle。为此，可以使用 `parent=PARENT` 选项。这样，生成的模型继承指定的父模型，而且不生成对应的迁移（因为表已经存在）。例如，生成 Car 模型的命令是：

  ```
  $ rails generate model car --parent=Vehicle
  ```

  * 生成的模型如下：

  ```
  class Car < Vehicle
  end
  ```

  * 这意味着，添加到 Vehicle 中的所有行为在 Car 中都可用，例如关联、公开方法，等等。

    创建一辆汽车，相应的记录保存在 `vehicles` 表中，而且 `type` 字段的值是“Car”：对应的 SQL 如下：

  ```
  Car.create(color: 'Red', price: 10000)
  ```

  ```
  INSERT INTO "vehicles" ("type", "color", "price") VALUES ('Car', 'Red', 10000)
  ```

  * 查询汽车记录时只会搜索此类车辆：对应的 SQL 如下：

  ```
  Car.all
  ```

  ```
  SELECT "vehicles".* FROM "vehicles" WHERE "vehicles"."type" IN ('Car')
  ```



